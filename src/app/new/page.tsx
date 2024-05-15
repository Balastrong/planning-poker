"use client";

import { CreateRoom } from "@/components/createRoom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function NewRoom() {
  const { isAuthenticated, saveUser } = useCurrentUser();

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;

    saveUser(username);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <main className="flex justify-center">
      <div className="mx-8 mt-12 flex w-[600px] flex-col gap-4">
        {!isAuthenticated && (
          <div>
            <h1 className="text-2xl font-bold">Sign up</h1>
            <form className="flex flex-col gap-2" onSubmit={handleSaveUser}>
              <Label htmlFor="username">Username</Label>
              <Input name="username" placeholder="Enter your name" />
              <Button>{isAuthenticated ? "Rename" : "Sign up"}</Button>
            </form>
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold">Create a new room</h1>
          <CreateRoom />
        </div>
      </div>
    </main>
  );
}
