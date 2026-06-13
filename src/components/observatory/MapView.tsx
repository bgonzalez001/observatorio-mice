import { useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import { MapPin, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { comunas, formatCurrency, formatNumber } from '@/data/demo';
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

function ComunaPopup({ comuna }: { comuna: typeof comunas[0] }) {
  return (
    <div className="p-1 min-w-[180px]">
      <h3 className="font-bold text-sm text-slate-900 mb-2">{comuna.name}</h3>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between"><span className="text-slate-500">Eventos:</span><span className="font-medium">{comuna.eventsCount}</span></div>
        <div className="flex justify-between"><span className="text-slate-500">Asistentes:</span><span className="font-medium">{formatNumber(comuna.attendees)}</span></div>
        <div className="flex justify-between"><span className="text-slate-500">Impacto:</span><span className="font-medium">{formatCurrency(comuna.economicImpact)}</span></div>
        <div className="flex justify-between"><span className="text-slate-500">Venues:</span><span className="font-medium">{comuna.venues}</span></div>
      </div>
    </div>
  );
}

function StatItem({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string | number; color: string }) {
  return (
    <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
      <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
      <div><p className="text-[10px] text-slate-500">{label}</p><p className="text-xs font-bold text-slate-800">{value}</p></div>
    </div>
  );
}

export default function MapView() {
  const [selectedComuna, setSelectedComuna] = useState<string | null>(null);
  const maxEvents = Math.max(...comunas.map(c => c.eventsCount));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-[10px] text-slate-500">
        <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-teal-700" />80+ eventos</span>
        <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-sky-600" />30-80</span>
        <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-purple-600" />10-30</span>
        <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-slate-400" />&lt;10</span>
      </div>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative" style={{ height: '500px' }}>
            <MapContainer center={[-39.85, -72.9]} zoom={9} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
              <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {comunas.map((comuna) => {
                const color = intensityColor(comuna.eventsCount);
                const radius = Math.max(5000, (comuna.eventsCount / maxEvents) * 25000);
                return (
                  <Circle key={comuna.name} center={[comuna.coordinates[0], comuna.coordinates[1]]} radius={radius}
                    pathOptions={{ fillColor: color, fillOpacity: 0.4, color: color, weight: 2, opacity: 0.8 }}
                    eventHandlers={{ click: () => setSelectedComuna(comuna.name) }}
                  >
                    <Popup><ComunaPopup comuna={comuna} /></Popup>
                  </Circle>
                );
              })}
            </MapContainer>
            {selectedComuna && (
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-white/95 backdrop-blur rounded-xl shadow-lg border border-slate-200 p-4 z-[1000]">
                {(() => {
                  const c = comunas.find(x => x.name === selectedComuna);
                  if (!c) return null;
                  return (<>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-slate-900">{c.name}</h3>
                      <button onClick={() => setSelectedComuna(null)} className="text-slate-400 hover:text-slate-600 text-sm">✕</button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <StatItem icon={MapPin} label="Eventos" value={c.eventsCount} color="text-teal-600" />
                      <StatItem icon={Users} label="Asistentes" value={formatNumber(c.attendees)} color="text-blue-600" />
                      <StatItem icon={DollarSign} label="Impacto" value={formatCurrency(c.economicImpact)} color="text-green-600" />
                      <StatItem icon={TrendingUp} label="Venues" value={c.venues} color="text-purple-600" />
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <Badge className="text-[10px]" style={{ backgroundColor: intensityColor(c.eventsCount), color: 'white' }}>
                        Intensidad: {c.eventsCount >= 80 ? 'Alta' : c.eventsCount >= 30 ? 'Media-Alta' : c.eventsCount >= 10 ? 'Media' : 'Baja'}
                      </Badge>
                    </div>
                  </>);
                })()}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
