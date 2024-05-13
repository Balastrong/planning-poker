import { Tables } from "@/types/database.gen";

export const GameState = ({ state }: { state: Tables<"votes">[] }) => {
  return (
    <div>
      <pre className="mt-4">{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};
