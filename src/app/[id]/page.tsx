"use client";

import { Game } from "@/components/game";
import { roomsClient } from "@/db/rooms";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useEffect } from "react";

export default function GamePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    if (!currentUser) return;

    roomsClient.joinRoom(id);
  }, [currentUser, id]);

  return (
    <main className="flex flex-col gap-4">
      <Game roomId={id} />
    </main>
  );
}
