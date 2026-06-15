import { motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import { useApp } from '../context/AppContext'

const greetings = {
  Addin: 'Halo, Addin 👋',
    Risma: 'Halo, Risma 👋',
    }

    export default function TopBar({ title }) {
      const { identity, switchIdentity } = useApp()

        const today = new Intl.DateTimeFormat('id-ID', {
            weekday: 'long',
                day: 'numeric',
                    month: 'long',
                      }).format(new Date())

                        return (
                            <motion.header
                                  initial={{ opacity: 0, y: -12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                              transition={{ duration: 0.4 }}
                                                    className="sticky top-0 z-20 mx-auto flex w-full max-w-3xl items-center justify-between px-5 pb-4 pt-6 backdrop-blur-sm"
                                                        >
                                                              <div>
                                                                      <h1 className="text-xl font-semibold text-plum-600">
                                                                                {title || (identity ? greetings[identity] : 'Memory Vault')}
                                                                                        </h1>
                                                                                                <p className="text-sm text-plum-400">{today}</p>
                                                                                                      </div>
                                                                                                            {identity && (
                                                                                                                    <button
                                                                                                                              onClick={switchIdentity}
                                                                                                                                        className="flex items-center gap-1.5 rounded-full border border-white/60 bg-white/50 px-3 py-2 text-xs font-medium text-blush-700 shadow-glass backdrop-blur-glass active:scale-95"
                                                                                                                                                  aria-label="Ganti identitas"
                                                                                                                                                          >
                                                                                                                                                                    <LogOut size={14} />
                                                                                                                                                                              Ganti
                                                                                                                                                                                      </button>
                                                                                                                                                                                            )}
                                                                                                                                                                                                </motion.header>
                                                                                                                                                                                                  )
                                                                                                                                                                                                  }