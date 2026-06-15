import { NavLink } from 'react-router-dom'
import { LayoutGrid, Image, Sparkles } from 'lucide-react'
import { playSfx } from '../lib/sfx'

const tabs = [
  { to: '/dashboard', label: 'Home', icon: LayoutGrid },
    { to: '/gallery', label: 'Galeri', icon: Image },
      { to: '/segera', label: 'Segera', icon: Sparkles },
      ]

      export default function BottomNav() {
        return (
            <nav
                  className="fixed inset-x-0 bottom-0 z-30 mx-auto flex w-full max-w-3xl justify-center px-4"
                        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
                            >
                                  <div className="mb-3 flex w-full items-center justify-around gap-1 rounded-full border border-white/60 bg-white/55 px-3 py-2 shadow-glass-lg backdrop-blur-glass">
                                          {tabs.map(({ to, label, icon: Icon }) => (
                                                    <NavLink
                                                                key={to}
                                                                            to={to}
                                                                                        onClick={() => playSfx('softClick')}
                                                                                                    className={({ isActive }) =>
                                                                                                                  `flex flex-1 flex-col items-center gap-0.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                                                                                                                                  isActive ? 'bg-blush-500 text-white shadow-glow' : 'text-plum-500'
                                                                                                                                                }`
                                                                                                                                                            }
                                                                                                                                                                      >
                                                                                                                                                                                  <Icon size={20} strokeWidth={2.2} />
                                                                                                                                                                                              {label}
                                                                                                                                                                                                        </NavLink>
                                                                                                                                                                                                                ))}
                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                          </nav>
                                                                                                                                                                                                                            )
                                                                                                                                                                                                                            }