import { Link, useParams } from 'react-router-dom'
import { getProject } from '@/data/site'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProject(slug) : undefined

  if (!project) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Project not found</h1>
        <Link to="/" className="text-accent hover:underline">
          ← back home
        </Link>
      </div>
    )
  }

  return (
    <article>
      {/* Header */}
      <header className="mb-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-accent transition-colors mb-6"
        >
          <ArrowLeft size={16} /> back
        </Link>
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
      </header>

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
      <div className="space-y-6">
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
          )
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
    </article>
  )
}
