import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { MultiSelect } from "@/components/ui/multi-select"
import type { Option } from "@/components/ui/multi-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ACTORES_OPTIONS: Option[] = [
  { label: "Grupos Armados Organizados", value: "GAO" },
  { label: "Fuerza Pública", value: "FUERZA_PUBLICA" },
  { label: "Bandas Criminales", value: "BACRIM" },
  { label: "Sociedad Civil", value: "CIVIL" }
]

const VIOLENCIA_OPTIONS: Option[] = [
  { label: "Homicidio", value: "HOMICIDIO" },
  { label: "Amenaza", value: "AMENAZA" },
  { label: "Desplazamiento Forzado", value: "DESPLAZAMIENTO" },
  { label: "Masacre", value: "MASACRE" },
  { label: "Secuestro", value: "SECUESTRO" }
]

export default function AnalysisPage() {
  const [enfoque, setEnfoque] = useState<string>("")
  const [actores, setActores] = useState<string[]>([])
  const [violencias, setViolencias] = useState<string[]>([])
  const [observaciones, setObservaciones] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submit Analysis:", { enfoque, actores, violencias, observaciones })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral">Workspace de Análisis</h1>
        <p className="text-muted-foreground mt-2">
          Clasifica y procesa los eventos registrados en el observatorio.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="bg-surface-container-lowest border-0 shadow-sm">
          <CardHeader className="border-b bg-surface-container-low/50">
            <CardTitle className="text-xl">Nuevo Evento</CardTitle>
            <CardDescription>
              Asegúrate de asignar los enfoques y actores pertinentes según el diccionario del observatorio.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-8 px-8">
            {/* Enfoque */}
            <div className="space-y-3">
              <Label className="text-base text-neutral">Enfoque Principal</Label>
              <Select value={enfoque} onValueChange={(v) => setEnfoque(v || "")}>
                <SelectTrigger className="w-full lg:w-1/2 bg-surface-container-low">
                  <SelectValue placeholder="Selecciona el enfoque..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PAZ">Construcción de Paz</SelectItem>
                  <SelectItem value="CONFLICTO">Conflicto Armado</SelectItem>
                  <SelectItem value="MEMORIA">Memoria Histórica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actores y Tipos de Violencia (Grid) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-base text-neutral">Actor Involucrado</Label>
                <MultiSelect 
                  options={ACTORES_OPTIONS}
                  selected={actores}
                  onChange={setActores}
                  placeholder="Seleccionar actores..."
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base text-neutral">Tipo de Violencia</Label>
                <MultiSelect 
                  options={VIOLENCIA_OPTIONS}
                  selected={violencias}
                  onChange={setViolencias}
                  placeholder="Seleccionar tipos..."
                />
              </div>
            </div>

            {/* Observaciones */}
            <div className="space-y-3">
              <Label className="text-base text-neutral">Observaciones</Label>
              <Textarea 
                placeholder="Describe el contexto cualitativo del evento, lugares mencionados y citas clave..."
                className="min-h-[150px] bg-surface-container-low resize-y"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="border-t bg-surface-container-low/30 px-8 py-4 flex justify-end gap-3">
            <Button variant="outline" type="button">Cancelar</Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Guardar Análisis
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
