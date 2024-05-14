"use client";

import { roomsClient } from "@/db/rooms";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export const RoomsList = () => {
  const { currentUser } = useCurrentUser();
  const { data } = useQuery({
    queryFn: () => roomsClient.getJoinedRooms(currentUser!.id),
    queryKey: ["rooms"],
    enabled: !!currentUser,
    select: ({ data }) =>
      data?.map(({ rooms }) => rooms).filter((r) => !!r) || [],
  });

  return (
    <div>
      <h2 className="text-2xl">Rooms</h2>
      <div>
        {data?.map((room) => (
          <div key={room!.id}>
            <Link
              className="underline hover:no-underline"
              href={`/${room!.id}`}
            >
              {room!.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
