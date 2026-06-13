import { useState } from 'react';
import {
  Target, TrendingUp, DollarSign, Users, Search,
  Plus, Phone, FileText, CheckCircle2, XCircle,
  Clock, AlertTriangle
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { opportunities, formatCurrency, formatNumber } from '@/data/demo';
import type { Opportunity } from '@/types';

type StatusColumn = 'prospect' | 'contacted' | 'proposal' | 'negotiation' | 'won' | 'lost';

const columns: { id: StatusColumn; label: string; color: string; icon: React.ElementType }[] = [
  { id: 'prospect', label: 'Prospecto', color: 'bg-slate-100 border-slate-300', icon: Target },
  { id: 'contacted', label: 'Contactado', color: 'bg-blue-50 border-blue-300', icon: Phone },
  { id: 'proposal', label: 'Propuesta', color: 'bg-purple-50 border-purple-300', icon: FileText },
  { id: 'negotiation', label: 'Negociación', color: 'bg-amber-50 border-amber-300', icon: Clock },
  { id: 'won', label: 'Ganado', color: 'bg-green-50 border-green-300', icon: CheckCircle2 },
  { id: 'lost', label: 'Perdido', color: 'bg-red-50 border-red-300', icon: XCircle },
];

const probabilityColor = (p: number) => {
  if (p >= 0.7) return 'text-green-600';
  if (p >= 0.4) return 'text-amber-600';
  return 'text-red-600';
};

export default function Capture() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [viewOpen, setViewOpen] = useState(false);

  const filtered = opportunities.filter(o =>
    !searchQuery || o.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stats
  const totalValue = filtered.reduce((s, o) => s + o.estimatedValue, 0);
  const wonValue = filtered.filter(o => o.status === 'won').reduce((s, o) => s + o.estimatedValue, 0);
  const avgProbability = filtered.reduce((s, o) => s + o.probability, 0) / filtered.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Captación de Eventos</h1>
          <p className="text-sm text-slate-500 mt-1">Pipeline de oportunidades MICE - CRM de captación</p>
        </div>
        <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Oportunidad
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                <Target className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-lg font-bold">{filtered.length}</p>
                <p className="text-xs text-slate-500">Oportunidades</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-lg font-bold">{formatCurrency(totalValue)}</p>
                <p className="text-xs text-slate-500">Pipeline Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-lg font-bold">{formatCurrency(wonValue)}</p>
                <p className="text-xs text-slate-500">Ganado</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-lg font-bold">{(avgProbability * 100).toFixed(0)}%</p>
                <p className="text-xs text-slate-500">Prob. Promedio</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Buscar oportunidad..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Kanban Pipeline */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map(col => {
          const colOpps = filtered.filter(o => o.status === col.id);
          const colValue = colOpps.reduce((s, o) => s + o.estimatedValue, 0);
          return (
            <div key={col.id} className="flex-shrink-0 w-72">
              <div className={`rounded-lg border ${col.color} p-3`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <col.icon className="w-4 h-4 text-slate-600" />
                    <span className="text-sm font-semibold text-slate-700">{col.label}</span>
                  </div>
                  <Badge variant="outline" className="text-[10px]">{colOpps.length}</Badge>
                </div>
                <p className="text-[10px] text-slate-500 mb-3">{formatCurrency(colValue)}</p>
                <div className="space-y-2">
                  {colOpps.map(opp => (
                    <div
                      key={opp.id}
                      className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => { setSelectedOpp(opp); setViewOpen(true); }}
                    >
                      <p className="text-xs font-medium text-slate-800 line-clamp-2">{opp.eventName}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Badge variant="outline" className="text-[9px] h-4 px-1">{opp.type}</Badge>
                        <Badge variant="outline" className="text-[9px] h-4 px-1">{opp.comuna}</Badge>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] font-medium text-slate-600">{formatCurrency(opp.estimatedValue)}</span>
                        <span className={`text-[10px] font-bold ${probabilityColor(opp.probability)}`}>
                          {(opp.probability * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={opp.probability * 100} className="h-1 mt-2" />
                      <div className="flex items-center gap-1 mt-2">
                        <Users className="w-3 h-3 text-slate-400" />
                        <span className="text-[9px] text-slate-500">{formatNumber(opp.estimatedAttendees)} asistentes</span>
                      </div>
                      {new Date(opp.decisionDate) < new Date('2025-07-01') && opp.status !== 'won' && opp.status !== 'lost' && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertTriangle className="w-3 h-3 text-amber-500" />
                          <span className="text-[9px] text-amber-600">Próxima decisión</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-lg">
          {selectedOpp && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg">{selectedOpp.eventName}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{selectedOpp.type}</Badge>
                  <Badge>{selectedOpp.status}</Badge>
                  <Badge variant="outline">{selectedOpp.comuna}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-[10px] text-slate-500 uppercase">Valor Estimado</p>
                    <p className="text-sm font-bold">{formatCurrency(selectedOpp.estimatedValue)}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-[10px] text-slate-500 uppercase">Asistentes Est.</p>
                    <p className="text-sm font-bold">{formatNumber(selectedOpp.estimatedAttendees)}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-[10px] text-slate-500 uppercase">Probabilidad</p>
                    <p className={`text-sm font-bold ${probabilityColor(selectedOpp.probability)}`}>
                      {(selectedOpp.probability * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-[10px] text-slate-500 uppercase">Fecha Decisión</p>
                    <p className="text-sm font-bold">{new Date(selectedOpp.decisionDate).toLocaleDateString('es-CL')}</p>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-[10px] text-slate-500 uppercase">Fuente</p>
                  <p className="text-sm">{selectedOpp.source}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-[10px] text-slate-500 uppercase">Notas</p>
                  <p className="text-sm">{selectedOpp.notes}</p>
                </div>
                <Progress value={selectedOpp.probability * 100} className="h-2" />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
