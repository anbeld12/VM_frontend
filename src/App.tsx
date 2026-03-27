import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import Login from "./features/auth/Login"
import DashboardLayout from "./components/layout/DashboardLayout"
import Inbox from "./features/news/Inbox"
import AnalysisPage from "./features/analysis/AnalysisPage"
import Dashboard from "./features/reports/Dashboard"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/app",
    element: <DashboardLayout />,
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
