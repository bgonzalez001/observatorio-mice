import { useState } from 'react';
import {
  FileText, Search, Filter, Download, FileSpreadsheet,
  Calendar, User, Tag
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { documents } from '@/data/demo';

const fileIcons: Record<string, React.ElementType> = {
  pdf: FileText,
  excel: FileSpreadsheet,
};

const fileColors: Record<string, string> = {
  pdf: 'bg-red-50 text-red-600',
  excel: 'bg-green-50 text-green-600',
};

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filtered = documents.filter(d => {
    if (searchQuery && !d.title.toLowerCase().includes(searchQuery.toLowerCase()) && !d.author.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (typeFilter !== 'all' && d.type !== typeFilter) return false;
    if (categoryFilter !== 'all' && d.category !== categoryFilter) return false;
    return true;
  });

  const categories = [...new Set(documents.map(d => d.category))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Biblioteca Documental</h1>
        <p className="text-sm text-slate-500 mt-1">Repositorio centralizado de documentos y recursos</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-lg font-bold">{documents.length}</p>
              <p className="text-xs text-slate-500">Documentos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-lg font-bold">{documents.filter(d => d.type === 'pdf').length}</p>
              <p className="text-xs text-slate-500">PDFs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-lg font-bold">{documents.filter(d => d.type === 'excel').length}</p>
              <p className="text-xs text-slate-500">Excel</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Tag className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-bold">{categories.length}</p>
              <p className="text-xs text-slate-500">Categorías</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar documento..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categories.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Document grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(doc => {
          const Icon = fileIcons[doc.type] || FileText;
          const colorClass = fileColors[doc.type] || 'bg-slate-50 text-slate-600';
          return (
            <Card key={doc.id} className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-lg ${colorClass} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 line-clamp-2 group-hover:text-teal-700 transition-colors">
                      {doc.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-[9px] h-4">{doc.type.toUpperCase()}</Badge>
                      <Badge variant="secondary" className="text-[9px] h-4">{doc.category}</Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-3 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {doc.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(doc.createdAt).toLocaleDateString('es-CL')}
                      </span>
                    </div>
                    {doc.metadata && (
                      <div className="flex items-center gap-2 mt-2">
                        {'pages' in doc.metadata && !!doc.metadata.pages && (
                          <span className="text-[10px] text-slate-400">{String(doc.metadata.pages)} páginas</span>
                        )}
                        {'year' in doc.metadata && !!doc.metadata.year && (
                          <span className="text-[10px] text-slate-400">Año {String(doc.metadata.year)}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
