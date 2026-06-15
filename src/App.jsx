import { Navigate, Route, Routes } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useApp } from './context/AppContext'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import PhotoGalleryPage from './pages/PhotoGalleryPage'
import ComingSoonPage from './pages/ComingSoonPage'

function FullScreenLoader() {
  return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
            <Heart size={36} className="animate-pulse fill-blush-400 text-blush-400" />
                  <p className="text-sm text-plum-400">Menyiapkan Memory Vault...</p>
                      </div>
                        )
                        }

                        function ProtectedRoute({ children }) {
                          const { sessionReady, isAuthenticated } = useApp()
                            if (!sessionReady) return <FullScreenLoader />
                              if (!isAuthenticated) return <Navigate to="/login" replace />
                                return children
                                }

                                export default function App() {
                                  const { sessionReady, isAuthenticated } = useApp()

                                    return (
                                        <Routes>
                                              <Route
                                                      path="/"
                                                              element={
                                                                        !sessionReady ? (
                                                                                    <FullScreenLoader />
                                                                                              ) : (
                                                                                                          <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />
                                                                                                                    )
                                                                                                                            }
                                                                                                                                  />
                                                                                                                                        <Route path="/login" element={<LoginPage />} />
                                                                                                                                              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                                                                                                                                                    <Route path="/gallery" element={<ProtectedRoute><PhotoGalleryPage /></ProtectedRoute>} />
                                                                                                                                                          <Route path="/segera" element={<ProtectedRoute><ComingSoonPage /></ProtectedRoute>} />
                                                                                                                                                                <Route path="*" element={<Navigate to="/" replace />} />
                                                                                                                                                                    </Routes>
                                                                                                                                                                      )
                                                                                                                                                                      }