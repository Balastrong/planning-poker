import { usersClient } from "@/db/users";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  supabase.auth.getSession();
  const { data: currentUser } = useQuery({
    queryFn: () => usersClient.getUser(),
    queryKey: ["currentUser"],
    select: ({ data }) => data.user,
  });

  return {
    currentUser,
  };
};
