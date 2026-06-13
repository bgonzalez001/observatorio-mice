import { useState } from 'react';
import {
  LayoutDashboard, Calendar, Map, BarChart3, Target,
  FileText, Bell, Settings, ChevronLeft, ChevronRight,
  User, LogOut, Search, Menu, X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { currentUser, alerts } from '@/data/demo';

type Page = 'dashboard' | 'events' | 'observatory' | 'benchmark' | 'capture' | 'library' | 'alerts' | 'reports';

interface LayoutProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  children: React.ReactNode;
}

const navItems: { id: Page; label: string; icon: React.ElementType; badge?: number }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'events', label: 'Gestión de Eventos', icon: Calendar },
  { id: 'observatory', label: 'Observatorio Regional', icon: Map },
  { id: 'benchmark', label: 'Benchmark', icon: BarChart3 },
  { id: 'capture', label: 'Captación de Eventos', icon: Target },
  { id: 'library', label: 'Biblioteca Documental', icon: FileText },
  { id: 'alerts', label: 'Alertas', icon: Bell, badge: alerts.filter(a => !a.read).length },
  { id: 'reports', label: 'Reportes', icon: FileText },
];

export default function Layout({ currentPage, onPageChange, children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const unreadAlerts = alerts.filter(a => !a.read).length;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 bg-slate-900 text-white transition-all duration-300
          ${collapsed ? 'w-20' : 'w-64'} 
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col shadow-xl
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-slate-700">
          <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center flex-shrink-0">
            <Map className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div className="ml-3 overflow-hidden">
              <h1 className="text-sm font-bold text-white leading-tight">OBSERVATORIO</h1>
              <p className="text-[10px] text-slate-400 leading-tight">Eventos y Territorio</p>
            </div>
          )}
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        {!collapsed && (
          <div className="px-4 py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 h-9 text-sm"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  setMobileOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group
                  ${isActive
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }
                `}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge ? (
                      <Badge variant="destructive" className="text-[10px] h-5 min-w-5 px-1.5">
                        {item.badge}
                      </Badge>
                    ) : null}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-3 border-t border-slate-700 space-y-2">
          <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors ${collapsed ? 'justify-center' : ''}`}>
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Configuración</span>}
          </button>

          {/* User profile */}
          <div className={`flex items-center gap-3 px-3 py-2 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{currentUser.name}</p>
                <p className="text-xs text-slate-500 capitalize">{currentUser.role}</p>
              </div>
            )}
            {!collapsed && (
              <LogOut className="w-4 h-4 text-slate-500 hover:text-white cursor-pointer transition-colors" />
            )}
          </div>
        </div>

        {/* Collapse button - desktop only */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-slate-700 text-white rounded-full items-center justify-center shadow-lg hover:bg-slate-600 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center px-4 sticky top-0 z-30">
          <button onClick={() => setMobileOpen(true)} className="text-slate-600 hover:text-slate-900">
            <Menu className="w-6 h-6" />
          </button>
          <div className="ml-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
              <Map className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-sm">Observatorio</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="relative p-2 text-slate-500 hover:text-slate-700">
              <Bell className="w-5 h-5" />
              {unreadAlerts > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {unreadAlerts}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop header */}
        <div className="hidden lg:flex h-16 bg-white border-b border-slate-200 items-center px-8 sticky top-0 z-30">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-slate-900">
              {navItems.find(n => n.id === currentPage)?.label || 'Dashboard'}
            </h2>
            <p className="text-xs text-slate-500">Región de Los Ríos, Chile | Los Ríos Convention Bureau</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{currentUser.name}</p>
              <p className="text-xs text-slate-500 capitalize">{currentUser.role}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center">
              <User className="w-5 h-5 text-teal-700" />
            </div>
            <button className="relative p-2 text-slate-500 hover:text-slate-700 transition-colors">
              <Bell className="w-5 h-5" />
              {unreadAlerts > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {unreadAlerts}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
