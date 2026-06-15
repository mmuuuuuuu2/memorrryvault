const SFX_FILES = {
  loginSuccess: '/sfx/login-success.mp3',
  softClick: '/sfx/soft-click.mp3',
  paperOpen: '/sfx/paper-open.mp3',
  heartPop: '/sfx/heart-pop.mp3',
  cameraShutter: '/sfx/camera-shutter.mp3',
  capsuleOpen: '/sfx/capsule-open.mp3',
  memoryRandom: '/sfx/memory-random.mp3',
}
const DEFAULT_VOLUME = 0.25

export function playSfx(name, volume = DEFAULT_VOLUME) {
  const src = SFX_FILES[name]
  if (!src) return
  try {
    const audio = new Audio(src)
    audio.volume = volume
    audio.play().catch(() => {})
  } catch {}
}