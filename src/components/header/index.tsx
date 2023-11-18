import { LogOut } from "lucide-react";

import { Button } from "..";

export function Header() {
  return (
    <div className="flex items-center justify-between h-16 px-8 shadow-sm bg-white">
      <h1 className="font-bold text-2xl">App Management</h1>

      <Button color="secondary" size="sm">
        <LogOut className="mr-1 text-gray-800" size={18} />
        Logout
      </Button>
    </div>
  );
}
