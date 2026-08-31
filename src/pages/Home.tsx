import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { workProjects, site } from '@/data/site'
import Typewriter, { Cursor } from '@/components/Typewriter'
import type { RenderLineParams } from '@/components/Typewriter'

const INTRO_LINES = [
  '$ whoami',
  `susul — ${site.fullName} / ${site.chineseName}`,
  'interdisciplinary artist · AI · sound · installation',
  '',
  '$ ls ~/projects',
]

const EXTRA_LINES = [
  '',
  '$ ls ~/sounds',
  'sounds/  albums/  mixtapes/',
  '',
  '$ ls ~/archives',
  'installations/  web/  film/',
]

const NAV_LINES = ['[snd] sounds', '[arc] archives'] as const

const NAV_META: {
  prefix: string
  title: string
  right: string
}[] = [
  {
    prefix: '[snd] ',
    title: 'sounds',
    right: 'albums · mixtapes',
  },
  {
    prefix: '[arc] ',
    title: 'archives',
    right: 'installations · web · film',
  },
]

const SEPARATOR = ' — '

function makeRenderLine(): (p: RenderLineParams) => ReactNode {
  const introCount = INTRO_LINES.length
  const menuCount = workProjects.length
  const menuEnd = introCount + menuCount
  const extraCount = EXTRA_LINES.length
  const extraEnd = menuEnd + extraCount
  const navCount = NAV_LINES.length

  return function renderLine({
    index,
    line,
    visible,
    isCurrent,
    done,
    Cursor,
  }: RenderLineParams): ReactNode {
    // ── Project / menu pill ───────────────────────────────────────────
    if (index >= introCount && index < menuEnd) {
      const projectIdx = index - introCount
      const p = workProjects[projectIdx]
      const prefix = `[${String(projectIdx + 1).padStart(2, '0')}] `
      const prefixLen = prefix.length
      const titleLen = p.title.length
      const hasSubtitle = Boolean(p.subtitle)

      let prefixChunk: string
      let titleChunk = ''
      let sepChunk = ''
      let subChunk = ''

      if (visible.length <= prefixLen) {
        prefixChunk = visible
      } else {
        prefixChunk = visible.slice(0, prefixLen)
        const rest = visible.slice(prefixLen)
        if (rest.length <= titleLen) {
          titleChunk = rest
        } else {
          titleChunk = rest.slice(0, titleLen)
          const afterTitle = rest.slice(titleLen)
          if (hasSubtitle) {
            if (afterTitle.length <= SEPARATOR.length) {
              sepChunk = afterTitle
            } else {
              sepChunk = afterTitle.slice(0, SEPARATOR.length)
              subChunk = afterTitle.slice(SEPARATOR.length)
            }
          }
        }
      }

      return (
        <div
          className="w-full text-left flex items-baseline gap-3 px-3 py-1.5 rounded transition-colors text-sm md:text-base text-neutral-200 hover:bg-neutral-800/60"
        >
          <span className="text-neutral-500 shrink-0">{prefixChunk}</span>
          <span className="flex items-baseline gap-2 flex-wrap">
            <span>{titleChunk}</span>
            {(sepChunk || subChunk) && (
              <span className="text-neutral-600 text-xs md:text-sm">
                {sepChunk}
                {subChunk}
              </span>
            )}
          </span>
          <span className="text-neutral-600 text-xs shrink-0 hidden sm:inline ml-auto">
            {p.date}
          </span>
          {isCurrent && !done && <Cursor />}
        </div>
      )
    }

    // ── Nav pill (sounds / archives) ─────────────────────────────────
    if (index >= extraEnd && index < extraEnd + navCount) {
      const navIdx = index - extraEnd
      const meta = NAV_META[navIdx]
      const prefixLen = meta.prefix.length
      const titleLen = meta.title.length

      let prefixChunk: string
      let titleChunk = ''

      if (visible.length <= prefixLen) {
        prefixChunk = visible
      } else {
        prefixChunk = visible.slice(0, prefixLen)
        titleChunk = visible.slice(prefixLen, prefixLen + titleLen)
      }

      const fullLineWritten = visible.length >= line.length || done

      return (
        <div
          className="w-full text-left flex items-baseline gap-3 px-3 py-1.5 rounded transition-colors text-sm md:text-base text-neutral-200 hover:bg-neutral-800/60"
        >
          <span className="text-neutral-500 shrink-0">{prefixChunk}</span>
          <span>{titleChunk}</span>
          {fullLineWritten && (
            <span className="text-neutral-600 text-xs ml-auto hidden sm:inline">
              {meta.right}
            </span>
          )}
          {isCurrent && !done && <Cursor />}
        </div>
      )
    }

    // ── Default: intro / extra / prompt lines ────────────────────────
    const isPrompt = line.startsWith('$')
    const content = visible === '' && line === '' ? '\u00A0' : visible
    return (
      <div
        className={`px-3 py-0.5 text-sm md:text-base ${
          isPrompt ? 'text-neutral-500' : 'text-neutral-200'
        }`}
      >
        {content}
        {isCurrent && !done && <Cursor />}
      </div>
    )
  }
}

