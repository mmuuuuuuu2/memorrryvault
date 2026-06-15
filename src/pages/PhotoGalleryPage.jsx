import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Camera } from 'lucide-react'
import { usePhotos } from '../hooks/usePhotos'
import { useApp } from '../context/AppContext'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import PhotoCard from '../components/PhotoCard'
import PhotoViewer from '../components/PhotoViewer'
import PhotoUploadModal from '../components/PhotoUploadModal'
import PhotoEditModal from '../components/PhotoEditModal'
import SakuraPetals from '../components/SakuraPetals'

export default function PhotoGalleryPage() {
  const { identity } = useApp()
  const { photos, albums, loading, uploadPhoto, deletePhoto, updatePhoto, toggleFavorite, createAlbum } = usePhotos()

  const [search, setSearch] = useState('')
  const [albumFilter, setAlbumFilter] = useState('all')
  const [viewerIndex, setViewerIndex] = useState(null)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState(null)

  const filteredPhotos = useMemo(() => {
    return photos.filter((p) => {
      if (albumFilter === 'favorites' && !p.is_favorite) return false
      if (albumFilter !== 'all' && albumFilter !== 'favorites' && p.album_id !== albumFilter) return false
      if (search.trim()) {
        const term = search.trim().toLowerCase()
        const inTitle = p.title?.toLowerCase().includes(term)
        const inStory = p.story?.toLowerCase().includes(term)
        if (!inTitle && !inStory) return false
      }
      return true
    })
  }, [photos, albumFilter, search])

  async function handleDelete(photo) {
    if (!window.confirm('Hapus foto ini? Tindakan ini tidak bisa dibatalkan ❤️')) return
    await deletePhoto(photo)
    setViewerIndex(null)
  }

  return (
    <div className="relative min-h-screen pb-28">
      <SakuraPetals />

      <div className="relative z-10 mx-auto max-w-3xl">
        <TopBar title="Galeri Foto" />

        <main className="px-5">
          <div className="relative mb-3">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-plum-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul atau cerita..."
              className="input-field pl-11"
            />
          </div>

          <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
            <FilterChip label="Semua" active={albumFilter === 'all'} onClick={() => setAlbumFilter('all')} />
            <FilterChip label="❤️ Favorit" active={albumFilter === 'favorites'} onClick={() => setAlbumFilter('favorites')} />
            {albums.map((a) => (
              <FilterChip key={a.id} label={a.name} active={albumFilter === a.id} onClick={() => setAlbumFilter(a.id)} />
            ))}
          </div>

          {loading ? (
            <p className="py-10 text-center text-sm text-plum-400">Memuat kenangan...</p>
          ) : filteredPhotos.length === 0 ? (
            <div className="glass-panel flex flex-col items-center gap-3 px-6 py-12 text-center">
              <Camera size={32} className="text-blush-400" />
              <p className="text-plum-500">
                {photos.length === 0
                  ? 'Belum ada kenangan di sini, yuk tambahkan yang pertama ❤️'
                  : 'Tidak ada foto yang cocok.'}
              </p>
            </div>
          ) : (
            <div className="columns-2 gap-3 sm:columns-3">
              {filteredPhotos.map((photo, i) => (
                <div key={photo.id} className="break-inside-avoid">
                  <PhotoCard photo={photo} onOpen={() => setViewerIndex(i)} onToggleFavorite={toggleFavorite} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => setUploadOpen(true)}
        className="fixed bottom-24 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blush-500 to-blush-600 text-white shadow-glow"
        aria-label="Tambah foto"
      >
        <Plus size={26} />
      </motion.button>

      <BottomNav />

      {viewerIndex !== null && (
        <PhotoViewer
          photos={filteredPhotos}
          index={viewerIndex}
          onClose={() => setViewerIndex(null)}
          onChangeIndex={setViewerIndex}
          onToggleFavorite={toggleFavorite}
          onEdit={(photo) => setEditingPhoto(photo)}
          onDelete={handleDelete}
        />
      )}

      <PhotoUploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        albums={albums}
        onUpload={uploadPhoto}
        onCreateAlbum={createAlbum}
        uploadedBy={identity}
      />

      <PhotoEditModal
        open={Boolean(editingPhoto)}
        photo={editingPhoto}
        albums={albums}
        onClose={() => setEditingPhoto(null)}
        onSave={updatePhoto}
        onCreateAlbum={createAlbum}
        uploadedBy={identity}
      />
    </div>
  )
}

function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
        active ? 'border-blush-500 bg-blush-500 text-white shadow-glow' : 'border-white/60 bg-white/50 text-plum-500 backdrop-blur-glass'
      }`}
    >
      {label}
    </button>
  )
}