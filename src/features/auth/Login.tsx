import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/app/inbox');
  };

  return (
    <div className="flex min-h-screen w-full bg-background font-sans overflow-hidden">
      {/* Columna Izquierda - Branding (Unified 50%) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary flex-col justify-center p-16 xl:p-24 overflow-hidden">
        {/* Contenido Izquierdo - Tipografía Académica Limpia */}
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
              <span className="text-white font-bold text-lg leading-none">V</span>
            </div>
            <h2 className="text-white/80 font-['Manrope'] font-bold text-sm tracking-[0.1em] uppercase">Observatorio V&M</h2>
          </div>
          
          <h1 className="text-5xl xl:text-6xl font-bold font-['Manrope'] mb-8 text-white tracking-[-0.03em] leading-tight">
            Inteligencia para <br />
            los Derechos Humanos
          </h1>
          <p className="text-white/70 text-xl leading-relaxed font-medium max-w-md">
            Plataforma académica diseñada para el análisis crítico, el monitoreo sistemático y la curaduría digital de datos humanitarios.
          </p>
        </div>

        {/* Decoración sutil de fondo (Sin imagen) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
      </div>

      {/* Columna Derecha - Formulario (Unified 50%) */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 sm:p-16 lg:p-24 bg-background">
        <div className="w-full max-w-[400px] space-y-10">
          {/* Encabezado del Formulario */}
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-[-0.02em] text-foreground font-['Manrope']">Iniciar Sesión</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Acceda a su panel de investigador especializado.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-6">
              {/* Email */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80 ml-1">
                  Correo Electrónico
                </Label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="nombre@institucion.org"
                    className="h-14 pl-12 bg-muted/40 border-none text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-white transition-all rounded-xl text-base shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80">
                    Contraseña
                  </Label>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
                    <Lock className="w-5 h-5" />
                  </div>
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    className="h-14 pl-12 pr-12 bg-muted/40 border-none text-foreground focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-white transition-all rounded-xl text-base shadow-sm"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Opciones Adicionales */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="remember" 
                  className="w-5 h-5 rounded-md border-muted-foreground/20 data-[state=checked]:bg-primary transition-all shadow-sm" 
                />
                <Label htmlFor="remember" className="text-sm text-muted-foreground font-medium cursor-pointer">
                  Mantener activa
                </Label>
              </div>
              <a href="#" className="text-sm font-bold text-primary hover:underline underline-offset-4">
                ¿Olvidó su contraseña?
              </a>
            </div>

            {/* Botón de Submit - Signature Style */}
            <Button 
              type="submit" 
              className="w-full h-14 bg-primary hover:opacity-95 text-white font-bold text-lg rounded-xl transition-all shadow-xl shadow-primary/10 flex items-center justify-center space-x-2"
            >
              <span>Ingresar al Sistema</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </form>

          {/* Footer Minimalista (Simplificado) */}
          <div className="pt-10 text-center space-y-6">
            <p className="text-sm font-medium text-muted-foreground leading-relaxed">
              ¿No tienes cuenta? <br />
              <button className="text-foreground font-bold underline decoration-primary/30 underline-offset-4 hover:decoration-primary transition-all">
                Contacta al administrador del sistema.
              </button>
            </p>
            
            <p className="text-[10px] text-muted-foreground/40 leading-normal max-w-[280px] mx-auto uppercase tracking-tighter">
              Asegúrese de usar sus credenciales institucionales otorgadas por el Observatorio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
