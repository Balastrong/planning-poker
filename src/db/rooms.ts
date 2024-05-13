import { supabase } from "@/lib/supabase";
import { Room } from "@/types/room";

const getAll = () => supabase.from("rooms").select();

export const roomsClient = {
  getAll,
};
