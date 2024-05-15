import { supabase } from "@/lib/supabase";

const getUser = () => supabase.auth.getUser();

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

export const usersClient = {
  getUser,
  upsertAnonymousUser,
};
