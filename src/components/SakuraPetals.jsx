const PETALS = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  left: `${(i * 97) % 100}%`,
  size: 10 + ((i * 7) % 14),
  delay: (i * 1.3) % 10,
  duration: 9 + ((i * 3) % 6),
  rotate: (i * 47) % 360,
}))

function Petal({ size }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className="opacity-70 drop-shadow-sm">
      <path d="M16 2c4 4 4 10 0 14-4-4-4-10 0-14z" fill="#FFB3CE" transform="rotate(0 16 16)" />
      <path d="M16 2c4 4 4 10 0 14-4-4-4-10 0-14z" fill="#FFD6E4" transform="rotate(72 16 16)" />
      <path d="M16 2c4 4 4 10 0 14-4-4-4-10 0-14z" fill="#FFB3CE" transform="rotate(144 16 16)" />
      <path d="M16 2c4 4 4 10 0 14-4-4-4-10 0-14z" fill="#FFD6E4" transform="rotate(216 16 16)" />
      <path d="M16 2c4 4 4 10 0 14-4-4-4-10 0-14z" fill="#FFB3CE" transform="rotate(288 16 16)" />
    </svg>
  )
}

export default function SakuraPetals() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {PETALS.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 animate-sakuraFall"
          style={{
            left: p.left,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          <Petal size={p.size} />
        </div>
      ))}
    </div>
  )
