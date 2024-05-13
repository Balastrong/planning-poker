import { usersClient } from "@/db/users";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// Throw away when proper auth is implemented
const getUserId = () => {
  console.log("getUserId");
  return localStorage.getItem("userId") || undefined;
};
const persistUserId = (userId: string) =>
  localStorage.setItem("userId", userId);

export const useCurrentUser = () => {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | undefined>();

  useEffect(() => {
    const persistedId = getUserId();
    if (persistedId) {
      setUserId(persistedId);
    }
  }, []);

  const saveUser = (username: string) => {
    usersClient.guestSignIn({ username, id: userId }).then(({ data }) => {
      const user = data?.[0];

      if (!user) {
        return;
      }

      setUserId(user.id);
      persistUserId(user.id);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    });
  };

  const { data: currentUser } = useQuery({
    queryFn: () => usersClient.me({ id: userId! }),
    queryKey: ["currentUser"],
    enabled: !!userId,
    select: ({ data }) => data?.[0],
  });

  return {
    currentUser,
    saveUser,
  };
};
