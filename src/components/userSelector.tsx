"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const UserSelector = () => {
  const { currentUser, saveUser } = useCurrentUser();

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;

    saveUser(username);
  };

  return (
    <div className="max-w-96">
      <div>User</div>
      <form className="flex gap-4" onSubmit={handleSaveUser}>
        <Input name="username" placeholder="Enter your name" />
        <Button>Save</Button>
      </form>
      <div className="text-sm text-gray-500 mt-2">
        {currentUser?.id
          ? `Logged in as ${currentUser?.username}`
          : "Please enter your name"}
      </div>
    </div>
  );
};
