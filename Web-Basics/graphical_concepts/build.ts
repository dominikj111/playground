import { copy } from "std/fs/copy.ts";
import { ensureDir } from "std/fs/ensure_dir.ts";
import { walk } from "std/fs/walk.ts";
import { dirname, join } from "std/path/mod.ts";

// Get the current working directory
const cwd = Deno.cwd();
const DIST_DIR = join(cwd, "dist");

// Install esbuild if not already installed
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
const runEsbuild = async (entryPoint: string, outfile: string) => {
  const process = new Deno.Command("esbuild", {
    args: [
      entryPoint,
      "--bundle",
      "--minify",
      "--sourcemap",
      "--format=esm",
      "--platform=browser",
      "--target=es2020,chrome80,firefox80,safari13",
      `--outfile=${outfile}`,
    ],
  });
  const { code, stdout, stderr } = await process.output();
  if (code !== 0) {
    const error = new TextDecoder().decode(stderr);
    throw new Error(`esbuild failed: ${error}`);
  }
  return new TextDecoder().decode(stdout);
};

// Process HTML file to update script references
const processHtmlFile = async (file: string, destPath: string) => {
  let content = await Deno.readTextFile(file);

  // Replace .ts script references with .js
  content = content.replace(
    /<script([^>]*) src="([^"]+)\.ts"([^>]*)>/g,
    '<script$1 src="$2.js"$3>',
  );

  await Deno.writeTextFile(destPath, content);
  console.log(`Processed HTML: ${file} -> ${destPath}`);
};

// List of client-side TypeScript files to build
const CLIENT_TS_FILES = [
  "pages/tarot/tarot.ts",
];

// Main build process
const main = async () => {
  try {
    // Clean dist directory
    try {
      await Deno.remove(DIST_DIR, { recursive: true });
    } catch {
      // Ignore if directory doesn't exist
    }
    await ensureDir(DIST_DIR);

    // Install esbuild if needed
    await installEsbuild();

    // Build client-side TypeScript files
    for (const file of CLIENT_TS_FILES) {
      const outfile = join(DIST_DIR, file.replace(/\.ts$/, ".js"));
      await ensureDir(dirname(outfile));
      await runEsbuild(file, outfile);
      console.log(`Built: ${file} -> ${outfile}`);
    }

    // Copy and process HTML files
    for await (const entry of walk(".", {
      includeDirs: false,
      match: [/\.html$/],
      skip: [/dist/, /node_modules/],
    })) {
      const destPath = join(DIST_DIR, entry.path);
      await ensureDir(dirname(destPath));
      await processHtmlFile(entry.path, destPath);
      console.log(`Processed HTML: ${entry.path} -> ${destPath}`);
    }

    // Copy static assets (if any)
    for await (const entry of walk(".", {
      includeDirs: false,
      match: [/\.(css|jpg|png|svg|gif)$/],
      skip: [/dist/, /node_modules/],
    })) {
      const destPath = join(DIST_DIR, entry.path);
      await ensureDir(dirname(destPath));
      await copy(entry.path, destPath, { overwrite: true });
      console.log(`Copied asset: ${entry.path} -> ${destPath}`);
    }

    console.log("Build completed successfully!");
  } catch (error) {
    console.error("Build failed:", error);
    Deno.exit(1);
  }
};

await main();
