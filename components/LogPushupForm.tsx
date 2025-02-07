"use client";

import { logPushups } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";

const initialState = {
  message: "",
};

const LogPushupForm = () => {
  const [state, formAction, pending] = useActionState(logPushups, initialState);
  return (
    <form action={formAction}>
      <div className="flex flex-col w-full max-w-sm items-center gap-2">
        <Input
          name="pushupCount"
          type="number"
          placeholder="How many pushups"
          className="text-lg"
          required
          min={0}
        />
        {state.message && <p aria-live="polite">{state.message}</p>}
        <Button disabled={pending} className="w-full text-lg" type="submit">
          {pending ? "Logging entry" : "Log"}
        </Button>
      </div>
    </form>
  );
};

export default LogPushupForm;
