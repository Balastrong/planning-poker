import { supabase } from "@/lib/supabase";
import { QueryData } from "@supabase/supabase-js";

const getJoinedRooms = async (userId: string) =>
  supabase
    .from("votes")
    .select("rooms(*)")
    .eq("profile", userId)
    .select("rooms(*)");

const getState = async (room: string) =>
  supabase
    .from("rooms")
    .select(
      `
  name,
  showVotes,
  votes (id, vote, profiles (id, username))
`,
    )
    .eq("id", room)
    .order("created_at", { referencedTable: "votes", ascending: true })
    .limit(1)
    .single();

export type GameState = QueryData<ReturnType<typeof getState>>;

const toggleVotesVisibility = async (room: string, showVotes: boolean) =>
  supabase.from("rooms").update({ showVotes }).eq("id", room);

const createRoom = async (name: string) =>
  supabase.from("rooms").insert({ name }).select("id").single();

const joinRoom = async (roomId: string) =>
  supabase.from("votes").upsert({ room: roomId });

const leaveRoom = async (roomId: string) =>
  supabase.from("votes").delete().eq("room", roomId);

export const roomsClient = {
  getJoinedRooms,
  getState,
  toggleVotesVisibility,
  createRoom,
  joinRoom,
  leaveRoom,
};
