import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import { person, hero, nav, menu, pitch, about, services, stackTitle, stack, projects, contactText, contacts, socialTitle, socials } from "./content";
import photo from "./assets/photo.webp";
import claudeInk from "./assets/logo-claude-ink.png";
import claudeShape from "./assets/logo-claude-shape.png";
import vscodeInk from "./assets/logo-vscode-ink.png";
import vscodeShape from "./assets/logo-vscode-shape.png";

// Два логотипа в руках: отдельные слои. У каждого две картинки:
// shape (контур, заливается цветом бумаги) и ink (штриховка поверх, цвета чернил).
// x, y, w: проценты от размеров фото. ratio: пропорции слоя. delay сдвигает фазу левитации.
const logos = [
  { ink: claudeInk, shape: claudeShape, x: 11.97, y: 61.12, w: 17.86, ratio: "194 / 192", delay: 0 },
  { ink: vscodeInk, shape: vscodeShape, x: 73.39, y: 61.12, w: 19.24, ratio: "209 / 208", delay: -2.1 },
];

// Превращает картинку в маску: цвет элемента виден только там, где в картинке есть непрозрачные пиксели.
const mask = (url: string): CSSProperties => ({ maskImage: `url(${url})`, WebkitMaskImage: `url(${url})` });

const label = (id: string) => nav.find((n) => n.id === id)?.label ?? id;

// Пишет прогресс прокрутки (0 вверху, 1 примерно через экран) в CSS-переменную --p.
// CSS превращает --p в сдвиг, масштаб и прозрачность, поэтому React не перерисовывается при каждом скролле.
function useScrollProgress(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const p = Math.min(1, window.scrollY / (window.innerHeight * 0.9));
      ref.current?.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update); // не чаще одного обновления за кадр
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ref]);
}

function Nav() {
  const [open, setOpen] = useState(false); // состояние мобильного меню
  return (
    <nav className="nav">
      <a href="#top" className="logo">{person.short}</a>
      <button className="burger" aria-label="Меню" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span />
        <span />
      </button>
      <ul className={open ? "open" : ""} onClick={() => setOpen(false)}>
        {menu.map((n) => (
          <li key={n.id}><a href={`#${n.id}`}>{n.label}</a></li>
        ))}
      </ul>
    </nav>
  );
}

function Hero() {
  const figure = useRef<HTMLDivElement>(null);
  useScrollProgress(figure);

  return (
    <header className="hero" id="top">
      <div className="hero-text">
        <p className="pitch">{pitch}</p>
        <h1 aria-label={person.name}>
          <span className="line"><span>{person.first}</span></span>
          <span className="line"><span>{person.last}</span></span>
        </h1>
        <p className="roles">{hero.roles}</p>
        <div className="cta">
          <a className="btn" href="#services">{hero.primary}</a>
          <a className="link" href="#contact">{hero.secondary}</a>
        </div>
      </div>
      <div
        className="figure"
        ref={figure}
        role="img"
        aria-label="Портрет Artyom Shilov: на раскрытых ладонях два светящихся логотипа, Claude и Visual Studio Code"
      >
        <div className="photo" style={mask(photo)} />
        {logos.map((l) => (
          <div
            key={l.ink}
            className="float"
            style={{ left: `${l.x}%`, top: `${l.y}%`, width: `${l.w}%`, aspectRatio: l.ratio, animationDelay: `${l.delay}s` }}
          >
            <div className="paper" style={mask(l.shape)} />
            <div className="ink" style={mask(l.ink)} />
          </div>
        ))}
      </div>
    </header>
  );
}

function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="sec">
      <h2>{label(id)}</h2>
      <div>{children}</div>
    </section>
  );
}

export default function App() {
  const links = contacts.filter((c) => c.href); // показываем только заполненные контакты
  const socialLinks = socials.filter((c) => c.href); // то же для соцсетей блога
  return (
    <>
      {/* Невидимый SVG-фильтр: делает контур рамки «нарисованным от руки» (чуть неровная мягкая линия).
          Подключается в styles.css строкой filter: url(#sketch). */}
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
        <filter id="sketch" x="-5%" y="-10%" width="110%" height="125%">
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
      </svg>
      <Nav />
      <main>
        <Hero />
        <Section id="services">
          <ul className="rows">
            {services.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                {s.text && <p>{s.text}</p>}
              </li>
            ))}
          </ul>
        </Section>
        <Section id="about">
          <p className="big">{about}</p>
          <div className="stack-block">
            <h3>{stackTitle}</h3>
            <ul className="stack">
              {stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </Section>
        {projects.length > 0 && (
          <Section id="projects">
            <ul className="rows">
              {projects.map((p) => (
                <li key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <span className="tags">{p.tags}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}
        <Section id="contact">
          <p className="big">{contactText}</p>
          {links.length ? (
            <ul className="links">
              {links.map((c) => (
                <li key={c.label}>
                  <a href={c.href} {...(c.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="hint">Добавьте свои ссылки в «contacts» в файле src/content.ts.</p>
          )}
          <div className="social-block">
            <h3>{socialTitle}</h3>
            {socialLinks.length ? (
              <ul className="links">
                {socialLinks.map((c) => (
                  <li key={c.label}>
                    <a href={c.href} target="_blank" rel="noreferrer">{c.label}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="hint">Добавьте ссылки на блог в «socials» в файле src/content.ts.</p>
            )}
          </div>
        </Section>
      </main>
      <footer className="foot">© {new Date().getFullYear()} {person.name}</footer>
    </>
  );
}
