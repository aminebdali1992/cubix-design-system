import pc from "picocolors";

let silent = false;

export function setSilent(value: boolean) {
  silent = value;
}

export function log(...args: unknown[]) {
  if (!silent) console.log(...args);
}

export function info(message: string) {
  log(pc.cyan("ℹ"), message);
}

export function success(message: string) {
  log(pc.green("✔"), message);
}

export function warn(message: string) {
  log(pc.yellow("⚠"), message);
}

export function error(message: string) {
  console.error(pc.red("✖"), message);
}

export function dim(message: string) {
  log(pc.dim(message));
}
