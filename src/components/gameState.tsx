import { Tables } from "@/types/database.gen";
import { VoteCard } from "./voteCard";
import { GameVote } from "@/db/votes";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export const GameState = ({ votes }: { votes: GameVote[] }) => {
  const { currentUser } = useCurrentUser();

  return (
    <div className="flex gap-4">
      {votes.map((vote) => (
        <VoteCard
          key={vote.id}
          vote={vote}
          isCurrent={currentUser?.id === vote.users?.id}
        />
      ))}
    </div>
  );
};
