import { memo } from "react";
import { Handle, Position } from "reactflow";

export type NodeType = "object" | "array" | "primitive";

export interface NodeData {
    label: string;
    value?: any;
    type: NodeType;
    path: string;
    isHighlighted?: boolean;
}

export const TreeNode = memo(({ data }: { data: NodeData }) => {
    const getNodeStyle = () => {
        const baseStyle = "px-6 py-3 rounded-lg shadow-md transition-all duration-300 min-w-[100px] text-center font-medium";

        if (data.isHighlighted) {
            return `${baseStyle} bg-primary border-2 border-primary text-white ring-4 ring-primary/30 animate-pulse`;
        }

        switch (data.type) {
            case "object":
                return `${baseStyle} bg-[#7B89E8] text-white border-0`;
            case "array":
                return `${baseStyle} bg-[#5DBFB3] text-white border-0`;
            case "primitive":
                return `${baseStyle} bg-[#F5B461] text-white border-0`;
            default:
                return baseStyle;
        }
    };

    return (
        <div className={getNodeStyle()}>
            <Handle type="target" position={Position.Top} className="!bg-gray-400 !w-2 !h-2" />

            <div className="text-sm">
                {data.value !== undefined ? String(data.value) : data.label}
            </div>

            <Handle type="source" position={Position.Bottom} className="!bg-gray-400 !w-2 !h-2" />
        </div>
    );
});

TreeNode.displayName = "TreeNode";
