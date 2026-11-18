import { Routes, Route } from 'react-router-dom'
import GroupPage from './pages/GroupPage.tsx'

export default function App() {
  return (
    <Routes>
      <Route path="/g/:slug" element={<GroupPage />} />
      <Route path="*" element={<p className="p-6">Página não encontrada.</p>} />
    </Routes>
  )
}