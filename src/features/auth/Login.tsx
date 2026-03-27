import { useState } from "react";
import { Eye, EyeOff, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useAuthStore((s) => s.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login({ email, password });

      // TODO(opcional): implementar persistencia por "rememberMe" (hoy siempre usamos localStorage).
      void rememberMe;

      navigate("/app/inbox", { replace: true });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data
        const detail =
          typeof data === "object" && data !== null && "detail" in data
            ? (data as { detail?: unknown }).detail
            : undefined
        setError(
          typeof detail === "string"
            ? detail
            : err.message || "No se pudo iniciar sesión. Verifica tus credenciales."
        );
      } else {
        setError("No se pudo iniciar sesión. Verifica tus credenciales.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#f8aa14] via-[#f59e0b] to-[#ea580c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-30"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-white/10 rounded-lg backdrop-blur-sm">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight">
                  Observatorio V&M
                </h1>
                <p className="font-[family-name:var(--font-body)] text-sm text-white/80 mt-0.5">
                  Verdad y Memoria
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight mb-4">
                Plataforma de Investigación
              </h2>
              <p className="font-[family-name:var(--font-body)] text-lg text-white/90 leading-relaxed">
                Sistema de clasificación cualitativa de artículos noticiosos sobre el
                Proceso de Paz y el Conflicto Armado Colombiano.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-md backdrop-blur-sm mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] font-semibold mb-1">
                    Acceso Seguro
                  </h3>
                  <p className="font-[family-name:var(--font-body)] text-sm text-white/80">
                    Plataforma interna protegida para investigadores de derechos humanos
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-md backdrop-blur-sm mt-0.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] font-semibold mb-1">
                    Análisis Cualitativo
                  </h3>
                  <p className="font-[family-name:var(--font-body)] text-sm text-white/80">
                    Herramientas especializadas para clasificación y análisis de contenido
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="font-[family-name:var(--font-body)] text-sm text-white/60">
            © 2026 Observatorio V&M. Todos los derechos reservados.
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="p-2 bg-[#f8aa14] rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-heading)] text-xl font-bold">
                Observatorio V&M
              </h1>
              <p className="font-[family-name:var(--font-body)] text-xs text-muted-foreground">
                Verdad y Memoria
              </p>
            </div>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight">
              Iniciar Sesión
            </h2>
            <p className="font-[family-name:var(--font-body)] text-muted-foreground">
              Ingresa tus credenciales para acceder a la plataforma
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-[family-name:var(--font-body)]">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="investigador@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="font-[family-name:var(--font-body)] h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-[family-name:var(--font-body)]">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="font-[family-name:var(--font-body)] h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="font-[family-name:var(--font-body)] text-sm cursor-pointer"
                >
                  Recordarme
                </label>
              </div>
              <a
                href="#"
                className="font-[family-name:var(--font-body)] text-sm text-primary hover:text-primary/90 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-primary hover:bg-primary/90 font-[family-name:var(--font-body)]"
            >
              {isLoading ? "Iniciando..." : "Acceder a la Plataforma"}
            </Button>

            {error && (
              <p className="font-[family-name:var(--font-body)] text-sm text-red-600">
                {error}
              </p>
            )}
          </form>

          <div className="pt-4 border-t border-border">
            <p className="font-[family-name:var(--font-body)] text-center text-sm text-muted-foreground">
              ¿Necesitas acceso?{" "}
              <a
                href="#"
                className="text-primary hover:text-primary/90 font-medium transition-colors"
              >
                Contacta al administrador
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
