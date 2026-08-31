import { Link } from 'react-router-dom'
import { archiveSections } from '@/data/site'
import { Archive, ArrowRight, ArrowUpRight } from 'lucide-react'

export default function Archives() {
  return (
    <div className="space-y-16">
      <header>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight flex items-center gap-4">
          <Archive size={48} className="text-accent" />
          archives<span className="text-accent">.</span>
        </h1>
      </header>

      {archiveSections.map((section) => (
        <section key={section.heading}>
          <h2 className="text-2xl font-semibold mb-6 border-b border-neutral-800 pb-2">
            {section.heading}
          </h2>
          <ul className="space-y-2">
            {section.items.map((item) => {
              const isExternal = item.link?.startsWith('http')
              const content = (
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
              return (
                <li key={item.title}>
                  {isExternal ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="group block border border-transparent rounded-lg p-4 hover:border-neutral-800 hover:bg-neutral-800/50 transition-colors"
                    >
                      {content}
                    </a>
                  ) : (
                    <Link
                      to={item.link!}
                      className="group block border border-transparent rounded-lg p-4 hover:border-neutral-800 hover:bg-neutral-800/50 transition-colors"
                    >
                      {content}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
