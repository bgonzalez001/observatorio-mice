import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import {
  MapPin, Users, DollarSign, Calendar,
  Building2, Star, ArrowUpRight, BarChart3
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { comunas, events, formatCurrency, formatNumber, getStatusColor, getStatusLabel } from '@/data/demo';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const intensityColor = (events: number): string => {
  if (events >= 80) return '#0f766e';
  if (events >= 30) return '#0891b2';
  if (events >= 20) return '#7c3aed';
  if (events >= 10) return '#db2777';
  return '#94a3b8';
};

const intensityLabel = (events: number): string => {
  if (events >= 80) return 'Alta';
  if (events >= 30) return 'Media-Alta';
  if (events >= 10) return 'Media';
  return 'Baja';
};

export default function MapView() {
  const [selectedComuna, setSelectedComuna] = useState<string | null>(null);
  const [mapView, setMapView] = useState<'markers' | 'circles'>('circles');
  const maxEvents = Math.max(...comunas.map(c => c.eventsCount));

  const eventsByComuna = useMemo(() => {
    const map: Record<string, typeof events> = {};
    comunas.forEach(c => { map[c.name] = events.filter(e => e.comuna === c.name); });
    return map;
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button onClick={() => setMapView('circles')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${mapView === 'circles' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Circulos de Impacto</button>
          <button onClick={() => setMapView('markers')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${mapView === 'markers' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Marcadores</button>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-slate-500">
          <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-teal-700"/>80+ eventos</span>
          <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-sky-600"/>30-80</span>
          <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-purple-600"/>10-30</span>
          <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-slate-400"/>{'<'}10</span>
        </div>
      </div>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative" style={{ height: '500px' }}>
            <MapContainer center={[-39.85, -72.9]} zoom={9} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
              <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
              {comunas.map((comuna) => {
                const color = intensityColor(comuna.eventsCount);
                const radius = Math.max(5000, (comuna.eventsCount / maxEvents) * 25000);
                const comunaEvents = eventsByComuna[comuna.name] || [];
                return (
                  <div key={comuna.name}>
                    {mapView === 'circles' ? (
                      <Circle center={[comuna.coordinates[0], comuna.coordinates[1]]} radius={radius}
                        pathOptions={{ fillColor: color, fillOpacity: 0.4, color: color, weight: 2, opacity: 0.8 }}>
                        <Popup minWidth={320} maxHeight={400}><RichPopup comuna={comuna} comunaEvents={comunaEvents}/></Popup>
                      </Circle>
                    ) : (
                      <Marker position={[comuna.coordinates[0], comuna.coordinates[1]]}
                        icon={L.divIcon({className:'custom-marker',html:`<div style="width:28px;height:28px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,iconSize:[28,28],iconAnchor:[14,14]})}>
                        <Popup minWidth={320} maxHeight={400}><RichPopup comuna={comuna} comunaEvents={comunaEvents}/></Popup>
                      </Marker>
                    )}
                  </div>
                );
              })}
            </MapContainer>
            {selectedComuna && (
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-white/95 backdrop-blur rounded-xl shadow-lg border border-slate-200 p-4 z-[1000] max-h-[400px] overflow-y-auto">
                <ComunaPanel comunaName={selectedComuna} onClose={() => setSelectedComuna(null)} eventsByComuna={eventsByComuna}/>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RichPopup({ comuna, comunaEvents }: { comuna: typeof comunas[0]; comunaEvents: typeof events }) {
  const completedEvents = comunaEvents.filter(e => e.status === 'completed');
  const upcomingEvents = comunaEvents.filter(e => e.status === 'confirmed' || e.status === 'planned');
  const avgSatisfaction = 4.2 + Math.random() * 0.6;
  return (
    <div className="min-w-[280px] max-w-[320px]">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
        <div><h3 className="font-bold text-sm text-slate-900">{comuna.name}</h3><p className="text-[10px] text-slate-500">Region de Los Rios, Chile</p></div>
        <Badge className="text-[10px]" style={{ backgroundColor: intensityColor(comuna.eventsCount), color: 'white' }}>{intensityLabel(comuna.eventsCount)}</Badge>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg"><Calendar className="w-3.5 h-3.5 text-teal-600"/><div><p className="text-[10px] text-slate-500">Eventos</p><p className="text-xs font-bold">{comuna.eventsCount}</p></div></div>
        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg"><Users className="w-3.5 h-3.5 text-blue-600"/><div><p className="text-[10px] text-slate-500">Asistentes</p><p className="text-xs font-bold">{formatNumber(comuna.attendees)}</p></div></div>
        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg"><DollarSign className="w-3.5 h-3.5 text-green-600"/><div><p className="text-[10px] text-slate-500">Impacto</p><p className="text-xs font-bold">{formatCurrency(comuna.economicImpact).replace('$','').split(' ')[0]}M</p></div></div>
        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg"><Building2 className="w-3.5 h-3.5 text-purple-600"/><div><p className="text-[10px] text-slate-500">Venues</p><p className="text-xs font-bold">{comuna.venues}</p></div></div>
      </div>
      <div className="flex items-center gap-2 mb-3 p-2 bg-amber-50 rounded-lg"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500"/><span className="text-xs text-amber-700">Satisfaccion promedio: <strong>{avgSatisfaction.toFixed(1)}/5.0</strong></span></div>
      {comunaEvents.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Eventos ({completedEvents.length} completados · {upcomingEvents.length} proximos)</p>
          <div className="max-h-[160px] overflow-y-auto space-y-1.5 pr-1">
            {comunaEvents.slice(0,6).map(event => (
              <div key={event.id} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className="w-6 h-6 rounded bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5"><Calendar className="w-3 h-3 text-teal-600"/></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-slate-800 truncate">{event.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5"><Badge className={`text-[8px] h-3.5 px-1 ${getStatusColor(event.type)}`}>{getStatusLabel(event.type)}</Badge><Badge className={`text-[8px] h-3.5 px-1 ${getStatusColor(event.status)}`}>{getStatusLabel(event.status)}</Badge></div>
                  <p className="text-[9px] text-slate-400 mt-0.5">{new Date(event.startDate).toLocaleDateString('es-CL')}</p>
                </div>
                {event.economicImpact > 0 && <span className="text-[9px] font-medium text-green-600 flex-shrink-0">{formatCurrency(event.economicImpact).replace('$','').split(' ')[0]}M</span>}
              </div>
            ))}
          </div>
          {comunaEvents.length > 6 && <p className="text-[10px] text-slate-400 text-center">+ {comunaEvents.length - 6} eventos mas</p>}
        </div>
      )}
      <div className="mt-3 pt-2 border-t border-slate-100">
        <p className="text-[10px] text-slate-500 mb-1.5">Tipos de evento:</p>
        <div className="flex flex-wrap gap-1">
          {['conference','meeting','sports','cultural','incentive','exhibition'].map(type => {
            const count = comunaEvents.filter(e => e.type === type).length;
            return count === 0 ? null : <span key={type} className="text-[9px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">{getStatusLabel(type)}: {count}</span>;
          })}
        </div>
      </div>
    </div>
  );
}

function ComunaPanel({ comunaName, onClose, eventsByComuna }: { comunaName: string; onClose: () => void; eventsByComuna: Record<string, typeof events> }) {
  const comuna = comunas.find(c => c.name === comunaName);
  if (!comuna) return null;
  const comunaEvents = eventsByComuna[comunaName] || [];
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: intensityColor(comuna.eventsCount) }}><MapPin className="w-4 h-4 text-white"/></div>
          <div><h3 className="font-bold text-sm text-slate-900">{comuna.name}</h3><p className="text-[10px] text-slate-500">{comuna.eventsCount} eventos registrados</p></div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-sm p-1">✕</button>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg"><Users className="w-4 h-4 text-blue-600"/><div><p className="text-[10px] text-slate-500">Asistentes</p><p className="text-sm font-bold">{formatNumber(comuna.attendees)}</p></div></div>
        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg"><DollarSign className="w-4 h-4 text-green-600"/><div><p className="text-[10px] text-slate-500">Impacto</p><p className="text-sm font-bold">{formatCurrency(comuna.economicImpact).replace('$','')}</p></div></div>
        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg"><Building2 className="w-4 h-4 text-purple-600"/><div><p className="text-[10px] text-slate-500">Venues</p><p className="text-sm font-bold">{comuna.venues}</p></div></div>
        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg"><BarChart3 className="w-4 h-4 text-teal-600"/><div><p className="text-[10px] text-slate-500">Ranking</p><p className="text-sm font-bold">#{comunas.filter(c => c.eventsCount > comuna.eventsCount).length + 1}</p></div></div>
      </div>
      <div className="mt-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2"><p className="text-xs font-semibold text-slate-700">Proximos Eventos</p><span className="text-[10px] text-slate-400">{comunaEvents.filter(e => e.status === 'confirmed' || e.status === 'planned').length} confirmados</span></div>
        <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
          {comunaEvents.filter(e => e.status !== 'completed').slice(0,4).map(event => (
            <div key={event.id} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50"><Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0"/><div className="flex-1 min-w-0"><p className="text-[11px] font-medium text-slate-700 truncate">{event.name}</p><p className="text-[9px] text-slate-400">{new Date(event.startDate).toLocaleDateString('es-CL')}</p></div><ArrowUpRight className="w-3.5 h-3.5 text-teal-500 flex-shrink-0"/></div>
          ))}
          {comunaEvents.filter(e => e.status !== 'completed').length === 0 && <p className="text-[10px] text-slate-400 text-center py-2">Sin eventos proximos</p>}
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
        <Badge className="text-[10px]" style={{ backgroundColor: intensityColor(comuna.eventsCount), color: 'white' }}>Intensidad {intensityLabel(comuna.eventsCount)}</Badge>
        <span className="text-[9px] text-slate-400">Click en circulo para detalle</span>
      </div>
    </>
  );
}
