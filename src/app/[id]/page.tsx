import { Game } from "@/components/game";

export default async function GamePage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <main className="flex flex-col gap-4">
      <Game roomId={id} />
    </main>
  );
}
