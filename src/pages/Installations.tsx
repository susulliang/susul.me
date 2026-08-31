import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { installationProjects } from '@/data/site'
import Typewriter, { Cursor } from '@/components/Typewriter'
import { ArrowUpRight } from 'lucide-react'

export default function Installations() {
  const [done, setDone] = useState(false)

  const TERM_LINES = useMemo(() => {
    const out: string[] = [
      '$ cd ~/installations',
      '$ ls -lht',
    ]
    installationProjects.forEach((p, i) => {
      out.push(
        `[d${String(i + 1).padStart(2, '0')}] ${p.title}${p.subtitle ? ` — ${p.subtitle}` : ''}`,
      )
      if (p.location) out.push(`      ${p.location}`)
      out.push(`      ${p.date}`)
      if (p.tags?.length) out.push(`      tags: ${p.tags.join(', ')}`)
      out.push('')
    })
    return out
  }, [])

  return (
    <div className="min-h-screen px-6 md:px-10 py-10 md:py-16 max-w-4xl mx-auto w-full">
      {!done ? (
        <Typewriter lines={TERM_LINES} onDone={() => setDone(true)} />
      ) : (
        <div>
          <div className="space-y-0.5 text-sm md:text-base mb-12">
            {TERM_LINES.map((line, i) => {
              const content = line === '' ? '\u00A0' : line
              return (
                <div
                  key={i}
                  className={`px-3 py-0.5 ${
                    line.startsWith('$') ? 'text-neutral-500' : 'text-neutral-200'
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

          <div className="space-y-20">
            {installationProjects.map((p) => {
              const firstImage = p.media.find((m) => m.type === 'image')
              return (
                <Link key={p.slug} to={`/installations/${p.slug}`} className="group block">
                  <article>
                    <div className="flex items-baseline justify-between gap-4 flex-wrap mb-4">
                      <h2 className="text-2xl md:text-3xl font-semibold group-hover:text-accent transition-colors text-balance">
                        {p.title}
                        {p.subtitle && (
                          <span className="text-neutral-400 font-normal ml-2 text-base md:text-lg">
                            — {p.subtitle}
                          </span>
                        )}
                      </h2>
                      <time className="text-sm text-neutral-500 shrink-0">
                        {p.date}
                      </time>
                    </div>
                    {p.location && (
                      <p className="text-sm text-neutral-500 mb-4">{p.location}</p>
                    )}
                    {firstImage && (
                      <div className="overflow-hidden rounded-lg mb-4 border border-neutral-800">
                        <img
                          src={firstImage.src}
                          alt={p.title}
                          className="w-full h-72 md:h-[28rem] object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-neutral-300 leading-relaxed max-w-3xl line-clamp-2">
                        {p.description}
                      </p>
                      <ArrowUpRight
                        size={20}
                        className="text-neutral-600 group-hover:text-accent shrink-0 mt-1 transition-colors"
                      />
                    </div>
                    {p.tags && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs uppercase tracking-wider px-2 py-1 bg-neutral-800 text-neutral-300 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
