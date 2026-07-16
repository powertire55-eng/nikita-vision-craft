import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Menu, Phone, Play, Send, Volume2, VolumeX, X } from "lucide-react";
import { toast } from "sonner";

import { Reveal } from "@/components/Reveal";
import { submitLead } from "@/lib/submitLead.functions";
import heroImg from "@/assets/zimin-hero.jpg";
import stageGreenImg from "@/assets/zimin-stage-green.jpg";
import neonImg from "@/assets/zimin-neon.jpg";
import santaAsset from "@/assets/zimin-santa.jpg.asset.json";
import santaKissAsset from "@/assets/zimin-santa-kiss.jpg.asset.json";
import micStageAsset from "@/assets/zimin-mic-stage.jpg.asset.json";
import costumeAsset from "@/assets/zimin-costume.jpg.asset.json";
import pinkSuitAsset from "@/assets/zimin-pink-suit.jpg.asset.json";
import tonalityAsset from "@/assets/nikita-tonality.jpg.asset.json";
import formatsVideo from "@/assets/zimin-formats.mp4.asset.json";
import formatsPoster from "@/assets/zimin-formats-poster.jpg";
import aboutVideo from "@/assets/zimin-about.mp4.asset.json";
import aboutPoster from "@/assets/zimin-about-poster.jpg";
import millionVideo from "@/assets/zimin-million.mp4.asset.json";
import millionPoster from "@/assets/zimin-million-poster.jpg";
import qrCodeImg from "@/assets/qr-code.png";

const santaImg = santaAsset.url;
const santaKissImg = santaKissAsset.url;
const micStageImg = micStageAsset.url;
const costumeImg = costumeAsset.url;
const pinkSuitImg = pinkSuitAsset.url;
const tonalityImg = tonalityAsset.url;

export const Route = createFileRoute("/")({
  component: Index,
});

const PHONE_DISPLAY = "+7 (965) 101-71-08";
const PHONE_HREF = "+79651017108";
const TG_HANDLE = "@ziminikita";
const TG_HREF = "https://t.me/ziminikita";
const WA_HREF = "https://wa.me/79651017108";
const EMAIL = "Ziminikita@gmail.com";
const EMAIL_HREF = "mailto:Ziminikita@gmail.com";

