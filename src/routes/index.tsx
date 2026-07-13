import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu, Play, Volume2, VolumeX, X } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import heroImg from "@/assets/zimin-hero.jpg";
import fashionImg from "@/assets/zimin-fashion.jpg";
import fullImg from "@/assets/zimin-full.jpg";
import stageGreenImg from "@/assets/zimin-stage-green.jpg";
import redCurtainImg from "@/assets/zimin-red-curtain.jpg";
import neonImg from "@/assets/zimin-neon.jpg";
import smileImg from "@/assets/zimin-smile.jpg";
import aboutVideo from "@/assets/zimin-about.mp4.asset.json";
import aboutPoster from "@/assets/zimin-about-poster.jpg";
import millionVideo from "@/assets/zimin-million.mp4.asset.json";
import millionPoster from "@/assets/zimin-million-poster.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { label: "О себе", href: "#about" },
  { label: "Работы", href: "#works" },
  { label: "Форматы", href: "#formats" },
  { label: "Контакт", href: "#contact" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Marquee />
      <Formats />
      <Works />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="font-display text-2xl font-bold tracking-tight">
          ЗИМИН<span className="text-primary">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] md:inline-flex"
        >
          Забронировать
        </a>

        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-muted-foreground"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Забронировать
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-svh overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Никита Зимин — ведущий мероприятий"
          className="size-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </div>

      <div className="relative mx-auto flex min-h-svh max-w-7xl flex-col justify-end px-5 pb-14 pt-28 md:px-8 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary"
        >
          <span className="inline-block h-px w-10 bg-primary" />
          Ведущий · Шоумен · Артист
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="display-xl text-[clamp(3.5rem,13vw,11rem)]"
        >
          Никита
          <br />
          <span className="text-primary">Зимин</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <div className="flex items-center gap-6 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            <span>31 год</span>
            <span className="h-4 w-px bg-border" />
            <span>182 см</span>
          </div>
          <div className="flex gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Забронировать дату <ArrowUpRight className="size-4" />
            </a>
            <a
              href="#works"
              className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Работы
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const MARQUEE = [
  "Свадьбы",
  "Корпоративы",
  "Дни рождения",
  "Шоу",
  "Частные вечеринки",
  "Городские события",
];

