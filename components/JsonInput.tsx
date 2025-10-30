import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Play, FileJson, Copy, RotateCcw } from "lucide-react";

interface JsonInputProps {
    onVisualize: (data: any) => void;
    onReset?: () => void;
}

const sampleJson = {
    user: {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        address: {
            street: "123 Main St",
            city: "New York",
            country: "USA"
        },
        hobbies: ["reading", "coding", "gaming"]
    },
    items: [
        { id: 1, name: "Item 1", price: 29.99 },
        { id: 2, name: "Item 2", price: 49.99 }
    ],
    active: true,
    count: 42
};

export const JsonInput = ({ onVisualize, onReset }: JsonInputProps) => {
    const [jsonText, setJsonText] = useState(JSON.stringify(sampleJson, null, 2));
    const [error, setError] = useState<string>("");

    const handleVisualize = () => {
        setError("");
        try {
            const parsed = JSON.parse(jsonText);
            onVisualize(parsed);
            toast.success("JSON visualized successfully!");
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "Invalid JSON";
            setError(errorMessage);
            toast.error("Invalid JSON: " + errorMessage);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(jsonText);
            toast.success("JSON copied to clipboard!");
        } catch (e:any) {
            toast.error("Failed to copy JSON",e.message);
        }
    };

    const handleReset = () => {
        setJsonText("");
        setError("");
        onReset?.();
        toast.success("Reset complete!");
    };

    return (
        <div className="flex flex-col h-full gap-4 p-6 bg-card rounded-lg shadow-subtle border border-border">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FileJson className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold text-foreground">JSON Input</h2>
                </div>
                <Button onClick={handleCopy} variant="outline" size="sm">
                    <Copy className="w-4 h-4" />
                </Button>
            </div>

            <Textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder="Paste your JSON here..."
                className="flex-1 font-mono text-sm resize-none"
            />

            {error && (
                <div className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md border border-destructive/20">
                    {error}
                </div>
            )}

            <div className="flex gap-2">
                <Button onClick={handleReset} variant="outline" className="flex-1" size="lg">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                </Button>
                <Button onClick={handleVisualize} className="flex-1" size="lg">
                    <Play className="w-4 h-4 mr-2" />
                    Visualize Tree
                </Button>
            </div>
        </div>
    );
};
