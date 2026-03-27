import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useAuthStore((s) => s.login);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login({ email, password });

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
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-200 to-slate-300 flex items-center justify-center p-6">
      {/* Simulated browser frame */}
      <div className="w-full max-w-[1120px] lg:h-[760px] rounded-2xl shadow-2xl overflow-hidden bg-white border border-black/10">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2">
          {/* Left Panel */}
          <div className="relative hidden lg:flex items-center justify-center overflow-hidden bg-[url('/login_background.webp')] bg-cover bg-center saturate-0">
            {/* Dark, cold overlay */}
            <div className="absolute inset-0 bg-[#0b1721]/85" />

            {/* Subtle texture/grain (inline SVG noise) */}
            <div
              className="absolute inset-0 opacity-[0.18] mix-blend-overlay bg-repeat"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='120'%20height='120'%3E%3Cfilter%20id='n'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='.9'%20numOctaves='3'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='120'%20height='120'%20filter='url(%23n)'%20opacity='.35'/%3E%3C/svg%3E\")",
              }}
            />

            {/* Logo block */}
            <div className="relative z-10 flex items-center justify-center px-10">
              {/* Render the multi-color SVG as a pure white silhouette using CSS masks */}
              <div
                role="img"
                aria-label="Observatorio Verdad & Memoria"
                className="w-[380px] max-w-[82%] h-[240px]"
                style={{
                  backgroundColor: "#ffffff",
                  WebkitMaskImage: "url(/logo_v1.svg)",
                  maskImage: "url(/logo_v1.svg)",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="h-full bg-white flex items-center justify-center p-10 lg:p-10">
            <div className="w-full max-w-md">
              <div className="rounded-2xl border border-black/10 shadow-xl px-10 py-9 bg-white">
                <h1 className="text-center text-xl font-semibold text-secondary">
                  Sign in to account
                </h1>

                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-11 pl-10 pr-3 rounded-lg bg-[#2b2b2b] text-white placeholder:text-white/55 border border-[#3b3b3b] focus-visible:ring-0 focus-visible:border-secondary"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 pl-10 pr-10 rounded-lg bg-[#2b2b2b] text-white placeholder:text-white/55 border border-[#3b3b3b] focus-visible:ring-0 focus-visible:border-secondary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 mt-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>

                  {error && (
                    <p className="text-sm text-red-600 text-center">{error}</p>
                  )}

                  <div className="pt-2 text-center space-y-2">
                    <a
                      href="#"
                      className="block text-sm text-secondary hover:underline"
                    >
                      Forgot your password?
                    </a>
                    <p className="text-sm text-secondary/70">
                      Don&apos;t have an account?{" "}
                      <a href="#" className="text-secondary font-semibold hover:underline">
                        Sign Up
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
