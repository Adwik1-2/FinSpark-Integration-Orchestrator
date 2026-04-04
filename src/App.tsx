import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import NewIntegration from './pages/NewIntegration'
import APIRegistry from './pages/APIRegistry'
import Configurations from './pages/Configurations'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="new-integration" element={<NewIntegration />} />
          <Route path="api-registry" element={<APIRegistry />} />
          <Route path="configurations" element={<Configurations />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
