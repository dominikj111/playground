import React from 'react';
import { createRoot } from 'react-dom/client';
// Example: adjust to your real exports
import { Button } from '@ui-components-library/react';

const App: React.FC = () => (
  <div className="p-6 space-y-4">
    <h1 className="text-2xl font-semibold">My SaaS dashboard</h1>
    <p className="text-base-content/70">
      React + TS, styled via Phoenix Tailwind + daisyUI, using ui-components-library.
    </p>
    <Button variant="default" onClick={() => console.log('Click TEST!')}>
      BUTTON from UI library
    </Button>
  </div>
);

export function mountReactApp() {
  const el = document.getElementById('react-root');
  if (!el) return;
  const root = createRoot(el);
  root.render(<App />);
}
