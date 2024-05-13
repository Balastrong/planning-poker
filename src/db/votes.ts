import { supabase } from "@/lib/supabase";

const castVote = async (payload: {
  vote: string;
  room: string;
  user: string;
}) => await supabase.from("votes").upsert(payload).eq("id", payload.room);

const getRoomVotes = async (room: string) =>
  supabase
    .from("votes")
    .select("id, vote, users (id, username)")
    .eq("room", room);

export type GameVote = NonNullable<
  Awaited<ReturnType<typeof getRoomVotes>>["data"]
>[number];

const resetVotes = async (room: string) =>
  supabase.from("votes").update({ vote: null }).eq("room", room);

export const votesClient = {
  castVote,
  getRoomVotes,
  resetVotes,
};
