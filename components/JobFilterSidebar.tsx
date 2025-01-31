"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import CountrySelect from "./CountrySelect";
import { JobType } from '@/trpc/constants';

const jobTypes: JobType[] = Object.values(JobType);

/** ✅ Props Interface */
interface JobFilterSidebarProps {
    filters: {
        location: string | undefined;
        jobType: JobType[];
        salary: string | undefined;
        postedDate: string | undefined;
    };
    setFilters: React.Dispatch<
        React.SetStateAction<{
            location: string | undefined;
            jobType: JobType[];
            salary: string | undefined;
            postedDate: string | undefined;
        }>
    >;
}

export default function JobFilterSidebar({ filters, setFilters }: JobFilterSidebarProps) {
    /** ✅ Toggle Job Type */
    const toggleJobType = (type: JobType) => {
        setFilters((prev) => ({
            ...prev,
            jobType: prev.jobType.includes(type)
                ? prev.jobType.filter((t) => t !== type)
                : [...prev.jobType, type],
        }));
    };

    /** ✅ Handle Country Change */
    const handleCountryChange = (country: string) => {
        setFilters((prev) => ({
            ...prev,
            location: country,
        }));
    };

    /** ✅ Salary Range State */
    const [salaryRange, setSalaryRange] = useState([5000, 20000]);

    /** ✅ Handle Salary Range Change */
    const handleSalaryChange = (value: number[]) => {
        setSalaryRange(value);
        const salaryString = `$${value[0].toLocaleString()} - $${value[1].toLocaleString()}`;

        setFilters((prev) => ({
            ...prev,
            salary: salaryString,
        }));
    };

    return (
        <div className="col-span-1 xl:sticky top-5 p-6 shadow rounded-lg bg-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filter</h2>
                {/* Clear Filters */}
                <p
                    className="text-red-500 text-xs cursor-pointer font-bold"
                    onClick={() =>
                        setFilters({
                            location: undefined,
                            jobType: [],
                            salary: undefined,
                            postedDate: undefined,
                        })
                    }
                >
                    Clear Filters
                </p>
            </div>

            {/* ✅ Location Filter */}
            <label className="block mb-4 font-bold">Location</label>
            <CountrySelect
                placeholder={filters.location}
                className="w-full p-2 border rounded-md"
                onChange={handleCountryChange}
            />

            {/* ✅ Job Type Filter */}
            <div className="mt-4">
                <h3 className="mb-4 font-bold">Job Type</h3>
                {jobTypes.map((type) => (
                    <label key={type} className="flex items-center space-x-3 mb-2 text-muted-foreground text-sm">
                        <Checkbox checked={filters.jobType.includes(type)} onCheckedChange={() => toggleJobType(type)} />
                        <span>{type.toLowerCase()
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (char) => char.toUpperCase())}</span>
                    </label>
                ))}
            </div>

            {/* ✅ Salary Range Filter */}
            <div className="mt-4">
                <label className="block mb-4 font-bold">Expected Salary</label>
                <p className="text-gray-600 text-sm mb-4">
                    Salary Range: <strong>${salaryRange[0]}</strong> - <strong>${salaryRange[1]}</strong>/mo
                </p>
                <Slider
                    value={salaryRange}
                    min={1000}
                    max={50000}
                    step={1000}
                    onValueChange={(value) => handleSalaryChange(value as number[])}
                    className="w-full relative"
                />
            </div>
        </div>
    );
}
