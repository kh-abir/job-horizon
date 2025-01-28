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
    <div className="bg-gray-300 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
      
      <form onSubmit={handleSubmit} className="w-full flex bg-white rounded-lg overflow-hidden shadow-md">
        <Input
          type="text"
          placeholder="Search your dream job here"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-3 flex-1 border-none focus:ring-0 text-gray-900"
        />
        <Button type="submit" className="bg-gray-500 hover:bg-gray-700 text-white flex items-center px-4">
          <Search className="h-5 w-5 mr-2" />
          Search Job
        </Button>
      </form>
    </div>
  );
}
