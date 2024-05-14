"use client";

import { Button } from "./ui/button";

type Props = {
  disableButtons: boolean;
  onCastVote: (vote: string) => void;
  onReset: () => void;
  onShowVotes: () => void;
};

export const GameControls = ({
  disableButtons,
  onCastVote,
  onReset,
  onShowVotes,
}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {["0", "1", "2", "3", "5", "8", "13"].map((vote) => (
          <Button
            key={vote}
            onClick={() => onCastVote(vote)}
            disabled={disableButtons}
          >
            {vote}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        <Button onClick={onReset}>Reset</Button>
        <Button onClick={onShowVotes}>Show Votes</Button>
      </div>
    </div>
  );
};
