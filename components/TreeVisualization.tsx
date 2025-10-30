import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
    Node,
    Edge,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    MarkerType,
    Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import { TreeNode, NodeType } from "./TreeNode";
import { SearchBar } from "./SearchBar";
import { ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TreeVisualizationProps {
    data: any;
}

const nodeTypes = {
    custom: TreeNode,
};

const buildTree = (data: any, path: string = "$"): { nodes: Node[]; edges: Edge[] } => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    let nodeId = 0;

    const traverse = (obj: any, currentPath: string, parentId: string | null, xOffset: number, yOffset: number): number => {
        const id = `node-${nodeId++}`;
        let nodeType: NodeType = "primitive";
        let label = currentPath.split(/[.[\]]/).filter(Boolean).pop() || "root";
        let value = obj;

        if (obj !== null && typeof obj === "object") {
            if (Array.isArray(obj)) {
                nodeType = "array";
                value = undefined;
            } else {
                nodeType = "object";
                value = undefined;
            }
        }

        nodes.push({
            id,
            type: "custom",
            position: { x: xOffset, y: yOffset },
            data: {
                label,
                value,
                type: nodeType,
                path: currentPath,
            },
        });

        if (parentId) {
            edges.push({
                id: `edge-${parentId}-${id}`,
                source: parentId,
                target: id,
                type: "straight",
                animated: false,
                style: { stroke: "#CBD5E1", strokeWidth: 2 },
            });
        }

        if (obj !== null && typeof obj === "object") {
            const entries = Array.isArray(obj)
                ? obj.map((item, index) => [index, item])
                : Object.entries(obj);

            const childWidth = 200;
            const startX = xOffset - (entries.length - 1) * childWidth / 2;

            entries.forEach(([key, val], index) => {
                const childPath = Array.isArray(obj)
                    ? `${currentPath}[${key}]`
                    : `${currentPath}.${key}`;
                const childX = startX + index * childWidth;
                traverse(val, childPath, id, childX, yOffset + 120);
            });
        }

        return nodeId;
    };

    traverse(data, "$", null, 500, 50);
    return { nodes, edges };
};

const findNodeByPath = (path: string, nodes: Node[]): Node | null => {
    const normalizedPath = path.replace(/\$/g, "").replace(/^\./g, "");

    return nodes.find(node => {
        const nodePath = node.data.path.replace(/\$/g, "").replace(/^\./g, "");
        return nodePath === normalizedPath || node.data.path === path;
    }) || null;
};

export const TreeVisualization = ({ data }: TreeVisualizationProps) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [matchFound, setMatchFound] = useState<boolean | null>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

    useEffect(() => {
        const { nodes: newNodes, edges: newEdges } = buildTree(data);
        setNodes(newNodes);
        setEdges(newEdges);
        setMatchFound(null);
    }, [data, setNodes, setEdges]);

    const handleSearch = useCallback((path: string) => {
        const matchedNode = findNodeByPath(path, nodes);

        if (matchedNode) {
            setNodes((nds) =>
                nds.map((node) => ({
                    ...node,
                    data: {
                        ...node.data,
                        isHighlighted: node.id === matchedNode.id,
                    },
                }))
            );

            if (reactFlowInstance) {
                reactFlowInstance.setCenter(
                    matchedNode.position.x + 100,
                    matchedNode.position.y + 50,
                    { zoom: 1, duration: 800 }
                );
            }

            setMatchFound(true);
        } else {
            setMatchFound(false);
        }
    }, [nodes, setNodes, reactFlowInstance]);

    const handleClearSearch = useCallback(() => {
        setNodes((nds) =>
            nds.map((node) => ({
                ...node,
                data: {
                    ...node.data,
                    isHighlighted: false,
                },
            }))
        );
        setMatchFound(null);
    }, [setNodes]);

    const handleZoomIn = () => reactFlowInstance?.zoomIn();
    const handleZoomOut = () => reactFlowInstance?.zoomOut();
    const handleFitView = () => reactFlowInstance?.fitView({ padding: 0.2, duration: 800 });

    return (
        <div className="flex flex-col h-full gap-4">
            <SearchBar onSearch={handleSearch} onClear={handleClearSearch} matchFound={matchFound} />

            <div className="flex-1 bg-card rounded-lg shadow-subtle border border-border overflow-hidden">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onInit={setReactFlowInstance}
                    nodeTypes={nodeTypes}
                    fitView
                    fitViewOptions={{ padding: 0.2 }}
                    minZoom={0.1}
                    maxZoom={2}
                    defaultEdgeOptions={{
                        type: "straight",
                        animated: false,
                    }}
                    proOptions={{ hideAttribution: true }}
                >
                    <Background />
                    <Controls showInteractive={false} />

                    <Panel position="top-right" className="flex gap-2">
                        <Button onClick={handleZoomIn} size="icon" variant="secondary">
                            <ZoomIn className="w-4 h-4" />
                        </Button>
                        <Button onClick={handleZoomOut} size="icon" variant="secondary">
                            <ZoomOut className="w-4 h-4" />
                        </Button>
                        <Button onClick={handleFitView} size="icon" variant="secondary">
                            <Maximize className="w-4 h-4" />
                        </Button>
                    </Panel>
                </ReactFlow>
            </div>
        </div>
    );
};
