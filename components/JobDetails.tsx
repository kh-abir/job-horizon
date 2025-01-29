"use client";

import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Define the Job Type
interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    salary: string;
    applicationUrl: string;
}

// Pass a single `job` object instead of multiple props
interface JobDetailsProps {
    job: Job;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            {/* Header Section */}
            <Card className={"bg-transparent shadow-none border-none"}>
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">{job.title}</CardTitle>
                    <div className="flex items-center justify-center gap-4 mt-2">
                        <h2 className="text-2xl font-bold">{job.company}</h2>
                    </div>
                </CardHeader>
            </Card>

            {/* Job Details Section */}
            <div className="grid gap-8 lg:grid-cols-4">
                {/* Job Info */}
                <div className="lg:col-span-3 space-y-6 bg-white border rounded-lg">
                    <Card className={"bg-transparent shadow-none border-none"}>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold">{job.title}</h2>
                            <p className="text-gray-500">{job.type.toLowerCase()
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, (char) => char.toUpperCase())}</p>
                        </CardContent>
                    </Card>

                    <Card className={"bg-transparent shadow-none border-none"}>
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2">Description</h3>
                            <p>{job.description}</p>
                        </CardContent>
                    </Card>

                    <Card className={"bg-transparent shadow-none border-none"}>
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2">Requirements</h3>
                            <ul className="list-disc list-inside space-y-1">
                                {job.requirements.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Section */}
                <div className="space-y-6 bg-white border rounded-lg">
                    <Card className={"bg-transparent shadow-none border-none"}>
                        <CardContent className="p-4">
                            <h3 className="text-lg font-semibold">Location</h3>
                            <p className="text-gray-500">{job.location}</p>
                        </CardContent>
                    </Card>
                    <Card className={"bg-transparent shadow-none border-none"}>
                        <CardContent className="p-4">
                            <h3 className="text-lg font-semibold">Salary Range</h3>
                            <p className="text-gray-500">{job.salary}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Apply Button */}
            <div className="flex justify-center">
                <Button className="px-6 py-2 text-lg">
                    <Link href={job.applicationUrl}>Apply for this Job</Link>
                </Button>
            </div>

            {/* Company Info Section */}
            <Card>
                <CardContent className="p-6 flex flex-col items-center space-y-4">
                    <h2 className="text-2xl font-bold">{job.company}</h2>
                    <div className="flex items-center gap-4">
                        <Link href={job.applicationUrl} className="text-gray-500 underline">
                            Visit Website
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default JobDetails;
