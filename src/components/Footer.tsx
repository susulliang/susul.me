import { site } from '@/data/site'

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 py-10">
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
        <div>© {new Date().getFullYear()} {site.fullName}</div>
        <div className="flex gap-6">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
