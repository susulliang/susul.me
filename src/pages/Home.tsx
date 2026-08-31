import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { workProjects, site } from '@/data/site'

const INTRO_LINES = [
  '$ whoami',
  `susul — ${site.fullName} / ${site.chineseName}`,
  'interdisciplinary artist · AI · sound · installation',
  '',
  '$ ls ~/projects',
]

function Cursor() {
  return (
    <span className="text-accent animate-[blink_1s_step-end_infinite]">▋</span>
  )
}

export default function Home() {
  const navigate = useNavigate()

  const menuLines = useMemo(
    () => workProjects.map((p, i) => `[${String(i + 1).padStart(2, '0')}] ${p.title}`),
    [],
  )
  const lines = useMemo(() => [...INTRO_LINES, ...menuLines], [menuLines])

  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [selected, setSelected] = useState(0)
  const done = lineIndex >= lines.length

  // Typewriter
  useEffect(() => {
    if (done) return
    const current = lines[lineIndex]
    if (charIndex < current.length) {
      const t = setTimeout(
        () => setCharIndex((c) => c + 1),
        12 + Math.random() * 22,
      )
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setLineIndex((i) => i + 1)
      setCharIndex(0)
    }, current.length === 0 ? 120 : 280)
    return () => clearTimeout(t)
  }, [lineIndex, charIndex, lines, done])

  const skip = () => {
    if (!done) {
      setLineIndex(lines.length)
      setCharIndex(0)
    }
  }

  // Keyboard navigation once typing finishes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!done) {
        skip()
        return
      }
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
  }, [done, selected, navigate, lines.length])

  return (
    <div
      className="min-h-svh flex flex-col justify-center px-6 md:px-10 max-w-3xl mx-auto w-full cursor-default select-none"
      onClick={skip}
    >
      <div className="text-sm md:text-base space-y-1.5">
        {lines.slice(0, done ? lines.length : lineIndex + 1).map((line, i) => {
          const isMenu = i >= INTRO_LINES.length
          const menuIdx = i - INTRO_LINES.length
          const visible = i < lineIndex ? line : line.slice(0, charIndex)
          const showCursor = !done && i === lineIndex
          const content = line === '' ? '\u00A0' : visible

          // Interactive menu item
          if (isMenu && done) {
            const p = workProjects[menuIdx]
            const isSel = selected === menuIdx
            return (
              <button
                key={i}
                onMouseEnter={() => setSelected(menuIdx)}
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/work/${p.slug}`)
                }}
                className={`w-full text-left flex items-baseline gap-3 px-3 py-1.5 rounded transition-colors ${
                  isSel
                    ? 'bg-neutral-800 text-accent'
                    : 'text-neutral-200 hover:bg-neutral-800/60'
                }`}
              >
                <span className="text-neutral-500 shrink-0">
                  [{String(menuIdx + 1).padStart(2, '0')}]
                </span>
                <span className="flex-1">{p.title}</span>
                <span className="text-neutral-600 text-xs shrink-0 hidden sm:inline">
                  {p.date}
                </span>
              </button>
            )
          }

          // Plain typed line
          return (
            <div
              key={i}
              className={`px-3 py-0.5 ${
                line.startsWith('$') ? 'text-neutral-500' : 'text-neutral-200'
              }`}
            >
              {content}
              {showCursor && <Cursor />}
            </div>
          )
        })}

        {/* Idle prompt after everything is typed */}
        {done && (
          <div className="px-3 pt-3 text-neutral-500">
            $ <Cursor />
          </div>
        )}
      </div>

      {/* Hint */}
      {done && (
        <p className="mt-8 px-3 text-xs text-neutral-600 tracking-wide">
          ↑/↓ to navigate · enter to open · or click a project
        </p>
      )}
    </div>
  )
}
