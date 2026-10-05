const en = {
  locale: 'en-GB',
  meta: {
    title: 'WeTheGods — Alternative metalcore from Czechia',
    description:
      'Official site of WeTheGods, an alternative metalcore band from Uherské Hradiště. Shows, music, videos, photos and booking.',
    pages: {
      shows: 'Upcoming and past WeTheGods shows, with tickets and dates.',
      music: 'Debut EP ONE and every WeTheGods single, with links to all streaming services.',
      videos: 'Official WeTheGods music videos.',
      about: 'Who WeTheGods are: alternative metalcore from Uherské Hradiště, formed in 2024.',
      gallery: 'Live photos of WeTheGods from Rock for People, Front Line Fest and more.',
      contact: 'Booking, press kit, merch and social links for WeTheGods.',
    },
  },
  more: {
    shows: 'All shows',
    music: 'All releases',
    videos: 'All videos',
    gallery: 'Open the gallery',
    contact: 'Contact & booking',
    about: 'About the band',
  },
  nav: {
    shows: 'Shows',
    music: 'Music',
    videos: 'Videos',
    about: 'About',
    gallery: 'Gallery',
    contact: 'Contact',
    skip: 'Skip to content',
    menu: 'Menu',
    close: 'Close',
    theme: 'Light theme',
    language: 'Language',
  },
  hero: {
    pause: 'Pause background video',
    play: 'Play background video',
  },
  shows: {
    heading: 'Live',
    emptyTitle: 'No new dates yet.',
    emptyText: 'New shows land on Instagram first. Want us on your bill?',
    book: 'Book the band',
    follow: 'Follow on Instagram',
    past: 'Past shows',
    tickets: 'Tickets',
    with: 'with',
    status: {
      'sold-out': 'Sold out',
      cancelled: 'Cancelled',
      postponed: 'Postponed',
      free: 'Free entry',
    },
    types: { show: 'Show', release: 'Release', party: 'Party', signing: 'Signing', other: 'Event' },
    link: {
      show: 'Tickets',
      release: 'Listen',
      party: 'Tickets',
      signing: 'More info',
      other: 'More info',
    },
    details: 'Details',
    back: 'All shows',
    when: 'When',
    doors: 'Doors',
    start: 'Start',
    end: 'Ends',
    where: 'Where',
    lineup: 'Line-up',
    directions: 'Directions',
    calendar: 'Add to calendar',
  },
  music: {
    heading: 'Music',
    kinds: { album: 'Album', ep: 'EP', single: 'Single' },
    listen: 'Listen',
    tracklist: 'Tracklist',
    singles: 'Earlier releases',
  },
  videos: {
    heading: 'Videos',
    play: 'Play video',
    privacy:
      'Playing a video connects to YouTube. Google receives your IP address and browser data and may store data on your device.',
    privacyLink: 'Google privacy policy',
    more: 'All videos on YouTube',
  },
  about: {
    heading: 'About',
    facts: {
      origin: 'From',
      formed: 'Formed',
      genre: 'Genre',
      fans: 'For fans of',
    },
    members: 'Line-up',
  },
  gallery: {
    heading: 'Gallery',
    open: 'Open photo',
    close: 'Close',
    prev: 'Previous photo',
    next: 'Next photo',
    photo: 'Photo',
  },
  contact: {
    heading: 'Contact',
    booking: 'Booking & contact',
    copy: 'Copy',
    copied: 'Copied',
    presskit: 'Press kit',
    presskitLink: 'Download press kit',
    merch: 'Merch store',
    merchLink: 'Open the store',
    follow: 'Follow',
    form: {
      title: 'Send us a message',
      name: 'Name (optional)',
      email: 'Email',
      topic: 'Topic',
      topics: { booking: 'Booking', press: 'Press & media', fans: 'Fans', other: 'Something else' },
      message: 'Message',
      send: 'Send message',
      sending: 'Sending…',
      sent: 'Thanks, your message is on its way. We will get back to you soon.',
      error: 'Sending failed. Please try again or email us directly.',
      privacy:
        'Your email, message and optional name are sent through FormSubmit to the band inbox. Include only information needed for your enquiry.',
    },
  },
  footer: {
    credits: 'Live photos: Petr Ovsík /',
    top: 'Back to top',
    privacy: 'Website privacy',
  },
  notFound: {
    title: 'Signal lost',
    text: 'This page does not exist.',
    home: 'Back to the homepage',
  },
};

type Dict = typeof en;

