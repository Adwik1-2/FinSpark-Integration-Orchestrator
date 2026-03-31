import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layouts/Layout'
import Dashboard from './pages/Dashboard'
import NewIntegration from './pages/NewIntegration'
import APIRegistry from './pages/APIRegistry'
import Configurations from './pages/Configurations'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="new-integration" element={<NewIntegration />} />
        <Route path="api-registry" element={<APIRegistry />} />
        <Route path="configurations" element={<Configurations />} />
      </Route>
    </Routes>
  )
}
