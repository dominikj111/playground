const fileToWatch = Deno.args[0];
const cliCommand = Deno.args[1];
const watcher = Deno.watchFs(fileToWatch);

console.log(
  `Watching '${fileToWatch}' for modifications. Command to run when modified: \`${cliCommand}\``
);

let events = {};
let timer = 0;

for await (const event of watcher) {
  if (event.kind === "modify") {
    if (events[event.path]) {
      continue;
    }
    events[event.path] = true;
    if (!timer) {
      timer = setTimeout(() => {
        Deno.run({ cmd: ["clear"] });
        Deno.run({ cmd: cliCommand.split(" ") });
        events = {};
        timer = 0;
      }, 500);
    }
  }
}
