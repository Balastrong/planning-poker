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
    <div className="flex flex-col gap-2 items-center">
      <div className="flex items-center justify-center w-10 h-16 border-2 border-primary rounded">
        {showVotes ? vote?.vote ?? "-" : vote?.vote ? "👀" : "🤔"}
      </div>
      <span className={cn(isCurrent && "font-bold")}>
        {vote.users?.username}
      </span>
    </div>
  );
};
