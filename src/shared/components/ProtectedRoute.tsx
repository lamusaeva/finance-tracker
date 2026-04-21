import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

// Not Logged in
export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" />
  return <>{children}</>
}

// Logged in
export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (user) return <Navigate to="/" />
  return <>{children}</>
}