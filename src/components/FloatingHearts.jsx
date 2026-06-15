import { useEffect, useState } from 'react'

const AMBIENT_HEARTS = Array.from({ length: 6 }).map((_, i) => ({
  id: `ambient-${i}`,
    left: `${10 + ((i * 16) % 85)}%`,
      size: 14 + ((i * 5) % 16),
        delay: (i * 2.1) % 12,
          duration: 10 + ((i * 4) % 8),
          }))

          function HeartIcon({ size, color = '#FF8FB8' }) {
            return (
                <svg viewBox="0 0 32 32" width={size} height={size}>
                      <path
                              fill={color}
                                      d="M16 28.5 3.6 16.7C0.6 13.9 0.6 9.3 3.6 6.5c2.8-2.6 7.2-2.6 10 0L16 8.8l2.4-2.3c2.8-2.6 7.2-2.6 10 0 3 2.8 3 7.4 0 10.2L16 28.5z"
                                            />
                                                </svg>
                                                  )
                                                  }

                                                  export function FloatingHearts() {
                                                    return (
                                                        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
                                                              {AMBIENT_HEARTS.map((h) => (
                                                                      <div
                                                                                key={h.id}
                                                                                          className="absolute bottom-0 animate-floatUp"
                                                                                                    style={{ left: h.left, animationDelay: `${h.delay}s`, animationDuration: `${h.duration}s` }}
                                                                                                            >
                                                                                                                      <HeartIcon size={h.size} />
                                                                                                                              </div>
                                                                                                                                    ))}
                                                                                                                                        </div>
                                                                                                                                          )
                                                                                                                                          }

                                                                                                                                          export function HeartBurst({ triggerKey }) {
                                                                                                                                            const [hearts, setHearts] = useState([])

                                                                                                                                              useEffect(() => {
                                                                                                                                                  if (!triggerKey) return
                                                                                                                                                      const burst = Array.from({ length: 6 }).map((_, i) => ({
                                                                                                                                                            id: `${triggerKey}-${i}`,
                                                                                                                                                                  offset: (i - 2.5) * 14,
                                                                                                                                                                        size: 12 + (i % 3) * 6,
                                                                                                                                                                              delay: i * 0.04,
                                                                                                                                                                                  }))
                                                                                                                                                                                      setHearts(burst)
                                                                                                                                                                                          const t = setTimeout(() => setHearts([]), 900)
                                                                                                                                                                                              return () => clearTimeout(t)
                                                                                                                                                                                                }, [triggerKey])

                                                                                                                                                                                                  if (!hearts.length) return null

                                                                                                                                                                                                    return (
                                                                                                                                                                                                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                                                                                                                                                                                                              {hearts.map((h) => (
                                                                                                                                                                                                                      <div
                                                                                                                                                                                                                                key={h.id}
                                                                                                                                                                                                                                          className="absolute animate-floatUp"
                                                                                                                                                                                                                                                    style={{
                                                                                                                                                                                                                                                                transform: `translateX(${h.offset}px)`,
                                                                                                                                                                                                                                                                            animationDuration: '0.9s',
                                                                                                                                                                                                                                                                                        animationDelay: `${h.delay}s`,
                                                                                                                                                                                                                                                                                                    animationIterationCount: 1,
                                                                                                                                                                                                                                                                                                              }}
                                                                                                                                                                                                                                                                                                                      >
                                                                                                                                                                                                                                                                                                                                <HeartIcon size={h.size} color="#F2447D" />
                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                              ))}
                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                    )
                                                                                                                                                                                                                                                                                                                                                    }