const NAV = [
  { label: "Форматы", href: "#formats" },
  { label: "О себе", href: "#about" },
  { label: "Контакт", href: "#contact" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <MillionShowcase />
      <Marquee />
      <Formats />
      <Range />
      <Shows />
      <About />
      <Artists />
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
      <div className="absolute inset-0 bg-background">
        <img
          src={heroImg}
          alt="Никита Зимин — ведущий мероприятий"
          className="size-full object-contain object-right"
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
              href="#million"
              className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Смотреть шоу
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 -mx-5 overflow-hidden border-y border-white/10 bg-black/30 py-3 backdrop-blur-sm md:mt-8 md:-mx-8"
        >
          <div className="flex w-screen">
            <div className="animate-marquee flex shrink-0 items-center gap-6 pr-6">
              {[
                "Свадьбы",
                "Корпоративы",
                "Дни рождения",
                "Шоу",
                "Утренники",
                "Мастер-классы",
                "Бизнес-саммиты",
                "Городские события",
              ].map((w, i) => (
                <span
                  key={i}
                  className="flex items-center gap-6 font-display text-sm font-semibold uppercase tracking-widest text-white/80"
                >
                  {w}
                  <span className="text-primary">✦</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MillionShowcase() {
  const [muted, setMuted] = useState(true);

  return (
    <section id="million" className="mx-auto max-w-7xl px-5 pt-20 md:px-8 md:pt-28">
      <Reveal>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <span className="inline-block h-px w-10 bg-primary" />
              Вирусный момент
            </p>
            <h2 className="display-xl text-[clamp(2.5rem,8vw,6rem)]">
              1 000 000+ <span className="text-primary">просмотров</span>
            </h2>
          </div>
          <p className="max-w-sm pb-2 text-base text-muted-foreground">
            Один выход, который разлетелся по сети. Так выглядит энергия, которую я приношу на вашу
            сцену.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <figure className="group relative mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl bg-black">
          <video
            className="aspect-[9/16] size-full object-contain"
            src={millionVideo.url}
            poster={millionPoster}
            autoPlay
            loop
            muted={muted}
            playsInline
            preload="metadata"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
            <Play className="size-3.5 fill-current" />
            1 000 000+ просмотров
          </div>

          <button
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Включить звук" : "Выключить звук"}
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
          >
            {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
          </button>
        </figure>
      </Reveal>
    </section>
  );
}

const MARQUEE = [
  "Свадьбы",
  "Корпоративы",
  "Дни рождения",
  "Шоу",
  "Утренники",
  "Мастер-классы",
  "Бизнес-саммиты",
  "Городские события",
];

function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="mt-20 border-y border-border bg-secondary/40 py-5 md:mt-28">
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
  { n: "03", t: "Детские утренники" },
  { n: "04", t: "Частные вечеринки" },
  { n: "05", t: "Бизнес-саммиты" },
  { n: "06", t: "Мастер-классы" },
];

function Formats() {
  return (
    <section id="formats" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <div className="mb-12 flex items-end justify-between gap-4">
          <h2 className="display-xl text-[clamp(2.5rem,7vw,5.5rem)]">Форматы</h2>
          <p className="hidden max-w-xs pb-2 text-sm text-muted-foreground md:block">
            Любое событие — под ключ. Сценарий, музыка и настроение собираются под вашу задачу.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <figure className="group relative h-full min-h-[26rem] overflow-hidden rounded-lg bg-secondary lg:min-h-[38rem]">
            <video
              className="size-full object-cover"
              src={formatsVideo.url}
              poster={formatsPoster}
              controls
              playsInline
              preload="metadata"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6">
              <p className="font-display text-2xl font-semibold uppercase leading-tight text-white md:text-3xl">
                Драйв <span className="text-primary">на сцене</span>
              </p>
              <p className="mt-1 text-sm text-white/70">От камерных вечеров до больших шоу</p>
            </figcaption>
          </figure>
        </Reveal>

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

const RANGE = [
  { a: "Детские утренники", b: "Поминки" },
  { a: "Камерно и уютно", b: "Громко и драйвово" },
  { a: "Интеллектуальные игры", b: "Спортивные активности" },
  { a: "Бизнес-саммиты", b: "Мастер-классы" },
];

function Range() {
  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-24 md:grid-cols-2 md:gap-14 md:px-8 md:py-32">
        <Reveal>
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Диапазон
            </p>
            <h2 className="display-xl text-[clamp(2.2rem,5.5vw,4.5rem)]">
              Работаю в любой <span className="text-primary">тональности</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Опыт в разноплановых событиях — подстроюсь под настроение, аудиторию и задачу. Соберу
              интеллектуальную или спортивную программу именно под ваш формат.
            </p>

            <div className="mt-10 space-y-4">
              {RANGE.map((r) => (
                <div
                  key={r.a}
                  className="grid grid-cols-2 gap-6 font-display text-xl font-semibold uppercase md:text-2xl"
                >
                  <span>{r.a}</span>
                  <span className="text-primary">{r.b}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <img
              src={santaImg}
              alt="Никита Зимин на новогоднем празднике"
              loading="lazy"
              className="aspect-square w-full rounded-lg bg-black object-contain"
            />
            <img
              src={tonalityImg}
              alt="Никита Зимин на сцене с микрофоном"
              loading="lazy"
              className="aspect-square w-full rounded-lg bg-black object-contain"
            />
            <img
              src={pinkSuitImg}
              alt="Никита Зимин в розовом костюме с микрофоном"
              loading="lazy"
              className="aspect-square w-full rounded-lg bg-black object-contain"
            />
            <img
              src={santaKissImg}
              alt="Никита Зимин на тематической вечеринке"
              loading="lazy"
              className="aspect-square w-full rounded-lg bg-black object-contain"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const SHOWS = [
  "Угадай мелодию",
  "Форт Боярд",
  "ЧБД",
  "Что? Где? Когда?",
  "Своя игра",
  "100 к 1",
  "Импровизация",
];

function Shows() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <Reveal>
          <figure className="group relative overflow-hidden rounded-2xl bg-secondary">
            <img
              src={stageGreenImg}
              alt="Никита Зимин ведёт шоу"
              loading="lazy"
              className="w-full bg-black object-contain transition-transform duration-700 group-hover:scale-105"
            />
          </figure>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Форматы шоу
            </p>
            <h2 className="display-xl text-[clamp(2.2rem,5.5vw,4.5rem)]">
              Ваше любимое шоу — <span className="text-primary">на вашем событии</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Изящно перенесу и адаптирую механику любимых телепроектов под ваш зал и вашу компанию —
              от лёгких музыкальных викторин до больших командных баталий.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {SHOWS.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-background px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
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
              слова до финального номера. Держу зал и чувствую темп события.
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

const ARTISTS = [
  "Кавер-группы",
  "Фокусники",
  "Комики",
  "Селебрити",
  "Артисты малого роста",
  "Животные",
  "Пиротехники",
  "Спортсмены",
  "Фристайлеры",
  "Диджеи",
  "Деды Морозы",
];

function Artists() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          Команда под ключ
        </p>
        <h2 className="display-xl max-w-4xl text-[clamp(2.2rem,6vw,5rem)]">
          База артистов, <span className="text-primary">с которыми работаю</span>
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-10 flex flex-wrap gap-3">
          {ARTISTS.map((a) => (
            <span
              key={a}
              className="rounded-full border border-border bg-secondary/40 px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wide"
            >
              {a}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 grid gap-4 rounded-2xl border border-border bg-secondary/30 p-7 md:grid-cols-[auto_1fr] md:items-center md:gap-8 md:p-10">
          <img
            src={neonImg}
            alt="Никита Зимин на вечеринке"
            loading="lazy"
            className="w-full rounded-xl object-contain md:w-48"
          />
          <p className="text-lg text-muted-foreground md:text-xl">
            Соберу нужный состав под концепцию — и добавлю фирменную фишку: могу{" "}
            <span className="text-foreground">спародировать вашего начальника или друга</span>, чтобы
            вечер запомнили надолго.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

const EVENT_TYPES = ["Свадьба", "Корпоратив", "Детский праздник", "Юбилей", "Шоу-программа", "Другое"];
const CONTACT_WAYS = ["WhatsApp", "Telegram", "Звонок"];

function Contact() {
  const [eventType, setEventType] = useState(EVENT_TYPES[0]);
  const [way, setWay] = useState(CONTACT_WAYS[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = useServerFn(submitLead);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Заполните имя и телефон");
      return;
    }
    setIsSubmitting(true);
    try {
      await submit({
        data: {
          name: name.trim(),
          phone: phone.trim(),
          eventType,
          contactWay: way,
          date: date.trim(),
          comment: comment.trim(),
        },
      });
      toast.success("Заявка отправлена! Свяжусь с вами в ближайшее время.");
      setName("");
      setPhone("");
      setDate("");
      setComment("");
    } catch (error) {
      console.error(error);
      toast.error("Не удалось отправить заявку. Попробуйте позже или напишите напрямую.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div>
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <span className="inline-block h-px w-10 bg-primary" />
              Заявка
            </p>
            <h2 className="display-xl text-[clamp(2.8rem,8vw,6rem)]">
              Заберём вашу
              <br />
              <span className="text-primary">дату?</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Даты бронирую заранее. Оставьте заявку или напишите напрямую — обсудим формат и
              предложу решение под вашу задачу.
            </p>

            <div className="mt-10 space-y-3">
              <ContactCard
                label="Позвонить / WhatsApp"
                value={PHONE_DISPLAY}
                href={`tel:${PHONE_HREF}`}
                icon={<Phone className="size-5" />}
              />
              <ContactCard
                label="Telegram"
                value={TG_HANDLE}
                href={TG_HREF}
                icon={<Send className="size-5" />}
              />
              <ContactCard
                label="Email"
                value={EMAIL}
                href={EMAIL_HREF}
                icon={<Mail className="size-5" />}
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-secondary/30 p-6 md:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Формат мероприятия
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {EVENT_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setEventType(t)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    eventType === t
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-foreground hover:bg-secondary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Имя
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как к вам обращаться"
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </div>

            <div className="mt-5">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Телефон
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 ___ ___-__-__"
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </div>

            <div className="mt-5">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Предполагаемая дата
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Например, 15 августа"
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Удобный способ связи
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {CONTACT_WAYS.map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWay(w)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      way === w
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:bg-secondary"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
            >
              {isSubmitting ? "Отправляем..." : "Записаться на встречу"}{" "}
              <ArrowUpRight className="size-4" />
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function ContactCard({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-background p-5 transition-colors hover:bg-secondary/60"
    >
      <div className="flex items-center gap-4">
        <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
          {icon}
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {label}
          </p>
          <p className="mt-0.5 font-display text-xl font-semibold">{value}</p>
        </div>
      </div>
      <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
    </a>
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
