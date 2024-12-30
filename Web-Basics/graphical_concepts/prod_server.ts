import { serveDir } from "std/http/file_server.ts";
import { join } from "std/path/mod.ts";

const port = parseInt(Deno.env.get("PORT") || "8000");
const cwd = Deno.cwd();
const distDir = join(cwd, "dist");

console.log(`Starting production server on port ${port}...`);
console.log(`Serving files from: ${distDir}`);

Deno.serve({ port }, (req) => {
  return serveDir(req, {
    fsRoot: distDir,
    urlRoot: "",
    showDirListing: false,
    enableCors: true,
  });
});
