import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'

export default function PhotoEditModal({ open, photo, albums, onClose, onSave, onCreateAlbum, uploadedBy }) {
  const [title, setTitle] = useState('')
    const [story, setStory] = useState('')
      const [albumId, setAlbumId] = useState('')
        const [newAlbum, setNewAlbum] = useState('')
          const [submitting, setSubmitting] = useState(false)

            useEffect(() => {
                if (photo) {
                      setTitle(photo.title || '')
                            setStory(photo.story || '')
                                  setAlbumId(photo.album_id || '')
                                        setNewAlbum('')
                                            }
                                              }, [photo])

                                                if (!photo) return null

                                                  async function handleSubmit(e) {
                                                      e.preventDefault()
                                                          setSubmitting(true)

                                                              let finalAlbumId = albumId || null
                                                                  if (albumId === '__new__' && newAlbum.trim()) {
                                                                        const res = await onCreateAlbum(newAlbum.trim(), uploadedBy)
                                                                              finalAlbumId = res.success ? res.album.id : null
                                                                                  } else if (albumId === '__new__') {
                                                                                        finalAlbumId = null
                                                                                            }

                                                                                                await onSave(photo.id, { title: title.trim() || null, story: story.trim() || null, album_id: finalAlbumId })
                                                                                                    setSubmitting(false)
                                                                                                        onClose()
                                                                                                          }

                                                                                                            return (
                                                                                                                <AnimatePresence>
                                                                                                                      {open && (
                                                                                                                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-end justify-center bg-plum-700/50 backdrop-blur-sm sm:items-center" onClick={onClose}>
                                                                                                                                        <motion.form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 280 }} className="glass-panel w-full max-w-lg rounded-b-none p-6 sm:rounded-3xl">
                                                                                                                                                    <div className="mb-4 flex items-center justify-between">
                                                                                                                                                                  <h2 className="text-lg font-semibold text-plum-600">Edit Foto</h2>
                                                                                                                                                                                <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/60 active:scale-90">
                                                                                                                                                                                                <X size={18} />
                                                                                                                                                                                                              </button>
                                                                                                                                                                                                                          </div>

                                                                                                                                                                                                                                      <div className="space-y-3">
                                                                                                                                                                                                                                                    <input type="text" placeholder="Judul foto" value={title} onChange={(e) => setTitle(e.target.value)} className="input-field" />
                                                                                                                                                                                                                                                                  <textarea placeholder="Cerita di balik foto ini..." value={story} onChange={(e) => setStory(e.target.value)} rows={3} className="input-field resize-none" />
                                                                                                                                                                                                                                                                                <select value={albumId || ''} onChange={(e) => setAlbumId(e.target.value)} className="input-field">
                                                                                                                                                                                                                                                                                                <option value="">Tanpa album</option>
                                                                                                                                                                                                                                                                                                                {albums.map((a) => (<option key={a.id} value={a.id}>{a.name}</option>))}
                                                                                                                                                                                                                                                                                                                                <option value="__new__">+ Buat album baru</option>
                                                                                                                                                                                                                                                                                                                                              </select>
                                                                                                                                                                                                                                                                                                                                                            {albumId === '__new__' && (
                                                                                                                                                                                                                                                                                                                                                                            <input type="text" placeholder="Nama album baru" value={newAlbum} onChange={(e) => setNewAlbum(e.target.value)} className="input-field" />
                                                                                                                                                                                                                                                                                                                                                                                          )}
                                                                                                                                                                                                                                                                                                                                                                                                      </div>

                                                                                                                                                                                                                                                                                                                                                                                                                  <button type="submit" disabled={submitting} className="btn-primary mt-5 w-full">
                                                                                                                                                                                                                                                                                                                                                                                                                                {submitting ? <Loader2 size={18} className="animate-spin" /> : 'Simpan Perubahan'}
                                                                                                                                                                                                                                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                      </motion.form>
                                                                                                                                                                                                                                                                                                                                                                                                                                                              </motion.div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    )}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </AnimatePresence>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          )
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          }