import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Calendar,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ArticleStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

interface Article {
  id: string;
  title: string;
  source: string;
  date: string;
  assignedTo: string;
  status: ArticleStatus;
  category: string;
  priority: "high" | "medium" | "low";
}

const mockArticles: Article[] = [
  {
    id: "1",
    title: "Acuerdo de paz avanza en zonas rurales del Cauca",
    source: "El Espectador",
    date: "2026-03-25T08:30:00",
    assignedTo: "María Rodríguez",
    status: "IN_PROGRESS",
    category: "Implementación",
    priority: "high",
  },
  {
    id: "2",
    title: "Víctimas del conflicto armado reciben reparaciones simbólicas y materiales",
    source: "El Tiempo",
    date: "2026-03-24T11:15:00",
    assignedTo: "Carlos Mendoza",
    status: "PENDING",
    category: "Víctimas",
    priority: "medium",
  },
  {
    id: "3",
    title: "Reintegración de excombatientes: avances y desafíos en la implementación",
    source: "Semana",
    date: "2026-03-23T09:00:00",
    assignedTo: "Ana López",
    status: "COMPLETED",
    category: "Reintegración",
    priority: "medium",
  },
  {
    id: "4",
    title: "Comisión de la Verdad presenta nuevo informe regional sobre el conflicto",
    source: "El Espectador",
    date: "2026-03-22T07:45:00",
    assignedTo: "María Rodríguez",
    status: "PENDING",
    category: "Verdad",
    priority: "high",
  },
  {
    id: "5",
    title: "Desminado humanitario alcanza el 60% en zonas priorizadas del país",
    source: "El Colombiano",
    date: "2026-03-21T10:20:00",
    assignedTo: "Juan Torres",
    status: "IN_PROGRESS",
    category: "Desminado",
    priority: "low",
  },
  {
    id: "6",
    title: "Justicia Especial para la Paz dicta nuevas sentencias restaurativas",
    source: "El Tiempo",
    date: "2026-03-20T14:30:00",
    assignedTo: "María Rodríguez",
    status: "PENDING",
    category: "Justicia",
    priority: "high",
  },
  {
    id: "7",
    title: "Liderazgo social bajo amenaza en el Bajo Cauca antioqueño",
    source: "El Tiempo",
    date: "2026-03-15T08:30:00",
    assignedTo: "María Rodríguez",
    status: "PENDING",
    category: "Seguridad",
    priority: "high",
  },
  {
    id: "8",
    title: "Fallo histórico en favor de la restitución de tierras en el Caribe",
    source: "El Espectador",
    date: "2026-03-14T11:15:00",
    assignedTo: "Carlos Mendoza",
    status: "PENDING",
    category: "Restitución",
    priority: "medium",
  },
  {
    id: "9",
    title: "Los contratos ocultos tras la deforestación en la Amazonía",
    source: "Cuestión Pública",
    date: "2026-03-14T09:00:00",
    assignedTo: "Ana López",
    status: "PENDING",
    category: "Ambiental",
    priority: "medium",
  },
  {
    id: "10",
    title: "Crisis migratoria: nuevas rutas identificadas en el Darién",
    source: "Noticias Caracol",
    date: "2026-03-13T07:45:00",
    assignedTo: "María Rodríguez",
    status: "PENDING",
    category: "Migración",
    priority: "low",
  },
  {
    id: "11",
    title: "Radiografía de la impunidad en crímenes contra periodistas",
    source: "Vorágine",
    date: "2026-03-13T10:20:00",
    assignedTo: "Juan Torres",
    status: "PENDING",
    category: "Periodismo",
    priority: "high",
  },
];

