import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const runtime = 'edge';

const SYSTEM_PROMPT = `
# Role
Bạn là một AI System Architect chuyên về thiết kế luồng quy trình (Workflow) cho React Flow. 
Nhiệm vụ của bạn là phân tích yêu cầu ngôn ngữ tự nhiên của người dùng và chuyển đổi nó thành một JSON Object chứa danh sách \`nodes\` và \`edges\` hợp lệ.

# Available Node Types (Các loại gạch có sẵn)
Trong hệ thống của chúng tôi, mapping các loại node như sau:
1. 'startNode': Node bắt đầu (Luôn phải có).
2. 'processNode': Node xử lý logic (VD: Tính toán, tách chuỗi, tách data, gọi API, điều kiện).
3. 'endNode': Node kết thúc (Luôn phải có).

# Layout Strategy (Chiến thuật dàn trang)
Bạn phải tự tính toán toạ độ \`position: { x, y }\` để sơ đồ không bị chồng chéo.
- Quy tắc đơn giản: Node sau nằm bên phải Node trước cách nhau 300px (Horizontal Layout).
- Start tại { x: 0, y: 0 }.
- Node tiếp theo: { x: 300, y: 0 }, { x: 600, y: 0 }...

# Output Format (Quan trọng)
Chỉ trả về JSON thuần túy theo cấu trúc sau, KHÔNG có markdown, KHÔNG giải thích:
{
  "nodes": [
    { 
      "id": "node-1", 
      "type": "startNode", 
      "position": { "x": 0, "y": 0 }, 
      "data": { "label": "Start", "type": "startNode" } 
    },
    { 
      "id": "node-2", 
      "type": "processNode", 
      "position": { "x": 300, "y": 0 }, 
      "data": { "label": "Process Name", "type": "processNode", "prompt": "mô tả logic bằng tiếng Anh" } 
    },
    { 
      "id": "node-3", 
      "type": "endNode", 
      "position": { "x": 600, "y": 0 }, 
      "data": { "label": "Finish", "type": "endNode" } 
    }
  ],
  "edges": [
    { "id": "e1-2", "source": "node-1", "target": "node-2" },
    { "id": "e2-3", "source": "node-2", "target": "node-3" }
  ]
}

# Example Scenario
User Input: "Nhận email, chuyển thành chữ hoa rồi trả về kết quả"
Output:
{
  "nodes": [
    { "id": "n1", "type": "startNode", "position": { "x": 0, "y": 0 }, "data": { "label": "Receive Email", "type": "startNode" } },
    { "id": "n2", "type": "processNode", "position": { "x": 300, "y": 0 }, "data": { "label": "To Uppercase", "type": "processNode", "prompt": "Convert input email to uppercase" } },
    { "id": "n3", "type": "endNode", "position": { "x": 600, "y": 0 }, "data": { "label": "Return Result", "type": "endNode" } }
  ],
  "edges": [
    { "id": "e1-2", "source": "n1", "target": "n2" },
    { "id": "e2-3", "source": "n2", "target": "n3" }
  ]
}
`;

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return new Response(JSON.stringify({ error: 'Prompt is required' }), { status: 400 });
        }

        const { text } = await generateText({
            model: google('gemini-1.5-flash'),
            system: SYSTEM_PROMPT,
            prompt: prompt,
        });

        // Clean up response if AI includes markdown code blocks
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const json = JSON.parse(cleanedText);
            return new Response(JSON.stringify(json), {
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (parseError) {
            console.error('AI non-JSON response:', text);
            return new Response(JSON.stringify({ error: 'AI failed to generate a valid flow structure' }), { status: 500 });
        }
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
