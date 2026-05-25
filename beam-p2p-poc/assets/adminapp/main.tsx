import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '@ui-components-library/react';

const AdminApp: React.FC = () => (
  <div className="min-h-screen bg-base-200 p-8">
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-base-content">Admin Panel</h1>
        <p className="text-base-content/60 mt-2">
          Separate React SPA for administration
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Users</h2>
            <p className="text-base-content/70">Manage user accounts and permissions</p>
            <div className="card-actions justify-end mt-4">
              <Button variant="default">View Users</Button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Settings</h2>
            <p className="text-base-content/70">Configure application settings</p>
            <div className="card-actions justify-end mt-4">
              <Button variant="default">Configure</Button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Analytics</h2>
            <p className="text-base-content/70">View system analytics and reports</p>
            <div className="card-actions justify-end mt-4">
              <Button variant="default">View Reports</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export function mountAdminApp() {
  const el = document.getElementById('admin-root');
  if (!el) return;
  const root = createRoot(el);
  root.render(<AdminApp />);
}
