export type MediaItem = {
  type: 'image' | 'video'
  src: string
  alt?: string
  caption?: string
}

export type Project = {
  slug: string
  title: string
  subtitle?: string
  date: string
  location?: string
  description?: string
  media: MediaItem[]
  tags?: string[]
  externalUrl?: string
  externalLabel?: string
}

export type Album = {
  slug: string
  title: string
  artist: string
  tracks: { name: string; audio?: string }[]
  released: string
  links: { label: string; url: string }[]
  cover: string
  soundcloudPlaylist?: string
}

export const site = {
  name: 'susul.me',
  fullName: 'Yufeng Liang / Susul',
  chineseName: '梁雨枫',
  tagline:
    'These are only some random storefront collections — for more detail into each project, check below.',
  intro: 'GAN generated, 2022',
  email: 'susulliang@gmail.com',
  studentEmail: 'yufeng.liang@stud.srh-campus-berlin.de',
  socials: [
    { label: 'Instagram', url: 'https://www.instagram.com/dezzyliang/' },
    { label: 'YouTube', url: 'https://www.youtube.com/channel/UCJMVgusxs2JU8_PrJVxuX7g' },
    { label: 'SoundCloud', url: 'https://soundcloud.com/susuld' },
    { label: 'Spotify', url: 'https://open.spotify.com/artist/4MNOr9datw94pg3w7NWBH0' },
    { label: 'Bandcamp', url: 'https://susul.bandcamp.com/' },
  ],
}

/**
 * Projects stacked on the homepage, in the same order as the Cargo site.
 * Media is matched per-project from each project's own Cargo page.
 */
export const workProjects: Project[] = [
  {
    slug: 'imagined-dragons',
    title: 'Imagined Dragons',
    subtitle: '印象里的妖魔鬼怪',
    date: '14.08.2023',
    description:
      "Staring into the map for too long, and holding iPad wondering — wait, there might be some stories on here.",
    media: [
      { type: 'image', src: '/images/imagined-dragons/01.jpg' },
      { type: 'image', src: '/images/imagined-dragons/02.jpg' },
      { type: 'image', src: '/images/imagined-dragons/03.jpg' },
      { type: 'image', src: '/images/imagined-dragons/04.jpg' },
      { type: 'image', src: '/images/imagined-dragons/05.jpg' },
      { type: 'image', src: '/images/imagined-dragons/06.jpg' },
      { type: 'image', src: '/images/imagined-dragons/07.jpg' },
    ],
    tags: ['digital', 'illustration', 'map'],
  },
  {
    slug: 'cyberspace-saturator',
    title: 'Cyberspace Saturator',
    subtitle: '网络空间填充器',
    date: '30.09.2022',
    description:
      'An automated interactive AI painter that can take your text prompts or camera inputs and turn them into paintings or images. It automatically captures the motion in front of the camera and uses it as an inspiration for image generation. It will constantly generate information based on available inputs, like a street-side portrait artist.',
    media: [
      { type: 'image', src: '/images/cyberspace-saturator/01.png' },
      { type: 'image', src: '/images/cyberspace-saturator/02.png' },
      { type: 'image', src: '/images/cyberspace-saturator/03.png' },
      { type: 'image', src: '/images/cyberspace-saturator/04.png' },
    ],
    tags: ['AI', 'installation', 'interactive'],
  },
  {
    slug: 'gans',
    title: 'GANs',
    subtitle: '神经网络测试训练模型 进行实时交互（类如语音→图像 实时转换）',
    date: '2022',
    description:
      'GANs — interactive text / speech to image generation with VQGAN + CLIP (work in progress), 2022.',
    media: [
      {
        type: 'video',
        src: 'https://files.cargocollective.com/c939493/GANs.mov',
        caption: 'GANs — interactive text / speech to image generation',
      },
    ],
    tags: ['AI', 'ML', 'work-in-progress'],
  },
  {
    slug: 'touchdesigner',
    title: 'StyleGAN3 × TouchDesigner',
    subtitle: 'StyleGAN3神经网络直链接 TouchDesigner 视觉自动生成器',
    date: '2021',
    description: 'StyleGAN3 realtime generation with TouchDesigner, 2021.',
    media: [
      {
        type: 'video',
        src: 'https://files.cargocollective.com/c939493/WHATUDOING.mp4',
        caption: 'StyleGAN3 realtime generation with TouchDesigner',
      },
    ],
    tags: ['AI', 'TouchDesigner', 'realtime'],
  },
  {
    slug: 'tunnel-visions',
    title: 'Tunnel Visions',
    date: '2021',
    description: 'Video series of tunnel visions, 2021.',
    media: [
      { type: 'video', src: 'https://files.cargocollective.com/c939493/cir_osmosis.mp4', caption: 'Osmosis' },
      { type: 'video', src: 'https://files.cargocollective.com/c939493/cir_paris_metro.mp4', caption: 'Paris Metro' },
      { type: 'video', src: 'https://files.cargocollective.com/c939493/cir_frequenzen.mp4', caption: 'Frequenzen' },
      { type: 'video', src: 'https://files.cargocollective.com/c939493/cir_happy_end.mp4', caption: 'Happy End' },
    ],
    tags: ['video', 'series'],
  },
  {
    slug: 'stylegan',
    title: 'StyleGAN Vinyl Covers',
    subtitle: '半自动深度学习黑胶封面的StyleGAN3模型 自动生成新的封面',
    date: '2021',
    description: 'A StyleGAN neural net that studies a lot of vinyl artworks, 2021.',
    media: [
      { type: 'image', src: '/images/stylegan/01.jpg', caption: 'Generated vinyl cover' },
      {
        type: 'video',
        src: 'https://files.cargocollective.com/c939493/cir_osmose_clip.mp4',
        caption: 'Generation process',
      },
    ],
    tags: ['AI', 'vinyl', 'cover-art'],
  },
  {
    slug: 'osmosis-web',
    title: 'Osmosis',
    subtitle: 'Interactive 3D Spectrogram',
    date: '2021',
    description:
      'Osmosis is a web-based audio visualizer / exploratory application utilizing HTML5 + WebGL technologies. It provides pre-built audio journeys as well as access to oscillators and filters so that users can explore sound in a visual way and also interact with the sound generation process to see changes reflected visually.',
    media: [
      { type: 'image', src: '/images/osmosis-web/banner.jpg', caption: 'Osmosis — web app' },
    ],
    tags: ['web', 'WebGL', 'audio-visualizer'],
    externalUrl: 'http://desliang.com',
    externalLabel: 'See it in action',
  },
  {
    slug: 'a-students-wife',
    title: "A Student's Wife",
    date: '2019',
    description: 'Short film, 13 mins, 2019.',
    media: [],
    tags: ['film'],
    externalUrl: 'https://vimeo.com/334491512',
    externalLabel: 'Watch on Vimeo',
  },
]

