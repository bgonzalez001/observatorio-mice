import { useState } from 'react';
import {
  Trophy, TrendingUp, MapPin, Star,
  BarChart3, Globe, ChevronUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ScatterChart, Scatter, ZAxis, Cell
} from 'recharts';
import { benchmarkData, benchmarkLatam, formatNumber } from '@/data/demo';

export default function Benchmark() {
  const [metric, setMetric] = useState<'eventsCount' | 'internationalEvents' | 'attendees' | 'satisfaction' | 'infrastructure'>('eventsCount');

  const metricLabels: Record<string, string> = {
    eventsCount: 'Eventos Totales',
    internationalEvents: 'Eventos Internacionales',
    attendees: 'Asistentes',
    satisfaction: 'Satisfacción',
    infrastructure: 'Infraestructura',
  };

  // Nacional - ordenado
  const nacionalSorted = [...benchmarkData].sort((a, b) => a.position - b.position);
  // LATAM - ordenado
  const latamSorted = [...benchmarkLatam].sort((a, b) => a.position - b.position);

  // Highlight Los Ríos
  const isLosRios = (d: typeof benchmarkData[0]) => d.region === 'Los Ríos';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Benchmark</h1>
        <p className="text-sm text-slate-500 mt-1">Comparativa de posicionamiento MICE a nivel nacional e internacional</p>
      </div>

      {/* Position highlight */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-teal-600 to-teal-700 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100 text-sm">Ranking Nacional Chile</p>
                <p className="text-4xl font-bold mt-1">#4</p>
                <p className="text-teal-200 text-xs mt-1">De 14 regiones con actividad MICE</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <ChevronUp className="w-4 h-4 text-green-300" />
              <span className="text-sm text-teal-100">Subió 2 posiciones vs 2024</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Ranking LATAM</p>
                <p className="text-4xl font-bold mt-1">#11</p>
                <p className="text-blue-200 text-xs mt-1">De 12 destinos principales</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-300" />
              <span className="text-sm text-blue-100">Crecimiento del 23% en eventos internacionales</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="nacional" className="space-y-4">
        <TabsList className="bg-white border">
          <TabsTrigger value="nacional" className="text-xs">
            <MapPin className="w-4 h-4 mr-1" />
            Nacional Chile
          </TabsTrigger>
          <TabsTrigger value="latam" className="text-xs">
            <Globe className="w-4 h-4 mr-1" />
            LATAM
          </TabsTrigger>
          <TabsTrigger value="scatter" className="text-xs">
            <BarChart3 className="w-4 h-4 mr-1" />
            Matriz Posición
          </TabsTrigger>
        </TabsList>

        {/* Nacional */}
        <TabsContent value="nacional">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <CardTitle className="text-base">Ranking Nacional de Regiones</CardTitle>
                  <p className="text-xs text-slate-500">Comparativa de destinos MICE en Chile 2025</p>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {Object.entries(metricLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setMetric(key as typeof metric)}
                      className={`px-2 py-1 rounded text-[10px] transition-colors ${
                        metric === key ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={[...benchmarkData].sort((a, b) => (b[metric] as number) - (a[metric] as number))} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <YAxis dataKey="region" type="category" tick={{ fontSize: 11 }} stroke="#94a3b8" width={90} />
                  <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                  <Bar dataKey={metric} name={metricLabels[metric]} radius={[0, 4, 4, 0]}>
                    {[...benchmarkData].sort((a, b) => (b[metric] as number) - (a[metric] as number)).map((d, i) => (
                      <Cell key={i} fill={isLosRios(d) ? '#0f766e' : i < 3 ? '#0891b2' : '#cbd5e1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Detalle Nacional</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 px-3 font-semibold text-slate-600">Pos</th>
                      <th className="text-left py-2 px-3 font-semibold text-slate-600">Región</th>
                      <th className="text-right py-2 px-3 font-semibold text-slate-600">Eventos</th>
                      <th className="text-right py-2 px-3 font-semibold text-slate-600">Int.</th>
                      <th className="text-right py-2 px-3 font-semibold text-slate-600">Asistentes</th>
                      <th className="text-right py-2 px-3 font-semibold text-slate-600">Sat.</th>
                      <th className="text-right py-2 px-3 font-semibold text-slate-600">Infra.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nacionalSorted.map((d) => (
                      <tr key={d.region} className={`border-b border-slate-100 ${isLosRios(d) ? 'bg-teal-50' : ''}`}>
                        <td className="py-2 px-3">
                          {d.position <= 3 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                              {d.position}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-500 ml-1.5">{d.position}</span>
                          )}
                        </td>
                        <td className="py-2 px-3 font-medium">{d.region}</td>
                        <td className="text-right py-2 px-3">{formatNumber(d.eventsCount)}</td>
                        <td className="text-right py-2 px-3">{d.internationalEvents}</td>
                        <td className="text-right py-2 px-3">{formatNumber(d.attendees)}</td>
                        <td className="text-right py-2 px-3">
                          <div className="flex items-center justify-end gap-1">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            {d.satisfaction}
                          </div>
                        </td>
                        <td className="text-right py-2 px-3">{d.infrastructure}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LATAM */}
        <TabsContent value="latam">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <CardTitle className="text-base">Ranking LATAM</CardTitle>
                  <p className="text-xs text-slate-500">Destinos MICE principales de América Latina 2025</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={[...benchmarkLatam].sort((a, b) => b.eventsCount - a.eventsCount)} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <YAxis dataKey="region" type="category" tick={{ fontSize: 11 }} stroke="#94a3b8" width={100} />
                  <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                  <Bar dataKey="eventsCount" name="Eventos" radius={[0, 4, 4, 0]}>
                    {[...benchmarkLatam].sort((a, b) => b.eventsCount - a.eventsCount).map((d, i) => (
                      <Cell key={i} fill={d.region === 'Los Ríos' ? '#0f766e' : d.country === 'Chile' ? '#0891b2' : '#cbd5e1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Detalle LATAM</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 px-3 font-semibold text-slate-600">Pos</th>
                      <th className="text-left py-2 px-3 font-semibold text-slate-600">Ciudad/Región</th>
                      <th className="text-left py-2 px-3 font-semibold text-slate-600">País</th>
                      <th className="text-right py-2 px-3 font-semibold text-slate-600">Eventos</th>
                      <th className="text-right py-2 px-3 font-semibold text-slate-600">Int.</th>
                      <th className="text-right py-2 px-3 font-semibold text-slate-600">Asistentes</th>
                      <th className="text-right py-2 px-3 font-semibold text-slate-600">Sat.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latamSorted.map((d) => (
                      <tr key={`${d.region}-${d.country}`} className={`border-b border-slate-100 ${d.region === 'Los Ríos' ? 'bg-teal-50' : d.country === 'Chile' ? 'bg-blue-50/50' : ''}`}>
                        <td className="py-2 px-3">
                          {d.position <= 3 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                              {d.position}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-500 ml-1.5">{d.position}</span>
                          )}
                        </td>
                        <td className="py-2 px-3 font-medium">{d.region}</td>
                        <td className="py-2 px-3">
                          <Badge variant="outline" className="text-[10px]">{d.country}</Badge>
                        </td>
                        <td className="text-right py-2 px-3">{formatNumber(d.eventsCount)}</td>
                        <td className="text-right py-2 px-3">{d.internationalEvents}</td>
                        <td className="text-right py-2 px-3">{formatNumber(d.attendees)}</td>
                        <td className="text-right py-2 px-3">
                          <div className="flex items-center justify-end gap-1">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            {d.satisfaction}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scatter */}
        <TabsContent value="scatter">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Matriz Satisfacción vs Infraestructura</CardTitle>
              <p className="text-xs text-slate-500">Tamaño de burbuja = número de eventos</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={450}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" dataKey="infrastructure" name="Infraestructura" domain={[3, 5]} tick={{ fontSize: 11 }} stroke="#94a3b8" label={{ value: 'Infraestructura', position: 'bottom', fontSize: 12 }} />
                  <YAxis type="number" dataKey="satisfaction" name="Satisfacción" domain={[3.5, 5]} tick={{ fontSize: 11 }} stroke="#94a3b8" label={{ value: 'Satisfacción', angle: -90, position: 'left', fontSize: 12 }} />
                  <ZAxis type="number" dataKey="eventsCount" range={[100, 1200]} />
                  <Tooltip
                    contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
                    formatter={(value: number, name: string) => [name === 'eventsCount' ? formatNumber(value) : value, name === 'eventsCount' ? 'Eventos' : name]}
                    labelFormatter={(_: unknown, payload: Array<{ payload?: { region: string; country: string } }> | undefined) => {
                      if (payload && payload[0] && payload[0].payload) {
                        const p = payload[0].payload;
                        return `${p.region}, ${p.country}`;
                      }
                      return '';
                    }}
                  />
                  <Scatter data={benchmarkLatam}>
                    {benchmarkLatam.map((d, i) => (
                      <Cell key={i} fill={d.region === 'Los Ríos' ? '#0f766e' : d.country === 'Chile' ? '#0891b2' : '#94a3b8'} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-4 mt-4 justify-center">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-teal-600" />
                  <span className="text-xs text-slate-600">Los Ríos</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-sky-500" />
                  <span className="text-xs text-slate-600">Chile (otros)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-slate-400" />
                  <span className="text-xs text-slate-600">LATAM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
