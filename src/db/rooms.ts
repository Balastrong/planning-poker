import { supabase } from "@/lib/supabase";
import { QueryData } from "@supabase/supabase-js";

const getJoinedRooms = async (userId: string) =>
  supabase
    .from("votes")
    .select("user, rooms(*)")
    .eq("user", userId)
    .select("rooms(*)");

const getState = async (room: string) =>
  supabase
    .from("rooms")
    .select(
      `
  name,
  showVotes,
  votes (id, vote, users (id, username))
`
    )
    .eq("id", room)
    .order("created_at", { referencedTable: "votes", ascending: true })
    .limit(1)
    .single();

export type GameState = QueryData<ReturnType<typeof getState>>;

const toggleVotesVisibility = async (room: string, showVotes: boolean) =>
  supabase.from("rooms").update({ showVotes }).eq("id", room);

export const roomsClient = {
  getJoinedRooms,
  getState,
  toggleVotesVisibility,
};
