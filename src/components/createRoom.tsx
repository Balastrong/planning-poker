"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { roomsClient } from "@/db/rooms";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

export const CreateRoom = () => {
  const router = useRouter();
  const { isAuthenticated } = useCurrentUser();

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const roomName = formData.get("roomName") as string;

    const { data } = await roomsClient.createRoom(roomName);
    if (data?.id) router.push("/" + data.id);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleCreateRoom}>
      <Label htmlFor="roomName">Room name</Label>
      <Input id="roomName" name="roomName" />
      <Button type="submit" variant={"default"} disabled={!isAuthenticated}>
        Create room
      </Button>
    </form>
  );
};
