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
  /** Окрема сторінка послуги, якщо вже є; label — текст посилання на неї */
  page?: { to: string, label: string }
}

export const machinery: Machine[] = [
  {
    id: 'ekskavator',
    name: 'Екскаватор',
    spec: 'JCB 3CX',
    jobs: ['Котловани під фундамент', 'Траншеї', 'Вигрібні ями', 'Демонтаж будівель'],
    pricePerHour: 1800,
    minHours: 2,
    deliveryPrice: 2500,
    photo: '/images/tech/ekskavator.jpg',
    page: { to: '/ekskavator/', label: 'Оренда екскаватора JCB: ціни й фото' }
  },
  {
    id: 'miniekskavator',
    name: 'Мініекскаватор',
    spec: '3–5 т',
    jobs: ['Роботи у дворі й на тісних ділянках', 'Траншеї під комунікації', 'Ями під септик'],
    pricePerHour: 1700,
    minHours: 2,
    deliveryPrice: 2500,
    photo: '/images/tech/miniekskavator.jpg',
    page: { to: '/miniekskavator/', label: 'Оренда мініекскаватора: ціни й фото' }
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

// Сторінка /miniekskavator. Лише підтверджені факти.
// Моделі від Олександра: Kubota RX-303 і RX-305 (20.10.2026). Каталожні розміри й вага в них однакові
// (tehnomirjp.ru, allstocker.com), тож одна таблиця характеристик на обидві
export const miniModel = 'Kubota RX-303 і RX-305'

export const miniSpecs = [
  { label: 'Глибина копання', value: 'до 2,87 м' },
  { label: 'Радіус копання', value: '4,51 м' },
  { label: 'Висота вивантаження', value: '3,78 м' },
  { label: 'Ширина машини', value: '1,55 м' },
  { label: 'Висота', value: '2,37 м' },
  { label: 'Ширина ковша', value: '48 см' },
  { label: 'Відвал', value: '1,55 м' },
  { label: 'Робоча вага', value: '2,95 т' }
]

export const miniPhotos = [
  { src: '/images/mini/demontazh-vodii.jpg', alt: 'Мініекскаватор Kubota з нашим водієм розбирає старий будинок', title: 'Демонтаж з нашим водієм' },
  { src: '/images/work/transheia.jpg', alt: 'Мініекскаватор Kubota у глибокій траншеї, позаду самоскид', title: 'Траншея на тісній ділянці' },
  { src: '/images/mini/rozbir.jpg', alt: 'Мініекскаватор Kubota на розборі старої будівлі, поруч самоскид Volvo', title: 'Розбір будівлі, сміття одразу в Volvo' },
  { src: '/images/work/demontazh.jpg', alt: 'Мініекскаватор серед цегли розібраної стіни старого будинку', title: 'Демонтаж старого будинку' },
  { src: '/images/mini/zil.jpg', alt: 'Мініекскаватор Kubota вантажить ґрунт у самоскид ЗІЛ', title: 'Вантажимо ґрунт у ЗІЛ' },
  { src: '/images/mini/samoskyd.jpg', alt: 'Мініекскаватор Kubota висипає ківш ґрунту в кузов самоскида', title: 'Навантаження самоскида' }
]

export const miniJobs = [
  { title: 'Траншеї', text: 'Під водопровід, каналізацію чи кабель, ковшем 48 см і глибиною до 2,87 м. Відвалом одразу засипаємо траншею назад.' },
  { title: 'Ями під септик', text: 'Викопаємо яму під септик або вигрібну яму прямо у дворі.' },
  { title: 'Демонтаж', text: 'Розбираємо старі будівлі, цеглу й сміття вантажимо в самоскид.' },
  { title: 'Планування ділянки', text: 'Знімемо зайвий ґрунт, вирівняємо майданчик під будівництво.' },
  { title: 'Навантаження', text: 'Вантажимо ґрунт і будівельне сміття в наш самоскид, щоб одразу вивезти.' },
  { title: 'Тісні ділянки', text: 'Працює там, де великий екскаватор не розвернеться: у дворах, між будинками, за парканом.' }
]

export const miniFaq = [
  {
    label: 'Скільки коштує оренда мініекскаватора у Вінниці?',
    content: 'Година роботи з водієм коштує 1 700 грн, мінімальне замовлення 2 години. Доставка техніки на об\'єкт 2 500 грн. Тож найменше замовлення обійдеться в 5 900 грн.'
  },
  {
    label: 'Мініекскаватор працює з оператором?',
    content: 'Так, техніка працює лише з нашим водієм. Окремо шукати оператора не потрібно.'
  },
  {
    label: 'Чи пройде мініекскаватор у мій двір?',
    content: 'Наші міні-екскаватори Kubota RX-303 і RX-305 мають ширину 1,55 м і висоту 2,37 м, тому заходять у більшість дворів. Назвіть по телефону ширину воріт чи проїзду, і Олександр одразу скаже, чи пройде техніка.'
  },
  {
    label: 'На яку глибину копає мініекскаватор?',
    content: 'Kubota RX-303 і RX-305 копають на глибину до 2,87 м, радіус копання 4,51 м. Цього вистачає для траншей під комунікації, ям під септик і вигрібних ям у приватному дворі.'
  },
  {
    label: 'Можна одразу вивезти ґрунт чи сміття?',
    content: 'Так. Мініекскаватор вантажить ґрунт у наш самоскид: ЗІЛ на 7 т або КАМАЗ чи Volvo на 12 т. Привеземо й техніку, і машину під вивіз.'
  },
  {
    label: 'Куди виїжджаєте?',
    content: 'По Вінниці та в радіусі 30 км. Якщо об\'єкт далі, зателефонуйте, обговоримо.'
  },
  {
    label: 'Коли можна замовити?',
    content: 'Приймаємо дзвінки й повідомлення щодня з 6:00 до 22:00.'
  }
]

// Сторінка /ekskavator. Модель від Олександра: JCB 3CX (20.10.2026).
// Цифри за каталогом JCB і дилерськими оголошеннями; у різних поколіннях і комплектаціях 3CX
// вони трохи різні, тож пишемо округлено («понад», «близько»), без точних міліметрів
export const jcbModel = 'JCB 3CX'

export const jcbSpecs = [
  { label: 'Тип', value: 'екскаватор-навантажувач' },
  { label: 'Глибина копання', value: 'понад 4 м' },
  { label: 'Передній ківш', value: 'близько 1 м³' },
  { label: 'Ширина машини', value: 'близько 2,3 м' },
  { label: 'Робоча вага', value: 'близько 8 т' }
]

export const jcbPhotos = [
  { src: '/images/tech/ekskavator.jpg', alt: 'Екскаватор JCB з нашим водієм копає яму біля приватного будинку', title: 'Копаємо яму у дворі' },
  { src: '/images/work/septyk.jpg', alt: 'Екскаватор JCB опускає бетонне кільце в яму на подвір\'ї', title: 'Септик: яма й бетонні кільця' },
  { src: '/images/work/yama-jcb.jpg', alt: 'Ківш екскаватора JCB копає глибоку яму біля паркану', title: 'Глибока яма біля паркану' }
]

export const jcbJobs = [
  { title: 'Котловани', text: 'Під фундамент будинку, гаража чи басейну. Ґрунт одразу вантажимо в самоскид.' },
  { title: 'Септики й вигрібні ями', text: 'Викопаємо яму й опустимо бетонні кільця екскаватором, без ручної праці.' },
  { title: 'Траншеї', text: 'Під водопровід, каналізацію, газ чи кабель, на ділянці або вздовж вулиці.' },
  { title: 'Навантаження', text: 'Переднім ковшем вантажимо ґрунт, щебінь, пісок і будівельне сміття.' },
  { title: 'Планування й підсипка', text: 'Розрівнюємо ґрунт і щебінь, підсипаємо під\'їзди й дороги до будинку.' },
  { title: 'Демонтаж', text: 'Розбираємо старі будівлі й паркани, сміття вивозимо нашим самоскидом.' }
]

export const jcbFaq = [
  {
    label: 'Скільки коштує оренда екскаватора у Вінниці?',
    content: 'Година роботи екскаватора JCB з водієм коштує 1 800 грн, мінімальне замовлення 2 години. Доставка техніки на об\'єкт 2 500 грн. Тож найменше замовлення обійдеться в 6 100 грн.'
  },
  {
    label: 'Екскаватор працює з оператором?',
    content: 'Так, техніка працює лише з нашим водієм. Окремо шукати оператора не потрібно.'
  },
  {
    label: 'На яку глибину копає екскаватор JCB 3CX?',
    content: 'Задньою стрілою JCB 3CX копає глибше за 4 м. Цього вистачає для котлованів під фундамент, септиків і вигрібних ям. Під конкретну глибину Олександр підкаже по телефону.'
  },
  {
    label: 'Що вибрати: екскаватор чи мініекскаватор?',
    content: 'JCB 3CX копає глибше й швидше, а переднім ковшем ще й вантажить і рівняє, тож підходить для котлованів і великих об\'ємів. Мініекскаватор Kubota вужчий, лише 1,55 м, і заходить у тісні двори, куди JCB не проїде. Опишіть задачу по телефону, і Олександр порадить, яка техніка потрібна.'
  },
  {
    label: 'Можна одразу вивезти ґрунт чи сміття?',
    content: 'Так. Екскаватор вантажить ґрунт у наш самоскид: ЗІЛ на 7 т або КАМАЗ чи Volvo на 12 т. Привеземо й техніку, і машину під вивіз.'
  },
  {
    label: 'Куди виїжджаєте?',
    content: 'По Вінниці та в радіусі 30 км. Якщо об\'єкт далі, зателефонуйте, обговоримо.'
  },
  {
    label: 'Коли можна замовити?',
    content: 'Приймаємо дзвінки й повідомлення щодня з 6:00 до 22:00.'
  }
]
