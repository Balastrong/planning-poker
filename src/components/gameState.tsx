"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase";
import { votesClient } from "@/db/votes";

export const GameState = ({ roomId }: { roomId: string }) => {
  const [state, setState] = useState<any[]>([]);

  useEffect(() => {
    const channel = supabase
      .channel("realtime room")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "votes",
          filter: `room=eq.${roomId}`,
        },
        () => {
          votesClient.getRoomVotes(roomId).then(({ data }) => {
            if (!data) return;

            setState(data);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  const sendVote = async (vote: number) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")?.id;
    votesClient.castVote({ vote: vote.toString(), room: roomId, user });
  };

  return (
    <div>
      <div className="flex gap-2 items-center">
        {[0, 1, 2, 3, 5, 8, 13].map((vote) => (
          <Button key={vote} onClick={() => sendVote(vote)}>
            {vote}
          </Button>
        ))}
      </div>
      <pre className="mt-4">{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};
