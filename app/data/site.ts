// Єдине джерело даних сайту.
// Позначки MOCK — тимчасові значення, які треба уточнити з Олександром перед запуском.

export const company = {
  name: 'Процков Буд',
  tagline: 'Будматеріали та спецтехніка, Вінниця',
  owner: 'Олександр Процков',
  years: 13,
  phone: '+380971928066',
  phoneDisplay: '097 192 80 66',
  hours: 'щодня з 6:00 до 22:00',
  hoursSchema: 'Mo-Su 06:00-22:00',
  area: 'Вінниця і до 30 км навколо',
  city: 'Вінниця',
  url: 'https://protskovbud.vn.ua' // MOCK: домен ще не куплений
} as const

export const messengers = [
  { name: 'Viber', icon: 'i-simple-icons-viber', href: `viber://chat?number=%2B${company.phone.slice(1)}` },
  { name: 'Telegram', icon: 'i-simple-icons-telegram', href: `https://t.me/${company.phone}` },
  { name: 'WhatsApp', icon: 'i-simple-icons-whatsapp', href: `https://wa.me/${company.phone.slice(1)}` }
] as const

export interface Material {
  id: string
  name: string
  description: string
  fractions?: string[]
  /** Насипна щільність, т/м³ — для калькулятора */
  density?: number
  /** MOCK: орієнтовна ціна, грн за тонну */
  priceFrom: number
  unit: string
  /** Тимчасове фото з Wikimedia Commons, доки немає власних (див. photoCredits) */
  photo?: string
  /** Фото кожної фракції, ключ — фракція з `fractions` */
  fractionPhotos?: Record<string, string>
}

export const materials: Material[] = [
  {
    id: 'shcheben',
    name: 'Щебінь гранітний',
    description: 'Для бетону, фундаменту, доріг і відсипки ділянки.',
    fractions: ['5–20', '20–40', '40–70'],
    density: 1.4,
    priceFrom: 650,
    unit: 'т',
    fractionPhotos: {
      '5–20': '/images/materials/shch-5-20.jpg',
      '20–40': '/images/materials/shch-20-40.jpg',
      '40–70': '/images/materials/shch-40-70.jpg'
    }
  },
  {
    id: 'vidsiv',
    name: 'Відсів гранітний',
    description: 'Під бруківку й тротуарну плитку, для доріжок і цементних сумішей.',
    fractions: ['0–5'],
    density: 1.5,
    priceFrom: 400,
    unit: 'т',
    photo: '/images/materials/vidsiv.jpg'
  },
  {
    id: 'pisok-mytyi',
    name: 'Пісок митий',
    description: 'Чистий, без глини. Для бетону, стяжки й штукатурки.',
    density: 1.5,
    priceFrom: 450,
    unit: 'т',
    photo: '/images/materials/pisok-mytyi.jpg'
  },
  {
    id: 'pisok-yaruzhnyi',
    name: 'Пісок яружний',
    description: 'Для кладки, підсипки під фундамент і засипки траншей.',
    density: 1.6,
    priceFrom: 300,
    unit: 'т',
    photo: '/images/materials/pisok-yaruzhnyi.jpg'
  },
  {
    id: 'kamin-butovyi',
    name: 'Камінь бутовий',
    description: 'Для фундаментів, підпірних стінок і габіонів.',
    density: 1.6,
    priceFrom: 600,
    unit: 'т',
    photo: '/images/materials/kamin-butovyi.jpg'
  },
  {
    id: 'kamin-lytsovyi',
    name: 'Камінь лицьовий',
    description: 'Облицювання цоколя, парканів, мощення доріжок.',
    priceFrom: 1200,
    unit: 'т',
    photo: '/images/materials/kamin-lytsovyi.jpg'
  },
  {
    id: 'chornozem',
    name: 'Чорнозем родючий',
    description: 'Для газону, клумб і городу.',
    density: 1.2,
    priceFrom: 350,
    unit: 'т',
    photo: '/images/materials/chornozem.jpg'
  }
]

// Автори тимчасових фото матеріалів. Ліцензії CC BY і CC BY-SA вимагають підпису,
// тож список виводиться під блоком матеріалів. Фото з ліцензією CC0 (щебінь 5–20 і 20–40,
// пісок митий, камінь бутовий) підпису не потребують. Прибрати разом із фото, коли будуть власні.
export const photoCredits = [
  { what: 'щебінь 40–70', author: 'Suyash Dwivedi', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Gravels_for_road_construction.jpg' },
  { what: 'відсів', author: 'Fanti Salms', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:White_Quarry_Dust.jpg' },
  { what: 'пісок яружний', author: 'Peter Craven', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Washed_sand_stockpile_(5081172874).jpg' },
  { what: 'камінь лицьовий', author: 'Shagil Muzhappilangad', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Granite_Stone_Walls_of_Hampi_(1).jpg' },
  { what: 'чорнозем', author: 'Ian Greig', license: 'CC BY-SA 2.0', url: 'https://commons.wikimedia.org/w/index.php?curid=113606557' }
]

export interface Machine {
  id: string
  name: string
  jobs: string[]
  /** MOCK: орієнтовна ціна, грн за годину */
  priceFrom: number
}

export const machinery: Machine[] = [
  {
    id: 'ekskavator',
    name: 'Екскаватор',
    jobs: ['Котловани під фундамент', 'Траншеї', 'Вигрібні ями', 'Демонтаж будівель'],
    priceFrom: 1500
  },
  {
    id: 'miniekskavator',
    name: 'Мініекскаватор',
    jobs: ['Роботи у дворі й на тісних ділянках', 'Траншеї під комунікації', 'Ями під септик'],
    priceFrom: 1200
  },
  {
    id: 'bobkat',
    name: 'Бобкет',
    jobs: ['Планування ділянки', 'Розрівнювання щебеню й ґрунту', 'Навантаження', 'Вивіз будівельного сміття'],
    priceFrom: 1000
  }
]

export interface Truck {
  name: string
  /** Вантажопідйомність, т. MOCK для КАМАЗ і Volvo — уточнити */
  capacity: number
}

export const trucks: Truck[] = [
  { name: 'ЗІЛ', capacity: 7 },
  { name: 'КАМАЗ', capacity: 12 },
  { name: 'Volvo', capacity: 25 }
]

export const faq = [
  {
    label: 'Скільки тонн у кубі щебеню чи піску?',
    content: 'Один кубометр щебеню важить приблизно 1,4 т, митого піску — близько 1,5 т, яружного — близько 1,6 т. Точний об\'єм під вашу задачу підкажемо по телефону.'
  },
  {
    label: 'Яку машину замовити?',
    content: 'ЗІЛ везе до 7 т, КАМАЗ — до 12 т, Volvo — до 25 т. Для двору чи невеликого фундаменту зазвичай вистачає ЗІЛа, для великих об\'ємів вигідніше один рейс Volvo.'
  },
  {
    label: 'Куди доставляєте?',
    content: 'По Вінниці та в радіусі 30 км. Якщо об\'єкт далі — зателефонуйте, обговоримо.'
  },
  {
    label: 'Можна замовити матеріал і техніку разом?',
    content: 'Так. Наприклад, привеземо щебінь і одразу розрівняємо його бобкетом, або викопаємо котлован і вивеземо ґрунт.'
  },
  {
    label: 'Техніка працює з оператором?',
    content: 'Так, уся техніка працює з нашим досвідченим водієм. Окремо шукати оператора не потрібно.'
  },
  {
    label: 'Коли можна замовити?',
    content: 'Приймаємо дзвінки й повідомлення щодня з 6:00 до 22:00.'
  }
]
