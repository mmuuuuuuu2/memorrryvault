import { motion } from 'framer-motion'
import { Video, Music2, Mail, Clock, CalendarHeart, Star, Shuffle, History } from 'lucide-react'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import GlassCard from '../components/GlassCard'
import SakuraPetals from '../components/SakuraPetals'

const upcoming = [
  { icon: Video, label: 'Video Gallery' },
  { icon: Music2, label: 'Music Library' },
  { icon: Mail, label: 'Love Notes' },
  { icon: Clock, label: 'Memory Stories & Timeline' },
  { icon: CalendarHeart, label: 'Relationship Calendar' },
  { icon: Clock, label: 'Time Capsule' },
  { icon: Star, label: 'Favorite Memories' },
  { icon: Shuffle, label: 'Random Memory' },
  { icon: History, label: 'Login History' },
]

export default function ComingSoonPage() {
  return (
    <div className="relative min-h-screen pb-28">
      <SakuraPetals />
      <div className="relative z-10 mx-auto max-w-3xl">
        <TopBar title="Segera Hadir" />
        <main className="px-5">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 text-sm text-plum-400">
            Fitur-fitur ini sedang disiapkan untuk Memory Vault ❤️
          </motion.p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {upcoming.map(({ icon: Icon, label }, i) => (
              <GlassCard key={label} delay={i * 0.04} className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blush-100">
                  <Icon size={18} className="text-blush-600" />
                </div>
                <span className="font-medium text-plum-600">{label}</span>
                <span className="ml-auto rounded-full bg-gold-300/60 px-2.5 py-1 text-xs font-semibold text-plum-600">
                  Soon
                </span>
              </GlassCard>
            ))}
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  )
}