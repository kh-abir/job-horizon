'use client';

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface JobFilterSidebarProps {
  filters: {
    location: string | undefined;
    jobType: Array<"FULL_TIME" | "PART_TIME" | "REMOTE">;
    experience: "ENTRY" | "INTERMEDIATE" | "EXPERT" | undefined;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      location: string | undefined;
      jobType: Array<"FULL_TIME" | "PART_TIME" | "REMOTE">;
      experience: "ENTRY" | "INTERMEDIATE" | "EXPERT" | undefined;
    }>
  >;
}

export default function JobFilterSidebar({ filters, setFilters }: JobFilterSidebarProps) {
  const toggleJobType = (type: "FULL_TIME" | "PART_TIME" | "REMOTE") => {
    setFilters((prev) => ({
      ...prev,
      jobType: prev.jobType.includes(type)
        ? prev.jobType.filter((t) => t !== type) 
        : [...prev.jobType, type],
    }));
  };

  return (
    <div className="h-full col-span-1 p-4 border rounded-lg bg-white shadow">
      <h2 className="text-xl font-semibold mb-4">Filter</h2>

      {/* Location */}
      <label className="block mb-2 font-medium">Location</label>
      <input
        type="text"
        placeholder="Enter location"
        className="w-full p-2 border rounded"
        value={filters.location || ""}
        onChange={(e) => setFilters({ ...filters, location: e.target.value || undefined })}
      />

      {/* Job Type */}
      <div className="mt-4">
        <h3 className="font-medium mb-2">Job Type</h3>
        {["FULL_TIME", "PART_TIME", "REMOTE"].map((type) => (
          <label key={type} className="flex items-center space-x-2">
            <Checkbox
              checked={filters.jobType.includes(type as any)}
              onCheckedChange={() => toggleJobType(type as any)}
            />
            <span>{type.replace("_", " ")}</span>
          </label>
        ))}
      </div>

      {/* Experience Levels */}
      <div className="mt-4">
        <h3 className="font-medium mb-2">Experience Levels</h3>
        {["ENTRY", "INTERMEDIATE", "EXPERT"].map((level) => (
          <label key={level} className="flex items-center space-x-2">
            <Checkbox
              checked={filters.experience === level}
              onCheckedChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  experience: prev.experience === level ? undefined : (level as any),
                }))
              }
            />
            <span>{level}</span>
          </label>
        ))}
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full mt-4"
        onClick={() =>
          setFilters({
            location: undefined,
            jobType: [],
            experience: undefined,
          })
        }
      >
        Clear Filters
      </Button>
    </div>
  );
}
