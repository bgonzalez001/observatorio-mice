import {
  TrendingUp, TrendingDown, Calendar, Users, DollarSign,
  MapPin, Target, ArrowRight, Activity, Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import {
  events, timeSeriesData, comunas, alerts,
  formatCurrency, formatNumber, getStatusColor, getStatusLabel
} from '@/data/demo';

const COLORS = ['#0f766e', '#0891b2', '#7c3aed', '#db2777', '#ea580c', '#16a34a'];

export default function Dashboard() {
  // Calcular KPIs
  const totalEvents = events.length;
  const completedEvents = events.filter(e => e.status === 'completed').length;
  const totalAttendees = events.reduce((sum, e) => sum + e.actualAttendees + e.expectedAttendees, 0);
  const totalEconomicImpact = events.reduce((sum, e) => sum + e.economicImpact, 0);
  const avgSatisfaction = 4.6;
  const internationalEvents = events.filter(e => e.category === 'international').length;

  // Datos para gráfico de tipos de evento
  const eventTypesData = [
    { name: 'Conferencias', value: events.filter(e => e.type === 'conference').length },
    { name: 'Reuniones', value: events.filter(e => e.type === 'meeting').length },
    { name: 'Deportivos', value: events.filter(e => e.type === 'sports').length },
    { name: 'Culturales', value: events.filter(e => e.type === 'cultural').length },
    { name: 'Incentivos', value: events.filter(e => e.type === 'incentive').length },
    { name: 'Exhibiciones', value: events.filter(e => e.type === 'exhibition').length },
  ];

  // Datos para gráfico de comunas
  const topComunas = [...comunas].sort((a, b) => b.eventsCount - a.eventsCount).slice(0, 6);

  // Alertas recientes no leídas
  const recentAlerts = alerts.filter(a => !a.read).slice(0, 4);

  // Eventos próximos
  const upcomingEvents = events
    .filter(e => e.status === 'confirmed' || e.status === 'planned')
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Vista general del Observatorio MICE | Región de Los Ríos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            <Activity className="w-4 h-4 mr-2" />
            Actualizar datos
          </Button>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-xs">
            <Target className="w-4 h-4 mr-2" />
            Nuevo reporte
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <KPICard
          title="Eventos Programados"
          value={totalEvents}
          subtitle={`${completedEvents} completados`}
          icon={Calendar}
          trend={{ value: 12, positive: true }}
          color="teal"
        />
        <KPICard
          title="Impacto Económico"
          value={formatCurrency(totalEconomicImpact)}
          subtitle="Acumulado 2025"
          icon={DollarSign}
          trend={{ value: 18, positive: true }}
          color="green"
        />
        <KPICard
          title="Asistentes"
          value={formatNumber(totalAttendees)}
          subtitle="Total acumulado"
          icon={Users}
          trend={{ value: 8, positive: true }}
          color="blue"
        />
        <KPICard
          title="Satisfacción"
          value={`${avgSatisfaction}/5.0`}
          subtitle="Promedio ponderado"
          icon={Star}
          trend={{ value: 5, positive: true }}
          color="amber"
        />
        <KPICard
          title="Eventos Int."
          value={internationalEvents}
          subtitle="Ranking ICCA #4"
          icon={MapPin}
          trend={{ value: 3, positive: true }}
          color="purple"
        />
        <KPICard
          title="Comunas"
          value={comunas.length}
          subtitle="Con actividad MICE"
          icon={MapPin}
          trend={{ value: 2, positive: true }}
          color="cyan"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Time Series */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Evolución Temporal</CardTitle>
                <p className="text-xs text-slate-500">Eventos, asistentes e impacto económico</p>
              </div>
              <Badge variant="secondary" className="text-xs">Últimos 12 meses</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={timeSeriesData}>
                <defs>
                  <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f766e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0f766e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891b2" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="period" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area yAxisId="left" type="monotone" dataKey="events" name="Eventos" stroke="#0f766e" fillOpacity={1} fill="url(#colorEvents)" strokeWidth={2} />
                <Area yAxisId="right" type="monotone" dataKey="attendees" name="Asistentes" stroke="#0891b2" fillOpacity={1} fill="url(#colorImpact)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Event Types Pie */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Tipos de Evento</CardTitle>
            <p className="text-xs text-slate-500">Distribución por categoría</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={eventTypesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {eventTypesData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {eventTypesData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs text-slate-600">{item.name}</span>
                  <span className="text-xs font-medium ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Comunas */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Comunas Líderes</CardTitle>
            <p className="text-xs text-slate-500">Por cantidad de eventos</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topComunas} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} stroke="#94a3b8" width={80} />
                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                <Bar dataKey="eventsCount" name="Eventos" fill="#0f766e" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Alertas Recientes</CardTitle>
                <p className="text-xs text-slate-500">Requieren atención</p>
              </div>
              <Badge variant="destructive" className="text-[10px]">{recentAlerts.length} nuevas</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map(alert => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  alert.severity === 'high' ? 'bg-red-500' : alert.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-800 line-clamp-2">{alert.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-[10px] h-5">{alert.module}</Badge>
                    <span className="text-[10px] text-slate-400">
                      {new Date(alert.createdAt).toLocaleDateString('es-CL')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full text-xs text-teal-600 hover:text-teal-700">
              Ver todas las alertas
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Próximos Eventos</CardTitle>
                <p className="text-xs text-slate-500">Confirmados y planificados</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-teal-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-800 truncate">{event.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-slate-500">
                      {new Date(event.startDate).toLocaleDateString('es-CL')}
                    </span>
                    <Badge className={`text-[10px] h-5 ${getStatusColor(event.status)}`}>
                      {getStatusLabel(event.status)}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">{event.venueName}</p>
                </div>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full text-xs text-teal-600 hover:text-teal-700">
              Ver todos los eventos
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// KPICard Component
function KPICard({
  title, value, subtitle, icon: Icon, trend, color
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ElementType;
  trend: { value: number; positive: boolean };
  color: string;
}) {
  const colorMap: Record<string, { bg: string; icon: string; trend: string }> = {
    teal: { bg: 'bg-teal-50', icon: 'text-teal-600', trend: 'text-teal-700' },
    green: { bg: 'bg-green-50', icon: 'text-green-600', trend: 'text-green-700' },
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600', trend: 'text-blue-700' },
    amber: { bg: 'bg-amber-50', icon: 'text-amber-600', trend: 'text-amber-700' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-600', trend: 'text-purple-700' },
    cyan: { bg: 'bg-cyan-50', icon: 'text-cyan-600', trend: 'text-cyan-700' },
  };
  const c = colorMap[color] || colorMap.teal;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${c.icon}`} />
          </div>
          <div className={`flex items-center gap-0.5 text-xs ${c.trend}`}>
            {trend.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend.value}%
          </div>
        </div>
        <div className="mt-3">
          <p className="text-lg font-bold text-slate-900">{value}</p>
          <p className="text-xs text-slate-500 mt-0.5">{title}</p>
          <p className="text-[10px] text-slate-400">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}
