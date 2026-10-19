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
  /** Доставка самоскидом по Вінниці, грн (підтверджено Олександром) */
  deliveryFrom: 3000,
  city: 'Вінниця',
  url: 'https://protskovbud.vn.ua'
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
  /** Найнижча ціна, грн за тонну, без доставки */
  priceFrom: number
  /** Ціна кожної фракції, грн за тонну */
  fractionPrices?: Record<string, number>
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
    fractions: ['5–10', '5–20', '20–40', '40–70'],
    density: 1.4,
    priceFrom: 610,
    unit: 'т',
    fractionPrices: { '5–10': 720, '5–20': 660, '20–40': 610, '40–70': 610 },
    fractionPhotos: {
      '5–10': '/images/materials/shch-5-10.jpg',
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
    priceFrom: 260,
    unit: 'т',
    photo: '/images/materials/vidsiv.jpg'
  },
  {
    id: 'vidsiv-mytyi',
    name: 'Відсів митий',
    description: 'Відсів без пилу. Для бетону, стяжки й під тротуарну плитку.',
    fractions: ['0–5'],
    density: 1.5,
    priceFrom: 720,
    unit: 'т',
    photo: '/images/materials/vidsiv-mytyi.jpg'
  },
  {
    id: 'pisok-mytyi',
    name: 'Пісок митий',
    description: 'Чистий, без глини. Для бетону, стяжки й штукатурки.',
    density: 1.5,
    priceFrom: 720,
    unit: 'т',
    photo: '/images/materials/pisok-mytyi.jpg'
  },
  {
    id: 'pisok-yaruzhnyi',
    name: 'Пісок яружний',
    description: 'Для кладки, підсипки під фундамент і засипки траншей.',
    density: 1.6,
    priceFrom: 400,
    unit: 'т',
    photo: '/images/materials/pisok-yaruzhnyi.jpg'
  },
  {
    id: 'kamin-butovyi',
    name: 'Камінь бутовий',
    description: 'Для фундаментів, підпірних стінок і габіонів.',
    density: 1.6,
    priceFrom: 620,
    unit: 'т',
    photo: '/images/materials/kamin-butovyi.jpg'
  },
  {
    id: 'kamin-lytsovyi',
    name: 'Камінь лицьовий',
    description: 'Облицювання цоколя, парканів, мощення доріжок.',
    priceFrom: 500,
    unit: 'т',
    photo: '/images/materials/kamin-lytsovyi.jpg'
  },
  {
    id: 'chornozem',
    name: 'Чорнозем родючий',
    description: 'Для газону, клумб і городу.',
    density: 1.2,
    priceFrom: 660,
    unit: 'т',
    photo: '/images/materials/chornozem.jpg'
  }
]

