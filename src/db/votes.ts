import { supabase } from "@/lib/supabase";

const castVote = async (payload: { vote: string; room: string }) =>
  await supabase.from("votes").upsert(payload).eq("id", payload.room);

const resetVotes = async (room: string) =>
  supabase.from("votes").update({ vote: null }).eq("room", room);

export const votesClient = {
  castVote,
  resetVotes,
};
