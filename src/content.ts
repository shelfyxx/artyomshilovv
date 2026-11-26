// Все тексты и ссылки лежат в этом файле. Правь его, а не компоненты.

// short: подпись в левом верхнем углу (в меню).
export const person = { name: "Artyom Shilov", first: "Artyom", last: "Shilov", age: 19, short: "ashilovv" };

// Главный экран: подпись под именем и две кнопки.
export const hero = {
  roles: "Software & AI Engineer, Influence",
  primary: "Услуги",
  secondary: "Связаться",
};

// ТЕКСТ ПРО ПОМОЩЬ БИЗНЕСУ. Показывается крупно слева под кнопками, на уровне фото. Одно-два предложения.
export const pitch =
  "Создаю реальное решение вашей проблемы";

// Меню и заголовки разделов. Порядок здесь = порядок в меню. id связывает пункт с разделом на странице.
export const nav = [
  { id: "services", label: "Услуги" },
  { id: "about", label: "Обо мне" },
  { id: "projects", label: "Проекты" },
  { id: "contact", label: "Контакты" },
];

// Услуги. text необязателен: если его нет, показывается только название.
export const services: { title: string; text?: string }[] = [
  { title: "Разбор проблемы" },
  { title: "Разработка лендинга, сайта или бота" },
  { title: "Создание агента для автоматизации процессов" },
];

export const about =
  "Меня зовут Артем. Помогаю бизнесам и авторам решать проблемы. Занимаюсь разработкой сайтов, ботов и автоматизаций. Создаю технологические продукты, веду блог";

// Подзаголовок и технологии внутри раздела «Обо мне».
export const stackTitle = "Мой стек";
export const stack = ["Claude", "C++", "Python", "TypeScript", "React", "Node.js"];

// Проекты. Пока список пуст, раздела нет ни на странице, ни в меню. Добавь проект, и раздел появится сам.
export const projects: { title: string; text: string; tags: string }[] = [];

// Меню без пустых разделов.
export const menu = nav.filter((n) => n.id !== "projects" || projects.length > 0);

export const contactText = "Напишите мне, и обсудим вашу задачу.";

// Ссылки с пустым href не показываются. Пример: "mailto:name@example.com", "https://t.me/name".
export const contacts = [
  { label: "Почта", href: "ashilovv@icloud.com" },
  { label: "Telegram", href: "@ashilovv" },
  { label: "GitHub", href: "shelfyxx" },
];

// Блог в соцсетях: отдельный блок в разделе «Контакты», под ссылками для связи.
// Ссылка должна быть полной, например "https://www.tiktok.com/@ник". Пустые не показываются.
export const socialTitle = " ";
export const socials = [
  { label: "TikTok", href: "shilovlarp" },
  { label: "Instagram", href: "shilovlarp" },
];
