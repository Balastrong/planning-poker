import { supabase } from "@/lib/supabase";
import { User } from "@/types/user";

const me = async ({ id }: { id: string }) =>
  supabase.from("users").select().eq("id", id);

const guestSignIn = ({ id, username }: { id?: string; username: string }) =>
  supabase.from("users").upsert({ username, id }).select();

export const usersClient = {
  me,
  guestSignIn,
};