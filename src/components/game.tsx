"use client";

import { votesClient } from "@/db/votes";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { supabase } from "@/lib/supabase";
import { useCallback, useEffect, useState } from "react";
import { GameControls } from "./gameControls";
import { GameState } from "./gameState";

export const Game = ({ roomId }: { roomId: string }) => {
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

  const sendVote = async (vote: string) => {
    votesClient.castVote({
      vote: vote.toString(),
      room: roomId,
      user: currentUser.id,
    });
  };

  return (
    <div>
      <GameControls onCastVote={sendVote} disableButtons={!currentUser?.id} />
      <GameState state={state} />
    </div>
  );
};
