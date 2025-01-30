"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const DEBOUNCE_DELAY = 500;

interface SearchBarProps {
    search: string;
    setSearch: (query: string) => void;
}

export default function SearchBar({ search, setSearch }: SearchBarProps) {
    const [query, setQuery] = useState(search);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (query !== search) {
                setSearch(query);
            }
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(handler);
    }, [query]); 

    return (
        <div className="bg-primary text-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Find your dream job</h2>
            <p className="text-sm text-white/60 mb-4">
                Search from thousands of job listings to find the perfect job for you.
            </p>
            <div className="w-full flex rounded-lg overflow-hidden gap-2">
                <Input
                    type="text"
                    placeholder="Search your dream job here"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-3 flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white bg-white/10 placeholder:text-white"
                />
                <Button className="bg-white hover:bg-white text-primary flex items-center px-4 font-bold">
                    <Search className="h-5 w-5" />
                    Search Job
                </Button>
            </div>
        </div>
    );
}
