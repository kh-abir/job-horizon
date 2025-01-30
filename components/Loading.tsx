import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-40">
      <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
    </div>
  );
}
