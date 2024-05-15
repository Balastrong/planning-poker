import { GameState } from "@/db/rooms";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export const VoteCard = ({
  vote,
  isCurrent,
  showVotes,
  onLeave,
}: {
  vote: GameState["votes"][number];
  isCurrent: boolean;
  showVotes: boolean;
  onLeave: () => void;
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-16 w-10 items-center justify-center rounded border-2 border-primary">
        {showVotes ? vote?.vote ?? "-" : vote?.vote ? "👀" : "🤔"}
      </div>
      <span className={cn(isCurrent && "font-bold")}>
        {vote.profiles?.username}
      </span>
      <X onClick={onLeave} className="cursor-pointer text-destructive" />
    </div>
  );
};
