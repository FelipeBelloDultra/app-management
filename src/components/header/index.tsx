import { LogOut } from "lucide-react";

import { Button } from "..";
import Link from "next/link";

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
