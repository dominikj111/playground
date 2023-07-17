// console.log(process.stdout.columns)

const fs = require("fs");
console.log(Object.keys(fs).filter(x => x.startsWith("w")))
console.log("test")

import { watchFile } from 'node:fs';
// const fs = require("fs");

console.log(watchFile)
//cat ~/OneDrive\ -\ any-3/scripts/doWhenChanged.js

// import commandLineArgs from "command-line-args";
// import commandLineUsage from "command-line-usage";

// const sections = [
//   {
//     header: "A typical app",
//     content: "Generates something {italic very} important.",
//   },
//   {
//     header: "Options",
//     optionList: [
//       {
//         name: "input",
//         typeLabel: "{underline file}",
//         description: "The input to process.",
//       },
//       {
//         name: "help",
//         description: "Print this usage guide.",
//       },
//     ],
//   },
// ];
// const usage = commandLineUsage(sections);
// console.log(usage);
// const options = commandLineArgs({});

// console.log(process.argv);

// const fileToWatch = Deno.args[0];
// const cliCommand = Deno.args[1];
// const watcher = Deno.watchFs(fileToWatch);

// console.log(
//   `Watching '${fileToWatch}' for modifications. Command to run when modified: \`${cliCommand}\``
// );

// let events = {};
// let timer = 0;

// for await (const event of watcher) {
//   if (event.kind === "modify") {
//     if (events[event.path]) {
//       continue;
//     }
//     events[event.path] = true;
//     if (!timer) {
//       timer = setTimeout(() => {
//         Deno.run({ cmd: ["clear"] });
//         Deno.run({ cmd: cliCommand.split(" ") });
//         events = {};
//         timer = 0;
//       }, 500);
//     }
//   }
// }
