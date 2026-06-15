import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { ensureAnonymousSession } from '../lib/supabase'

const AppContext = createContext(null)

const IDENTITY_KEY = 'memoryVault.identity'
const CHECKIN_KEY_PREFIX = 'memoryVault.checkin.'

export function todayKey() {
  const d = new Date()
    const y = d.getFullYear()
      const m = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
          return `${y}-${m}-${day}`
          }

          export function AppProvider({ children }) {
            const [identity, setIdentityState] = useState(() => localStorage.getItem(IDENTITY_KEY) || null)
              const [sessionReady, setSessionReady] = useState(false)
                const [checkedInToday, setCheckedInToday] = useState(false)

                  useEffect(() => {
                      ensureAnonymousSession().finally(() => setSessionReady(true))
                        }, [])

                          useEffect(() => {
                              if (!identity) {
                                    setCheckedInToday(false)
                                          return
                                              }
                                                  const flag = localStorage.getItem(CHECKIN_KEY_PREFIX + identity)
                                                      setCheckedInToday(flag === todayKey())
                                                        }, [identity])

                                                          const setIdentity = useCallback((value) => {
                                                              if (value) {
                                                                    localStorage.setItem(IDENTITY_KEY, value)
                                                                        } else {
                                                                              localStorage.removeItem(IDENTITY_KEY)
                                                                                  }
                                                                                      setIdentityState(value)
                                                                                        }, [])

                                                                                          const markCheckedInToday = useCallback((who) => {
                                                                                              localStorage.setItem(CHECKIN_KEY_PREFIX + who, todayKey())
                                                                                                  setCheckedInToday(true)
                                                                                                    }, [])

                                                                                                      const switchIdentity = useCallback(() => {
                                                                                                          setIdentity(null)
                                                                                                            }, [setIdentity])

                                                                                                              const otherIdentity = identity === 'Addin' ? 'Risma' : identity === 'Risma' ? 'Addin' : null

                                                                                                                const value = {
                                                                                                                    identity,
                                                                                                                        setIdentity,
                                                                                                                            switchIdentity,
                                                                                                                                otherIdentity,
                                                                                                                                    sessionReady,
                                                                                                                                        checkedInToday,
                                                                                                                                            markCheckedInToday,
                                                                                                                                                isAuthenticated: Boolean(identity) && checkedInToday,
                                                                                                                                                  }

                                                                                                                                                    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
                                                                                                                                                    }

                                                                                                                                                    export function useApp() {
                                                                                                                                                      const ctx = useContext(AppContext)
                                                                                                                                                        if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
                                                                                                                                                          return ctx
                                                                                                                                                          }