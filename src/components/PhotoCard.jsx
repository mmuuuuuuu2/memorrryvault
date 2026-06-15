import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function PhotoCard({ photo, onOpen, onToggleFavorite }) {
  return (
      <motion.button
            type="button"
                  onClick={() => onOpen(photo)}
                        whileTap={{ scale: 0.97 }}
                              className="group relative mb-3 block w-full overflow-hidden rounded-3xl border border-white/50 bg-white/40 shadow-glass backdrop-blur-glass"
                                  >
                                        <img
                                                src={photo.url}
                                                        alt={photo.title || 'Memory'}
                                                                loading="lazy"
                                                                        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                                                style={{ aspectRatio: '4 / 5' }}
                                                                                      />
                                                                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-700/60 via-transparent to-transparent" />
                                                                                                  <button
                                                                                                          type="button"
                                                                                                                  onClick={(e) => {
                                                                                                                            e.stopPropagation()
                                                                                                                                      onToggleFavorite(photo)
                                                                                                                                              }}
                                                                                                                                                      className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 shadow-glass backdrop-blur-glass active:scale-90"
                                                                                                                                                              aria-label="Favorite"
                                                                                                                                                                    >
                                                                                                                                                                            <Heart size={18} className={photo.is_favorite ? 'fill-blush-600 text-blush-600' : 'text-plum-500'} />
                                                                                                                                                                                  </button>
                                                                                                                                                                                        {photo.title && (
                                                                                                                                                                                                <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                                                                                                                                                                                                          <p className="line-clamp-2 text-sm font-semibold text-white drop-shadow">{photo.title}</p>
                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                        )}
                                                                                                                                                                                                                            </motion.button>
                                                                                                                                                                                                                              )
                                                                                                                                                                                                                              }