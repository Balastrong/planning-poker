import { GameState } from "@/components/gameState";
import { UserSelector } from "@/components/user";

export default async function Game({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <UserSelector />
      <GameState roomId={id} />
    </div>
  );
}
