import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/nextjs";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  id: string;
  title: string;
  companyLogo?: string;
  location: string;
  salaryRange: string;
  applicants: number;
  description: string;
  skills: string[];
  postedDate: string;
  onDelete: (id: string) => void;
}

export default function JobCard({
  id,
  title,
  companyLogo,
  location,
  salaryRange,
  applicants,
  description,
  skills,
  postedDate,
  onDelete,
}: JobCardProps) {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <Card className="p-4 group rounded-lg shadow border bg-white">
      <CardHeader className="flex justify-between flex-row">
        <div className="flex items-center gap-3">
          <Image
            src={companyLogo || "https://picsum.photos/50"}
            alt={title}
            width={50}
            height={50}
            className="rounded-lg"
          />
          <div>
            <Link href={`/jobs/${id}`} className="text-lg font-semibold group-hover:underline underline-offset-2">{title}</Link>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
              <span className="whitespace-nowrap">{location}</span>
              <span className="whitespace-nowrap">{salaryRange}</span>
              <span className="whitespace-nowrap">{applicants} Applicant{applicants !== 1 ? "s" : ""}</span>
            </div>
          </div>
        </div>

        {isAdmin && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/admin/edit-job/${id}`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(id)} className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>

      <CardContent className="mt-2">
        <p className="text-sm text-gray-500">{description.substring(0, 120)}...</p>
      </CardContent>

      <CardFooter className="mt-4 flex justify-between items-center">
        <div className="flex gap-2">
          {skills?.map((skill, index) => (
            <Badge key={index} variant="outline" className={`text-sm px-3 py-1 font-medium rounded-md text-black bg-muted`}>
              {skill}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-gray-500">{formatDistanceToNow(new Date(postedDate), { addSuffix: true })}</p>
      </CardFooter>
    </Card>
  );
}
