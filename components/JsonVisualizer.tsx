'use client';

import { useState } from "react";
import { JsonInput } from "@/components/JsonInput";
import { TreeVisualization } from "@/components/TreeVisualization";
import { Code2 } from "lucide-react";

const JsonVisualizer = () => {
  const [jsonData, setJsonData] = useState<unknown>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
      <JsonInput onVisualize={setJsonData} />

      {jsonData ? (
        <TreeVisualization data={jsonData} />
      ) : (
        <div className="flex items-center justify-center bg-card rounded-lg shadow-subtle border border-border">
          <div className="text-center text-muted-foreground">
            <Code2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Enter JSON data to visualize the tree</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JsonVisualizer;
