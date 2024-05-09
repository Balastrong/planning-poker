import { Dummy } from "@/components/dummy";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data } = await supabase.from("games").select();

  return <main>{JSON.stringify(data)}</main>;
}
