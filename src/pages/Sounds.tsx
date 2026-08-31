import { useMemo, useState } from 'react'
import { albums, mixtapes } from '@/data/site'
import Typewriter, { Cursor } from '@/components/Typewriter'
import { ExternalLink } from 'lucide-react'

function SoundcloudEmbed({ trackId }: { trackId: string }) {
  return (
    <iframe
      width="100%"
      height="166"
      scrolling="no"
      frameBorder="no"
      allow="autoplay"
      src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=false`}
    />
  )
}

function SoundcloudPlaylist({ playlistId }: { playlistId: string }) {
  return (
    <iframe
      width="100%"
      height="450"
      scrolling="no"
      frameBorder="no"
      allow="autoplay"
      src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${playlistId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&visual=false`}
    />
  )
}

export default function Sounds() {
  const [done, setDone] = useState(false)

  const TERM_LINES = useMemo(() => {
    const out: string[] = [
      '$ cd ~/sounds',
      '$ ls -la',
      'drwxr-xr-x  albums/',
      'drwxr-xr-x  mixtapes/',
      '',
      '$ cat albums',
    ]
    albums.forEach((a, i) => {
      out.push(
        `[c${String(i + 1).padStart(2, '0')}] ${a.title} — ${a.artist} · ${a.tracks.length} tracks · ${a.released}`,
      )
    })
    out.push('', '$ ls mixtapes')
    mixtapes.forEach((m, i) => {
      out.push(`[${String(i + 1).padStart(2, '0')}] ${m.title} — ${m.note}`)
    })
    return out
  }, [])

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

          {/* Mixtapes */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3">
              mixtapes<span className="text-accent">.</span>
            </h2>
            <div className="space-y-6">
              {mixtapes.map((m) => (
                <div key={m.title}>
                  <p className="font-medium text-neutral-100">{m.title}</p>
                  <p className="text-sm text-neutral-500 mb-2">
                    Susul · {m.note}
                  </p>
                  <SoundcloudEmbed trackId={m.soundcloudTrack} />
                </div>
              ))}
            </div>
          </section>

          {/* Albums */}
          <section className="space-y-16">
            <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3">
              albums<span className="text-accent">.</span>
            </h2>
            {albums.map((a) => (
              <article key={a.slug}>
                <div className="grid md:grid-cols-[300px_1fr] gap-8 items-start mb-8">
                  <img
                    src={a.cover}
                    alt={a.title}
                    className="w-full max-w-[300px] aspect-square object-cover rounded-lg border border-neutral-800"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold">{a.title}</h3>
                    <p className="text-neutral-500 text-sm">
                      {a.artist} · released {a.released}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {a.tracks.map((t, i) => (
                        <li
                          key={t.name}
                          className="flex items-center gap-3 text-neutral-300"
                        >
                          <span className="text-neutral-600 text-xs w-6 shrink-0">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {t.audio ? (
                            <audio
                              controls
                              preload="none"
                              src={t.audio}
                              className="h-8 flex-1"
                            />
                          ) : (
                            <span>{t.name}</span>
                          )}
                          <span className="text-sm shrink-0">{t.name}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {a.links.map((l) => (
                        <a
                          key={l.label}
                          href={l.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded border border-neutral-700 text-neutral-300 hover:border-accent hover:text-accent transition-colors capitalize"
                        >
                          {l.label}
                          <ExternalLink size={14} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                {a.soundcloudPlaylist && (
                  <div>
                    <p className="text-sm uppercase tracking-widest text-neutral-600 mb-3">
                      full stream
                    </p>
                    <SoundcloudPlaylist playlistId={a.soundcloudPlaylist} />
                  </div>
                )}
              </article>
            ))}
          </section>
        </div>
      )}
    </div>
  )
}
