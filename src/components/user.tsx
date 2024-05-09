"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { supabase } from "@/lib/supabase";

export const User = () => {
  const [user, setUser] = useState({ username: "", id: "" });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(user);
  }, []);

  const saveUser = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;

    supabase
      .from("users")
      .upsert({ username, id: user?.id })
      .select()
      .then(({ data }) => {
        const user = data?.[0];
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      });
  };

  return (
    <div className="max-w-96">
      <div>User</div>
      <form className="flex gap-4" onSubmit={saveUser}>
        <Input name="username" placeholder="Enter your name" />
        <Button>Submit</Button>
      </form>
      <div className="text-sm text-gray-500 mt-2">
        {user?.id ? `Logged in as ${user?.username}` : "Please enter your name"}
      </div>
    </div>
  );
};
