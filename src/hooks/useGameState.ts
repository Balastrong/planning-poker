import { roomsClient } from "@/db/rooms";
import { votesClient } from "@/db/votes";
import { useQuery } from "@tanstack/react-query";

export const useGameState = (roomId: string, userId: string | undefined) => {
  const { data: gameState, refetch: refetchGameState } = useQuery({
    queryFn: () => roomsClient.getState(roomId),
    queryKey: ["roomState", roomId],
    enabled: !!roomId,
    select: ({ data }) => data || undefined,
  });

  const sendVote = async (vote: string) => {
    if (!userId) return;

    votesClient.castVote({
      vote: vote.toString(),
      room: roomId,
    });
  };

  const resetGame = async () => {
    await Promise.all([
      roomsClient.toggleVotesVisibility(roomId, false),
      votesClient.resetVotes(roomId),
    ]);
    refetchGameState();
  };

  const showVotes = async () => {
    await roomsClient.toggleVotesVisibility(roomId, true);
    refetchGameState();
  };

  const hideVotes = async () =>
    roomsClient.toggleVotesVisibility(roomId, false);

  const leaveRoom = async () => {
    await roomsClient.leaveRoom(roomId);
  };

  return {
    gameState,
    refetchGameState,
    sendVote,
    resetGame,
    showVotes,
    hideVotes,
    leaveRoom,
  };
};
