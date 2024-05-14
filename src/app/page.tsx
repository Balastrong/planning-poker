import { CreateRoom } from "@/components/createRoom";
import { RoomsList } from "@/components/roomsList";

export default async function Home() {
  return (
    <main className="flex flex-col gap-4">
      <CreateRoom />
      <RoomsList />
    </main>
  );
}
