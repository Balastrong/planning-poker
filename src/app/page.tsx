import { roomsClient } from "@/db/rooms";
import { Room } from "@/types/room";
import Link from "next/link";

export default async function Home() {
  const { data } = await roomsClient.getAll();

  return (
    <main>
      {(data as Room[]).map((room) => (
        <div key={room.id}>
          <Link className="underline hover:no-underline" href={`/${room.id}`}>
            {room.name}
          </Link>
        </div>
      ))}
    </main>
  );
}
