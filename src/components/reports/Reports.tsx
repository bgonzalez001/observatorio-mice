import { useState } from 'react';
import {
  FileText, Plus, Download, FileSpreadsheet, BarChart3,
  Loader2, CheckCircle2, Calendar, User
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { reports } from '@/data/demo';

const statusConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  completed: { icon: CheckCircle2, color: 'text-green-600', label: 'Completado' },
  generating: { icon: Loader2, color: 'text-amber-600', label: 'Generando' },
  error: { icon: FileText, color: 'text-red-600', label: 'Error' },
};

const typeConfig: Record<string, { color: string }> = {
  mensual: { color: 'bg-blue-100 text-blue-700' },
  trimestral: { color: 'bg-purple-100 text-purple-700' },
  anual: { color: 'bg-teal-100 text-teal-700' },
  predictivo: { color: 'bg-amber-100 text-amber-700' },
  análisis: { color: 'bg-pink-100 text-pink-700' },
};

export default function Reports() {
  const [filter, setFilter] = useState('all');

  const filtered = reports.filter(r => {
    if (filter === 'all') return true;
    return r.type === filter;
  });

  const reportTypes = [...new Set(reports.map(r => r.type))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reportes</h1>
          <p className="text-sm text-slate-500 mt-1">Generación y gestión de informes del observatorio</p>
        </div>
        <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Reporte
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-lg font-bold">{reports.length}</p>
              <p className="text-xs text-slate-500">Total reportes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-lg font-bold">{reports.filter(r => r.status === 'completed').length}</p>
              <p className="text-xs text-slate-500">Completados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-lg font-bold">{reports.filter(r => r.status === 'generating').length}</p>
              <p className="text-xs text-slate-500">En progreso</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-bold">{reports.filter(r => r.format === 'dashboard').length}</p>
              <p className="text-xs text-slate-500">Dashboards</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
            filter === 'all' ? 'bg-teal-600 text-white' : 'bg-white border text-slate-600 hover:bg-slate-50'
          }`}
        >
          Todos
        </button>
        {reportTypes.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-colors capitalize ${
              filter === t ? 'bg-teal-600 text-white' : 'bg-white border text-slate-600 hover:bg-slate-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Reports grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(report => {
          const status = statusConfig[report.status] || statusConfig.completed;
          const StatusIcon = status.icon;
          const typeColor = typeConfig[report.type]?.color || 'bg-slate-100 text-slate-700';
          return (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    report.format === 'pdf' ? 'bg-red-50' : report.format === 'excel' ? 'bg-green-50' : 'bg-blue-50'
                  }`}>
                    {report.format === 'pdf' ? (
                      <FileText className="w-6 h-6 text-red-600" />
                    ) : report.format === 'excel' ? (
                      <FileSpreadsheet className="w-6 h-6 text-green-600" />
                    ) : (
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 line-clamp-2">{report.title}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`text-[9px] h-4 ${typeColor} capitalize`}>{report.type}</Badge>
                      <Badge variant="outline" className="text-[9px] h-4 uppercase">{report.format}</Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-3 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {report.generatedBy}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(report.createdAt).toLocaleDateString('es-CL')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <StatusIcon className={`w-4 h-4 ${status.color} ${report.status === 'generating' ? 'animate-spin' : ''}`} />
                      <span className={`text-xs ${status.color}`}>{status.label}</span>
                      {report.status === 'generating' && (
                        <Progress value={65} className="h-1.5 flex-1" />
                      )}
                    </div>
                  </div>
                  {report.status === 'completed' && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                      <Download className="w-4 h-4 text-slate-400" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick report templates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Plantillas Rápidas</CardTitle>
          <p className="text-xs text-slate-500">Generar reportes pre-configurados</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'Informe Mensual', desc: 'Resumen del mes actual', icon: Calendar },
              { label: 'Impacto Económico', desc: 'Análisis de ROI', icon: BarChart3 },
              { label: 'Benchmark', desc: 'Comparativa nacional', icon: FileText },
              { label: 'Predicción Q3', desc: 'Proyección IA', icon: Loader2 },
            ].map(template => (
              <button
                key={template.label}
                className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition-all text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                  <template.icon className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{template.label}</p>
                  <p className="text-[10px] text-slate-500">{template.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
