"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase";
import { votesClient } from "@/db/votes";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export const GameState = ({ roomId }: { roomId: string }) => {
  const { currentUser } = useCurrentUser();
  const [state, setState] = useState<any[]>([]);

  const getVotes = useCallback(() => {
    votesClient.getRoomVotes(roomId).then(({ data }) => {
      if (!data) return;

      setState(data);
    });
  }, [roomId]);

  useEffect(() => {
    getVotes();
  }, [getVotes]);

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
        getVotes
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [getVotes, roomId]);

  const sendVote = async (vote: number) => {
    votesClient.castVote({
      vote: vote.toString(),
      room: roomId,
      user: currentUser.id,
    });
  };

  return (
    <div>
      <div className="flex gap-2 items-center">
        {[0, 1, 2, 3, 5, 8, 13].map((vote) => (
          <Button
            key={vote}
            onClick={() => sendVote(vote)}
            disabled={!currentUser?.id}
          >
            {vote}
          </Button>
        ))}
      </div>
      <pre className="mt-4">{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};
