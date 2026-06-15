import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Image, Video, Music2, Heart, Folder } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { usePhotos } from '../hooks/usePhotos'
import { daysTogether } from '../config'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import GlassCard from '../components/GlassCard'
import SakuraPetals from '../components/SakuraPetals'
import { FloatingHearts } from '../components/FloatingHearts'

function StatCard({ icon: Icon, label, value, delay, accent }) {
  return (
      <GlassCard delay={delay} className="flex flex-col gap-3 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: accent }}>
                    <Icon size={20} className="text-blush-700" />
                          </div>
                                <div>
                                        <p className="text-2xl font-semibold text-plum-600">{value}</p>
                                                <p className="text-sm text-plum-400">{label}</p>
                                                      </div>
                                                          </GlassCard>
                                                            )
                                                            }

                                                            export default function DashboardPage() {
                                                              const { photos, albums } = usePhotos()
                                                                const [videoCount, setVideoCount] = useState(0)
                                                                  const [musicCount, setMusicCount] = useState(0)

                                                                    useEffect(() => {
                                                                        async function fetchCounts() {
                                                                              const [videos, music] = await Promise.all([
                                                                                      supabase.from('videos').select('id', { count: 'exact', head: true }),
                                                                                              supabase.from('music').select('id', { count: 'exact', head: true }),
                                                                                                    ])
                                                                                                          setVideoCount(videos.count || 0)
                                                                                                                setMusicCount(music.count || 0)
                                                                                                                    }
                                                                                                                        fetchCounts()
                                                                                                                          }, [])

                                                                                                                            return (
                                                                                                                                <div className="relative min-h-screen pb-28">
                                                                                                                                      <SakuraPetals />
                                                                                                                                            <FloatingHearts />

                                                                                                                                                  <div className="relative z-10 mx-auto max-w-3xl">
                                                                                                                                                          <TopBar />

                                                                                                                                                                  <main className="px-5">
                                                                                                                                                                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 text-sm text-plum-400">
                                                                                                                                                                                        Semua kenangan kalian, terkumpul di satu tempat ✨
                                                                                                                                                                                                  </motion.p>

                                                                                                                                                                                                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                                                                                                                                                                                                        <StatCard icon={Image} label="Total Foto" value={photos.length} accent="#FFEDF1" delay={0.02} />
                                                                                                                                                                                                                                    <StatCard icon={Video} label="Total Video" value={videoCount} accent="#FFD6E4" delay={0.06} />
                                                                                                                                                                                                                                                <StatCard icon={Music2} label="Total Musik" value={musicCount} accent="#FFEDF1" delay={0.1} />
                                                                                                                                                                                                                                                            <StatCard icon={Heart} label="Hari Bersama" value={daysTogether()} accent="#FBE5A1" delay={0.14} />
                                                                                                                                                                                                                                                                        <StatCard icon={Folder} label="Album Tersimpan" value={albums.length} accent="#FFD6E4" delay={0.18} />
                                                                                                                                                                                                                                                                                  </div>

                                                                                                                                                                                                                                                                                            <GlassCard delay={0.22} className="mt-5 flex items-center justify-between p-5">
                                                                                                                                                                                                                                                                                                        <div>
                                                                                                                                                                                                                                                                                                                      <h3 className="font-semibold text-plum-600">Galeri Foto</h3>
                                                                                                                                                                                                                                                                                                                                    <p className="text-sm text-plum-400">Lihat &amp; tambah kenangan baru</p>
                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                            <Link to="/gallery" className="btn-primary">
                                                                                                                                                                                                                                                                                                                                                                          Buka
                                                                                                                                                                                                                                                                                                                                                                                      </Link>
                                                                                                                                                                                                                                                                                                                                                                                                </GlassCard>
                                                                                                                                                                                                                                                                                                                                                                                                        </main>
                                                                                                                                                                                                                                                                                                                                                                                                              </div>

                                                                                                                                                                                                                                                                                                                                                                                                                    <BottomNav />
                                                                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                                                          )
                                                                                                                                                                                                                                                                                                                                                                                                                          }