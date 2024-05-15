import { supabase } from "@/lib/supabase";

const getUser = () => supabase.auth.getUser();

const getProfile = async () => {
  const user = await getUser();

  if (!user.data.user) {
    return null;
  }

  return await supabase
    .from("profiles")
    .select()
    .eq("id", user.data.user?.id)
    .single();
};

const upsertAnonymousUser = async (username: string) => {
  const { data } = await getUser();

  if (!data.user) {
    await supabase.auth.signInAnonymously({
      options: {
        data: { username },
      },
    });
    return;
  }

  await supabase.from("profiles").update({ username }).eq("id", data.user.id);
};

const logOut = async () => {
  await supabase.auth.signOut();
};

export const usersClient = {
  getUser,
  getProfile,
  upsertAnonymousUser,
  logOut,
};
