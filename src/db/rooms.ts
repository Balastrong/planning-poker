import { supabase } from "@/lib/supabase";

const getAll = () => supabase.from("rooms").select();

export const roomsClient = {
  getAll,
};
