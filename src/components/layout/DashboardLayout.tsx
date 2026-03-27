import { NavLink, Outlet } from "react-router-dom"
import { Monitor, BarChart3, LayoutGrid, Settings, Bell, HelpCircle, LogOut } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { Button } from "@/components/ui/button"

export default function DashboardLayout() {
  const topNavItems = [
    { name: "Bandeja de Entrada", path: "/app/inbox" },
    { name: "Análisis", path: "/app/analysis" },
    { name: "Métricas", path: "/app/dashboard" },
  ]

  const sideNavItems = [
    { icon: Monitor, path: "/app/inbox" },
    { icon: BarChart3, path: "/app/dashboard" },
    { icon: LayoutGrid, path: "/app/analysis" },
    { icon: Settings, path: "/app/settings" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8ff] font-sans">
      {/* Top Navigation - Signature Header */}
      <header className="h-16 bg-white flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm shadow-slate-200/20">
        <div className="flex items-center gap-14">
          <div className="flex items-center gap-3">
             <div className="bg-[#5B21B6]/10 p-1.5 rounded-md">
                <svg className="w-5 h-5 text-[#5B21B6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M3 21h18M3 10l9-7 9 7v11H3V10z" />
                </svg>
             </div>
            <span className="text-lg font-black text-[#0F172A] tracking-tight whitespace-nowrap font-heading">
              Observatorio V&M
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            {topNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-[13px] font-black uppercase tracking-widest transition-all relative py-5 ${
                    isActive
                      ? "text-[#5B21B6] border-b-[3px] border-[#5B21B6]"
                      : "text-slate-400 hover:text-slate-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border-r border-slate-100 pr-6">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="text-slate-400 hover:bg-slate-50 rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:bg-slate-50 rounded-full">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-slate-900 leading-none">Investigador Máster</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-1">Admin</div>
            </div>
            <div className="h-10 w-10 rounded-full border-2 border-white shadow-md cursor-pointer hover:ring-2 hover:ring-purple-200 transition-all overflow-hidden bg-slate-100">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Slim Vertical Sidebar - Editorial Space */}
        <aside className="w-24 bg-white border-r border-slate-100 flex flex-col items-center py-10 gap-8 sticky left-0 top-16 h-[calc(100vh-64px)]">
          {sideNavItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) =>
                `p-4 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-[#5B21B6]/10 text-[#5B21B6] scale-110 shadow-lg shadow-purple-100/50"
                    : "text-slate-200 hover:bg-slate-50 hover:text-slate-400"
                }`
              }
            >
              <item.icon className="h-6 w-6" strokeWidth={2.5} />
            </NavLink>
          ))}
          
          <div className="mt-auto flex flex-col items-center gap-8 pb-4">
             <NavLink to="/" className="p-4 text-slate-200 hover:text-red-500 transition-all hover:bg-red-50 rounded-2xl">
                <LogOut className="h-6 w-6" strokeWidth={2.5} />
             </NavLink>
          </div>
        </aside>

        {/* Main Content (Surface Level 0 to Level 1 Shifts) */}
        <main className="flex-1 overflow-y-auto bg-[#faf8ff] p-10 lg:p-14">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
