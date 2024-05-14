"use client";

import { roomsClient } from "@/db/rooms";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export const CreateRoom = () => {
  const router = useRouter();

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const roomName = formData.get("roomName") as string;

    const { data } = await roomsClient.createRoom(roomName);
    if (data?.id) router.push("/" + data.id);
  };

  return (
    <div className="max-w-96">
      <div>Create Room</div>
      <form className="flex gap-4" onSubmit={handleCreateRoom}>
        <Input name="roomName" placeholder="Enter the room's name" />
        <Button>Create</Button>
      </form>
    </div>
  );
};
