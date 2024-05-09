import { Dummy } from "@/components/dummy";
import { User } from "@/components/user";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

export default async function Game({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data: game } = await supabase
    .from("games")
    .select()
    .eq("id", id)
    .single();

  return (
    <div className="flex flex-col gap-4 p-4">
      <User />
      <Dummy count={game.count} id={id} />
    </div>
  );
}
