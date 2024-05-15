import { GameState } from "@/db/rooms";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { VoteCard } from "./voteCard";

export const GameStateDisplay = ({
  gameState,
  onLeave,
}: {
  gameState: GameState | undefined;
  onLeave: (userId: string) => void;
}) => {
  const { currentUser } = useCurrentUser();

  return (
    <div className="flex gap-4">
      {gameState?.votes
        .filter((vote) => !!vote.profiles)
        .map((vote) => (
          <VoteCard
            key={vote.id}
            vote={vote}
            showVotes={gameState.showVotes || false}
            isCurrent={currentUser?.id === vote.profiles!.id}
            onLeave={() => onLeave(vote.profiles!.id)}
          />
        ))}
    </div>
  );
};
