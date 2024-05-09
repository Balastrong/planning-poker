import { Dummy } from "@/components/dummy";
import { User } from "@/components/user";
import { gamesClient } from "@/db/games";

export default async function Game({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data: game } = await gamesClient.get(id);

  return (
    <div className="flex flex-col gap-4 p-4">
      <User />
      <Dummy count={game.count} roomId={id} />
    </div>
  );
}