const cs: Dict = {
  locale: 'cs-CZ',
  meta: {
    title: 'WeTheGods — Alternativní metalcore z Česka',
    description:
      'Oficiální web kapely WeTheGods, alternativního metalcoru z Uherského Hradiště. Koncerty, hudba, klipy, fotky a booking.',
    pages: {
      shows: 'Nadcházející a proběhlé koncerty WeTheGods, termíny a vstupenky.',
      music: 'Debutové EP ONE a všechny singly WeTheGods s odkazy na streamovací služby.',
      videos: 'Oficiální videoklipy kapely WeTheGods.',
      about:
        'Kdo jsou WeTheGods: alternativní metalcore z Uherského Hradiště, založeno v roce 2024.',
      gallery: 'Živé fotky WeTheGods z Rock for People, Front Line Festu a dalších koncertů.',
      contact: 'Booking, press kit, merch a sociální sítě kapely WeTheGods.',
    },
  },
  more: {
    shows: 'Všechny koncerty',
    music: 'Všechna vydání',
    videos: 'Všechny klipy',
    gallery: 'Otevřít galerii',
    contact: 'Kontakt a booking',
    about: 'O kapele',
  },
  nav: {
    shows: 'Koncerty',
    music: 'Hudba',
    videos: 'Klipy',
    about: 'O kapele',
    gallery: 'Galerie',
    contact: 'Kontakt',
    skip: 'Přeskočit na obsah',
    menu: 'Menu',
    close: 'Zavřít',
    theme: 'Světlý režim',
    language: 'Jazyk',
  },
  hero: {
    pause: 'Pozastavit video na pozadí',
    play: 'Přehrát video na pozadí',
  },
  shows: {
    heading: 'Koncerty',
    emptyTitle: 'Zatím žádné nové termíny.',
    emptyText: 'Nové koncerty oznamujeme nejdřív na Instagramu. Chcete nás na svůj koncert?',
    book: 'Booking',
    follow: 'Sledovat na Instagramu',
    past: 'Proběhlé koncerty',
    tickets: 'Vstupenky',
    with: 's',
    status: {
      'sold-out': 'Vyprodáno',
      cancelled: 'Zrušeno',
      postponed: 'Přesunuto',
      free: 'Vstup zdarma',
    },
    types: {
      show: 'Koncert',
      release: 'Vydání',
      party: 'Oslava',
      signing: 'Autogramiáda',
      other: 'Akce',
    },
    link: {
      show: 'Vstupenky',
      release: 'Poslechnout',
      party: 'Vstupenky',
      signing: 'Více info',
      other: 'Více info',
    },
    details: 'Detail',
    back: 'Všechny koncerty',
    when: 'Kdy',
    doors: 'Otevření',
    start: 'Začátek',
    end: 'Konec',
    where: 'Kde',
    lineup: 'Hrají',
    directions: 'Navigovat',
    calendar: 'Přidat do kalendáře',
  },
  music: {
    heading: 'Hudba',
    kinds: { album: 'Album', ep: 'EP', single: 'Singl' },
    listen: 'Poslechnout',
    tracklist: 'Seznam skladeb',
    singles: 'Starší vydání',
  },
  videos: {
    heading: 'Klipy',
    play: 'Přehrát klip',
    privacy:
      'Přehrání videa naváže spojení s YouTube. Google obdrží vaši IP adresu a údaje o prohlížeči a může ukládat data do zařízení.',
    privacyLink: 'Zásady ochrany soukromí Google',
    more: 'Všechna videa na YouTube',
  },
  about: {
    heading: 'O kapele',
    facts: {
      origin: 'Odkud',
      formed: 'Vznik',
      genre: 'Žánr',
      fans: 'Pro fanoušky',
    },
    members: 'Sestava',
  },
  gallery: {
    heading: 'Galerie',
    open: 'Otevřít fotku',
    close: 'Zavřít',
    prev: 'Předchozí fotka',
    next: 'Další fotka',
    photo: 'Foto',
  },
  contact: {
    heading: 'Kontakt',
    booking: 'Booking a kontakt',
    copy: 'Kopírovat',
    copied: 'Zkopírováno',
    presskit: 'Press kit',
    presskitLink: 'Stáhnout press kit',
    merch: 'Merch',
    merchLink: 'Do obchodu',
    follow: 'Sledujte nás',
    form: {
      title: 'Napište nám',
      name: 'Jméno (nepovinné)',
      email: 'E-mail',
      topic: 'Téma',
      topics: { booking: 'Booking', press: 'Média a tisk', fans: 'Fanoušci', other: 'Něco jiného' },
      message: 'Zpráva',
      send: 'Odeslat zprávu',
      sending: 'Odesílám…',
      sent: 'Díky, zpráva je na cestě. Brzy se ozveme.',
      error: 'Odeslání se nepovedlo. Zkuste to znovu nebo nám napište e-mail.',
      privacy:
        'E-mail, zprávu a případné jméno odešle služba FormSubmit do schránky kapely. Uveďte pouze údaje potřebné pro vyřízení dotazu.',
    },
  },
  footer: {
    credits: 'Živé fotky: Petr Ovsík /',
    top: 'Nahoru',
    privacy: 'Soukromí na webu',
  },
  notFound: {
    title: 'Signál ztracen',
    text: 'Tahle stránka neexistuje.',
    home: 'Zpět na úvod',
  },
};

export const dict = { en, cs };
export type Lang = keyof typeof dict;
export const langs = Object.keys(dict) as Lang[];

export const pages = ['', 'shows', 'music', 'videos', 'about', 'gallery', 'contact'] as const;
export type Page = (typeof pages)[number];

/** URL of a page in a language, respecting the deploy base path. English lives at the root. */
export const pageUrl = (lang: Lang, page: Page = '') =>
  `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}${lang === 'en' ? '' : `${lang}/`}${page && `${page}/`}`;

/** getStaticPaths for pages under src/pages/[...lang]/: one build per language. */
export const langPaths = () =>
  langs.map((lang) => ({ params: { lang: lang === 'en' ? undefined : lang } }));

export const toLang = (param: string | undefined): Lang => (param === 'cs' ? 'cs' : 'en');
