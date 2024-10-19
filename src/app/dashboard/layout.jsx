"use client";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4">
        <h1>Dashboard</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
