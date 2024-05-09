import { supabase } from "@/lib/supabase";
import { User } from "@/types/user";

const upsert = ({ id, username }: { id?: string; username: string }) =>
  supabase.from("users").upsert({ username, id }).select();

export const usersClient = {
  upsert,
};
