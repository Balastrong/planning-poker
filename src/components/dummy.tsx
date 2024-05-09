"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase";

export const Dummy = ({ count, id }: { count: number; id: string }) => {
  const [state, setState] = useState(count);

  useEffect(() => {
    const channel = supabase
      .channel("realtime game")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "games",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          setState(payload.new.count);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  return (
    <div className="flex gap-2 items-center">
      <Button onClick={() => setState((prev) => prev + 1)}>Increment</Button>
      <span>{state}</span>
    </div>
  );
};