function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="border-y border-border bg-secondary/40 py-5">
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
          {items.map((w, i) => (
            <span
              key={i}
              className="flex items-center gap-8 font-display text-2xl font-semibold uppercase tracking-wide text-muted-foreground md:text-3xl"
            >
              {w}
              <span className="text-primary">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const FORMATS = [
  { n: "01", t: "Свадьбы" },
  { n: "02", t: "Корпоративы" },
  { n: "03", t: "Дни рождения" },
  { n: "04", t: "Частные вечеринки" },
  { n: "05", t: "Городские события" },
  { n: "06", t: "Шоу и премии" },
];

function Formats() {
  return (
    <section id="formats" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <h2 className="display-xl text-[clamp(2.5rem,7vw,5.5rem)]">Форматы</h2>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Accent video */}
        <Reveal className="lg:col-span-5">
          <FeaturedVideo />
        </Reveal>

        {/* Formats grid */}
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:col-span-7 lg:h-full lg:auto-rows-fr">
          {FORMATS.map((f, i) => (
            <Reveal key={f.n} delay={i * 0.05}>
              <div className="group flex h-full items-center justify-between gap-4 bg-background p-7 transition-colors hover:bg-secondary/60 md:p-8">
                <div>
                  <span className="font-display text-sm font-medium text-primary">{f.n}</span>
                  <p className="mt-2 font-display text-2xl font-semibold uppercase md:text-3xl">
                    {f.t}
                  </p>
                </div>
                <ArrowUpRight className="size-6 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedVideo() {
  const [muted, setMuted] = useState(true);

  return (
    <figure className="group relative h-full min-h-[30rem] overflow-hidden rounded-lg bg-black lg:min-h-[42rem]">
      <video
        className="size-full object-cover"
        src={millionVideo.url}
        poster={millionPoster}
        autoPlay
        loop
        muted={muted}
        playsInline
        preload="metadata"
      />

      {/* gradient for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

      {/* top badge */}
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
        <Play className="size-3.5 fill-current" />
        1 000 000+ просмотров
      </div>

      {/* sound toggle */}
      <button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Включить звук" : "Выключить звук"}
        className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
      >
        {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
      </button>

      {/* caption */}
      <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <p className="font-display text-2xl font-semibold uppercase leading-tight text-white md:text-3xl">
          Вирусное <span className="text-primary">шоу</span>
        </p>
        <p className="mt-1 text-sm text-white/70">Момент, который собрал миллион просмотров</p>
      </figcaption>
    </figure>
  );
}

function Works() {
  return (
    <section id="works" className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
      <Reveal>
        <div className="mb-12 flex items-end justify-between gap-4">
          <h2 className="display-xl text-[clamp(2.5rem,7vw,5.5rem)]">Работы</h2>
          <p className="hidden max-w-xs pb-2 text-sm text-muted-foreground md:block">
            Сцена любого масштаба — от камерных вечеров до больших шоу.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <GalleryItem src={stageGreenImg} alt="Никита Зимин на сцене" className="row-span-2" tall />
        <GalleryItem src={neonImg} alt="Никита Зимин ведёт вечер" />
        <GalleryItem src={fashionImg} alt="Никита Зимин, фэшн-съёмка" className="row-span-2" tall />
        <GalleryItem src={redCurtainImg} alt="Никита Зимин с микрофоном" />
        <GalleryItem src={fullImg} alt="Никита Зимин в полный рост" />
        <GalleryItem src={smileImg} alt="Портрет Никиты Зимина" />
      </div>
    </section>
  );
}

function GalleryItem({
  src,
  alt,
  className = "",
  tall = false,
}: {
  src: string;
  alt: string;
  className?: string;
  tall?: boolean;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-lg bg-secondary ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
          tall ? "h-full min-h-[24rem]" : "aspect-[3/4]"
        }`}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.figure>
  );
}

function About() {
  return (
    <section id="about" className="border-y border-border bg-secondary/30">
      <div className="mx-auto grid max-w-7xl items-stretch gap-0 md:grid-cols-2">
        <div className="relative min-h-[30rem] overflow-hidden bg-black md:min-h-[42rem]">
          <video
            className="size-full object-cover"
            src={aboutVideo.url}
            poster={aboutPoster}
            controls
            playsInline
            preload="metadata"
          />
        </div>
        <div className="flex flex-col justify-center px-5 py-16 md:px-14 md:py-20">
          <Reveal>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              О себе
            </p>
            <h2 className="display-xl text-[clamp(2.2rem,5vw,4rem)]">
              Веду так, чтобы <span className="text-primary">запомнилось</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Артист и ведущий. Собираю сценарий, музыку и настроение под вашу задачу — от первого
              слова до финального номера.
            </p>
            <div className="mt-10 flex gap-10">
              <Stat value="31" label="год" />
              <Stat value="182" label="см рост" />
              <Stat value="∞" label="энергии" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-4xl font-bold md:text-5xl">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <Reveal>
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-primary">Контакт</p>
        <h2 className="display-xl text-[clamp(2.8rem,10vw,8rem)]">
          Заберём вашу
          <br />
          <span className="text-primary">дату?</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href="https://t.me/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Написать в Telegram <ArrowUpRight className="size-5" />
          </a>
          <a
            href="https://instagram.com/"
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-base font-semibold transition-colors hover:bg-secondary"
          >
            Instagram
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row md:px-8">
        <span className="font-display text-lg font-bold text-foreground">
          ЗИМИН<span className="text-primary">.</span>
        </span>
        <span>© {new Date().getFullYear()} Никита Зимин · Ведущий мероприятий</span>
      </div>
    </footer>
  );
}
