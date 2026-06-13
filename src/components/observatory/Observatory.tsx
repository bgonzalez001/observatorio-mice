
import {
  MapPin, Building2, Users, DollarSign,
  BarChart3, PieChart as PieIcon, Layers
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { comunas, impactDimensions, events, formatCurrency, formatNumber } from '@/data/demo';
import MapView from './MapView';

const COLORS = ['#0f766e', '#0891b2', '#7c3aed', '#db2777', '#ea580c', '#16a34a', '#4338ca'];

export default function Observatory() {

  // Totales
  const totalEvents = comunas.reduce((s, c) => s + c.eventsCount, 0);
  const totalAttendees = comunas.reduce((s, c) => s + c.attendees, 0);
  const totalImpact = comunas.reduce((s, c) => s + c.economicImpact, 0);
  const totalVenues = comunas.reduce((s, c) => s + c.venues, 0);

  // Radar data para dimensiones de impacto
  const radarData = impactDimensions.map(d => ({
    dimension: d.name,
    actual: Math.round(70 + Math.random() * 25),
    target: 85,
  }));

  // Impacto por dimensión
  const impactByDimension = impactDimensions.map((d) => ({
    name: d.name,
    value: Math.round(totalImpact * d.weight * (0.8 + Math.random() * 0.4)),
    color: d.color,
  }));

  // Eventos por comuna y tipo
  const eventsByTypePerComuna = comunas.slice(0, 5).map(c => {
    const comunaEvents = events.filter(e => e.comuna === c.name);
    return {
      name: c.name,
      conferencias: comunaEvents.filter(e => e.type === 'conference').length,
      reuniones: comunaEvents.filter(e => e.type === 'meeting').length,
      deportivos: comunaEvents.filter(e => e.type === 'sports').length,
      culturales: comunaEvents.filter(e => e.type === 'cultural').length,
      otros: comunaEvents.filter(e => !['conference', 'meeting', 'sports', 'cultural'].includes(e.type)).length,
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Observatorio Regional</h1>
        <p className="text-sm text-slate-500 mt-1">Inteligencia territorial de eventos MICE en Los Ríos</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ObservatoryCard icon={BarChart3} label="Eventos Registrados" value={formatNumber(totalEvents)} color="bg-teal-500" />
        <ObservatoryCard icon={Users} label="Asistentes" value={formatNumber(totalAttendees)} color="bg-blue-500" />
        <ObservatoryCard icon={DollarSign} label="Impacto Económico" value={formatCurrency(totalImpact)} color="bg-green-500" />
        <ObservatoryCard icon={Building2} label="Venues Disponibles" value={formatNumber(totalVenues)} color="bg-purple-500" />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="map" className="space-y-4">
        <TabsList className="bg-white border">
          <TabsTrigger value="map" className="text-xs">
            <MapPin className="w-4 h-4 mr-1" />
            Mapa Territorial
          </TabsTrigger>
          <TabsTrigger value="comunas" className="text-xs">
            <BarChart3 className="w-4 h-4 mr-1" />
            Comunas
          </TabsTrigger>
          <TabsTrigger value="impact" className="text-xs">
            <PieIcon className="w-4 h-4 mr-1" />
            Impacto
          </TabsTrigger>
          <TabsTrigger value="radar" className="text-xs">
            <Layers className="w-4 h-4 mr-1" />
            Dimensiones
          </TabsTrigger>
        </TabsList>

        {/* Mapa Territorial */}
                <TabsContent value="map">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Mapa Interactivo de Eventos</CardTitle>
                  <p className="text-xs text-slate-500">Comunas de la Region de Los Rios - OpenStreetMap</p>
                </div>
                <Badge variant="outline" className="text-[10px]">2025</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <MapView />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comunas */}
        <TabsContent value="comunas">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Ranking de Comunas</CardTitle>
                <p className="text-xs text-slate-500">Por número de eventos realizados</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={[...comunas].sort((a, b) => b.eventsCount - a.eventsCount)} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} stroke="#94a3b8" width={80} />
                    <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                    <Bar dataKey="eventsCount" name="Eventos" fill="#0f766e" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Impacto Económico por Comuna</CardTitle>
                <p className="text-xs text-slate-500">Distribución del valor generado</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={[...comunas].sort((a, b) => b.economicImpact - a.economicImpact).slice(0, 8)}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={120}
                      dataKey="economicImpact"
                      nameKey="name"
                      paddingAngle={2}
                    >
                      {comunas.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {[...comunas].sort((a, b) => b.economicImpact - a.economicImpact).slice(0, 6).map((c, idx) => (
                    <div key={c.name} className="flex items-center gap-1">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                      <span className="text-[10px] text-slate-600">{c.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Tipos de Evento por Comuna (Top 5)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={eventsByTypePerComuna}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                    <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                    <Bar dataKey="conferencias" stackId="a" fill="#0f766e" name="Conferencias" />
                    <Bar dataKey="reuniones" stackId="a" fill="#0891b2" name="Reuniones" />
                    <Bar dataKey="deportivos" stackId="a" fill="#7c3aed" name="Deportivos" />
                    <Bar dataKey="culturales" stackId="a" fill="#db2777" name="Culturales" />
                    <Bar dataKey="otros" stackId="a" fill="#94a3b8" name="Otros" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Impacto */}
        <TabsContent value="impact">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Impacto por Dimensión</CardTitle>
                <p className="text-xs text-slate-500">Las 7 dimensiones de impacto MICE</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={impactByDimension} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" tickFormatter={(v) => `$${(v / 1000000).toFixed(0)}M`} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} stroke="#94a3b8" width={100} />
                    <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {impactByDimension.map((d, idx) => (
                        <Cell key={idx} fill={d.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Dimensiones de Impacto</CardTitle>
                <p className="text-xs text-slate-500">Pesos y descripciones del modelo</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {impactDimensions.map((dim) => (
                  <div key={dim.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                    <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: dim.color }} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-800">{dim.name}</p>
                        <Badge variant="outline" className="text-[10px]">{(dim.weight * 100).toFixed(0)}%</Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{dim.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Radar */}
        <TabsContent value="radar">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Evaluación Multidimensional del Impacto</CardTitle>
              <p className="text-xs text-slate-500">Comparación actual vs objetivo estratégico</p>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={450}>
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11, fill: '#475569' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <Radar name="Actual" dataKey="actual" stroke="#0f766e" fill="#0f766e" fillOpacity={0.3} strokeWidth={2} />
                  <Radar name="Objetivo" dataKey="target" stroke="#0891b2" fill="#0891b2" fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" />
                  <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ObservatoryCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
