import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const runtime = 'edge';

const SYSTEM_PROMPT = `
Bạn là một chuyên gia Backend. Nhiệm vụ của bạn là chuyển đổi yêu cầu logic tự nhiên thành một hàm JavaScript (ES6) ẩn danh.
- Input: Một object 'data' chứa các biến đầu vào.
- Output: Phải return kết quả hoặc throw error.
- KHÔNG giải thích, KHÔNG markdown, chỉ trả về code thuần túy của phần thân hàm.

Ví dụ: 
User: "Kiểm tra nếu email không có @ thì lỗi"
Output: if (!data.email.includes('@')) throw new Error('Invalid Email'); return true;
`;

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return new Response('Prompt is required', { status: 400 });
        }

        const { text } = await generateText({
            model: google('gemini-1.5-pro'),
            system: SYSTEM_PROMPT,
            prompt: prompt,
        });

        // Clean up any potential markdown if AI returns it despite instructions
        const cleanCode = text.replace(/```javascript/g, '').replace(/```/g, '').trim();

        return Response.json({ code: cleanCode });
    } catch (error: any) {
        console.error('Compile Error:', error);
        return new Response(error.message || 'Error compiling logic', { status: 500 });
    }
}
