import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import Login from "./features/auth/Login"
import DashboardLayout from "./components/layout/DashboardLayout"
import Inbox from "./features/news/Inbox"
import AnalysisPage from "./features/analysis/AnalysisPage"
import Dashboard from "./features/reports/Dashboard"
import { useAuthStore } from "@/store/authStore"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/app/inbox" replace /> },
      { path: "inbox", element: <Inbox /> },
      { path: "analysis", element: <AnalysisPage /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
