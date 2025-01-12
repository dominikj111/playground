import './style.css'
import typescriptLogo from './typescript.svg'
import { setupCounter } from './counter'
import init, { greet } from '@hello-wasm/pkg/hello_wasm.js'
import initShapes from '@hello-3d-shapes-wasm/pkg/hello_3d_shapes.js'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas id="my_canvas" width="800" height="600"></canvas>
    <img src="/vite-deno.svg" alt="Vite with Deno" />
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await init('/hello_wasm_bg.wasm');
    const shapes = await initShapes('/hello_3d_shapes_bg.wasm');
    greet();
    
    // Run the 3D shapes app
    if (typeof shapes.run_app === 'function') {
      await shapes.run_app();
    } else {
      console.error('run_app function not found in WebAssembly module');
    }
  } catch (error) {
    console.error('Error initializing WebAssembly:', error);
  }
});