export default function Home() {
  const navigate = useNavigate()
  const [typingDone, setTypingDone] = useState(false)
  // Selection: 0..workProjects.length-1 = projects, then sounds, then archives
  const totalItems = workProjects.length + 2
  const [selected, setSelected] = useState(0)

  const navigateSelection = useCallback(
    (idx: number) => {
      if (idx < workProjects.length) {
        navigate(`/work/${workProjects[idx].slug}`)
      } else if (idx === workProjects.length) {
        navigate('/sounds')
      } else {
        navigate('/archives')
      }
    },
    [navigate],
  )

  // Keyboard navigation once typing finishes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!typingDone) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelected((s) => (s + 1) % totalItems)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelected((s) => (s - 1 + totalItems) % totalItems)
      } else if (e.key === 'Enter') {
        navigateSelection(selected)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [typingDone, selected, totalItems, navigateSelection])

  const menuLines = useMemo(
    () =>
      workProjects.map((p, i) => {
        const base = `[${String(i + 1).padStart(2, '0')}] ${p.title}`
        return p.subtitle ? `${base} — ${p.subtitle}` : base
      }),
    [],
  )
  const allLines = useMemo(
    () => [...INTRO_LINES, ...menuLines, ...EXTRA_LINES, ...NAV_LINES],
    [menuLines],
  )
  const renderLine = useMemo(() => makeRenderLine(), [])

  return (
    <div className="min-h-svh flex flex-col justify-center px-6 md:px-10 max-w-3xl mx-auto w-full">
      {!typingDone ? (
        <Typewriter
          lines={allLines}
          onDone={() => setTypingDone(true)}
          renderLine={renderLine}
        />
      ) : (
        <div className="space-y-0.5">
          {/* Static intro echo */}
          {INTRO_LINES.map((line, i) => {
            const content = line === '' ? '\u00A0' : line
            return (
              <div
                key={`intro-${i}`}
                className={`px-3 py-0.5 text-sm md:text-base ${
                  line.startsWith('$') ? 'text-neutral-500' : 'text-neutral-200'
                }`}
              >
                {content}
              </div>
            )
          })}

          {/* Interactive project entries */}
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

          {/* Extra terminal echo (sounds + archives listings) */}
          {EXTRA_LINES.map((line, i) => {
            const content = line === '' ? '\u00A0' : line
            return (
              <div
                key={`extra-${i}`}
                className={`px-3 py-0.5 text-sm md:text-base ${
                  line.startsWith('$') ? 'text-neutral-500' : 'text-neutral-200'
                }`}
              >
                {content}
              </div>
            )
          })}

          {/* Interactive sounds & archives entries */}
          {(() => {
            const soundsIdx = workProjects.length
            const archivesIdx = workProjects.length + 1
            return (
              <>
                <button
                  onMouseEnter={() => setSelected(soundsIdx)}
                  onClick={() => navigate('/sounds')}
                  className={`w-full text-left flex items-baseline gap-3 px-3 py-1.5 rounded transition-colors text-sm md:text-base ${
                    selected === soundsIdx
                      ? 'bg-neutral-800 text-accent'
                      : 'text-neutral-200 hover:bg-neutral-800/60'
                  }`}
                >
                  <span className="text-neutral-500 shrink-0">[snd]</span>
                  <span>sounds</span>
                  <span className="text-neutral-600 text-xs ml-auto hidden sm:inline">
                    albums · mixtapes
                  </span>
                </button>
                <button
                  onMouseEnter={() => setSelected(archivesIdx)}
                  onClick={() => navigate('/archives')}
                  className={`w-full text-left flex items-baseline gap-3 px-3 py-1.5 rounded transition-colors text-sm md:text-base ${
                    selected === archivesIdx
                      ? 'bg-neutral-800 text-accent'
                      : 'text-neutral-200 hover:bg-neutral-800/60'
                  }`}
                >
                  <span className="text-neutral-500 shrink-0">[arc]</span>
                  <span>archives</span>
                  <span className="text-neutral-600 text-xs ml-auto hidden sm:inline">
                    installations · web · film
                  </span>
                </button>
              </>
            )
          })()}

          <div className="px-3 pt-2 text-neutral-500">
            $ <Cursor />
          </div>
        </div>
      )}

      {typingDone && (
        <p className="mt-8 px-3 text-xs text-neutral-600 tracking-wide">
          ↑/↓ to navigate · enter to open · or click an entry
        </p>
      )}
    </div>
  )
}
