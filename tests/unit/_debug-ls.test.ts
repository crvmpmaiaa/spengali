import { test } from "vitest";
test("debug localStorage", () => {
  console.log("localStorage type:", typeof localStorage);
  console.log("localStorage:", localStorage);
  console.log("localStorage.clear:", typeof localStorage.clear);
  console.log("globalThis.localStorage:", typeof globalThis.localStorage);
});
