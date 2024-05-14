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
      {gameState?.votes.map((vote) => (
        <VoteCard
          key={vote.id}
          vote={vote}
          showVotes={gameState.showVotes || false}
          isCurrent={currentUser?.id === vote.users?.id}
          onLeave={() => onLeave(vote.users!.id)}
        />
      ))}
    </div>
  );
};
