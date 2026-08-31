import { useCallback, useEffect, useState, type ReactNode, type JSX } from 'react'

export type RenderLineParams = {
  index: number
  line: string
  visible: string
  isCurrent: boolean
  done: boolean
  Cursor: () => JSX.Element
}

type Props = {
  lines: string[]
  /** Class for the container wrapping all lines */
  className?: string
  /** Callback when typing finishes */
  onDone?: () => void
  /** Allow clicking / any key to skip */
  skipable?: boolean
  /** Delay before starting (ms) */
  initialDelay?: number
  /** Optional custom renderer per line. When provided, fully controls line output including cursor placement. */
  renderLine?: (p: RenderLineParams) => ReactNode
}

export function Cursor() {
  return (
    <span className="text-accent animate-[blink_1s_step-end_infinite]">▋</span>
  )
}

export default function Typewriter({
  lines,
  className = '',
  onDone,
  skipable = true,
  initialDelay = 0,
  renderLine,
}: Props) {
  const [lineIndex, setLineIndex] = useState(-1)
  const [charIndex, setCharIndex] = useState(0)
  const done = lineIndex >= lines.length

  // Kick off after initial delay
  useEffect(() => {
    const t = setTimeout(() => setLineIndex(0), initialDelay)
    return () => clearTimeout(t)
  }, [initialDelay])

  // Typewriter advance — ~2x faster base speed with randomized slowdowns
  // to feel more human (punctuation pauses, occasional longer hesitations).
  useEffect(() => {
    if (done) {
      onDone?.()
      return
    }
    if (lineIndex < 0) return
    const current = lines[lineIndex]
    if (charIndex < current.length) {
      const ch = current[charIndex]
      // Base ~4–12 ms (half of old 12–34 ms)
      let delay = 4 + Math.random() * 8
      // Pause longer on whitespace between words
      if (ch === ' ') delay += 8 + Math.random() * 12
      // Pause on punctuation (comma, period, colon, semicolon, bang, qmark)
      if (/[.,;:!?]/.test(ch)) delay += 40 + Math.random() * 60
      // Occasional big slowdown (~5% chance, like a think)
      if (Math.random() < 0.05) delay += 80 + Math.random() * 140
      const t = setTimeout(() => setCharIndex((c) => c + 1), delay)
      return () => clearTimeout(t)
    }
    // End-of-line pause: base ~60 ms instead of 240 ms, with small variance
    const delay = current.length === 0 ? 50 : 60 + Math.random() * 80
    const t = setTimeout(() => {
      setLineIndex((i) => i + 1)
      setCharIndex(0)
    }, delay)
    return () => clearTimeout(t)
  }, [lineIndex, charIndex, lines, done, onDone])

  const skip = useCallback(() => {
    if (!skipable || done) return
    setLineIndex(lines.length)
    setCharIndex(0)
  }, [skipable, done, lines])

  useEffect(() => {
    if (!skipable) return
    const onKey = () => skip()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [skipable, skip])

  return (
    <div
      className={`cursor-default select-none ${className}`}
      onClick={skip}
    >
      <div className="space-y-0.5">
        {lines
          .slice(
            0,
            done || lineIndex < 0 ? lines.length : lineIndex + 1,
          )
          .map((line, i) => {
            const isCurrent = i === lineIndex && !done
            const visible = isCurrent ? line.slice(0, charIndex) : line
            const showCursor = isCurrent
            if (renderLine) {
              return (
                <div key={i}>
                  {renderLine({
                    index: i,
                    line,
                    visible,
                    isCurrent,
                    done,
                    Cursor,
                  })}
                  {/* When using custom renderLine, cursor placement is the renderer's responsibility */}
                  {showCursor ? null : null}
                </div>
              )
            }
            const content = line === '' ? '\u00A0' : visible
            const isPrompt = line.startsWith('$')
            return (
              <div
                key={i}
                className={`px-3 py-0.5 text-sm md:text-base ${
                  isPrompt ? 'text-neutral-500' : 'text-neutral-200'
                }`}
              >
                {content}
                {showCursor && <Cursor />}
              </div>
            )
          })}
        {done && (
          <div className="px-3 pt-2 text-neutral-500">
            $ <Cursor />
          </div>
        )}
      </div>
    </div>
  )
}
