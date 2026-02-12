"use client";

import React from 'react';
import {
    MoreHorizontal,
    Trash2,
    Copy,
    Fingerprint,
    Type
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFlowStore } from '@/store/useFlowStore';
import { toast } from 'sonner';

interface NodeMenuProps {
    nodeId: string;
    onRename?: () => void;
}

export function NodeMenu({ nodeId, onRename }: NodeMenuProps) {
    const { deleteNode, nodes } = useFlowStore();

    const handleCopyId = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(nodeId);
        toast.info("Node ID copied to clipboard");
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        deleteNode(nodeId);
        toast.success("Node deleted");
    };

    const handleDuplicate = (e: React.MouseEvent) => {
        e.stopPropagation();
        const node = nodes.find(n => n.id === nodeId);
        if (node) {
            const newNode = {
                ...node,
                id: `node_dup_${Math.random().toString(36).substr(2, 9)}`,
                position: {
                    x: node.position.x + 40,
                    y: node.position.y + 40,
                },
                selected: true,
            };
            useFlowStore.getState().addNode(newNode);
            toast.success("Node duplicated");
        }
    };

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="p-1.5 bg-background border border-border text-muted-foreground rounded-full shadow-lg hover:text-foreground hover:border-primary/50 transition-all active:scale-95"
                        title="Node Actions"
                    >
                        <MoreHorizontal size={14} />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background/95 backdrop-blur-xl border-border">
                    {onRename && (
                        <DropdownMenuItem onClick={onRename} className="text-xs gap-2">
                            <Type size={14} className="text-muted-foreground" />
                            Rename Node
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleDuplicate} className="text-xs gap-2">
                        <Copy size={14} className="text-muted-foreground" />
                        Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopyId} className="text-xs gap-2">
                        <Fingerprint size={14} className="text-muted-foreground" />
                        Copy Node ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border" />
                    <DropdownMenuItem
                        onClick={handleDelete}
                        className="text-xs gap-2 text-destructive focus:text-destructive focus:bg-destructive/10"
                    >
                        <Trash2 size={14} />
                        Delete Node
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
