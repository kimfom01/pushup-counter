import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { logPushups } from "./lib/actions";

export default function Home() {
  return (
    <div className="grid grid-rows-1 justify-center items-center h-full w-full">
      <form action={logPushups}>
        <div className="flex flex-col w-full max-w-sm items-center gap-2">
          <input type="hidden" name="userId" value={1} />
          <Input
            name="pushupCount"
            type="number"
            placeholder="How many pushups"
            className="text-lg"
          />
          <Button className="w-full text-lg" type="submit">
            Log
          </Button>
        </div>
      </form>
    </div>
  );
}
