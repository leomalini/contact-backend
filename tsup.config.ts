import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["cjs"],
  dts: true,
  clean: true,
  external: ["@prisma/client"],
  noExternal: ["@prisma/client/runtime"],
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      ".prisma": "text",
    };
  },
});
