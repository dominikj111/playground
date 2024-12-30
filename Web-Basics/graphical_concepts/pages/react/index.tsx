/** @jsx h */
import { h } from "https://esm.sh/preact@10.25.4";
import { useState } from "https://esm.sh/preact@10.25.4/hooks";

export default function ReactDemo() {
  const [count, setCount] = useState(0);

  return (
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">
        Simple React-like Page using Preact
      </h1>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <p class="text-xl mb-4">Counter: {count}</p>

        <button
          onClick={() => setCount(count + 2)}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Increment
        </button>

        <button
          onClick={() => setCount(count - 1)}
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
