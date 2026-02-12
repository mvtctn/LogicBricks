import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const runtime = 'edge';

const SYSTEM_PROMPT = `
You are the LogicBricks AI Compiler. 
Your job is to translate natural language logic into highly optimized, production-ready Javascript (Node.js) or Python code.
The code will be executed in a serverless environment as part of a Logic Flow.

Rules:
1. Return ONLY a JSON object with:
   - "type": "node_update" or "full_flow"
   - "label": Clear name of the logic
   - "code": The compiled code
   - "description": Short explanation of what the logic does
2. Use standard modern libraries.
3. Handle errors gracefully.
4. If "full_flow" is requested, return an array of nodes and edges.

Example Input: "Filter emails that don't end with @gmail.com"
Example Output:
{
  "label": "G-Mail Filter",
  "type": "logic",
  "code": "export default async function(event) { return event.email.endsWith('@gmail.com'); }",
  "description": "Filters for Gmail addresses only"
}
`;

export async function POST(req: Request) {
    const { prompt } = await req.json();

    const result = streamText({
        model: google('gemini-1.5-pro'),
        system: SYSTEM_PROMPT,
        messages: [
            { role: 'user', content: prompt }
        ],
    });

    return result.toTextStreamResponse();
}
