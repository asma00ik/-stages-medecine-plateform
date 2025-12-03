export default function RoleLayout({ sidebar, children }) {
  return (
    <div className="flex min-h-screen bg-[#0e0a2a] text-white">
      <aside className="w-72 bg-[#1a1447]/90 border-r border-white/10 p-6">
        {sidebar}
      </aside>
      
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
