"use client";

export const GameState = ({ state }: { state: any }) => {
  return (
    <div>
      <pre className="mt-4">{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};
