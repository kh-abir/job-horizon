'use client';

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import CountrySelect from "./CountrySelect";

interface JobFilterSidebarProps {
  filters: {
    location: string | undefined;
    jobType: Array<"FULL_TIME" | "PART_TIME" | "REMOTE">;
    experience: "ENTRY" | "INTERMEDIATE" | "EXPERT" | undefined;
    salary: number | undefined;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      location: string | undefined;
      jobType: Array<"FULL_TIME" | "PART_TIME" | "REMOTE">;
      experience: "ENTRY" | "INTERMEDIATE" | "EXPERT" | undefined;
      salary: number | undefined;
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

  const handleCountryChange = (country: string) => {
    setFilters((prev) => ({
      ...prev,
      location: country,
    }));
  };
  
  const [salaryRange, setSalaryRange] = useState([5000, 20000]); // Initial range

  const handleChange = (value:  number[]) => {
    setSalaryRange(value);
    setFilters((prev) => ({
      ...prev,
      salary: value[0],
    }));
  };

  return (
    <div className="col-span-1 p-4 shadow rounded-lg bg-white">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Filter</h2>
      {/* Clear Filters */}
      <p
        className="text-red-500 text-xs cursor-pointer font-bold"
        onClick={() =>
          setFilters({
            location: undefined,
            jobType: [],
            experience: undefined,
            salary: undefined,
          })
        }
      >
        Clear Filters
      </p>
      </div>
      
      {/* Location */}
      <label className="block mb-2 font-bold">Location</label>
      <CountrySelect 
        placeholder={filters.location}
        className="w-full p-2 border rounded-md"
        onChange={handleCountryChange}
      />

      {/* Job Type */}
      <div className="mt-4">
        <h3 className="mb-2 font-bold">Job Type</h3>
        {["FULL_TIME", "PART_TIME", "REMOTE"].map((type) => (
          <label key={type} className="flex items-center space-x-2 text-gray-400">
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
        <h3 className="font-bold mb-2">Experience Levels</h3>
        {["ENTRY", "INTERMEDIATE", "EXPERT"].map((level) => (
          <label key={level} className="flex items-center space-x-2 text-gray-400">
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

      {/* Salary Range */}
      <div className="mt-4">
        <label className="block mb-2 font-bold">Expected Salary</label>
        <p className="text-gray-600 text-sm mb-2">
          Salary Range: <strong>${salaryRange[0]}</strong> - <strong>${salaryRange[1]}</strong>/mo
        </p>
        <Slider
          value={salaryRange}
          min={1000}
          max={50000}
          step={1000}
          onValueChange={(value) => handleChange(value as number[])}
          className="w-full relative"
        />
      
      </div>
      
    </div>
  );
}
