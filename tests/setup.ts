// spencer-lynch/tests/setup.ts
import "@testing-library/jest-dom/vitest";

// Node 25 exposes a built-in `localStorage` stub that lacks Storage methods.
// Override it with jsdom's real Storage object so tests can call .clear(), etc.
if (typeof globalThis.jsdom !== "undefined") {
  const jsdomLocalStorage = (globalThis.jsdom as { window: Window }).window.localStorage;
  Object.defineProperty(globalThis, "localStorage", {
    value: jsdomLocalStorage,
    writable: true,
    configurable: true,
  });
}
