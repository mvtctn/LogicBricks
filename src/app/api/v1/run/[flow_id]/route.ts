import { createClient } from '@/lib/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(
    req: NextRequest,
    { params }: { params: { flow_id: string } }
) {
    try {
        const flowId = params.flow_id;
        const body = await req.json();

        const supabase = await createClient();

        // 1. Fetch flow from Supabase
        const { data: flow, error } = await supabase
            .from('flows')
            .select('*')
            .eq('id', flowId)
            .single();

        if (error || !flow) {
            return NextResponse.json({ error: 'Flow not found' }, { status: 404 });
        }

        const { nodes, edges } = flow;
        let currentData = body;

        // 2. Execution Logic (Server-side)
        const startNode = nodes.find((n: any) => n.type === 'startNode');
        if (!startNode) {
            return NextResponse.json({ error: 'Start node not found' }, { status: 400 });
        }

        let currentNodeId = startNode.id;
        let pathFound = true;
        let executionSteps = 0;
        const MAX_STEPS = 50; // Prevention for infinite loops

        while (pathFound && executionSteps < MAX_STEPS) {
            executionSteps++;

            const nextEdge = edges.find((e: any) => e.source === currentNodeId);
            if (!nextEdge) {
                pathFound = false;
                break;
            }

            const nextNode = nodes.find((n: any) => n.id === nextEdge.target);
            if (!nextNode) {
                pathFound = false;
                break;
            }

            currentNodeId = nextNode.id;

            if (nextNode.type === 'processNode') {
                const code = nextNode.data.code;
                if (!code) {
                    return NextResponse.json({ error: `Node ${nextNode.data.label} is not compiled.` }, { status: 400 });
                }

                try {
                    // Execute code in a scoped function
                    const executeLogic = new Function('data', code);
                    const output = executeLogic(currentData);
                    currentData = output ?? currentData;
                } catch (err: any) {
                    return NextResponse.json({
                        error: `Runtime error in ${nextNode.data.label}: ${err.message}`
                    }, { status: 500 });
                }
            } else if (nextNode.type === 'endNode') {
                return NextResponse.json({ result: currentData });
            }
        }

        return NextResponse.json({ result: currentData });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
