import JsonVisualizer from "@/components/JsonVisualizer";
import { Code2 } from "lucide-react";

const Index = () => {
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

        <JsonVisualizer />
      </div>
    </div>
  );
};

export default Index;
