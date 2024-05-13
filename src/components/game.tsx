"use client";

import { GameVote, votesClient } from "@/db/votes";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { supabase } from "@/lib/supabase";
import { useCallback, useEffect, useState } from "react";
import { GameControls } from "./gameControls";
import { GameState } from "./gameState";

export const Game = ({ roomId }: { roomId: string }) => {
  const { currentUser } = useCurrentUser();
  const [state, setState] = useState<GameVote[]>([]);

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

  const sendVote = async (vote: string) => {
    if (!currentUser) return;

    votesClient.castVote({
      vote: vote.toString(),
      room: roomId,
      user: currentUser.id,
    });
  };

  const resetGame = async () => {
    if (!currentUser) return;

    votesClient.resetVotes(roomId);
  };

  return (
    <div className="flex flex-col gap-4">
      <GameControls
        onCastVote={sendVote}
        onReset={resetGame}
        disableButtons={!currentUser?.id}
      />
      <GameState votes={state} />
    </div>
  );
};
