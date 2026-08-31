import { useMemo, useState } from 'react'
import { site } from '@/data/site'
import Typewriter, { Cursor } from '@/components/Typewriter'
import { Mail, AtSign, Bitcoin, KeyRound } from 'lucide-react'

export default function About() {
  const [done, setDone] = useState(false)

  const TERM_LINES = useMemo(() => {
    const out: string[] = [
      '$ cat ~/about.md',
      `name: ${site.fullName}`,
      `name.zh: ${site.chineseName}`,
      'role: interdisciplinary artist',
      'fields: generative AI, sound, immersive installations',
      'based_in: Berlin, Germany',
      'studying: SRH Campus Berlin',
      '',
      'bio:',
      '  Interdisciplinary artist working across generative AI, sound, and',
      '  immersive installations. Based in Berlin. Studying at SRH Campus Berlin.',
      '',
      'contact:',
      `  email: ${site.email}`,
      `  student_email: ${site.studentEmail}`,
      '',
      'social:',
    ]
    site.socials.forEach((s) => {
      out.push(`  - ${s.label}: ${s.url}`)
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

          <header className="flex flex-col md:flex-row gap-10 items-start mb-12">
            <img
              src="/images/about-portrait.png"
              alt="Portrait"
              className="w-48 h-48 object-cover rounded-full border-4 border-neutral-800 shrink-0"
            />
            <div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                about<span className="text-accent">.</span>
              </h1>
              <div className="mt-6 space-y-1">
                <h2 className="text-xl font-semibold">{site.fullName}</h2>
                <p className="text-neutral-500">{site.chineseName}</p>
              </div>
            </div>
          </header>

          <section className="mb-12">
            <p className="text-lg text-neutral-300 leading-relaxed">
              Interdisciplinary artist working across generative AI, sound, and
              immersive installations. Based in Berlin. Studying at SRH Campus Berlin.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-4">
              social
            </h2>
            <div className="flex flex-wrap gap-3">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 text-sm border border-neutral-700 text-neutral-300 rounded-full hover:border-accent hover:text-accent transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-4">
              email &amp; contact
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent shrink-0" />
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-accent transition-colors"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <AtSign size={18} className="text-accent shrink-0" />
                <a
                  href={`mailto:${site.studentEmail}`}
                  className="hover:text-accent transition-colors"
                >
                  {site.studentEmail}
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-4">
              accept crypto donations
            </h2>
            <ul className="space-y-3 text-sm break-all">
              <li className="flex items-start gap-3">
                <Bitcoin size={18} className="text-accent shrink-0 mt-1" />
                <code className="bg-neutral-800 px-3 py-2 rounded text-xs">
                  bc1qrxg27ptg7rrzztu9qnt8tzwsf8efdrwxmhvck9mam5hzylt9nets2p94wn
                </code>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-[18px] shrink-0 text-accent font-bold">ɱ</span>
                <code className="bg-neutral-800 px-3 py-2 rounded text-xs break-all">
                  46kswboDR25Pg3LgWiAhsH3mSiV5zNiPEZ9uQxctScTtGTGt473uHf5QndxrWC3U6vNtUzVceB6n9TLoKjUT6Bap8fQTe4a
                </code>
              </li>
            </ul>
          </section>

          <details className="border border-neutral-800 rounded-lg p-4">
            <summary className="cursor-pointer text-sm uppercase tracking-widest text-neutral-500 hover:text-accent transition-colors flex items-center gap-2">
              <KeyRound size={16} /> public PGP key
            </summary>
            <pre className="mt-4 text-xs bg-neutral-800 p-4 rounded overflow-auto max-h-72 leading-relaxed">
{`-----BEGIN PGP PUBLIC KEY BLOCK-----

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
=Kbsu
-----END PGP PUBLIC KEY BLOCK-----`}
            </pre>
          </details>
        </div>
      )}
    </div>
  )
}
