

declare function consoleLog(s: string): void

@external("some", "myjsfunction")
declare function myjsfunction(): i32




export function add(a: i32, b: i32): i32 {
  consoleLog("I'm in assemblyscript");
  consoleLog(myjsfunction().toString());
  return a + b;
}
