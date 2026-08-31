import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProject } from '@/data/site'
import Typewriter, { Cursor } from '@/components/Typewriter'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProject(slug) : undefined
  const [done, setDone] = useState(false)

  if (!project) {
    return (
      <div className="min-h-svh flex flex-col justify-center px-6 md:px-10 max-w-3xl mx-auto w-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">project not found</h1>
          <Link to="/" className="text-accent hover:underline">
            ← back home
          </Link>
        </div>
      </div>
    )
  }

  const TERM_LINES = useMemo(() => {
    const out: string[] = [
      `$ cat ~/projects/${project.slug}.md`,
      `title: ${project.title}`,
    ]
    if (project.subtitle) out.push(`subtitle: ${project.subtitle}`)
    out.push(`date: ${project.date}`)
    if (project.location) out.push(`location: ${project.location}`)
    if (project.description) {
      out.push('description:')
      // Wrap description to ~70 chars per line like terminal
      const words = project.description.split(' ')
      let line = '  '
      words.forEach((w) => {
        if ((line + w).length > 72) {
          out.push(line.trimEnd())
          line = '  ' + w + ' '
        } else {
          line += w + ' '
        }
      })
      if (line.trim()) out.push(line.trimEnd())
    }
    if (project.tags?.length) {
      out.push('')
      out.push(`tags: ${project.tags.join(', ')}`)
    }
    out.push('')
    out.push('$ ls media/')
    project.media.forEach((m, i) => {
      const label = m.type === 'image' ? 'image' : 'video'
      out.push(`  [${String(i + 1).padStart(2, '0')}] ${label}: ${m.src}`)
    })
    if (project.externalUrl) {
      out.push('')
      out.push(`external: ${project.externalLabel || 'visit'} ${project.externalUrl}`)
    }
    return out
  }, [project])

  return (
    <div className="min-h-screen px-6 md:px-10 py-10 md:py-16 max-w-4xl mx-auto w-full">
      {!done ? (
        <Typewriter lines={TERM_LINES} onDone={() => setDone(true)} />
      ) : (
        <div>
          {/* Static terminal echo */}
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

          {/* Header */}
          <article className="mb-10">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="mt-2 text-lg text-neutral-400">{project.subtitle}</p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500">
              <time>{project.date}</time>
              {project.location && <span>{project.location}</span>}
            </div>
          </article>

          {/* Description */}
          {project.description && (
            <p className="text-lg text-neutral-300 leading-relaxed max-w-3xl mb-10">
              {project.description}
            </p>
          )}

          {/* External link */}
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mb-10 px-5 py-3 bg-accent text-neutral-900 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {project.externalLabel || 'Visit'} <ArrowUpRight size={16} />
            </a>
          )}

          {/* Media */}
          <div className="space-y-6 mb-10">
            {project.media.map((m, i) =>
              m.type === 'image' ? (
                <figure key={i}>
                  <img
                    src={m.src}
                    alt={m.alt || m.caption || `${project.title} ${i + 1}`}
                    className="w-full rounded-lg"
                  />
                  {m.caption && (
                    <figcaption className="mt-2 text-sm text-neutral-500">
                      {m.caption}
                    </figcaption>
                  )}
                </figure>
              ) : (
                <figure key={i}>
                  <video
                    src={m.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full rounded-lg bg-black"
                  />
                  {m.caption && (
                    <figcaption className="mt-2 text-sm text-neutral-500">
                      {m.caption}
                    </figcaption>
                  )}
                </figure>
              ),
            )}
          </div>

          {/* Tags */}
          {project.tags && (
            <div className="mt-10 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs uppercase tracking-wider px-2.5 py-1 bg-neutral-800 text-neutral-300 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Back to home - at the very end */}
          <div className="mt-16 pt-10 border-t border-neutral-800">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-accent transition-colors"
            >
              <ArrowLeft size={16} /> back to home
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
