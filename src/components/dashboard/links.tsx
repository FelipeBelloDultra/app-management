"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { tv } from "tailwind-variants";

interface LinkProps {
  boards: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

const link = tv({
  base: "font-medium text-lg text-gray-950 py-2 mx-1 px-5 hover:underline transition-all hover:bg-gray-100 border-l-2",
  variants: {
    isActive: {
      true: "bg-gray-200 pointer-events-none",
    },
  },
});

export function Links({ boards }: LinkProps) {
  const pathname = usePathname();

  return (
    <div className="mt-4 flex flex-col gap-2">
      {boards.map((board) => (
        <NextLink
          href={`/dashboard/${board.id}`}
          prefetch={false}
          key={board.id}
          className={link({
            isActive: pathname === `/dashboard/${board.id}`,
          })}
          style={{ borderLeftColor: board.color }}
        >
          {board.name}
        </NextLink>
      ))}
    </div>
  );
}
