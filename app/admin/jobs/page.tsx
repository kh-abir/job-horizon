'use client';

import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import JobListing from '@/components/JobListing';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {Bell, Mail} from "lucide-react";

export default function AdminPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <SignedOut>
          <div className="flex items-center gap-6">
              <Mail className={"text-gray-400 hover:text-black cursor-pointer"}/>
              <Bell className={"text-gray-400 hover:text-black cursor-pointer"}/>
          </div>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold">Admin Dashboard</h1>
          <Link href="/admin/jobs/create">
            <Button>Create Job</Button>
          </Link>
        </div>
        <JobListing />
      </SignedIn>
    </div>
  );
}
