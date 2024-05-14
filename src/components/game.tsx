"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useGameState } from "@/hooks/useGameState";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { GameControls } from "./gameControls";
import { GameStateDisplay } from "./gameState";

export const Game = ({ roomId }: { roomId: string }) => {
  const { currentUser } = useCurrentUser();
  const { gameState, refetchGameState, sendVote, resetGame, showVotes } =
    useGameState(roomId, currentUser?.id);

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
        () => refetchGameState(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetchGameState, roomId]);

  return (
    <div className="flex flex-col gap-4">
      <GameControls
        onCastVote={sendVote}
        onReset={resetGame}
        onShowVotes={showVotes}
        disableButtons={!currentUser?.id || gameState?.showVotes || false}
      />
      <GameStateDisplay gameState={gameState} />
    </div>
  );
};
