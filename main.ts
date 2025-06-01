import { start } from "https://deno.land/x/fresh@1.6.1/server.ts";
import manifest from "./fresh.gen.ts";

await start(manifest);
