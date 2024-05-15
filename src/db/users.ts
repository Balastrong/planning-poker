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

  await supabase.auth.updateUser({
    data: { username },
  });
};

export const usersClient = {
  getUser,
  upsertAnonymousUser,
};
