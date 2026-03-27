import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, AlertTriangle } from "lucide-react"

export default function Dashboard() {
  const metrics = [
    {
      title: "Eventos Registrados (Mes)",
      value: "1,248",
      description: "+12.5% vs mes anterior",
      icon: <BarChart3 className="h-4 w-4 text-primary" />,
      intent: "primary"
    },
    {
      title: "Homicidios Relacionados",
      value: "84",
      description: "-4.2% vs mes anterior",
      icon: <AlertTriangle className="h-4 w-4 text-tertiary" />,
      intent: "tertiary"
    },
    {
      title: "Actores Identificados",
      value: "14",
      description: "2 nuevos este semestre",
      icon: <Users className="h-4 w-4 text-secondary" />,
      intent: "secondary"
    },
    {
      title: "Tendencia de Conflicto",
      value: "Alta",
      description: "Basado en últimos 7 días",
      icon: <TrendingUp className="h-4 w-4 text-destructive" />,
      intent: "destructive"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral">Métricas Clave</h1>
        <p className="text-muted-foreground mt-2">
          Resumen cuantitativo del observatorio en tiempo real.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-surface-container-lowest border-surface-container-high hover:border-border transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-neutral">
                {metric.title}
              </CardTitle>
              <div className="p-2 bg-surface-container-low rounded-md">
                {metric.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neutral">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t mt-8">
        <div className="xl:col-span-2 space-y-4">
           {/* Placeholder for larger charts */}
           <h3 className="text-lg font-semibold text-neutral">Evolución de Violencia por Actor</h3>
           <div className="h-64 w-full bg-surface-container-low rounded-xl border border-dashed flex items-center justify-center text-muted-foreground">
              [Visualización de Gráfico de Líneas]
           </div>
        </div>
        <div className="space-y-4">
           {/* Placeholder for smaller data list */}
           <h3 className="text-lg font-semibold text-neutral">Regiones de Riesgo</h3>
           <div className="h-64 w-full bg-surface-container-low rounded-xl border border-dashed flex items-center justify-center text-muted-foreground">
              [Mapa de Calor / Ranking]
           </div>
        </div>
      </div>
    </div>
  )
}
