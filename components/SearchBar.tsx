'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="bg-primary text-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Find your dream job</h2>
      <p className="text-sm text-white/60 mb-4">
        Search from thousands of job listings to find the perfect job for you.
      </p>
      <form onSubmit={handleSubmit} className="w-full flex rounded-lg overflow-hidden gap-2 ">
        <Input
          type="text"
          placeholder="Search your dream job here"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-3 flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white bg-white/10 placeholder:text-white"
        />
        <Button type="submit" className="bg-white hover:bg-white text-primary flex items-center px-4 font-bold">
          <Search className="h-5 w-5" />
          Search Job
        </Button>
      </form>
    </div>
  );
}
