export const site = {
  name: 'Na kávičku',
  shortName: 'Na kávičku',
  url: 'https://www.na-kavicku.cz',
  locale: 'cs_CZ',
  address: 'Hlavní tř. 840, 708 00 Ostrava 8',
  phone: '+420 725 318 200',
  email: 'nakavicku@seznam.cz',
  companyId: '25878620',
  supervisoryAuthority: {
    name: 'Úřad pro ochranu osobních údajů',
    url: 'https://uoou.gov.cz',
  },
  socials: {
    instagram: 'https://www.instagram.com/na_kavicku/',
    facebook: 'https://www.facebook.com/NaKavicku',
    googleReviews: 'https://g.co/kgs/h1LhajG',
    maps: 'https://g.co/kgs/KDWphYb',
  },
  openingHours: [
    {days: 'Pondělí – pátek', hours: '8:00 – 20:00'},
    {days: 'Sobota', hours: '13:00 – 20:00'},
    {days: 'Neděle', hours: '13:00 – 19:00'},
  ],
} as const

