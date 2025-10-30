import { useState } from "react";
import { JsonInput } from "@/components/JsonInput";
import { TreeVisualization } from "@/components/TreeVisualization";
import { Code2 } from "lucide-react";

const Index = () => {
  const [jsonData, setJsonData] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto p-6">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Code2 className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">JSON Tree Visualizer</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Visualize and explore JSON data structures interactively
          </p>
        </header>

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
      </div>
    </div>
  );
};

export default Index;
