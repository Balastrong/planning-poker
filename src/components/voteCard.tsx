import { GameVote } from "@/db/votes";
import { cn } from "@/lib/utils";

export const VoteCard = ({
  vote,
  isCurrent,
}: {
  vote: GameVote;
  isCurrent: boolean;
}) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex items-center justify-center w-10 h-16 border-2 border-primary rounded">
        {vote.vote ?? "?"}
      </div>
      <span className={cn(isCurrent && "font-bold")}>
        {vote.users?.username}
      </span>
    </div>
  );
};
