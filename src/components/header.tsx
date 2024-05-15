"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { UserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { UserSelector } from "./userSelector";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { isAuthenticated, currentUser, logOut } = useCurrentUser();
  const router = useRouter();

  return (
    <header className="flex items-center justify-between">
      <Link href="/">
        <h1 className="text-3xl font-semibold">Planning Poker 🃏</h1>
      </Link>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2 px-2">
              <UserRound className="overflow-hidden rounded-full border" />
              {isAuthenticated && currentUser.username}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-2">
              <UserSelector />
            </div>
            {isAuthenticated && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logOut}>Logout</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={() => router.push("/new")}>Create room</Button>
      </div>
    </header>
  );
};
