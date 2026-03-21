import React from 'react';
import Dashboard from './pages/admin/dashboard/Dashboard';
import AdminLayout from './layouts/AdminLayout';
import ToastProvider from './components/ui/ToastProvider';

function App() {
  return (
    <>
      <ToastProvider />
      <AdminLayout>
        <Dashboard />
      </AdminLayout>
    </>
  );
}

export default App;