import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchBarProps {
    onSearch: (path: string) => void;
    onClear: () => void;
    matchFound: boolean | null;
}

export const SearchBar = ({ onSearch, onClear, matchFound }: SearchBarProps) => {
    const [searchPath, setSearchPath] = useState("");

    const handleSearch = () => {
        if (searchPath.trim()) {
            onSearch(searchPath.trim());
        }
    };

    const handleClear = () => {
        setSearchPath("");
        onClear();
    };

    return (
        <div className="flex gap-2 items-center">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    value={searchPath}
                    onChange={(e) => setSearchPath(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Search by path (e.g., $.user.address.city or items[0].name)"
                    className="pl-10 font-mono text-sm"
                />
            </div>
            <Button onClick={handleSearch} size="default">
                Search
            </Button>
            {searchPath && (
                <Button onClick={handleClear} variant="outline" size="icon">
                    <X className="w-4 h-4" />
                </Button>
            )}
            {matchFound !== null && (
                <div className={`px-3 py-2 rounded-md text-sm font-medium ${matchFound
                        ? "bg-success/10 text-success border border-success/20"
                        : "bg-destructive/10 text-destructive border border-destructive/20"
                    }`}>
                    {matchFound ? "Match found" : "No match found"}
                </div>
            )}
        </div>
    );
};
