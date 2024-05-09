import { supabase } from "@/lib/supabase";

const castVote = async (payload: {
  vote: string;
  room: string;
  user: string;
}) => await supabase.from("votes").upsert(payload).eq("id", payload.room);

const getRoomVotes = async (room: string) =>
  supabase.from("votes").select().eq("room", room);

export const votesClient = {
  castVote,
  getRoomVotes,
};
