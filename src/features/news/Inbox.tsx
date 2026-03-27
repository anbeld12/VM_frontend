import { Search, Calendar, Filter, Eye, Terminal, MoreHorizontal, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const MOCK_NEWS = [
  {
    id: 1,
    fuente: "El País",
    logo: "EP",
    titular: "Nuevas medidas de seguridad en la frontera sur...",
    publicacion: "12 Oct 2023, 08:30",
    captura: "Hace 2 horas",
    estado: "PENDING",
  },
  {
    id: 2,
    fuente: "The New York Times",
    logo: "NYT",
    titular: "Global analysis of civil liberties in digital...",
    publicacion: "11 Oct 2023, 22:15",
    captura: "Hace 12 horas",
    estado: "IN PROGRESS",
  },
  {
    id: 3,
    fuente: "The Guardian",
    logo: "GN",
    titular: "Environmental activists face increased risks in...",
    publicacion: "10 Oct 2023, 14:00",
    captura: "Ayer",
    estado: "COMPLETED",
  },
  {
    id: 4,
    fuente: "Deutsche Welle",
    logo: "DW",
    titular: "Refugiados climáticos: el nuevo reto para el...",
    publicacion: "10 Oct 2023, 09:20",
    captura: "Ayer",
    estado: "PENDING",
  },
  {
    id: 5,
    fuente: "Radio France",
    logo: "RF",
    titular: "Inégalités croissantes dans l'accès à l'éducatio...",
    publicacion: "09 Oct 2023, 11:45",
    captura: "2 días",
    estado: "COMPLETED",
  },
]

const STATUS_VARIANTS: Record<string, string> = {
  PENDING: "bg-[#FFEDD5] text-[#9A3412] hover:bg-[#FFEDD5]",
  "IN PROGRESS": "bg-[#E0F2FE] text-[#0369A1] hover:bg-[#E0F2FE]",
  COMPLETED: "bg-[#DCFCE7] text-[#15803D] hover:bg-[#DCFCE7]",
}

export default function Inbox() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0F172A] font-heading">
            Bandeja de Entrada
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Gestión de inteligencia de derechos humanos y monitoreo de medios.
          </p>
        </div>
        <Button className="h-12 px-8 bg-[#330075] hover:bg-[#4e05a9] text-white font-bold rounded-xl shadow-lg flex items-center gap-2 transition-all active:scale-95">
          <span className="text-xl">+</span>
          Nueva Investigación
        </Button>
      </div>

      {/* Stats Card & Filters Grid (Surface Level 1) */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left: Highlight Stats Card (Direct Stitch Primary Gradient) */}
        <div className="xl:w-80 bg-gradient-to-br from-[#330075] to-[#5B21B6] p-8 rounded-2xl text-white shadow-xl shadow-purple-200/40 relative overflow-hidden flex flex-col justify-between">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
           <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">PENDIENTES HOY</span>
              <div className="text-6xl font-black font-heading tracking-tighter italic">42</div>
           </div>
           <div className="mt-6 flex items-center justify-between relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[11px] font-bold">
                 <ArrowUpRight className="w-3 h-3" />
                 +12% vs ayer
              </span>
           </div>
        </div>

        {/* Right: Search & Controls (Surface Level 2) */}
        <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm shadow-slate-200/30 flex flex-wrap items-center gap-4">
             <div className="relative flex-1 min-w-[300px] h-14 group">
                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-purple-600 transition-colors h-5 w-5" />
                 <Input 
                   placeholder="Buscar por titular, fuente o palabra clave..." 
                   className="h-full pl-14 bg-slate-50 border-none rounded-xl text-md font-medium placeholder:text-slate-300 focus:bg-white transition-all ring-purple-100"
                 />
             </div>
             <Button variant="outline" className="h-14 px-6 bg-slate-50 border-none rounded-xl text-slate-500 font-bold hover:bg-slate-100 transition-all flex items-center gap-3">
                 <Calendar className="h-5 w-5 text-slate-300" />
                 Rango de fechas
             </Button>
             <Button variant="outline" className="h-14 px-6 bg-slate-50 border-none rounded-xl text-slate-500 font-bold hover:bg-slate-100 transition-all flex items-center gap-3">
                 <Filter className="h-5 w-5 text-slate-300" />
                 Filtros
             </Button>
        </div>
      </div>

      {/* Data Table (Ink-on-Paper Style, No borders) */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm shadow-slate-200/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
              <th className="px-8 py-6">FUENTE DE MEDIOS</th>
              <th className="px-8 py-6">TITULAR DE NOTICIA</th>
              <th className="px-8 py-6">PUBLICACIÓN</th>
              <th className="px-8 py-6">CAPTURA</th>
              <th className="px-8 py-6">ESTADO</th>
              <th className="px-8 py-6 text-right">ACCIONES</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {MOCK_NEWS.map((news) => (
              <tr key={news.id} className="group hover:bg-purple-50/30 transition-all cursor-pointer">
                <td className="px-8 py-8">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[11px] font-black text-slate-400 group-hover:bg-[#5B21B6]/10 group-hover:text-[#5B21B6] transition-colors">
                        {news.logo}
                     </div>
                     <span className="text-sm font-bold text-slate-900">{news.fuente}</span>
                  </div>
                </td>
                <td className="px-8 py-8">
                  <p className="text-sm font-extrabold text-[#0F172A] leading-relaxed max-w-md group-hover:text-[#5B21B6] transition-colors line-clamp-2">
                    {news.titular}
                  </p>
                </td>
                <td className="px-8 py-8">
                  <p className="text-xs font-bold text-slate-400">{news.publicacion}</p>
                </td>
                <td className="px-8 py-8">
                  <p className="text-xs font-bold text-slate-400">{news.captura}</p>
                </td>
                <td className="px-8 py-8">
                  <Badge className={`rounded-md font-black text-[9px] px-3 py-1 shadow-none transition-transform group-hover:scale-105 ${STATUS_VARIANTS[news.estado]}`}>
                    {news.estado}
                  </Badge>
                </td>
                <td className="px-8 py-8 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl">
                      <Terminal className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-[#5B21B6] hover:bg-purple-50 rounded-xl">
                      <Eye className="h-5 w-5" />
                    </Button>
                  </div>
                  <MoreHorizontal className="h-5 w-5 text-slate-200 group-hover:hidden float-right" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="px-8 py-6 bg-slate-50/50 flex items-center justify-between border-t border-slate-50">
            <span className="text-[11px] font-bold text-slate-400">
               Mostrando 1-5 de 1,240 registros
            </span>
            <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 bg-white shadow-sm font-bold rounded-lg text-[11px]">1</Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 font-bold rounded-md text-[11px]">2</Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 font-bold rounded-md text-[11px]">3</Button>
                <span className="text-slate-300">...</span>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 font-bold rounded-md text-[11px]">82</Button>
            </div>
        </div>
      </div>
      
      {/* Editorial Footer Grid */}
      <footer className="pt-10 flex items-center justify-between border-t border-slate-100">
         <div className="text-[9px] font-black text-slate-300 uppercase tracking-[0.25em]">
            © 2023 OBSERVATORIO V&M INTELLIGENCE FRAMEWORK
         </div>
         <div className="flex items-center gap-10">
            {['SEGURIDAD DE DATOS', 'PROTOCOLO DE ANÁLISIS', 'EXPORTAR TODO (CSV)'].map(link => (
                <a key={link} href="#" className="text-[9px] font-black text-slate-400 hover:text-slate-900 tracking-[0.1em] transition-colors">{link}</a>
            ))}
         </div>
      </footer>
    </div>
  )
}