const sourceColors: Record<string, { bg: string; text: string; initials: string }> = {
  "El Tiempo": { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400", initials: "ET" },
  "El Espectador": { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", initials: "EE" },
  "Semana": { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400", initials: "SE" },
  "El Colombiano": { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400", initials: "EC" },
  "Cuestión Pública": { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400", initials: "CP" },
  "Noticias Caracol": { bg: "bg-pink-100 dark:bg-pink-900/30", text: "text-pink-700 dark:text-pink-400", initials: "NC" },
  "Vorágine": { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-400", initials: "VO" },
};

// NOTE: statusConfig/Badge no se usan todavía; se dejaron fuera para evitar errores TS por imports/vars sin uso.

export default function Inbox() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("");

  const allSources = Array.from(new Set(mockArticles.map((a) => a.source)));

  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource =
      sourceFilter === "all" || article.source === sourceFilter;

    return matchesSearch && matchesSource;
  });

  const handleRowClick = (articleId: string) => {
    navigate(`/app/analysis/${articleId}`);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card px-8 py-6">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold">
              Bandeja de Entrada
            </h1>
            <p className="font-[family-name:var(--font-body)] text-muted-foreground mt-1">
              Artículos asignados para clasificación y análisis
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-4 flex-wrap">
            <div className="px-4 py-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <p className="font-[family-name:var(--font-body)] text-sm text-muted-foreground">
                Pendientes
              </p>
              <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-amber-700 dark:text-amber-400">
                {mockArticles.filter((a) => a.status === "PENDING").length}
              </p>
            </div>
            <div className="px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <p className="font-[family-name:var(--font-body)] text-sm text-muted-foreground">
                En Progreso
              </p>
              <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-blue-700 dark:text-blue-400">
                {mockArticles.filter((a) => a.status === "IN_PROGRESS").length}
              </p>
            </div>
            <div className="px-4 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <p className="font-[family-name:var(--font-body)] text-sm text-muted-foreground">
                Completados
              </p>
              <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                {mockArticles.filter((a) => a.status === "COMPLETED").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-border bg-card px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
          {/* Search */}
          <div className="lg:col-span-5">
            <label className="font-[family-name:var(--font-body)] text-sm text-foreground mb-2 block">
              Buscar por palabras clave
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Título, contenido o descriptores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 font-[family-name:var(--font-body)] h-10"
              />
            </div>
          </div>

          {/* Source Filter */}
          <div className="lg:col-span-3">
            <label className="font-[family-name:var(--font-body)] text-sm text-foreground mb-2 block">
              Fuente de Medios
            </label>
            <Select
              value={sourceFilter}
              onValueChange={(value) => setSourceFilter(value ?? "all")}
            >
              <SelectTrigger className="w-full font-[family-name:var(--font-body)] h-10">
                <SelectValue placeholder="Todas las fuentes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  Todas las fuentes ({mockArticles.length})
                </SelectItem>
                {allSources.map((source) => {
                  const count = mockArticles.filter((a) => a.source === source).length;
                  return (
                    <SelectItem key={source} value={source}>
                      {source} ({count})
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="lg:col-span-3">
            <label className="font-[family-name:var(--font-body)] text-sm text-foreground mb-2 block">
              Fecha de Publicación
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="10/10/2023 - 17/10/2023"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="pl-9 font-[family-name:var(--font-body)] h-10"
              />
            </div>
          </div>

          {/* Advanced Filters Button */}
          <div className="lg:col-span-1">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              title="Filtros avanzados"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b-2">
                <TableHead className="font-[family-name:var(--font-heading)] text-xs uppercase tracking-wider text-muted-foreground font-semibold py-4">
                  Fuente
                </TableHead>
                <TableHead className="font-[family-name:var(--font-heading)] text-xs uppercase tracking-wider text-muted-foreground font-semibold py-4">
                  Título de la Noticia
                </TableHead>
                <TableHead className="font-[family-name:var(--font-heading)] text-xs uppercase tracking-wider text-muted-foreground font-semibold py-4">
                  Fecha de Publicación
                </TableHead>
                <TableHead className="font-[family-name:var(--font-heading)] text-xs uppercase tracking-wider text-muted-foreground font-semibold py-4 text-right">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.map((article) => {
                const sourceInfo = sourceColors[article.source] || {
                  bg: "bg-gray-100 dark:bg-gray-900/30",
                  text: "text-gray-700 dark:text-gray-400",
                  initials: article.source.substring(0, 2).toUpperCase(),
                };
                
                return (
                  <TableRow
                    key={article.id}
                    className="hover:bg-accent/30 transition-colors border-b last:border-0"
                  >
                    <TableCell className="font-[family-name:var(--font-body)] py-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`${sourceInfo.bg} ${sourceInfo.text} w-10 h-10 rounded flex items-center justify-center flex-shrink-0`}
                        >
                          <span className="text-xs font-bold">
                            {sourceInfo.initials}
                          </span>
                        </div>
                        <span className="font-medium text-sm">
                          {article.source}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-[family-name:var(--font-body)] py-5">
                      <div className="max-w-2xl">
                        <p className="text-sm leading-relaxed">
                          {article.title}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-[family-name:var(--font-body)] text-muted-foreground py-5">
                      <span className="text-sm">
                        {new Date(article.date).toLocaleDateString("es-CO", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                        {", "}
                        {new Date(article.date).toLocaleTimeString("es-CO", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </TableCell>
                    <TableCell className="py-5 text-right">
                      <Button
                        onClick={() => handleRowClick(article.id)}
                        className="bg-[#5B21B6] hover:bg-[#6d28d9] text-white font-[family-name:var(--font-body)] text-sm px-6"
                      >
                        Clasificar
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {filteredArticles.length === 0 && (
            <div className="py-12 text-center">
              <p className="font-[family-name:var(--font-body)] text-muted-foreground">
                No se encontraron artículos con los filtros seleccionados
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
