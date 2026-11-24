import { Routes, Route } from 'react-router-dom'
import GroupPage from './pages/GroupPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './features/auth/ProtectedRoute'
import MembersPage from './pages/MembersPage'

export default function App() {
  return (
    <Routes>
      <Route path="/g/:slug" element={<GroupPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<p className="p-6">Página não encontrada.</p>} />
      <Route
  path="/membros"
  element={
    <ProtectedRoute requireLeader>
      <MembersPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/membros"
  element={
    <ProtectedRoute requireLeader>
      <MembersPage />
    </ProtectedRoute>
  }
/>
    </Routes>
  )
}