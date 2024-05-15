"use client";

import { usersClient } from "@/db/users";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export const UserSelector = () => {
  const [currentUser, setCurrentUser] = useState<User | null>();

  useEffect(() => {
    usersClient.getUser().then(({ data }) => setCurrentUser(data.user));
  }, []);

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;

    await usersClient.upsertAnonymousUser(username);
    setCurrentUser((await usersClient.getUser()).data.user);
  };

  return (
    <div className="max-w-96">
      <div>User</div>
      <form className="flex gap-4" onSubmit={handleSaveUser}>
        <Input name="username" placeholder="Enter your name" />
        <Button>Save</Button>
      </form>
      <div className="mt-2 text-sm text-gray-500">
        {currentUser?.id
          ? `Logged in as ${currentUser.user_metadata.username}`
          : "Please enter your name"}
      </div>
    </div>
  );
};
