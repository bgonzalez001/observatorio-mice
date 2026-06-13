import { useState } from 'react';
import {
  Bell, CheckCircle2, AlertTriangle, AlertCircle,
  Info, Target, Trash2, Eye, X
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { alerts as allAlerts } from '@/data/demo';
import type { Alert } from '@/types';

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  opportunity: { icon: Target, color: 'text-green-600', bg: 'bg-green-50 border-green-200', label: 'Oportunidad' },
  warning: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', label: 'Advertencia' },
  critical: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50 border-red-200', label: 'Crítica' },
  info: { icon: Info, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200', label: 'Información' },
};

const severityConfig: Record<string, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
};

export default function Alerts() {
  const [filter, setFilter] = useState<string>('all');
  const [alertsList, setAlertsList] = useState(allAlerts);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [viewOpen, setViewOpen] = useState(false);

  const filtered = alertsList.filter(a => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !a.read;
    return a.type === filter;
  });

  const markAllRead = () => {
    setAlertsList(prev => prev.map(a => ({ ...a, read: true })));
  };

  const markRead = (id: string) => {
    setAlertsList(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const deleteAlert = (id: string) => {
    setAlertsList(prev => prev.filter(a => a.id !== id));
  };

  const openAlert = (alert: Alert) => {
    setSelectedAlert(alert);
    setViewOpen(true);
    if (!alert.read) markRead(alert.id);
  };

  const unreadCount = alertsList.filter(a => !a.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Alertas Inteligentes</h1>
          <p className="text-sm text-slate-500 mt-1">Notificaciones y alertas del sistema de inteligencia</p>
        </div>
        <Button variant="outline" size="sm" onClick={markAllRead}>
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Marcar todas como leídas
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <Bell className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-lg font-bold">{alertsList.length}</p>
              <p className="text-xs text-slate-500">Total alertas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-lg font-bold">{unreadCount}</p>
              <p className="text-xs text-slate-500">Sin leer</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-lg font-bold">{alertsList.filter(a => a.type === 'opportunity').length}</p>
              <p className="text-xs text-slate-500">Oportunidades</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-lg font-bold">{alertsList.filter(a => a.type === 'warning' || a.type === 'critical').length}</p>
              <p className="text-xs text-slate-500">Advertencias</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'all', label: 'Todas' },
          { id: 'unread', label: `Sin leer (${unreadCount})` },
          { id: 'opportunity', label: 'Oportunidades' },
          { id: 'warning', label: 'Advertencias' },
          { id: 'critical', label: 'Críticas' },
          { id: 'info', label: 'Informativas' },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
              filter === f.id ? 'bg-teal-600 text-white' : 'bg-white border text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Alerts list */}
      <div className="space-y-3">
        {filtered.map(alert => {
          const config = typeConfig[alert.type] || typeConfig.info;
          const Icon = config.icon;
          return (
            <Card key={alert.id} className={`transition-all hover:shadow-md ${!alert.read ? 'border-l-4 border-l-teal-500' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0 cursor-pointer`}
                    onClick={() => openAlert(alert)}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => openAlert(alert)}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`text-sm ${!alert.read ? 'font-semibold' : 'font-medium'} text-slate-800`}>
                        {alert.message}
                      </p>
                      {!alert.read && (
                        <div className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-[10px] h-5">{alert.module}</Badge>
                      <Badge
                        className={`text-[10px] h-5 ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-700' :
                          alert.severity === 'medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {severityConfig[alert.severity]}
                      </Badge>
                      <span className="text-[10px] text-slate-400">
                        {new Date(alert.createdAt).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openAlert(alert)}>
                      <Eye className="w-4 h-4 text-slate-400 hover:text-teal-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteAlert(alert.id)}>
                      <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Alert Detail Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-md">
          {selectedAlert && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg ${(typeConfig[selectedAlert.type] || typeConfig.info).bg} flex items-center justify-center`}>
                    {(() => {
                      const C = (typeConfig[selectedAlert.type] || typeConfig.info).icon;
                      return <C className={`w-4 h-4 ${(typeConfig[selectedAlert.type] || typeConfig.info).color}`} />;
                    })()}
                  </div>
                  Detalle de Alerta
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className={`p-4 rounded-lg ${(typeConfig[selectedAlert.type] || typeConfig.info).bg}`}>
                  <p className="text-sm font-medium text-slate-800">{selectedAlert.message}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-[10px] text-slate-500 uppercase">Tipo</p>
                    <p className="text-sm font-medium">{(typeConfig[selectedAlert.type] || typeConfig.info).label}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-[10px] text-slate-500 uppercase">Severidad</p>
                    <p className="text-sm font-medium">{severityConfig[selectedAlert.severity]}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-[10px] text-slate-500 uppercase">Módulo</p>
                    <p className="text-sm font-medium">{selectedAlert.module}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-[10px] text-slate-500 uppercase">Fecha</p>
                    <p className="text-sm font-medium">
                      {new Date(selectedAlert.createdAt).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setViewOpen(false)}>
                    <X className="w-4 h-4 mr-2" />
                    Cerrar
                  </Button>
                  {!selectedAlert.read && (
                    <Button className="flex-1 bg-teal-600 hover:bg-teal-700" onClick={() => { markRead(selectedAlert.id); setViewOpen(false); }}>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Marcar leída
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
