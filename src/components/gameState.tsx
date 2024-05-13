import { useCurrentUser } from "@/hooks/useCurrentUser";
import { VoteCard } from "./voteCard";
import { GameState } from "@/db/rooms";

export const GameStateDisplay = ({
  gameState,
}: {
  gameState: GameState | undefined;
}) => {
  const { currentUser } = useCurrentUser();

  return (
    <div className="flex gap-4">
      {gameState?.votes.map((vote) => (
        <VoteCard
          key={vote.id}
          vote={vote}
          showVotes={gameState.showVotes || false}
          isCurrent={currentUser?.id === vote.users?.id}
        />
      ))}
    </div>
  );
};
