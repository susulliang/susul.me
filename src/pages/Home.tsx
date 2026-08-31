import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { workProjects, site } from '@/data/site'
import Typewriter, { Cursor } from '@/components/Typewriter'

const INTRO_LINES = [
  '$ whoami',
  `susul — ${site.fullName} / ${site.chineseName}`,
  'interdisciplinary artist · AI · sound · installation',
  '',
  '$ ls ~/projects',
]

export default function Home() {
  const navigate = useNavigate()
  const [typingDone, setTypingDone] = useState(false)
  const [selected, setSelected] = useState(0)

  // Keyboard navigation once typing finishes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!typingDone) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelected((s) => (s + 1) % workProjects.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelected((s) => (s - 1 + workProjects.length) % workProjects.length)
      } else if (e.key === 'Enter') {
        navigate(`/work/${workProjects[selected].slug}`)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [typingDone, selected, navigate])

  // Menu placeholder lines (only used during typing, not rendered as buttons)
  const menuLines = useMemo(
    () =>
      workProjects.map((p, i) => {
        const base = `[${String(i + 1).padStart(2, '0')}] ${p.title}`
        return p.subtitle ? `${base} — ${p.subtitle}` : base
      }),
    [],
  )
  const allLines = useMemo(() => [...INTRO_LINES, ...menuLines], [menuLines])

  return (
    <div
      className="min-h-svh flex flex-col justify-center px-6 md:px-10 max-w-3xl mx-auto w-full"
    >
      {!typingDone ? (
        <Typewriter
          lines={allLines}
          onDone={() => setTypingDone(true)}
        />
      ) : (
        <div className="space-y-0.5">
          {/* Render typed-out intro again (static, no cursor needed but we keep the prompt) */}
          {INTRO_LINES.map((line, i) => {
            const content = line === '' ? '\u00A0' : line
            return (
              <div
                key={i}
                className={`px-3 py-0.5 text-sm md:text-base ${
                  line.startsWith('$') ? 'text-neutral-500' : 'text-neutral-200'
                }`}
              >
                {content}
              </div>
            )
          })}

          {/* Interactive menu items */}
          {workProjects.map((p, i) => {
            const isSel = selected === i
            return (
              <button
                key={p.slug}
                onMouseEnter={() => setSelected(i)}
                onClick={() => navigate(`/work/${p.slug}`)}
                className={`w-full text-left flex items-baseline gap-3 px-3 py-1.5 rounded transition-colors text-sm md:text-base ${
                  isSel
                    ? 'bg-neutral-800 text-accent'
                    : 'text-neutral-200 hover:bg-neutral-800/60'
                }`}
              >
                <span className="text-neutral-500 shrink-0">
                  [{String(i + 1).padStart(2, '0')}]
                </span>
                <span className="flex items-baseline gap-2 flex-wrap">
                  <span>{p.title}</span>
                  {p.subtitle && (
                    <span className="text-neutral-600 text-xs md:text-sm">
                      — {p.subtitle}
                    </span>
                  )}
                </span>
                <span className="text-neutral-600 text-xs shrink-0 hidden sm:inline ml-auto">
                  {p.date}
                </span>
              </button>
            )
          })}

          {/* Idle prompt */}
          <div className="px-3 pt-2 text-neutral-500">
            $ <Cursor />
          </div>
        </div>
      )}

      {/* Hint */}
      {typingDone && (
        <p className="mt-8 px-3 text-xs text-neutral-600 tracking-wide">
          ↑/↓ to navigate · enter to open · or click a project
        </p>
      )}
    </div>
  )
}
