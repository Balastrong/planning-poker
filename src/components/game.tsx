"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useGameState } from "@/hooks/useGameState";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { GameControls } from "./gameControls";
import { GameStateDisplay } from "./gameState";

export const Game = ({ roomId }: { roomId: string }) => {
  const { currentUser } = useCurrentUser();
  const {
    gameState,
    refetchGameState,
    sendVote,
    resetGame,
    showVotes,
    leaveRoom,
  } = useGameState(roomId, currentUser?.id);

  useEffect(() => {
    const channel = supabase
      .channel("realtime room")
      .on(
        "postgres_changes",
        {
          event: "*",
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
      <h1 className="text-2xl font-bold">Room: {gameState?.name}</h1>
      <GameControls
        onCastVote={sendVote}
        onReset={resetGame}
        onShowVotes={showVotes}
        disableVotes={!currentUser?.id || gameState?.showVotes || false}
      />
      <GameStateDisplay gameState={gameState} onLeave={leaveRoom} />
    </div>
  );
};