/**
 * Installation projects (the "projects" nav item), with detail pages.
 */
export const installationProjects: Project[] = [
  {
    slug: 'cyberspace-saturator-install',
    title: 'Cyberspace Saturator',
    subtitle: 'an automated interactive AI painter',
    date: 'September 29th, 2022',
    location: '@ Spektral-Raumrohr, Berlin',
    description:
      'An automated interactive AI painter that can take your text prompts or camera inputs and turn them into paintings or images. It automatically captures the motion in front of the camera and uses it as an inspiration for image generation. It will constantly generate information based on available inputs, like a street-side portrait artist.',
    media: [
      { type: 'image', src: '/images/cyberspace-saturator/01.png' },
      { type: 'image', src: '/images/cyberspace-saturator/02.png' },
      { type: 'image', src: '/images/cyberspace-saturator/03.png' },
      { type: 'image', src: '/images/cyberspace-saturator/04.png' },
    ],
    tags: ['AI', 'interactive'],
  },
  {
    slug: 'gans-install',
    title: 'GANs',
    subtitle: 'your painterly AI friend',
    date: 'January 22nd, 2022',
    location: '@ NOVILLA | MoBe Moving Poets Berlin e.V., Hasselwerderstr. 22, 12439 Berlin',
    description: 'Selected audience-generated images and event documentation.',
    media: [
      { type: 'image', src: '/images/gans-install/01.jpg', caption: 'Installation view' },
      { type: 'image', src: '/images/gans-install/02.jpg', caption: 'Installation view' },
      { type: 'image', src: '/images/gans-install/03.jpg', caption: 'Audience generated' },
      { type: 'image', src: '/images/gans-install/04.jpg', caption: 'Audience generated' },
      {
        type: 'video',
        src: 'https://files.cargocollective.com/c939493/GANs.mov',
        caption: 'GANs in action',
      },
    ],
    tags: ['AI', 'audience', 'installation'],
  },
  {
    slug: 'osmosis-install',
    title: 'Osmosis',
    subtitle: 'immersive vibrations',
    date: 'September 16th, 2021',
    location: '@ AQUARIUM, Berlin',
    description:
      'An immersive installation exploring vibration and sound as a physical, bodily experience.',
    media: [
      { type: 'image', src: '/images/osmosis-install/01.jpg', caption: 'Installation view' },
      { type: 'image', src: '/images/osmosis-install/02.jpg', caption: 'Installation view' },
      { type: 'image', src: '/images/osmosis-install/03.jpg', caption: 'Installation view' },
    ],
    tags: ['sound', 'installation', 'immersive'],
  },
]

