'use client';

import { useState } from "react";
import { JsonInput } from "@/components/JsonInput";
import { TreeVisualization } from "@/components/TreeVisualization";
import { Code2 } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const JsonVisualizer = () => {
  const [jsonData, setJsonData] = useState<unknown>(null);

  const handleReset = () => {
    setJsonData(null);
  };

  return (
    <PanelGroup direction="horizontal" className="h-[calc(100vh-200px)]">
      <Panel defaultSize={50} minSize={30}>
        <JsonInput onVisualize={setJsonData} onReset={handleReset} />
      </Panel>
      <PanelResizeHandle className="w-2 bg-border hover:bg-primary/20 transition-colors" />
      <Panel defaultSize={50} minSize={30}>
        {jsonData ? (
          <TreeVisualization data={jsonData} />
        ) : (
          <div className="flex items-center justify-center bg-card rounded-lg shadow-subtle border border-border h-full">
            <div className="text-center text-muted-foreground">
              <Code2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Enter JSON data to visualize the tree</p>
            </div>
          </div>
        )}
      </Panel>
    </PanelGroup>
  );
};

export default JsonVisualizer;