// Автори тимчасових фото матеріалів. Ліцензії CC BY і CC BY-SA вимагають підпису,
// тож список виводиться під блоком матеріалів. Фото з ліцензією CC0 (щебінь 5–20 і 20–40,
// відсів митий, пісок митий, камінь бутовий) підпису не потребують. Прибрати разом із фото, коли будуть власні.
export const photoCredits = [
  { what: 'щебінь 5–10', author: 'Johnnybam', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Crushed_Granite_Stones_for_Construction.jpg' },
  { what: 'щебінь 40–70', author: 'Suyash Dwivedi', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Gravels_for_road_construction.jpg' },
  { what: 'відсів', author: 'Fanti Salms', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:White_Quarry_Dust.jpg' },
  { what: 'пісок яружний', author: 'Peter Craven', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Washed_sand_stockpile_(5081172874).jpg' },
  { what: 'камінь лицьовий', author: 'Shagil Muzhappilangad', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Granite_Stone_Walls_of_Hampi_(1).jpg' }
]

export interface Machine {
  id: string
  name: string
  /** Модель чи клас машини */
  spec?: string
  jobs: string[]
  /** Грн за годину роботи з водієм */
  pricePerHour: number
  /** Мінімальне замовлення, годин */
  minHours: number
  /** Доставка техніки на об'єкт, грн */
  deliveryPrice: number
  photo?: string
  /** Фото не нашої машини, а для прикладу (з Wikimedia Commons), доки немає власного */
  stockPhoto?: boolean
}

export const machinery: Machine[] = [
  {
    id: 'ekskavator',
    name: 'Екскаватор',
    spec: 'JCB',
    jobs: ['Котловани під фундамент', 'Траншеї', 'Вигрібні ями', 'Демонтаж будівель'],
    pricePerHour: 1800,
    minHours: 2,
    deliveryPrice: 2500,
    photo: '/images/tech/ekskavator.jpg'
  },
  {
    id: 'miniekskavator',
    name: 'Мініекскаватор',
    spec: '3–5 т',
    jobs: ['Роботи у дворі й на тісних ділянках', 'Траншеї під комунікації', 'Ями під септик'],
    pricePerHour: 1700,
    minHours: 2,
    deliveryPrice: 2500,
    photo: '/images/tech/miniekskavator.jpg'
  },
  {
    id: 'bobkat',
    name: 'Бобкет',
    spec: 'Avant',
    jobs: ['Планування ділянки', 'Розрівнювання щебеню й ґрунту', 'Навантаження', 'Вивіз будівельного сміття'],
    pricePerHour: 1700,
    minHours: 2,
    deliveryPrice: 2500,
    photo: '/images/tech/bobkat.jpg',
    stockPhoto: true
  },
  {
    id: 'gidromolot',
    name: 'Гідромолот',
    jobs: ['Демонтаж бетону й фундаментів', 'Розбивання старих стін і перекриттів', 'Розбивання асфальту й каменю'],
    pricePerHour: 2500,
    minHours: 3,
    deliveryPrice: 2500,
    photo: '/images/tech/gidromolot.jpg',
    stockPhoto: true
  }
]

// Фото техніки для прикладу. Бобкет — CC0, підпис не потрібен; гідромолот — CC BY-SA, підписуємо.
export const techPhotoCredits = [
  { what: 'гідромолот', author: 'Globetrotter19', license: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:JCB_backhoe_loader_with_hydraulic_breaker,_2019_Szigetszentmikl%C3%B3s.jpg' }
]

// Власні фото робіт Олександра (оригінали в app/images/, у git не потрапляють)
export const works = [
  { src: '/images/work/kotlovan.jpg', alt: 'Гусеничний екскаватор вантажить ґрунт у КАМАЗ із зеленим кузовом біля викопаного котловану', title: 'Котлован під фундамент, ґрунт одразу вантажимо в самоскид' },
  { src: '/images/work/septyk.jpg', alt: 'Екскаватор JCB опускає бетонне кільце в яму на подвір\'ї', title: 'Септик: викопали яму й поставили кільця' },
  { src: '/images/work/transheia.jpg', alt: 'Мініекскаватор Kubota у глибокій траншеї, позаду самоскид', title: 'Траншея мініекскаватором на тісній ділянці' },
  { src: '/images/work/demontazh.jpg', alt: 'Мініекскаватор серед цегли розібраної стіни старого будинку', title: 'Демонтаж старого будинку' },
  { src: '/images/work/rozbir.jpg', alt: 'Колісний екскаватор розбирає будівлю, поруч самоскид Volvo під завантаження', title: 'Розбір будівлі й вивіз будівельного сміття' },
  { src: '/images/work/vyviz-gruntu.jpg', alt: 'Ківш екскаватора над самоскидом із червоним кузовом, повним ґрунту', title: 'Вивіз ґрунту з ділянки' },
  { src: '/images/work/shcheben.jpg', alt: 'Самоскид із зеленим кузовом висипає купу щебеню біля нового будинку', title: 'Привезли щебінь до будинку' },
  { src: '/images/work/yama-jcb.jpg', alt: 'Ківш екскаватора JCB копає глибоку яму біля паркану', title: 'Яма екскаватором JCB у дворі' }
]

export const fleetPhotos = [
  { src: '/images/fleet/zil.jpg', title: 'ЗІЛ, 7 т', stockPhoto: true },
  { src: '/images/fleet/kamaz.jpg', title: 'КАМАЗ, 12 т: вивантажуємо пісок' },
  { src: '/images/fleet/volvo.jpg', title: 'Volvo, 12 т' }
]

// ЗІЛ поки на фото для прикладу (CC BY-SA, підписуємо)
export const fleetPhotoCredits = [
  { what: 'ЗІЛ', author: 'JoonasJJ', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Zil130profile.jpg' }
]

export interface Truck {
  name: string
  /** Вантажопідйомність, т (підтверджено: ЗІЛ 7, КАМАЗ і Volvo по 12) */
  capacity: number
}

export const trucks: Truck[] = [
  { name: 'ЗІЛ', capacity: 7 },
  { name: 'КАМАЗ', capacity: 12 },
  { name: 'Volvo', capacity: 12 }
]

export const faq = [
  {
    label: 'Скільки тонн у кубі щебеню чи піску?',
    content: 'Один кубометр щебеню важить приблизно 1,4 т, митого піску — близько 1,5 т, яружного — близько 1,6 т. Точний об\'єм під вашу задачу підкажемо по телефону.'
  },
  {
    label: 'Яку машину замовити?',
    content: 'ЗІЛ везе до 7 т, КАМАЗ і Volvo — до 12 т. Для двору чи невеликого фундаменту зазвичай вистачає ЗІЛа, для більших об\'ємів беремо КАМАЗ або Volvo.'
  },
  {
    label: 'Куди доставляєте?',
    content: 'По Вінниці та в радіусі 30 км. Якщо об\'єкт далі — зателефонуйте, обговоримо.'
  },
  {
    label: 'Скільки коштує доставка?',
    content: 'Доставка самоскидом по Вінниці коштує від 3 000 грн, ціни на матеріали вказані без неї. Доставка за місто залежить від відстані, суму назвемо по телефону.'
  },
  {
    label: 'Яке мінімальне замовлення техніки?',
    content: 'Екскаватор, мініекскаватор і бобкет замовляються від 2 годин, гідромолот від 3 годин. Доставка техніки на об\'єкт коштує 2 500 грн.'
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
