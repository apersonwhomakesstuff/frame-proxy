// fresh.gen.ts
import * as index from "./routes/index.tsx";
import * as proxy from "./routes/api/proxy.ts";

const manifest = {
  routes: {
    "./routes/index.tsx": index,
    "./routes/api/proxy.ts": proxy,
  },
  islands: {},
};

export default manifest;
