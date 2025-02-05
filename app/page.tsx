"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { logPushups } from "./lib/actions";
import { useActionState } from "react";

const initialState = {
  message: "",
};

export default function Home() {
  const [state, formAction, pending] = useActionState(logPushups, initialState);

  return (
    <div className="grid grid-rows-1 justify-center items-center h-full w-full">
      <form action={formAction}>
        <div className="flex flex-col w-full max-w-sm items-center gap-2">
          <Input
            name="pushupCount"
            type="number"
            placeholder="How many pushups"
            className="text-lg"
          />
          {state.message && <p aria-live="polite">{state.message}</p>}
          <Button disabled={pending} className="w-full text-lg" type="submit">
            {pending ? "Logging entry" : "Log"}
          </Button>
        </div>
      </form>
    </div>
  );
}
