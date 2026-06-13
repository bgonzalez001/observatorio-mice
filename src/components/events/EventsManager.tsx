import { useState } from 'react';
import {
  Calendar, Search, Filter, Plus, MapPin, Users, DollarSign,
  ChevronDown, ChevronUp, Eye, Edit, Trash2, FileSpreadsheet
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { events as allEvents, formatCurrency, formatNumber, getStatusColor, getStatusLabel } from '@/data/demo';
import type { Event } from '@/types';

export default function EventsManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('startDate');
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [viewOpen, setViewOpen] = useState(false);

  // Filter and sort
  let filtered = allEvents.filter(e => {
    if (searchQuery && !e.name.toLowerCase().includes(searchQuery.toLowerCase()) && !e.venueName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (typeFilter !== 'all' && e.type !== typeFilter) return false;
    if (statusFilter !== 'all' && e.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && e.category !== categoryFilter) return false;
    return true;
  });

  filtered.sort((a, b) => {
    const aVal = a[sortField as keyof Event];
    const bVal = b[sortField as keyof Event];
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortAsc ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  const toggleSort = (field: string) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(true); }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return <ChevronDown className="w-3 h-3 text-slate-300" />;
    return sortAsc ? <ChevronUp className="w-3 h-3 text-teal-600" /> : <ChevronDown className="w-3 h-3 text-teal-600" />;
  };

  // Stats
  const stats = {
    total: allEvents.length,
    completed: allEvents.filter(e => e.status === 'completed').length,
    confirmed: allEvents.filter(e => e.status === 'confirmed').length,
    planned: allEvents.filter(e => e.status === 'planned').length,
    inProgress: allEvents.filter(e => e.status === 'in_progress').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestión de Eventos</h1>
          <p className="text-sm text-slate-500 mt-1">Registro, seguimiento y evaluación de eventos MICE</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Evento
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Eventos" value={stats.total} />
        <StatCard label="Completados" value={stats.completed} />
        <StatCard label="Confirmados" value={stats.confirmed} />
        <StatCard label="En Curso" value={stats.inProgress} />
        <StatCard label="Planificados" value={stats.planned} />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar evento o venue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="conference">Conferencia</SelectItem>
                  <SelectItem value="meeting">Reunión</SelectItem>
                  <SelectItem value="incentive">Incentivo</SelectItem>
                  <SelectItem value="exhibition">Exhibición</SelectItem>
                  <SelectItem value="sports">Deportivo</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="completed">Completado</SelectItem>
                  <SelectItem value="confirmed">Confirmado</SelectItem>
                  <SelectItem value="in_progress">En curso</SelectItem>
                  <SelectItem value="planned">Planificado</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="international">Internacional</SelectItem>
                  <SelectItem value="national">Nacional</SelectItem>
                  <SelectItem value="regional">Regional</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Listado de Eventos ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort('name')}>
                    <div className="flex items-center gap-1">Evento <SortIcon field="name" /></div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort('type')}>
                    <div className="flex items-center gap-1">Tipo <SortIcon field="type" /></div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort('category')}>
                    <div className="flex items-center gap-1">Cat. <SortIcon field="category" /></div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort('status')}>
                    <div className="flex items-center gap-1">Estado <SortIcon field="status" /></div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort('startDate')}>
                    <div className="flex items-center gap-1">Fecha <SortIcon field="startDate" /></div>
                  </TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead className="text-right">Asistentes</TableHead>
                  <TableHead className="text-right">Impacto</TableHead>
                  <TableHead className="w-[100px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(event => (
                  <TableRow key={event.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium text-sm max-w-[200px] truncate">{event.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px]">{getStatusLabel(event.type)}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-[10px] ${getStatusColor(event.category)}`}>{getStatusLabel(event.category)}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-[10px] ${getStatusColor(event.status)}`}>{getStatusLabel(event.status)}</Badge>
                    </TableCell>
                    <TableCell className="text-sm whitespace-nowrap">
                      {new Date(event.startDate).toLocaleDateString('es-CL')}
                    </TableCell>
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="truncate max-w-[120px]">{event.venueName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {event.actualAttendees > 0 ? formatNumber(event.actualAttendees) : formatNumber(event.expectedAttendees)}
                    </TableCell>
                    <TableCell className="text-right text-sm font-medium">
                      {event.economicImpact > 0 ? formatCurrency(event.economicImpact) : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7"
                          onClick={() => { setSelectedEvent(event); setViewOpen(true); }}>
                          <Eye className="w-4 h-4 text-slate-500" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Edit className="w-4 h-4 text-slate-500" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedEvent.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className={getStatusColor(selectedEvent.type)}>{getStatusLabel(selectedEvent.type)}</Badge>
                  <Badge className={getStatusColor(selectedEvent.category)}>{getStatusLabel(selectedEvent.category)}</Badge>
                  <Badge className={getStatusColor(selectedEvent.status)}>{getStatusLabel(selectedEvent.status)}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InfoCard icon={Calendar} label="Fecha Inicio" value={new Date(selectedEvent.startDate).toLocaleDateString('es-CL')} />
                  <InfoCard icon={Calendar} label="Fecha Término" value={new Date(selectedEvent.endDate).toLocaleDateString('es-CL')} />
                  <InfoCard icon={MapPin} label="Venue" value={selectedEvent.venueName} />
                  <InfoCard icon={MapPin} label="Comuna" value={selectedEvent.comuna} />
                  <InfoCard icon={Users} label="Asistentes Esperados" value={formatNumber(selectedEvent.expectedAttendees)} />
                  <InfoCard icon={Users} label="Asistentes Reales" value={selectedEvent.actualAttendees > 0 ? formatNumber(selectedEvent.actualAttendees) : 'Pendiente'} />
                  <InfoCard icon={DollarSign} label="Presupuesto" value={formatCurrency(selectedEvent.budget)} />
                  <InfoCard icon={DollarSign} label="Ingresos" value={formatCurrency(selectedEvent.revenue)} />
                </div>

                {selectedEvent.economicImpact > 0 && (
                  <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <p className="text-sm font-semibold text-teal-800">Impacto Económico: {formatCurrency(selectedEvent.economicImpact)}</p>
                    <p className="text-xs text-teal-600 mt-1">ROI: {((selectedEvent.revenue - selectedEvent.budget) / selectedEvent.budget * 100).toFixed(1)}%</p>
                  </div>
                )}

                {selectedEvent.odsMapping.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">ODS vinculados:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedEvent.odsMapping.map(ods => (
                        <Badge key={ods} variant="outline" className="text-[10px] bg-white">ODS {ods}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedEvent.metadata && Object.keys(selectedEvent.metadata).length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">Detalles adicionales:</p>
                    <div className="text-sm text-slate-600 space-y-1">
                      {Object.entries(selectedEvent.metadata).map(([key, value]) => (
                        <p key={key}><span className="capitalize">{key}:</span> {String(value)}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-xs text-slate-500 mt-1">{label}</p>
      </CardContent>
    </Card>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg">
      <Icon className="w-4 h-4 text-slate-400 mt-0.5" />
      <div>
        <p className="text-[10px] text-slate-500 uppercase">{label}</p>
        <p className="text-sm font-medium text-slate-800">{value}</p>
      </div>
    </div>
  );
}
