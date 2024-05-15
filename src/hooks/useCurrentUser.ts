import { usersClient } from "@/db/users";
import { Tables } from "@/types/database.gen";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type UseCurrentUser = {
  saveUser: (username: string) => Promise<void>;
  logOut: () => Promise<void>;
} & (
  | {
      isAuthenticated: true;
      currentUser: Tables<"profiles">;
    }
  | {
      isAuthenticated: false;
      currentUser?: never;
    }
);

export const useCurrentUser = (): UseCurrentUser => {
  const queryClient = useQueryClient();
  const { data: currentUser } = useQuery({
    queryFn: () => usersClient.getProfile(),
    queryKey: ["currentUser"],
    select: (res) => res?.data || undefined,
  });

  const saveUser = async (username: string) => {
    await usersClient.upsertAnonymousUser(username);
    queryClient.invalidateQueries({ queryKey: ["currentUser"] });
  };

  const logOut = async () => {
    await usersClient.logOut();
    queryClient.invalidateQueries({ queryKey: ["currentUser"] });
  };

  if (!!currentUser) {
    return {
      isAuthenticated: true,
      currentUser,
      saveUser,
      logOut,
    };
  }

  return {
    isAuthenticated: false,
    saveUser,
    logOut,
  };
};
