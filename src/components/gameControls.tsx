"use client";

import { Button } from "./ui/button";

export const GameControls = ({
  disableButtons,
  onCastVote,
}: {
  disableButtons: boolean;
  onCastVote: (vote: string) => any;
}) => {
  return (
    <div className="flex gap-2 items-center">
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
  );
};