export const mixtapes = [
  {
    title: 'have another break',
    note: 'mixtape recorded on Sep 11, 2021',
    soundcloudTrack: '1206743212',
  },
  {
    title: 'Minimimal 4th Anniversary @ Echobay, Chongqing',
    note: 'live recorded 20200829',
    soundcloudTrack: '1206740950',
  },
  {
    title: 'take a break',
    note: 'mixtape recorded Aug 30th 2021',
    soundcloudTrack: '1115411413',
  },
]

export const albums: Album[] = [
  {
    slug: 'cuts-and-composts',
    title: 'Cuts and Composts',
    artist: 'Susul',
    released: 'January 30th, 2022',
    tracks: [
      { name: 'Not My Jazz', audio: 'https://github.com/susulliang/susul-sound/raw/main/cuts-and-composts/not-my-jazz.m4a' },
      { name: 'Bubujibubu', audio: 'https://github.com/susulliang/susul-sound/raw/main/cuts-and-composts/bubujibubu.m4a' },
      { name: 'Attempting Real Art', audio: 'https://github.com/susulliang/susul-sound/raw/main/cuts-and-composts/attempting-real-art.m4a' },
      { name: 'Di Da Di', audio: 'https://github.com/susulliang/susul-sound/raw/main/cuts-and-composts/di-da-di.m4a' },
      { name: 'Chopin Chop Chop', audio: 'https://github.com/susulliang/susul-sound/raw/main/cuts-and-composts/chopin-chop-chop.m4a' },
      { name: 'Mellow Ending', audio: 'https://github.com/susulliang/susul-sound/raw/main/cuts-and-composts/mellow-ending.m4a' },
    ],
    links: [
      { label: 'bandcamp', url: 'https://susul.bandcamp.com/' },
      { label: 'spotify', url: 'https://open.spotify.com/artist/4MNOr9datw94pg3w7NWBH0' },
      { label: 'apple music', url: 'https://music.apple.com/' },
    ],
    cover: '/images/album-cover.jpg',
    soundcloudPlaylist: '1387778626',
  },
  {
    slug: 'rendezvous',
    title: 'Rendezvous! [CAC015]',
    artist: 'cAcTi Music 🌵',
    released: 'January 2021, Chongqing, China',
    tracks: [
      { name: 'Osmose', audio: 'https://github.com/desmonddeliang/susul-sound/raw/main/cact015/Osmose.mp3' },
      { name: 'Frequenzen', audio: 'https://github.com/desmonddeliang/susul-sound/raw/main/cact015/Frequenzen.mp3' },
      { name: 'Happy End', audio: 'https://github.com/desmonddeliang/susul-sound/raw/main/cact015/Happy_End.mp3' },
      { name: 'Oszillieren', audio: 'https://github.com/desmonddeliang/susul-sound/raw/main/cact015/Oszillieren.mp3' },
      { name: '...Sag es!', audio: 'https://github.com/desmonddeliang/susul-sound/raw/main/cact015/Sag_es.mp3' },
    ],
    links: [
      { label: 'bandcamp', url: 'https://susul.bandcamp.com/' },
      { label: 'spotify', url: 'https://open.spotify.com/artist/4MNOr9datw94pg3w7NWBH0' },
      { label: 'apple music', url: 'https://music.apple.com/' },
    ],
    cover: '/images/rendezvous-cover.jpg',
    soundcloudPlaylist: '1211847955',
  },
]

/**
 * Archives — each entry now links to a detail page or external site.
 */
export const archiveSections = [
  {
    heading: 'Installations',
    items: [
      {
        title: 'Cyberspace Saturator — an interactive AI painter',
        detail: '@ Spektral-Raumrohr, Berlin, September 29th, 2022',
        link: '/installations/cyberspace-saturator-install',
      },
      {
        title: 'GANs — your painterly AI friend',
        detail: '@ NoVilla + Vorspiel, Berlin, January 22nd, 2022',
        link: '/installations/gans-install',
      },
      {
        title: 'Osmosis — immersive vibrations',
        detail: '@ AQUARIUM, Berlin, September 16th, 2021',
        link: '/installations/osmosis-install',
      },
    ],
  },
  {
    heading: 'Web Apps',
    items: [
      {
        title: 'Osmosis — interactive 3D spectrogram',
        detail: 'WebGL audio visualizer',
        link: '/work/osmosis-web',
      },
    ],
  },
  {
    heading: 'Films',
    items: [
      {
        title: "A Student's Wife",
        detail: 'short film, 13 mins, 2019',
        link: '/work/a-students-wife',
      },
    ],
  },
]

/** All projects by slug for detail routing */
export const allProjects: Project[] = [...workProjects, ...installationProjects]

export function getProject(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug)
}
