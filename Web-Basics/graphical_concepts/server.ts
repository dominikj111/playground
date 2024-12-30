import { serveDir } from "std/http/file_server.ts";

// WebSocket clients for live reload
const clients = new Set<WebSocket>();

// Start WebSocket server for live reload
Deno.serve({ port: 8001 }, (req) => {
  if (req.headers.get("upgrade") !== "websocket") {
    return new Response(null, { status: 501 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);
  clients.add(socket);

  socket.onclose = () => {
    clients.delete(socket);
  };

  return response;
});

// Ensure esbuild is installed
const installEsbuild = async () => {
  try {
    const process = new Deno.Command("esbuild", {
      args: ["--version"],
    });
    await process.output();
  } catch {
    console.log("Installing esbuild...");
    const process = new Deno.Command("npm", {
      args: ["install", "-g", "esbuild"],
    });
    const { code } = await process.output();
    if (code !== 0) {
      throw new Error("Failed to install esbuild");
    }
  }
};

// Run esbuild
const runEsbuild = async (entryPoint: string) => {
  const process = new Deno.Command("esbuild", {
    args: [
      entryPoint,
      "--bundle",
      "--sourcemap=inline",
      "--format=esm",
      "--platform=browser",
      "--target=es2020",
    ],
    stdout: "piped",
    stderr: "piped",
  });

  const { code, stdout, stderr } = await process.output();
  if (code !== 0) {
    const error = new TextDecoder().decode(stderr);
    throw new Error(`esbuild failed: ${error}`);
  }
  return new TextDecoder().decode(stdout);
};

// Ensure esbuild is installed before starting the server
await installEsbuild();

// File watcher for live reload
const watcher = Deno.watchFs(".");
(async () => {
  for await (const event of watcher) {
    if (
      event.kind === "modify" &&
      event.paths[0].match(/\.(ts|js|html|css)$/)
    ) {
      console.log(`File changed: ${event.paths[0]}`);
      // Notify all clients to reload
      for (const client of clients) {
        try {
          client.send("reload");
        } catch (err) {
          console.error("Failed to send reload signal:", err);
        }
      }
    }
  }
})();

// Main server
Deno.serve({ port: 8000 }, async (req) => {
  const url = new URL(req.url);

  // Handle .ts files
  if (url.pathname.endsWith(".ts")) {
    const filePath = "." + url.pathname;
    try {
      const code = await runEsbuild(filePath);

      // Inject live reload script
      const liveReloadScript = `
        // Live reload connection
        let socket = new WebSocket('ws://localhost:8001');
        socket.onmessage = (event) => {
          if (event.data === 'reload') window.location.reload();
        };
        socket.onclose = () => setTimeout(() => {
          socket = new WebSocket('ws://localhost:8001');
        }, 1000);
        
        ${code}
      `;

      return new Response(liveReloadScript, {
        headers: {
          "content-type": "application/javascript; charset=utf-8",
          "cache-control": "no-cache",
        },
      });
    } catch (e) {
      console.error(e);
      return new Response(
        "Build error: " + (e instanceof Error ? e.message : String(e)),
        { status: 500 },
      );
    }
  }

  // For all other files, use serveDir
  return serveDir(req, {
    fsRoot: ".",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
