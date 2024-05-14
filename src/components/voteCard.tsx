import { GameVote } from "@/db/votes";
import { cn } from "@/lib/utils";

export const VoteCard = ({
  vote,
  isCurrent,
  showVotes,
}: {
  vote: GameVote;
  isCurrent: boolean;
  showVotes: boolean;
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-16 w-10 items-center justify-center rounded border-2 border-primary">
        {showVotes ? vote?.vote ?? "-" : vote?.vote ? "👀" : "🤔"}
      </div>
      <span className={cn(isCurrent && "font-bold")}>
        {vote.users?.username}
      </span>
    </div>
  );
};
