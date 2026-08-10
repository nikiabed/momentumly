"use client";

import Link from "next/link";
import { ROUTES } from "../_utils/constants";
import { Footer } from "../_common";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { ThemeToggle } from "../todo/_common";
import { HeroMotionBackground } from "./HeroMotionBackground";

const features = [
  {
    eyebrow: "01 — DO MORE",
    title: "این فقط یک Todo App نیست.",
    description:
      "اینجا قرار نیست فقط کارهات رو بنویسی و یه لیست بلند از کارهای انجام‌نشده داشته باشی. Task Breaking و AI کمک می‌کنن هر کار بزرگ رو به قدم‌های واقعی و قابل انجام تبدیل کنی.",
    label: "AI + Task Breaking",
    lightImage: "/images/feature-1.png",
    darkImage: "/images/feature-1-dark.png",
    align: "left",
  },
  {
    eyebrow: "02 — GROW",
    title: "ببین واقعاً داری جلو می‌ری.",
    description:
      "با بررسی پیشرفت هفتگی، فقط تعداد تسک‌های انجام‌شده رو نمی‌بینی؛ روند رشد خودت رو می‌بینی و متوجه می‌شی کجا بهتر شدی و کجا باید دوباره شروع کنی.",
    label: "Weekly Progress",
    lightImage: "/images/feature-2.png",
    darkImage: "/images/feature-2-dark.png",
    align: "right",
  },
  {
    eyebrow: "03 — FOCUS",
    title: "زمانت رو هم بشناس.",
    description:
      "زمانی که برای انجام کارها صرف می‌کنی به‌صورت خودکار ثبت می‌شه. بعداً می‌تونی از این اطلاعات برای مدیریت بهتر زمان و تصمیم‌های هوشمندانه‌تر با کمک AI استفاده کنی.",
    label: "Focus Timer",
    lightImage: "/images/feature-3.png",
    darkImage: "/images/feature-3-dark.png",
    align: "left",
  },
  {
    eyebrow: "04 — LEVEL UP",
    title: "هر روز کمی بهتر شو.",
    description:
      "با یک سیستم XP واقعی، انجام دادن کارها، برگشتن بعد از عقب افتادن و تمرکز کردن تبدیل به بخشی از مسیر رشدت می‌شن. مرحله به مرحله جلو برو و ببین چقدر پیشرفت کردی.",
    label: "XP + Levels",
    lightImage: "/images/feature-4.png",
    darkImage: "/images/feature-4-dark.png",
    align: "right",
  },
];

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden ">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-border-gray/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-300 items-center justify-between px-6">
          <Link href="/" className=" tracking-tight flex gap-1">
            <Image
              src={"/images/Logo-rose.png"}
              alt="momentumly Logo"
              width={150}
              height={80}
            />
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
            <a href="#features" className="transition hover:text-foreground">
              امکانات
            </a>

            <a
              href="#how-it-works"
              className="transition hover:text-foreground"
            >
              چطور کار می‌کند؟
            </a>

            <Link
              href={ROUTES.LOGIN}
              className="rounded-xl px-4 py-2 transition hover:bg-foreground/5"
            >
              ورود
            </Link>
          </div>

          <div className="flex gap-5">
            <ThemeToggle />

            <Link
              href={ROUTES.LOGIN}
              className="
              rounded-xl
              bg-coin-primary
              px-5 py-2.5
              text-sm
              font-bold
              text-white
              transition
              hover:scale-[1.03]
            "
            >
              شروع کن
            </Link>
          </div>
        </div>
      </nav>
      {/* HERO */}
      <section
        className="
    relative
    flex
    min-h-[calc(100vh-72px)]
    items-center
    justify-center
    overflow-hidden
    px-6
    py-20
  "
      >
        {/* motion background */}
        <HeroMotionBackground />

        {/* HERO IMAGE / MOCKUP */}
        <div
          className="
      absolute
      inset-x-6
      top-10
      bottom-8
      mx-auto
      max-w-350
      overflow-hidden
      rounded-[2.5rem]
      border
      border-border-gray/60
      bg-foreground/3
      shadow-xl
    "
        >
          {/* --------------------------------
        جای عکس اصلی Hero
        بعداً src را عوض کن
    --------------------------------- */}
          <Image
            src="/images/landing1.webp"
            alt="Momentumly app preview"
            fill
            priority
            className="object-cover"
          />

          {/* overlay برای خواناتر شدن متن */}
          <div
            className="
        absolute
        inset-0
        bg-linear-to-b
        from-background/20
        via-background/35
        to-background/80
      "
          />
        </div>

        {/* HERO CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="
      relative
      z-10
      mx-auto
      max-w-190
      text-center
    "
        >
          <span
            className="
        mb-6
        inline-flex
        rounded-full
        border
        border-foreground/20
        bg-background/10
        px-4
        py-2
        text-sm
        font-semibold
        text-foreground/50
        backdrop-blur-md
      "
          >
            راهی بهتر برای تبدیل ایده به عمل!
          </span>

          <h1
            className="
        font-dana
        text-3xl
        leading-[1.15]
        tracking-tight
      "
          >
            <span>لحظه ها </span>

            <span>را از آن خود کن </span>
            <br />
            <span> و بهره‌وری روزت را </span>

            <span
              className="
          bg-linear-to-r
          from-purple-400
          to-rose-400
          bg-clip-text
          text-transparent
        "
            >
              دوبرابر کن
            </span>
          </h1>

          <p
            className="
        mx-auto
        mt-7
        max-w-145
        text-base
        leading-8
        text-foreground
        md:text-lg
      "
          >
            کارهات رو تبدیل به قدم‌های واقعی کن، روی زمانت تمرکز کن، پیشرفتت رو
            ببین و هر روز یک قدم جلوتر برو.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={ROUTES.LOGIN}
              className="
          rounded-2xl
          bg-coin-primary
          px-8
          py-4
          font-black
          text-white
          shadow-lg
          shadow-coin-primary/20
          transition
          hover:-translate-y-1
        "
            >
              شروع کن
            </Link>

            <a
              href="#features"
              className="
          rounded-2xl
          border
        border-foreground/20
          bg-background/10
          px-8
          py-4
          font-bold
        text-foreground/50
          backdrop-blur-md
          transition
          hover:bg-foreground/5
        "
            >
              بیشتر ببین
            </a>
          </div>
        </motion.div>
      </section>
      {/* INTRO */}
      <section id="how-it-works" className="px-6 py-32">
        <div className="mx-auto max-w-300">
          <div className="grid items-center gap-12 md:grid-cols-3 md:gap-16">
            {/* TEXT — 1/3 */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center md:col-span-1 md:text-right"
            >
              <span className="text-sm font-bold text-coin-primary">
                MORE THAN A LIST
              </span>

              <h2 className="mt-4 text-2xl font-black leading-tight md:text-3xl">
                از نوشتن کارها
                <br />
                تا انجام دادنشان.
              </h2>

              <p className="mt-6 text-base leading-8 text-muted md:text-md">
                اینجا ابزارها کنار هم قرار گرفتن تا فقط برنامه‌ریزی نکنی؛ واقعاً
                حرکت کنی.
              </p>
            </motion.div>

            {/* PRODUCT SCREENSHOT — 2/3 */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="
          relative
          md:col-span-2
          overflow-hidden
          border
          border-border-gray/70
          bg-background
          shadow-md
        "
            >
              <Image
                src="/images/preview.png"
                alt="Momentumly dashboard"
                width={2000}
                height={1500}
                className="
            block
            h-auto
            w-full
            object-contain dark:hidden
          "
              />
              <Image
                src="/images/preview-dark.png"
                alt="Momentumly dashboard"
                width={2000}
                height={1500}
                className="
            block
            h-auto
            w-full
            object-contain hidden dark:block
          "
              />
            </motion.div>
          </div>
        </div>
      </section>
      {/* FEATURES */}
      <section id="features" className="w-full bg-background/5 px-6">
        <div className="mx-auto w-full max-w-300">
          {features.map((feature, index) => {
            const isLeft = feature.align === "left";
            const isLarge = index % 2 === 0;

            return (
              <motion.section
                key={feature.eyebrow}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                className={`
        grid
        w-full
        items-center
        gap-12
        border-t
        border-foreground/20
        py-28
        md:gap-16
        ${isLarge ? "md:grid-cols-[2fr_3fr]" : "md:grid-cols-[3fr_2fr]"}
      `}
              >
                {/* TEXT */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: isLeft ? -40 : 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className={`
          w-full
          ${isLeft ? "md:order-1" : "md:order-2"}
          ${isLeft ? "md:pr-8" : "md:pl-8"}
        `}
                >
                  <span className="text-xs font-black tracking-widest text-coin-primary">
                    {feature.eyebrow}
                  </span>

                  <h2 className="mt-5 text-2xl font-black leading-tight md:text-4xl">
                    {feature.title}
                  </h2>

                  <p className="mt-6 text-base leading-8 text-muted md:text-lg">
                    {feature.description}
                  </p>
                </motion.div>

                {/* PRODUCT IMAGE */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: isLeft ? 40 : -40,
                    scale: 0.92,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.9,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.035,
                  }}
                  className={`
          group
          relative
          w-full
          min-w-0
          aspect-4/3
          overflow-hidden
          rounded-[2rem]
          border-2
          border-foreground/30
          bg-background
          shadow-xl
          ${isLeft ? "md:order-2" : "md:order-1"}
        `}
                >
                  {/* LIGHT MODE */}
                  <Image
                    src={feature.lightImage}
                    alt={feature.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-contain dark:hidden"
                  />

                  {/* DARK MODE */}
                  <Image
                    src={feature.darkImage}
                    alt={`${feature.label} dark mode`}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="hidden object-contain dark:block"
                  />

                  {/* hover highlight */}
                  <div
                    className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-br
            from-white/[0.05]
            via-transparent
            to-transparent
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
                  />
                </motion.div>
              </motion.section>
            );
          })}
        </div>
      </section>
      {/* FINAL CTA */}
      <section className="  w-full ">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={reveal}
          className="
            border
            border-border-gray
            bg-foreground/3
            px-8
            py-20
            text-center
          "
        >
          <span className="text-sm font-bold text-coin-primary">?READY</span>

          <h2 className="mt-5 text-2xl font-semibold md:text-3xl">
            آماده‌ای واقعا
            <br />
            کارهات رو انجام بدی؟
          </h2>

          <p className="mx-auto mt-6 max-w-130 leading-8 text-muted">
            شروع کن، یک قدم بردار و اجازه بده قدم‌های بعدی کم‌کم ساخته بشن.
          </p>

          <Link
            href={ROUTES.LOGIN}
            className="
              mt-9
              inline-flex
              rounded-2xl
              bg-coin-primary
              px-8
              py-4
              font-black
              text-white
              shadow-lg
              shadow-coin-primary/20
              transition
              hover:-translate-y-1
            "
          >
            شروع کن
          </Link>
        </motion.div>
      </section>
      {/* BOTTOM NAV / PRODUCT LINKS */}
      <section className="w-full border-t border-foreground/10 px-6 py-20">
        <div className="mx-auto grid max-w-300 gap-12 md:grid-cols-4">
          {/* BRAND */}
          <div className="md:col-span-1">
            <Image
              src={"/images/Logo-p.png"}
              alt="logo momentumly"
              width={150}
              height={80}
            />

            <p className="mt-4 max-w-65 text-sm leading-7 text-muted">
              ابزاری برای تبدیل کارهای بزرگ به قدم‌های کوچک، قابل انجام و واقعی.
            </p>
          </div>

          {/* PRODUCT */}
          <div>
            <h4 className="font-bold">محصول</h4>

            <div className="mt-5 flex flex-col gap-3 text-sm text-muted">
              <a href="#features" className="transition hover:text-foreground">
                امکانات
              </a>

              <a
                href="#how-it-works"
                className="transition hover:text-foreground"
              >
                چطور کار می‌کند؟
              </a>

              <Link
                href={ROUTES.LOGIN}
                className="transition hover:text-foreground"
              >
                شروع کار
              </Link>
            </div>
          </div>

          {/* RESOURCES */}
          <div>
            <h4 className="font-bold">راهنما</h4>

            <div className="mt-5 flex flex-col gap-3 text-sm text-muted">
              <a href="#" className="transition hover:text-foreground">
                راهنمای استفاده
              </a>

              <a href="#" className="transition hover:text-foreground">
                سوالات متداول
              </a>

              <a href="#" className="transition hover:text-foreground">
                درباره momentumly
              </a>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-bold">ارتباط</h4>

            <div className="mt-5 flex flex-col gap-3 text-sm text-muted">
              <a
                href="mailto:hello@momentumly.app"
                className="transition hover:text-foreground"
              >
                تماس با ما
              </a>

              <a href="#" className="transition hover:text-foreground">
                اینستاگرام
              </a>

              <a href="#" className="transition hover:text-foreground">
                لینکدین
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <Footer />
    </main>
  );
}
