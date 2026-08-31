import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { archiveSections } from '@/data/site'
import Typewriter, { Cursor } from '@/components/Typewriter'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export default function Archives() {
  const [done, setDone] = useState(false)

  const TERM_LINES = useMemo(() => {
    const out: string[] = ['$ cd ~/archives', '$ find . -type f']
    archiveSections.forEach((section) => {
      out.push(`[${section.heading}]`)
      section.items.forEach((item) => {
        const line = `  ${item.title}${item.detail ? ` — ${item.detail}` : ''}`
        out.push(line)
      })
    })
    return out
  }, [])

  return (
    <div className="min-h-screen px-6 md:px-10 py-10 md:py-16 max-w-3xl mx-auto w-full">
      {!done ? (
        <Typewriter lines={TERM_LINES} onDone={() => setDone(true)} />
      ) : (
        <div>
          <div className="space-y-0.5 text-sm md:text-base mb-12">
            {TERM_LINES.map((line, i) => {
              const content = line === '' ? '\u00A0' : line
              const isHeading = archiveSections.some(
                (s) => line === `[${s.heading}]`,
              )
              return (
                <div
                  key={i}
                  className={`px-3 py-0.5 ${
                    line.startsWith('$')
                      ? 'text-neutral-500'
                      : isHeading
                        ? 'text-neutral-400 font-semibold'
                        : 'text-neutral-200'
                  }`}
                >
                  {content}
                </div>
              )
            })}
            <div className="px-3 pt-2 text-neutral-500">
              $ <Cursor />
            </div>
          </div>

          {archiveSections.map((section) => (
            <section key={section.heading} className="mb-12 last:mb-0">
              <h2 className="text-2xl font-semibold mb-6 border-b border-neutral-800 pb-2">
                {section.heading}
              </h2>
              <ul className="space-y-2">
                {section.items.map((item) => {
                  const isExternal = item.link?.startsWith('http')

                  const itemBody = (
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg text-neutral-100 font-medium group-hover:text-accent transition-colors">
                          {item.title}
                        </p>
                        {item.detail && (
                          <p className="text-neutral-500 text-sm mt-1">
                            {item.detail}
                          </p>
                        )}
                      </div>
                      {isExternal ? (
                        <ArrowUpRight
                          size={20}
                          className="text-neutral-600 group-hover:text-accent shrink-0 mt-1 transition-colors"
                        />
                      ) : (
                        <ArrowRight
                          size={20}
                          className="text-neutral-600 group-hover:text-accent shrink-0 mt-1 transition-colors"
                        />
                      )}
                    </div>
                  )

                  const itemClass =
                    'group block border border-transparent rounded-lg p-4 hover:border-neutral-800 hover:bg-neutral-800/50 transition-colors'

                  return (
                    <li key={item.title}>
                      {isExternal ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className={itemClass}
                        >
                          {itemBody}
                        </a>
                      ) : (
                        <Link to={item.link!} className={itemClass}>
                          {itemBody}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
