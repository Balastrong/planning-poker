"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const UserSelector = () => {
  const { isAuthenticated, saveUser } = useCurrentUser();

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;

    saveUser(username);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="p-2">
      <form className="flex items-center gap-2" onSubmit={handleSaveUser}>
        <Input name="username" placeholder="Enter your name" />
        <Button size={"sm"}>{isAuthenticated ? "Rename" : "Sign up"}</Button>
      </form>
    </div>
  );
};
