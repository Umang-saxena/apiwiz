import { memo, useState } from "react";
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
    const [isHovered, setIsHovered] = useState(false);

    const getNodeStyle = () => {
        const baseStyle = "px-6 py-3 rounded-lg shadow-md transition-all duration-300 min-w-[100px] text-center font-medium relative";

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

    const formatValue = (value: any) => {
        if (value === null) return "null";
        if (typeof value === "string") return `"${value}"`;
        if (typeof value === "boolean") return value ? "true" : "false";
        return String(value);
    };

    return (
        <div
            className={getNodeStyle()}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Handle type="target" position={Position.Top} className="!bg-gray-400 !w-2 !h-2" />

            <div className="text-sm">
                {data.value !== undefined ? String(data.value) : data.label}
            </div>

            <Handle type="source" position={Position.Bottom} className="!bg-gray-400 !w-2 !h-2" />

            {isHovered && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-md shadow-lg z-10 whitespace-nowrap">
                    <div className="font-semibold">Path: {data.path}</div>
                    <div>Value: {data.value !== undefined ? formatValue(data.value) : "N/A"}</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
            )}
        </div>
    );
});

TreeNode.displayName = "TreeNode";
