import { Routes, Route } from 'react-router-dom'
import GroupPage from './pages/GroupPage'
import LoginPage from './pages/LoginPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import DashboardPage from './pages/DashboardPage'
import MembersPage from './pages/MembersPage'
import DrawPage from './pages/DrawPage'
import AttendancePage from './pages/AttendancePage'
import BirthdaysPage from './pages/BirthdaysPage'
import ProtectedRoute from './features/auth/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/g/:slug" element={<GroupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/redefinir-senha" element={<ResetPasswordPage />} />

      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/aniversariantes" element={<ProtectedRoute><BirthdaysPage /></ProtectedRoute>} />

      <Route path="/membros" element={<ProtectedRoute requireLeader><MembersPage /></ProtectedRoute>} />
      <Route path="/sorteio" element={<ProtectedRoute requireLeader><DrawPage /></ProtectedRoute>} />
      <Route path="/presenca" element={<ProtectedRoute requireLeader><AttendancePage /></ProtectedRoute>} />

      <Route path="*" element={<p className="p-6">Página não encontrada.</p>} />
    </Routes>
  )
}