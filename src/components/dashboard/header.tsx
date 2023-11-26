import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/common";

export function Header() {
  return (
    <div className="flex items-center justify-between h-16 px-8 shadow-sm bg-white">
      <Link href="/dashboard" className="font-bold text-2xl">
        App Management
      </Link>

      <Button color="secondary" size="sm">
        <LogOut className="mr-1 text-gray-800" size={18} />
        Logout
      </Button>
    </div>
  );
}
