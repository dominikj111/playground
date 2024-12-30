import { assertEquals } from "std/assert/mod.ts";
import { injectLiveReload } from "./live_reload.ts";

Deno.test("injectLiveReload adds script to document head", () => {
  // Create a mock document environment
  const originalDocument = globalThis.document;
  const mockDocument = {
    head: {
      appendChild: (node: HTMLScriptElement) => {
        assertEquals(typeof node.textContent, "string");
        assertEquals(node.textContent?.includes("new WebSocket"), true);
      }
    },
    createElement: (tag: string): HTMLScriptElement => {
      assertEquals(tag, "script");
      return { textContent: "" } as HTMLScriptElement;
    }
  } as Document;
  
  globalThis.document = mockDocument;
  
  try {
    injectLiveReload();
  } finally {
    // Restore original document
    globalThis.document = originalDocument;
  }
});
