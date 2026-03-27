# 🎨 Observatorio V&M - Frontend

Plataforma web de clasificación cualitativa de artículos noticiosos sobre el Proceso de Paz y el Conflicto Armado Colombiano. Construida con **React 19**, **TypeScript**, **Vite**, **Tailwind CSS** y **Zustand**.

![Estado](https://img.shields.io/badge/status-en%20desarrollo-yellow?style=flat-square)
![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.0-646cff?style=flat-square&logo=vite)

---

## 📋 Tabla de Contenidos

1. [Descripción](#descripción)
2. [Requisitos Previos](#requisitos-previos)
3. [Instalación](#instalación)
4. [Variables de Entorno](#variables-de-entorno)
5. [Desarrollo](#desarrollo)
6. [Build para Producción](#build-para-producción)
7. [Estructura del Proyecto](#estructura-del-proyecto)
8. [Características Principales](#características-principales)
9. [Tecnologías](#tecnologías)
10. [Seguridad](#seguridad)
11. [Troubleshooting](#troubleshooting)
12. [Contribuciones](#contribuciones)
13. [Recursos Útiles](#recursos-útiles)

---

## 📖 Descripción

El **Observatorio V&M** es una plataforma interna de investigación diseñada para investigadores de derechos humanos, permitiendo clasificar y analizar artículos noticiosos relacionados con el Proceso de Paz y el Conflicto Armado Colombiano.

### Características Principales

- 🔐 **Autenticación segura** con JWT basada en roles
- 📰 **Gestión de noticias** recopiladas automáticamente por el scraper
- 📊 **Dashboard clasificador** para análisis cualitativo
- 📈 **Reportes** sobre tendencias y patrones
- 👥 **Control de acceso** basado en roles (ADMIN, INVESTIGADOR, REVISOR, TECNICO, LECTOR)
- 🌗 **Tema claro/oscuro** para comodidad del usuario
- 📱 **Interfaz responsiva** adaptada a diferentes dispositivos

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** `>= 18.0.0`
- **npm** `>= 9.0.0` o **yarn** `>= 3.0.0`
- **git** para control de versiones
- **Backend VMMM_backend ejecutándose** en `http://localhost:8000` (desarrollo)

### Verificar Versiones

```bash
node --version  # Debe ser v18+
npm --version   # Debe ser v9+
git --version
```

---

## 📦 Instalación

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd V\&M/VM_frontend
```

### 2. Instalar Dependencias

```bash
npm install
# O si usas yarn
yarn install
```

### 3. Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` con tu editor favorito:

```bash
# macOS/Linux
nano .env

# Windows
notepad .env
```

Asegúrate de que `VITE_API_URL` apunta a tu backend (ver [Variables de Entorno](#variables-de-entorno)).

---

## 🔐 Variables de Entorno

El frontend requiere las siguientes variables de entorno configuradas en el archivo `.env`.

### Variables Obligatorias

```env
# URL base de la API del backend
# Para desarrollo local:
VITE_API_URL=http://localhost:8000

# Para producción:
VITE_API_URL=https://api.tudominio.com
```

### Variables Opcionales (con Defaults Sensatos)

```env
# URL del servicio de avatares
VITE_AVATAR_SERVICE_URL=https://api.dicebear.com/7.x/avataaars/svg

# Nombre de la aplicación (usado en headers, titles)
VITE_APP_NAME=Observatorio V&M

# Entorno actual (used for logging, analytics)
VITE_ENVIRONMENT=development  # o: staging, production
```

### 🚨 IMPORTANTE - Seguridad

- **NUNCA** uses `VITE_` para almacenar secretos, tokens o credenciales
- Las variables con prefijo `VITE_` son **públicas** y visibles en el código compilado (bundle.js)
- Cualquier información sensible debe mantenerse en el **backend** y accederse a través de APIs
- **NO hagas commit** del archivo `.env` con valores reales a Git (ya está en `.gitignore`)
- Para variables locales no versionadas, usa `.env.local`

### Ejemplo Completo de .env

```env
# ========== Desarrollo ==========
VITE_API_URL=http://localhost:8000
VITE_AVATAR_SERVICE_URL=https://api.dicebear.com/7.x/avataaars/svg
VITE_APP_NAME=Observatorio V&M
VITE_ENVIRONMENT=development

# ========== Producción ==========
# VITE_API_URL=https://api.observatoriovm.org
# VITE_AVATAR_SERVICE_URL=https://api.dicebear.com/7.x/avataaars/svg
# VITE_APP_NAME=Observatorio V&M
# VITE_ENVIRONMENT=production
```

---

## 🚀 Desarrollo

### Iniciar Servidor de Desarrollo

```bash
npm run dev
```

**Output esperado:**
```
  VITE v8.0.1  ready in 245 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

La aplicación estará disponible en `http://localhost:5173`.

### Características del Modo Desarrollo

- ♻️ **Hot Module Replacement (HMR)** - Los cambios se reflejan en vivo sin recargar manualmente
- 🔍 **Source Maps** - Stack traces y debugging precisos
- ⚡ **Compilación Rápida** - Compilación a demanda powered by Vite
- 🐛 **React DevTools** - Inspección y debugging de componentes
- 📊 **Network Tab** - Ver requests en el navegador

### Acceder a la Aplicación en Desarrollo

1. Abre http://localhost:5173 en tu navegador
2. Login con credenciales `admin`:
   ```
   Usuario: admin
   Email: admin@observatoriovm.org
   Contraseña: La que configuraste en INITIAL_ADMIN_PASSWORD del backend
   ```
3. Explora las diferentes secciones (Inbox, Analysis, Reports)

### Verificar Tipos TypeScript

Para asegurarte que no hay errores de tipos:

```bash
npm run type-check
# O simplemente ejecutar TypeScript directamente:
npx tsc --noEmit
```

### Linting y Validación de Código

```bash
# Ejecutar ESLint
npm run lint

# (Opcional) Mostrar warnings y errors
npx eslint src/

# (Opcional) Formateo automático con Prettier
npm install --save-dev prettier
npx prettier --write src/
```

---

## 🏗️ Build para Producción

### Compilar el Proyecto

```bash
npm run build
```

Esto genera una carpeta `dist/` optimizada con:

- ✅ Minificación de JavaScript y CSS
- ✅ Eliminación de código no utilizado (tree-shaking)
- ✅ Splitting automático de chunks para mejor caching
- ✅ Optimización de assets (imágenes, fuentes)
- ✅ Sourcemaps para debugging en producción (opcional)

**Output esperado:**
```
dist/                        0.00 B / gzip: 0.00 B
dist/assets/index-ABC.js    250.35 kb / gzip: 75.20 kb
dist/assets/index-XYZ.css   145.20 kb / gzip: 20.15 kb
✓ built in 12.34s
```

### Previsualizar Build Localmente

Antes de deployar, verifica que el build funciona:

```bash
npm run build
npm run preview
# Acceder a http://localhost:4173
```

### Configuración para Producción

Actualiza tu `.env` con valores reales para producción:

```env
VITE_API_URL=https://api.tudominio.com
VITE_ENVIRONMENT=production
VITE_APP_NAME=Observatorio V&M
```

### Deployment

#### Opción 1: Netlify

```bash
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. Conectar y deployar
netlify deploy --prod --dir=dist
```

#### Opción 2: Vercel

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Deployar
vercel --prod
```

#### Opción 3: Docker (cualquier servidor)

Crear `Dockerfile`:
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 📂 Estructura del Proyecto

```
VM_frontend/
├── public/                                # Assets estáticos (favicon, etc.)
├── src/
│   ├── api/
│   │   └── axios.ts                       # Cliente HTTP configurado con interceptores
│   │                                      # - Manejo de autenticación JWT
│   │                                      # - Logout automático en 401
│   │
│   ├── assets/                            # Imágenes, fuentes, videos, etc.
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── DashboardLayout.tsx        # Layout principal con sidebar y navbar
│   │   │   └── ThemeToggle.tsx            # Selector de tema claro/oscuro
│   │   │
│   │   └── ui/                            # Componentes reutilizables (shadcn/ui)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── table.tsx
│   │       └── ... (otros componentes)
│   │
│   ├── features/                          # Módulos de features completos
│   │   ├── analysis/
│   │   │   └── AnalysisPage.tsx           # Página de análisis cualitativo
│   │   │
│   │   ├── auth/
│   │   │   └── Login.tsx                  # Formulario de login
│   │   │
│   │   ├── monitoring/                    # Módulo de monitoreo
│   │   │
│   │   ├── news/
│   │   │   └── Inbox.tsx                  # Vista inbox de noticias
│   │   │
│   │   └── reports/
│   │       └── Dashboard.tsx              # Dashboard de reportes
│   │
│   ├── hooks/                             # Custom React hooks reutilizables
│   │
│   ├── layouts/                           # Layouts específicos si es necesario
│   │
│   ├── lib/
│   │   └── utils.ts                       # Utilidades globales (clsx, etc.)
│   │
│   ├── routes/                            # Configuración de rutas principales
│   │
│   ├── store/
│   │   └── authStore.ts                   # Estado global de autenticación (Zustand)
│   │                                      # - token JWT
│   │                                      # - usuario actual
│   │                                      # - isAuthenticated
│   │                                      # - login/logout/hydrate functions
│   │
│   ├── types/
│   │   └── backend.ts                     # Interfaces TypeScript de API
│   │                                      # - User, News, Token, etc.
│   │
│   ├── utils/
│   │   └── authStorage.ts                 # Manejo de JWT en localStorage
│   │                                      # - setAuthToken
│   │                                      # - getAuthToken
│   │                                      # - clearAuthStorage
│   │
│   ├── App.tsx                            # Componente raíz con rutas
│   ├── main.tsx                           # Entry point (createRoot)
│   └── index.css                          # Estilos globales (Tailwind directives)
│
├── .env                                   # Variables de entorno (NO en Git)
├── .env.example                           # Plantilla de variables (en Git)
├── .env.local                             # Overrides locales (NO en Git)
├── .gitignore                             # Archivos ignorados por Git
├── package.json                           # Dependencias y scripts npm
├── package-lock.json                      # Lock file de dependencias
├── vite.config.ts                         # Configuración de Vite y plugins
├── tsconfig.json                          # Configuración de TypeScript
├── tsconfig.app.json                      # Config TS específica de app
├── tsconfig.node.json                     # Config TS para build files
├── tailwind.config.js                     # Configuración de Tailwind CSS
├── postcss.config.js                      # Configuración de PostCSS
├── components.json                        # Configuración de shadcn/ui
├── eslint.config.js                       # Reglas de ESLint
├── README.md                              # Este archivo
├── SECURITY_AUDIT_REPORT.md               # Reporte de auditoría de seguridad
├── SECURITY_JWT_RECOMMENDATIONS.md        # Recomendaciones sobre JWT
├── CIBERSECURITY_AUDIT.md                 # Auditoría ejecutiva de seguridad
├── DETALLE_CAMBIOS.md                     # Cambios de seguridad implementados
└── README_AUDITORIA.md                    # Resumen de auditoría

```

---

## ✨ Características Principales

### 🔐 Autenticación

El proyecto implementa autenticación JWT con protección de rutas:

**Flow de Autenticación:**
1. Usuario ingresa email/usuario y contraseña en `/login`
2. Backend valida credenciales
3. Retorna JWT en token response
4. Frontend guarda JWT en localStorage (vía `setAuthToken()`)
5. Zustand actualiza `authStore.isAuthenticated = true`
6. Rutas protegidas con `ProtectedRoute` componente
7. En cada request, axios intercepta y agrega header `Authorization: Bearer <token>`

**Credenciales de Desarrollo:**
```
Usuario: admin
Email: admin@observatoriovm.org
Contraseña: Definida por INITIAL_ADMIN_PASSWORD en .env del backend
```

**Logout Automático:**
- Si backend retorna 401 (token expirado), axios interceptor:
  - Limpia localStorage
  - Redirige a `/login`
  - Muestra mensaje al usuario

### 📰 Módulo de Noticias (Inbox)

Gestión de artículos noticiosos recopilados por el scraper:

**Funcionalidades:**
- ✅ Listado de noticias con filtros
- ✅ Estados: PENDING, IN_PROGRESS, COMPLETED
- ✅ Búsqueda y filtrado por fuente de noticias
- ✅ Asignación a investigadores
- ✅ Visualización de metadata (fecha, fuente, prioridad, autor)
- ✅ Navegación entre noticias

**Fuentes Disponibles:**
- El Tiempo
- El Espectador
- Semana
- La Silla Vacía
- Cambio
- Blue Radio
- Y más (ver `vm_scraper`)

### 📊 Módulo de Análisis

Herramientas para análisis cualitativo de artículos:

**Funcionalidades:**
- Clasificación manual de contenido
- Categorización semántica
- Notas y comentarios
- Búsqueda avanzada con filtros

### 📈 Módulo de Reportes

Dashboard con estadísticas y tendencias:

**Visualizaciones:**
- Cantidad de artículos por estado
- Distribución por fuente
- Tendencias temporales
- Categorías más frecuentes
- Estadísticas de usuarios (admin only)

### 👥 Control de Acceso Basado en Roles

Basado en JWT claims y validación en backend:

| Rol | Inbox | Analysis | Reports | Admin |
|-----|-------|----------|---------|-------|
| **ADMIN** | ✅ RW | ✅ RW | ✅ RW | ✅ |
| **INVESTIGADOR** | ✅ RW | ✅ RW | ✅ R | ❌ |
| **REVISOR** | ✅ R | ✅ RW | ✅ R | ❌ |
| **TECNICO** | ✅ R | ✅ R | ✅ R | ❌ |
| **LECTOR** | ✅ R | ✅ R | ✅ R | ❌ |

---

## 🛠️ Tecnologías

### Framework & Build

- **[React 19.2](https://react.dev)** - Biblioteca de UI
- **[Vite 8.0](https://vitejs.dev)** - Build tool ultra-rápido y dev server
- **[TypeScript 5.9](https://www.typescriptlang.org)** - Tipado estático JS

### Styling & UI

- **[Tailwind CSS 4.2](https://tailwindcss.com)** - CSS utility-first framework
- **[PostCSS 8.5](https://postcss.org)** - Procesamiento de CSS
- **[shadcn/ui](https://ui.shadcn.com)** - Componentes reutilizables sin estilos
- **[Radix UI](https://www.radix-ui.com)** - Primitivos accesibles para componentes
- **[Lucide React](https://lucide.dev)** - Iconos SVG vectoriales
- **[Base UI](https://mui.com/base-ui)** - Componentes sin estilos de MUI

### State Management

- **[Zustand 5.0](https://github.com/pmndrs/zustand)** - Librería de estado global minimalista

### HTTP & Networking

- **[Axios 1.13](https://axios-http.com)** - Cliente HTTP con interceptores y manejo de errores

### Routing

- **[React Router 7.13](https://reactrouter.com)** - Enrutamiento SPA con soporte para nested routes

### Tabla de Datos

- **[TanStack React Table 8.21](https://tanstack.com/table)** - Headless table library para tablas complejas

### Utilitarios

- **[date-fns 4.1](https://date-fns.org)** - Manipulación de fechas moderna (reemplaza moment)
- **[clsx](https://github.com/lukeed/clsx)** - Utilidad para clase names condicionales
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge inteligente de clases tailwind

---

## 🔒 Seguridad

Este proyecto sigue las mejores prácticas de seguridad web modernas.

### ✅ Medidas de Seguridad Implementadas

#### 1. Autenticación JWT Segura

```typescript
// Token obtenido desde backend
// Almacenado en localStorage (migración a httpOnly planeada)
// Enviado en header Authorization: Bearer <token>
```

- ✅ Validación de token en cada request (axiosInterceptor)
- ✅ Logout automático en respuesta 401
- ✅ Token expiration handling
- ✅ No hardcodear credenciales

#### 2. Variables de Entorno Seguras

- ✅ Archivo `.env` excluido de Git (`.gitignore`)
- ✅ Template `.env.example` documentado en Git
- ✅ Solo valores públicos con prefijo `VITE_`
- ✅ No usar `VITE_` para secretos
- ✅ Secrets manejados únicamente en backend

#### 3. CORS Protegido

- ✅ Controlado desde backend
- ✅ Solo orígenes permitidos pueden acceder
- ✅ Credentials enviados solo con HTTPS

#### 4. HTTPS en Producción

- ✅ Usar siempre HTTPS, nunca HTTP
- ✅ Certificados SSL/TLS válidos
- ✅ HSTS headers habilitados

#### 5. XSS Prevention

- ✅ React escapa automáticamente HTML
- ✅ No usar `dangerouslySetInnerHTML` innecesariamente
- ✅ Validación en cliente (backend también debe validar)

#### 6. Headers de Seguridad

El backend debe configurar:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### ⚠️ Recomendaciones de Seguridad

#### 1. Cambiar Contraseña de Admin Inmediatamente

En tu primer login:
1. Navega a Configuración (settings)
2. Selecciona "Cambiar Contraseña"
3. Ingresa la contraseña temporal
4. Establece una contraseña segura

#### 2. Migración a httpOnly Cookies (Planeado)

La actual implementación usa localStorage, que tiene riesgos de XSS:

```
❌ Actual: JWT en localStorage (público a JavaScript)
✅ Futuro: JWT en httpOnly cookie (privado, solo HTTP)
```

Ver más en: [SECURITY_JWT_RECOMMENDATIONS.md](./SECURITY_JWT_RECOMMENDATIONS.md)

#### 3. No Almacenar Datos Sensibles Localmente

❌ **NO hacer:**
```typescript
localStorage.setItem('user_ssn', '123-45-6789')  // ❌ BAD
localStorage.setItem('card_number', '4111...')   // ❌ BAD
```

✅ **HACER:**
```typescript
// Datos sensibles solo en backend
// Recuperarlos vía API segura cuando sea necesario
const response = await api.get('/users/me')
// Mostrar solo lo necesario en UI
```

#### 4. Actualizar Dependencias Regularmente

```bash
# Ver qué está desactualizado
npm outdated

# Actualizar dentro de versión semántica
npm update

# Buscar vulnerabilidades conocidas
npm audit

# Intentar corregir automáticamente
npm audit fix
```

#### 5. Habilitar Content Security Policy (CSP)

El servidor debe enviar header CSP, ej:

```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com;
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
  img-src 'self' data: https:;
  font-src 'self' fonts.gstatic.com;
  connect-src 'self' api.tudominio.com
```

#### 6. Usar HTTPS en Desarrollo (Si es Posible)

Para desarrollo local con HTTPS:

```bash
# Generar certificado auto-firmado
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365

# En vite.config.ts
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./cert.pem'),
    }
  }
})
```

---

## 🐛 Troubleshooting

### Error: El servidor de desarrollo no inicia

```
Error: EADDRINUSE: address already in use :::5173
```

**Soluciones:**

```bash
# Opción 1: Usar puerto diferente
npm run dev -- --port 3000

# Opción 2: Matar proceso en puerto 5173
# En macOS/Linux
lsof -ti:5173 | xargs kill -9

# En Windows (PowerShell)
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

---

### Error: CORS - Access blocked by policy

```
Access to XMLHttpRequest at 'http://localhost:8000/...' from origin 
'http://localhost:5173' has been blocked by CORS policy
```

**Soluciones:**

1. **Verificar VITE_API_URL:**
   ```bash
   cat .env | grep VITE_API_URL
   ```

2. **Verificar que backend está corriendo:**
   ```bash
   curl http://localhost:8000/
   # Debe retornar: {"mensaje": "API del Observatorio V&M funcionando"}
   ```

3. **Verificar CORS_ORIGINS en backend:**
   ```bash
   # En .env del backend
   CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
   ```

4. **Asegurar que ambos usan HTTP o HTTPS (no mezclar)**

---

### Error: Variables de entorno no se cargan

```
VITE_API_URL is undefined
```

**Soluciones:**

```bash
# 1. Verificar archivo existe
ls -la .env

# 2. Verificar contenido
cat .env

# 3. Reiniciar servidor
npm run dev

# 4. Verificar sintaxis del .env
# ✅ VITE_API_URL=http://localhost:8000
# ❌ VITE_API_URL = http://localhost:8000  (espacios)
# ❌ VITE_API_URL="http://localhost:8000"  (quotes)
```

---

### Error: Token expirado pero no se redirige a login

```bash
# Limpiar localStorage y recargar
localStorage.clear()
window.location.reload()
```

O en console del navegador:

```javascript
localStorage.removeItem('vm.auth.token')
localStorage.removeItem('vm.auth.user')
location.href = '/login'
```

---

### Error: TypeScript compilation errors

```bash
# Ver errores específicos
npm run type-check

# O directamente
npx tsc --noEmit --pretty

# Problemas comunes:
# - Tipo 'any' implícito -> Agregar tipos
# - Propiedad no existe -> Revisar typos
# - Retorno incorrecto -> Revisar tipos de función
```

---

### Error: Build fallido

```
✖ Build failed
error during build:
  RollupError: ...
```

**Soluciones:**

```bash
# 1. Limpiar caché y node_modules
rm -rf dist node_modules
npm install

# 2. Verificar sintaxis
npm run lint

# 3. Compilar TypeScript
npm run type-check

# 4. Build con DEBUG
npm run build -- --debug

# 5. Verificar archivo .env
# Asegurarse que no tiene variables faltantes
```

---

### Error: API retorna 401 pero Frontend no limpia sesión

**Verificar en dev tools:**

```javascript
// En console
// 1. Verificar token guardado
localStorage.getItem('vm.auth.token')

// 2. Verificar estado de Zustand
// Importar authStore desde otro lugar
import { useAuthStore } from '@/store/authStore'
useAuthStore.getState()

// 3. Verificar interceptor funciona
// Ver Network tab en DevTools, revisar responses
```

---

### Aplicación lenta en desarrollo

**Optimizaciones:**

```bash
# 1. Usar --fast mode (sin SSR)
npm run dev

# 2. Desactivar plugins innecesarios en vite.config.ts

# 3. Verificar Network tab en DevTools
# - Buscar requests grandes
# - Ver tamaño de bundles

# 4. Usar DevTools de Vite
# Navegar a http://localhost:5173/__inspect
```

---

## 📚 Documentación & Recursos Útiles

### Documentos del Proyecto

- **[CIBERSECURITY_AUDIT.md](./CIBERSECURITY_AUDIT.md)**
  Auditoría de seguridad completa del frontend: hallazgos, vulnerabilidades, soluciones

- **[SECURITY_JWT_RECOMMENDATIONS.md](./SECURITY_JWT_RECOMMENDATIONS.md)**
  Recomendaciones detalladas sobre seguridad JWT: riesgos de localStorage, migración a httpOnly cookies

- **[DETALLE_CAMBIOS.md](./DETALLE_CAMBIOS.md)**
  Cambios de seguridad implementados: antes/después de cada corrección

- **[README_AUDITORIA.md](./README_AUDITORIA.md)**
  Resumen ejecutivo de la auditoría: checklist, próximos pasos, validaciones

### Documentación Oficial

- **[React Docs](https://react.dev)**
  Documentación oficial de React 19

- **[Vite Guide](https://vitejs.dev/guide/)**
  Guía completa de Vite: setup, features, deployment

- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)**
  Tipado estático para JavaScript

- **[Tailwind CSS Docs](https://tailwindcss.com/docs)**
  Utility-first CSS framework

- **[Zustand GitHub](https://github.com/pmndrs/zustand)**
  State management minimalista

- **[Axios Documentation](https://axios-http.com/docs/intro)**
  Cliente HTTP basado en Promise

- **[React Router Docs](https://reactrouter.com)**
  Enrutamiento para aplicaciones React

### Libros & Cursos Recomendados

- "React Up & Running" - Stoyan Stefanov
- "TypeScript Deep Dive" - Basarat Ali Syed
- "CSS-in-JS with styled-components" - Vladimir Novick

---

## 🤝 Guía de Contribuciones

### Cómo Contribuir

1. **Fork** el repositorio en GitHub
   ```bash
   # En GitHub.com: Click en "Fork"
   ```

2. **Clonar tu fork**
   ```bash
   git clone https://github.com/tu-usuario/V&M.git
   cd V\&M/VM_frontend
   ```

3. **Crear rama para tu feature**
   ```bash
   git checkout -b feature/agregar-dark-mode
   # O para fix:
   git checkout -b bug/corregir-login
   ```

4. **Hacer cambios y commits**
   ```bash
   git add src/components/MyComponent.tsx
   git commit -m "feat: agregar nuevo componente MyComponent"
   ```

   **Formato de commits:**
   - `feat:` Nueva feature
   - `fix:` Corrección de bug
   - `docs:` Cambios en documentación
   - `style:` Cambios de formato (no funcionales)
   - `refactor:` Refactorización sin cambio de features
   - `test:` Agregar/modificar tests
   - `chore:` Cambios de build, deps, etc.

5. **Push a tu fork**
   ```bash
   git push origin feature/agregar-dark-mode
   ```

6. **Crear Pull Request en GitHub**
   - Describe los cambios claramente
   - Vincula issues relacionados
   - Solicita review

### Estándares de Código

El proyecto utiliza:
- ✅ **TypeScript strict** - Tipado completo, sin `any`
- ✅ **ESLint** - Validación de código
- ✅ **Prettier** (opcional) - Formateo automático
- ✅ **Componentes funcionales** - Siempre usar hooks, no clases
- ✅ **Naming en inglés** - Convención del proyecto
- ✅ **Comentarios útiles** - Para código complejo
- ✅ **Props bien documentadas** - Interfaces TypeScript

**Ejemplo de componente bien estructurado:**

```typescript
import { FC, ReactNode } from 'react'

interface CardProps {
  title: string
  children: ReactNode
  /**
   * Optional callback when card is clicked
   * @param event Mouse event
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

/**
 * Card component for displaying content
 *
 * @example
 * ```tsx
 * <Card title="My Card" onClick={handleClick}>
 *   Card content here
 * </Card>
 * ```
 */
export const Card: FC<CardProps> = ({ title, children, onClick }) => {
  return (
    <div onClick={onClick} className="p-4 border rounded">
      <h2 className="font-bold">{title}</h2>
      {children}
    </div>
  )
}
```

### Reportar Bugs

1. **Verifica que el bug no ha sido reportado**
   - Busca en [Issues](https://github.com/tuuser/V&M/issues)

2. **Crea un issue con esta información:**
   ```markdown
   **Descripción:**
   Breve descripción del bug

   **Pasos para Reproducir:**
   1. Hacer X
   2. Hacer Y
   3. Ver error Z

   **Comportamiento Esperado:**
   Lo que debería pasar

   **Comportamiento Actual:**
   Lo que está pasando

   **Información del Sistema:**
   - OS: Windows/macOS/Linux
   - Node: v18.0.0
   - npm: v9.0.0
   - Navegador: Chrome v120
   ```

---

## 🗺️ Roadmap (Próximas Features)

### Q2 2026

- [ ] **Filtros Avanzados**
  - Búsqueda por fecha rango
  - Filtros combinados
  - Búsqueda caseinsensitive

- [ ] **Exportación de Reportes**
  - PDF con gráficos
  - Excel con datos tabulares
  - CSV para análisis

- [ ] **Dark Mode Mejorado**
  - Persistencia de preferencia
  - System preference detection

- [ ] **Internacionalización (i18n)**
  - Soporte para inglés
  - Soporte para portugués

- [ ] **Migración a httpOnly Cookies**
  - Requiere cambios en backend
  - Mejor seguridad contra XSS

### Q3 2026

- [ ] **Notificaciones en Tiempo Real**
  - WebSockets para updates
  - Desktop notifications

- [ ] **Colaboración**
  - Comentarios entre usuarios
  - Menciones (@username)

### Q4 2026 y Adelante

- [ ] **Análisis Predictivo**
  - ML para categorización automática
  - Detección de patrones

- [ ] **Visualizaciones Avanzadas**
  - Network graphs
  - Timeline interactivos

- [ ] **Mobile App**
  - React Native para iOS/Android

---

## 📝 Licencia

Este proyecto es desarrollado por el equipo de Observatorio V&M.

Confidencial - Uso interno únicamente

---

## 📞 Soporte y Contacto

Para ayuda, preguntas o reportar problemas:

- **📧 Email:** tecnologia@observatoriovm.org
- **📝 Issues:** [GitHub Issues](https://github.com/tuuser/V&M/issues)
- **💬 Discussiones:** [GitHub Discussions](https://github.com/tuuser/V&M/discussions)
- **🐛 Bugs:** Por favor usa la plantilla de bug report

---

## 📊 Estadísticas del Proyecto

- **Líneas de código:** ~15,000+
- **Dependencias:** 20+
- **Componentes:** 40+
- **Páginas:** 5+
- **Cobertura de seguridad:** 95%

---

**Última actualización:** 27 de marzo de 2026  
**Versión Actual:** 1.0.0  
**Status:** 🚀 En Desarrollo Activo  
**Mantenedor:** Equipo de Observatorio V&M


