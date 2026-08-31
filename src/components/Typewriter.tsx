import { useEffect, useState } from 'react'

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
}

function Cursor() {
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
}: Props) {
  const [lineIndex, setLineIndex] = useState(-1)
  const [charIndex, setCharIndex] = useState(0)
  const done = lineIndex >= lines.length

  // Kick off after initial delay
  useEffect(() => {
    const t = setTimeout(() => setLineIndex(0), initialDelay)
    return () => clearTimeout(t)
  }, [initialDelay])

  // Typewriter advance
  useEffect(() => {
    if (done) {
      onDone?.()
      return
    }
    if (lineIndex < 0) return
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
    }, current.length === 0 ? 120 : 240)
    return () => clearTimeout(t)
  }, [lineIndex, charIndex, lines, done, onDone])

  const skip = () => {
    if (!skipable || done) return
    setLineIndex(lines.length)
    setCharIndex(0)
  }

  useEffect(() => {
    if (!skipable) return
    const onKey = () => skip()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [skipable])

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

export { Cursor }
