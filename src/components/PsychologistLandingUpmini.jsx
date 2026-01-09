import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Landing (Upmini.app) — Психолог
 * UX/UI: dark glass + soft blur + rounded cards (как на референсе)
 * Stack: React + Tailwind + Framer Motion + Lucide
 *
 * Вставьте в проект с Tailwind.
 * Замените плейсхолдеры изображений/гифок на реальные ссылки.
 */

const cn = (...c) => c.filter(Boolean).join(" ");

const PALETTE = {
  bg: "#FFFFFF",
  panel: "rgba(19, 39, 63, 0.1)",
  panel2: "rgba(19, 39, 63, 0.15)",
  stroke: "rgba(19, 39, 63, 0.2)",
  stroke2: "rgba(19, 39, 63, 0.3)",
  text: "rgba(19, 39, 63, 0.95)",
  muted: "rgba(19, 39, 63, 0.7)",
  muted2: "rgba(19, 39, 63, 0.6)",
  glow: "rgba(78, 0, 0, 0.2)",
  shadow: "rgba(19, 39, 63, 0.2)",
  // Mystic Navy акцент
  blue: "#13273F",
  blueLight: "#1E3A5A",
  blueDark: "#0D1A2A",
  blueGlow: "rgba(19, 39, 63, 0.3)",
  blueGlowLight: "rgba(19, 39, 63, 0.2)",
  bluePanel: "rgba(19, 39, 63, 0.15)",
  blueBorder: "rgba(19, 39, 63, 0.4)",
  // Red Inferno для CTA
  darkBlue: "#4E0000",
  darkBlueLight: "#6B1A1A",
  darkBlueDark: "#3A0000",
  darkBlueGlow: "rgba(78, 0, 0, 0.4)",
  darkBlueBorder: "rgba(78, 0, 0, 0.6)",
};

const containerV = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, duration: 0.55, ease: "easeOut" },
  },
};
const itemV = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45 } },
};

function GlassCard({ className, children }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl",
        "border",
        "shadow-[0_24px_80px_rgba(0,0,0,0.45)]",
        className
      )}
      style={{
        background: `linear-gradient(180deg, ${PALETTE.panel2}, ${PALETTE.panel})`,
        borderColor: PALETTE.stroke,
        boxShadow: `0 28px 90px ${PALETTE.shadow}`,
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
    >
      {/* subtle sheen */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(800px 400px at 30% 10%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(700px 400px at 80% 30%, rgba(255,255,255,0.06), transparent 60%)",
        }}
      />
      {/* inner stroke */}
      <div
        className="pointer-events-none absolute inset-[1px] rounded-[22px]"
        style={{
          border: `1px solid ${PALETTE.stroke2}`,
          opacity: 0.5,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function Pill({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm",
        "border",
        className
      )}
      style={{
        background: "rgba(107, 126, 61, 0.15)",
        borderColor: "rgba(107, 126, 61, 0.3)",
        color: PALETTE.muted,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      {children}
    </span>
  );
}

function PrimaryButton({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm md:text-base font-medium",
        "border transition-transform active:scale-[0.99]",
        className
      )}
      style={{
        color: "#FFFFFF",
        background:
          `linear-gradient(180deg, ${PALETTE.darkBlueLight}, ${PALETTE.darkBlue})`,
        borderColor: PALETTE.darkBlueBorder,
        boxShadow:
          `0 18px 60px ${PALETTE.darkBlueGlow}, inset 0 1px 0 rgba(255,255,255,0.2)`,
      }}
    >
      <span>{children}</span>
    </button>
  );
}

function GhostButton({ children, onClick, className, hoverOrange = false, blue = false, brightOrange = false }) {
  const [isHovered, setIsHovered] = React.useState(false);
  
  const getStyles = () => {
    if (brightOrange) {
      return {
        color: "#FFFFFF",
        background: "linear-gradient(180deg, rgba(251, 146, 60, 0.5), rgba(234, 88, 12, 0.5))",
        borderColor: "rgba(251, 146, 60, 0.4)",
        boxShadow: "0 18px 60px rgba(251, 146, 60, 0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
      };
    }
    if (blue) {
      return {
        color: "#FFFFFF",
        background: `linear-gradient(180deg, ${PALETTE.darkBlueLight}, ${PALETTE.darkBlue})`,
        borderColor: PALETTE.darkBlueBorder,
        boxShadow: `0 18px 60px ${PALETTE.darkBlueGlow}, inset 0 1px 0 rgba(255,255,255,0.2)`,
      };
    }
    if (hoverOrange && isHovered) {
      return {
        color: "rgba(251, 146, 60, 0.9)",
        background: "rgba(251, 146, 60, 0.15)",
        borderColor: "rgba(251, 146, 60, 0.4)",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
      };
    }
    return {
      color: "rgba(10, 12, 16, 0.92)",
      background: "rgba(255, 255, 255, 0.15)",
      borderColor: "rgba(255, 255, 255, 0.25)",
      boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
    };
  };
  
  const styles = getStyles();
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm md:text-base font-medium",
        "border transition-all duration-200",
        className
      )}
      style={{
        ...styles,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      {children}
    </button>
  );
}

function SectionTitle({ kicker, title, desc, align = "left" }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {kicker ? (
        <div className="mb-3">
          <Pill>
            {kicker}
          </Pill>
        </div>
      ) : null}
      <h2
        className="text-2xl md:text-4xl font-semibold tracking-tight"
        style={{ color: PALETTE.text }}
      >
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-base md:text-lg leading-relaxed" style={{ color: PALETTE.muted }}>
          {desc}
        </p>
      ) : null}
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div
      className="rounded-2xl border px-2 py-2 min-w-0 flex flex-col justify-center"
      style={{
        background: "rgba(107, 126, 61, 0.12)",
        borderColor: "rgba(107, 126, 61, 0.3)",
      }}
    >
      <div className="text-xs" style={{ color: PALETTE.muted2 }}>
        {label}
      </div>
      <div 
        className="mt-1 font-semibold whitespace-nowrap" 
        style={{ 
          color: PALETTE.text,
          fontSize: "clamp(0.5rem, 3vw, 1rem)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function PlaceholderShot({ label }) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
        borderColor: "rgba(255,255,255,0.12)",
      }}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(420px 220px at 30% 20%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(420px 240px at 80% 80%, rgba(255,255,255,0.06), transparent 60%)",
        }}
      />
      <div className="relative flex aspect-[16/10] items-center justify-center p-6">
        <div className="text-center">
          <div className="text-sm font-medium" style={{ color: PALETTE.text }}>
            {label}
          </div>
          <div className="mt-1 text-xs" style={{ color: PALETTE.muted2 }}>
            Здесь будет ваш скриншот
          </div>
        </div>
      </div>
    </div>
  );
}

function TelegramReminderMessage() {
  return (
    <div
      className="relative overflow-hidden rounded-[2rem] border mx-auto"
      style={{
        background: "#000000",
        borderColor: "#000000",
        borderWidth: "3px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1) inset",
        width: "100%",
        maxWidth: "180px",
        minHeight: "360px",
      }}
    >
      {/* iPhone notch */}
      <div
        className="absolute top-1 left-1/2 transform -translate-x-1/2 z-10"
        style={{
          width: "60px",
          height: "18px",
          background: "#000000",
          borderRadius: "9px",
        }}
      />
      
      {/* Telegram interface */}
      <div
        className="relative p-2"
        style={{
          background: "#E5F4E3",
          minHeight: "100%",
          paddingTop: "1.5rem",
          fontSize: "0.7rem",
        }}
      >
        {/* Chat header */}
        <div
          className="flex items-center justify-between px-1.5 py-1 border-b mb-1.5"
          style={{
            background: "#E5F4E3",
            borderColor: "rgba(0, 0, 0, 0.08)",
          }}
        >
          <div className="flex items-center gap-1">
            <button className="w-4 h-4 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-0.5">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-semibold"
                style={{ background: "#3390EC", color: "#FFFFFF" }}
              >
                Б
              </div>
              <div>
                <div className="text-[8px] font-semibold" style={{ color: "#000000" }}>
                  Upmini Bot
                </div>
                <div className="text-[6px]" style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                  онлайн
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-3.5 h-3.5 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="w-3.5 h-3.5 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Chat messages area */}
        <div className="px-1.5 py-1.5 space-y-1.5">
          {/* Message bubble */}
          <div className="flex justify-start">
            <div
              className="rounded-lg p-2 shadow-sm max-w-[85%]"
              style={{
                background: "#FFFFFF",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Header */}
              <div className="text-[9px] font-semibold mb-1 break-words" style={{ color: "rgb(19, 39, 63)" }}>
                Напоминание о консультации
              </div>
              
              {/* Details */}
              <div className="space-y-0.5 text-[8px]" style={{ color: "rgba(19, 39, 63, 0.8)" }}>
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-medium">Дата:</span>
                  <span>04.10.2025</span>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-medium">Время:</span>
                  <span>18:00 по МСК</span>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-medium">Продолжительность:</span>
                  <span className="break-words">30 минут</span>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-medium">Эксперт:</span>
                  <span className="break-words">Алина Игнатова</span>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-medium">Услуга:</span>
                  <span className="break-words">Консультация</span>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-medium">Специализация:</span>
                  <span className="break-words">Знакомство</span>
                </div>
              </div>
              
              {/* Zoom link section */}
              <div className="mt-1.5 pt-1.5 border-t" style={{ borderColor: "rgba(19, 39, 63, 0.1)" }}>
                <div className="flex items-center gap-1 mb-0.5">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "rgba(19, 39, 63, 0.6)" }}>
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  <span className="text-[8px] font-medium break-words" style={{ color: "rgba(19, 39, 63, 0.7)" }}>
                    Ссылка на консультацию:
                  </span>
                </div>
                <a
                  href="#"
                  className="text-[7px] break-words block"
                  style={{ color: "#3390EC" }}
                  onClick={(e) => e.preventDefault()}
                >
                  example
                </a>
                <div className="mt-0.5 text-[7px] break-words" style={{ color: "rgba(19, 39, 63, 0.7)" }}>
                  <div className="break-words">Идентификатор: 279 209 4885</div>
                  <div className="break-words">Код: UVWH97</div>
                </div>
              </div>
              
              {/* Closing */}
              <div className="mt-1.5 text-[8px] break-words" style={{ color: "rgba(19, 39, 63, 0.8)" }}>
                Удачной консультации! 😊
              </div>
              
              {/* Timestamp */}
              <div className="mt-0.5 text-[7px] text-right" style={{ color: "rgba(19, 39, 63, 0.5)" }}>
                11:13
              </div>
            </div>
          </div>
        </div>
        
        {/* Input area */}
        <div
          className="absolute bottom-0 left-0 right-0 px-1.5 py-1 border-t"
          style={{
            background: "#E5F4E3",
            borderColor: "rgba(0, 0, 0, 0.08)",
          }}
        >
          <div className="flex items-center gap-1">
            <button className="w-4 h-4 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Write a message..."
              className="flex-1 px-1.5 py-0.5 rounded-full text-[9px]"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                color: "#000000",
              }}
              readOnly
            />
            <button
              className="w-4 h-4 rounded-full flex items-center justify-center"
              style={{ background: "#3390EC" }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniAppScreenshot({ type }) {
  if (type === "psychologist") {
    return (
      <div
        className="relative overflow-hidden rounded-3xl border"
        style={{
          background: "#FFFFFF",
          borderColor: "rgba(19, 39, 63, 0.2)",
        }}
      >
        <div className="relative flex aspect-[16/10] items-center justify-center p-8">
          <div className="w-full max-w-2xl space-y-5">
            {/* Шаг 1: Выбор услуги и времени */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: "#13273F", background: "#13273F" }}>
                  <span className="text-xs font-semibold" style={{ color: "#FFFFFF" }}>1</span>
                </div>
                <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>Выбор услуги и времени</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="border-2 p-4 relative overflow-hidden transition-all duration-200" style={{ borderRadius: "1.25rem", borderWidth: "0.5px", borderColor: "#13273F", background: "#FFFFFF", minHeight: "80px" }}>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-left" style={{ color: "#13273F" }}>Выбрать услугу</div>
                    <div className="h-6 w-6 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: "#13273F", background: "#13273F" }}>
                      <span className="text-base" style={{ color: "rgb(255, 255, 255)" }}>→</span>
                    </div>
                  </div>
                </button>
                <div className="border p-4" style={{ borderRadius: "1.25rem", borderColor: "rgba(19, 39, 63, 0.2)", background: "#13273F" }}>
                  <div className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Выбранное время</div>
                  <div className="text-lg font-semibold" style={{ color: "#FFFFFF" }}>15 января, 14:00</div>
                </div>
              </div>
            </div>

            {/* Стрелка вниз */}
            <div className="flex justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "rgba(19, 39, 63, 0.4)" }}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>

            {/* Шаг 2: Оплата */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: "#13273F", background: "#13273F" }}>
                  <span className="text-xs font-semibold" style={{ color: "#FFFFFF" }}>2</span>
                </div>
                <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>Предоплата</div>
              </div>
              <div className="border p-4" style={{ borderRadius: "1.25rem", borderColor: "rgba(19, 39, 63, 0.2)", background: "#13273F" }}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>Сумма к оплате</div>
                    <div className="text-2xl font-semibold" style={{ color: "#FFFFFF" }}>3 500 ₽</div>
                  </div>
                  <div className="px-3 py-2 rounded-lg" style={{ background: "rgba(16, 185, 129, 0.2)" }}>
                    <div className="text-xs font-semibold" style={{ color: "#10B981" }}>Оплачено</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 px-4 rounded-lg text-sm font-medium" style={{ background: "#FFFFFF", color: "#13273F" }}>
                    Оплатить картой
                  </button>
                </div>
              </div>
            </div>

            {/* Стрелка вниз */}
            <div className="flex justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "rgba(19, 39, 63, 0.4)" }}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>

            {/* Шаг 3: Напоминание */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: "#13273F", background: "#13273F" }}>
                  <span className="text-xs font-semibold" style={{ color: "#FFFFFF" }}>3</span>
                </div>
                <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>Автоматическое напоминание</div>
              </div>
              <div className="border p-4" style={{ borderRadius: "1.25rem", borderColor: "rgba(19, 39, 63, 0.2)", background: "#13273F" }}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "#FFFFFF" }}>
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold mb-1" style={{ color: "#FFFFFF" }}>Напоминание за 2 часа</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>Автоматически отправлено вам и клиенту</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (type === "client") {
    return (
      <div
        className="relative overflow-hidden rounded-3xl border"
        style={{
          background: "#FFFFFF",
          borderColor: "rgba(19, 39, 63, 0.2)",
        }}
      >
        <div className="relative flex items-center md:items-stretch justify-center md:justify-start p-4">
          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
              {/* Шаг 1: Выбор услуги */}
              <div className="space-y-2 flex flex-col">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: "#13273F", background: "#13273F" }}>
                    <span className="text-[10px] font-semibold" style={{ color: "#FFFFFF" }}>1</span>
                  </div>
                  <div className="text-xs font-semibold" style={{ color: PALETTE.text }}>Выбор услуги и эксперта</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="border-2 p-3 relative overflow-hidden transition-all duration-200" style={{ borderRadius: "1.25rem", borderWidth: "0.5px", borderColor: "#13273F", background: "#FFFFFF", minHeight: "70px" }}>
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-left" style={{ color: "#13273F" }}>Выбрать услугу</div>
                      <div className="h-5 w-5 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: "#13273F", background: "#13273F" }}>
                        <span className="text-sm" style={{ color: "rgb(255, 255, 255)" }}>→</span>
                      </div>
                    </div>
                  </button>
                  <button className="border-2 p-3 relative overflow-hidden transition-all duration-200" style={{ borderRadius: "1.25rem", borderWidth: "0.5px", borderColor: "#13273F", background: "#FFFFFF", minHeight: "70px" }}>
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-left" style={{ color: "#13273F" }}>Выбрать эксперта</div>
                      <div className="h-5 w-5 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: "#13273F", background: "#13273F" }}>
                        <span className="text-sm" style={{ color: "rgb(255, 255, 255)" }}>→</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Шаг 2: Выбранное время */}
              <div className="space-y-2 flex flex-col">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: "#13273F", background: "#13273F" }}>
                    <span className="text-[10px] font-semibold" style={{ color: "#FFFFFF" }}>2</span>
                  </div>
                  <div className="text-xs font-semibold" style={{ color: PALETTE.text }}>Выбранное время</div>
                </div>
                <div className="border p-3 flex-1 flex flex-col justify-center" style={{ borderRadius: "1.25rem", borderColor: "rgba(19, 39, 63, 0.2)", background: "#13273F" }}>
                  <div className="text-[10px] mb-1.5" style={{ color: "rgba(255,255,255,0.6)" }}>Выбранное время</div>
                  <div className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>15 января, 14:00</div>
                </div>
              </div>

              {/* Шаг 3: Оплата при записи */}
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: "#13273F", background: "#13273F" }}>
                    <span className="text-[10px] font-semibold" style={{ color: "#FFFFFF" }}>3</span>
                  </div>
                  <div className="text-xs font-semibold" style={{ color: PALETTE.text }}>Оплата при записи</div>
                </div>
                <div className="border p-3 flex-1 flex flex-col" style={{ borderRadius: "1.25rem", borderColor: "rgba(19, 39, 63, 0.2)", background: "#13273F" }}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-[10px] mb-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>Сумма к оплате</div>
                      <div className="text-xl font-semibold" style={{ color: "#FFFFFF" }}>3 500 ₽</div>
                    </div>
                    <div className="px-2 py-1 rounded-lg" style={{ background: "rgba(16, 185, 129, 0.2)" }}>
                      <div className="text-[10px] font-semibold" style={{ color: "#10B981" }}>Оплачено</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <button className="flex-1 py-1.5 px-3 rounded-lg text-xs font-medium" style={{ background: "#FFFFFF", color: "#13273F" }}>
                      Оплатить картой
                    </button>
                  </div>
                </div>
              </div>

              {/* Шаг 4: Автоматическое напоминание */}
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: "#13273F", background: "#13273F" }}>
                    <span className="text-[10px] font-semibold" style={{ color: "#FFFFFF" }}>4</span>
                  </div>
                  <div className="text-xs font-semibold" style={{ color: PALETTE.text }}>Автоматическое напоминание</div>
                </div>
                <div className="border p-3 flex-1 flex flex-col justify-between" style={{ borderRadius: "1.25rem", borderColor: "rgba(19, 39, 63, 0.2)", background: "#13273F" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "#FFFFFF" }}>
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold mb-0.5" style={{ color: "#FFFFFF" }}>Напоминание за 2 часа</div>
                      <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.7)" }}>Вы получите напоминание за 2 часа до встречи</div>
                    </div>
                  </div>
                  <button className="w-full py-1.5 px-3 rounded-lg text-[10px] font-medium border transition-all duration-200 hover:opacity-90" style={{ background: "rgba(255,255,255,0.1)", color: "#FFFFFF", borderColor: "rgba(255,255,255,0.3)" }}>
                    Отказаться
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (type === "booking") {
    const [selectedDate, setSelectedDate] = useState(2);
    const [selectedTime, setSelectedTime] = useState(null);
    const [activeTab, setActiveTab] = useState("alina");

    const dates = [
      { day: "ПН", num: 1, available: false },
      { day: "ВТ", num: 2, available: true },
      { day: "СР", num: 3, available: true },
      { day: "ЧТ", num: 4, available: false },
      { day: "ПТ", num: 5, available: true },
      { day: "СБ", num: 6, available: true, weekend: true },
      { day: "ВС", num: 7, available: true, weekend: true },
      { day: "ПН", num: 8, available: true },
    ];

    const timeSlots = [
      { time: "9:00", available: false },
      { time: "9:15", available: true },
      { time: "9:30", available: true },
      { time: "9:45", available: true },
      { time: "10:00", available: true },
    ];

    return (
      <div
        className="relative overflow-hidden rounded-3xl border"
        style={{
          background: "#FFFFFF",
          borderColor: "rgba(19, 39, 63, 0.2)",
        }}
      >
        <div className="relative flex items-center justify-center p-4">
          <div className="w-full max-w-2xl space-y-4">
            {/* Заголовок */}
            <div className="text-base font-semibold text-center" style={{ color: "#13273F" }}>
              Дата и время записи
            </div>

            {/* Табы */}
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab("alina")}
                className="flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all cursor-pointer"
                style={{
                  background: activeTab === "alina" ? "#13273F" : "#FFFFFF",
                  color: activeTab === "alina" ? "#FFFFFF" : "rgba(19, 39, 63, 0.7)",
                  border: activeTab === "alina" ? "none" : "1px solid rgba(19, 39, 63, 0.2)",
                  boxShadow: activeTab === "alina" ? "0 2px 8px rgba(19, 39, 63, 0.3)" : "none",
                }}
              >
                Алина Игнатова
              </button>
              <button 
                onClick={() => setActiveTab("all")}
                className="flex-1 py-2 px-4 rounded-xl text-sm font-medium border transition-all cursor-pointer"
                style={{
                  background: activeTab === "all" ? "#13273F" : "#FFFFFF",
                  color: activeTab === "all" ? "#FFFFFF" : "rgba(19, 39, 63, 0.7)",
                  borderColor: "rgba(19, 39, 63, 0.2)",
                }}
              >
                Все доступные
              </button>
            </div>

            {/* Время местное */}
            <div className="text-xs text-center mb-3" style={{ color: "rgba(19, 39, 63, 0.6)" }}>
              Время местное (GMT +3)
            </div>

            {/* Выбор даты и времени */}
            <div className="space-y-4">
              {/* Месяц и даты */}
              <div>
                <div className="text-sm font-semibold mb-3" style={{ color: "#13273F" }}>Март</div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {dates.map((date, idx) => (
                    <button
                      key={idx}
                      onClick={() => date.available && setSelectedDate(date.num)}
                      disabled={!date.available}
                      className="flex-shrink-0 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-xs font-medium transition-all min-w-[50px] cursor-pointer disabled:cursor-not-allowed"
                      style={{
                        background: "#F3F4F6",
                        color: date.weekend 
                          ? "#EF4444" 
                          : date.available 
                            ? (selectedDate === date.num ? "#13273F" : "#13273F") 
                            : "rgba(19, 39, 63, 0.4)",
                        border: selectedDate === date.num ? "2px solid #13273F" : "none",
                        opacity: date.available ? 1 : 0.5,
                      }}
                    >
                      <div>{date.day}</div>
                      <div className="text-sm font-semibold mt-0.5">{date.num}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Время */}
              <div>
                <div className="text-sm font-semibold mb-3" style={{ color: "#13273F" }}>Утро</div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {timeSlots.map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className="flex-shrink-0 py-2 px-4 rounded-xl text-sm font-medium transition-all cursor-pointer disabled:cursor-not-allowed"
                      style={{
                        background: "#F3F4F6",
                        color: slot.available ? "#13273F" : "rgba(19, 39, 63, 0.4)",
                        border: selectedTime === slot.time ? "2px solid #13273F" : "none",
                        opacity: slot.available ? 1 : 0.5,
                      }}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (type === "homework") {
    return (
      <div
        className="relative overflow-hidden rounded-3xl border"
        style={{
          background: "#FFFFFF",
          borderColor: "rgba(19, 39, 63, 0.2)",
        }}
      >
        <div className="relative flex items-center justify-center p-4">
          <div className="w-full max-w-2xl space-y-4">
            {/* Заголовок */}
            <div className="text-base font-semibold text-center" style={{ color: "#13273F" }}>
              Домашнее задание
            </div>

            {/* Задание от психолога */}
            <div className="border p-4 rounded-2xl" style={{ borderColor: "rgba(19, 39, 63, 0.2)", background: "rgba(19, 39, 63, 0.05)" }}>
              <div className="flex items-start gap-3 mb-3">
                <div className="h-10 w-10 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: "#13273F", background: "#13273F" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-1" style={{ color: "#13273F" }}>
                    Задание от Алины Игнатовой
                  </div>
                  <div className="text-xs mb-2" style={{ color: "rgba(19, 39, 63, 0.7)" }}>
                    В течение недели ведите дневник тревожных ситуаций. Записывайте время, место и ваши мысли в момент тревоги.
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="text-xs" style={{ color: "rgba(19, 39, 63, 0.6)" }}>
                      Дедлайн: до следующей встречи
                    </div>
                    <div className="px-1.5 py-0.5 rounded text-[10px] font-medium" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10B981" }}>
                      Автоматически
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Форма отправки */}
            <div className="border p-4 rounded-2xl" style={{ borderColor: "rgba(19, 39, 63, 0.2)" }}>
              <div className="text-sm font-semibold mb-3" style={{ color: "#13273F" }}>
                Ваш ответ
              </div>
              <textarea
                className="w-full p-3 rounded-xl border mb-3 text-sm resize-none"
                style={{
                  borderColor: "rgba(19, 39, 63, 0.2)",
                  background: "#FFFFFF",
                  color: "#13273F",
                  minHeight: "120px",
                }}
                placeholder="Опишите выполненное задание..."
                defaultValue="1. Встреча с начальником - сильная тревога
2. Разговор с мамой - средняя тревога
3. Поездка в метро - легкая тревога"
                readOnly
              />
              <div className="flex items-center gap-2 mb-3">
                <button className="px-3 py-2 rounded-lg border text-xs font-medium" style={{ borderColor: "rgba(19, 39, 63, 0.2)", background: "#FFFFFF", color: "#13273F" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-1">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Прикрепить файл
                </button>
                <div className="text-xs" style={{ color: "rgba(19, 39, 63, 0.6)" }}>
                  Файл не выбран
                </div>
              </div>
              <button
                className="w-full py-3 px-4 rounded-xl text-sm font-medium"
                style={{
                  background: "#13273F",
                  color: "#FFFFFF",
                }}
              >
                Отправить задание
              </button>
            </div>

            {/* Статус отправки */}
            <div className="border p-3 rounded-xl flex items-center gap-2" style={{ borderColor: "rgba(16, 185, 129, 0.3)", background: "rgba(16, 185, 129, 0.1)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <div className="text-xs font-medium" style={{ color: "#10B981" }}>
                Задание отправлено 15 ноября в 11:45
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (type === "payment") {
    return (
      <div
        className="relative overflow-hidden rounded-3xl border"
        style={{
          background: "#13273F",
          borderColor: "rgba(19, 39, 63, 0.2)",
        }}
      >
        <div className="relative flex items-center justify-center p-4">
          <div className="w-full max-w-2xl space-y-4">
            {/* Заголовок */}
            <div className="text-base font-semibold text-center" style={{ color: "#FFFFFF" }}>
              Мои консультации
            </div>

            {/* Список консультаций */}
            <div className="space-y-3">
              {/* Консультация 1 - Оплачено */}
              <div className="border p-4 rounded-2xl" style={{ borderColor: "rgba(255, 255, 255, 0.2)", background: "rgba(255, 255, 255, 0.1)" }}>
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                      15 ноября, 14:00
                    </div>
                    <div className="px-3 py-1 rounded-lg" style={{ background: "rgba(16, 185, 129, 0.2)" }}>
                      <div className="text-xs font-semibold" style={{ color: "#10B981" }}>
                        Оплачено
                      </div>
                    </div>
                  </div>
                  <div className="text-xs mb-1" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    Консультация • Работа с тревогой
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <div className="text-xs" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                      Алина Игнатова
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}>
                  <div className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                    3 500 ₽
                  </div>
                  <div className="text-xs" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    Оплачено 10 ноября
                  </div>
                </div>
              </div>

              {/* Консультация 2 - Не оплачено */}
              <div className="border p-4 rounded-2xl" style={{ borderColor: "rgba(255, 255, 255, 0.2)", background: "rgba(255, 255, 255, 0.1)" }}>
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                      22 ноября, 16:00
                    </div>
                    <div className="px-3 py-1 rounded-lg" style={{ background: "rgba(239, 68, 68, 0.2)" }}>
                      <div className="text-xs font-semibold" style={{ color: "#EF4444" }}>
                        Не оплачено
                      </div>
                    </div>
                  </div>
                  <div className="text-xs mb-1" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    Консультация • Знакомство
                  </div>
                  <div className="text-xs" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    Алина Игнатова
                  </div>
                </div>
                <div className="pt-3 border-t space-y-3" style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                      3 500 ₽
                    </div>
                  </div>
                  
                  {/* Выбранная карта */}
                  <div className="border p-3 rounded-xl flex items-center gap-3" style={{ borderColor: "rgba(255, 255, 255, 0.3)", background: "rgba(255, 255, 255, 0.1)" }}>
                    <div className="flex-1">
                      <div className="text-xs font-semibold mb-0.5" style={{ color: "#FFFFFF" }}>
                        •••• •••• •••• 4242
                      </div>
                      <div className="text-[10px]" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                        Срок действия: 12/25
                      </div>
                    </div>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255, 255, 255, 0.2)", border: "1px solid rgba(255, 255, 255, 0.3)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>

                  {/* Кнопка оплаты */}
                  <button
                    className="w-full py-3 px-4 rounded-xl text-sm font-medium"
                    style={{
                      background: "#FFFFFF",
                      color: "#13273F",
                    }}
                  >
                    Оплатить
                  </button>
                </div>
              </div>

              {/* Консультация 3 - Оплачено */}
              <div className="border p-4 rounded-2xl" style={{ borderColor: "rgba(255, 255, 255, 0.2)", background: "rgba(255, 255, 255, 0.1)" }}>
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                      29 ноября, 14:00
                    </div>
                    <div className="px-3 py-1 rounded-lg" style={{ background: "rgba(16, 185, 129, 0.2)" }}>
                      <div className="text-xs font-semibold" style={{ color: "#10B981" }}>
                        Оплачено
                      </div>
                    </div>
                  </div>
                  <div className="text-xs mb-1" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    Консультация • Работа с тревогой
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <div className="text-xs" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                      Алина Игнатова
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}>
                  <div className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                    3 500 ₽
                  </div>
                  <div className="text-xs" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    Оплачено 15 ноября
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (type === "archive") {
    return (
      <div
        className="relative overflow-hidden rounded-3xl border"
        style={{
          background: "#FFFFFF",
          borderColor: "rgba(19, 39, 63, 0.2)",
        }}
      >
        <div className="relative flex items-center justify-center p-4">
          <div className="w-full max-w-2xl space-y-4">
            {/* Заголовок */}
            <div className="text-base font-semibold text-center" style={{ color: "#13273F" }}>
              История консультаций
            </div>

            {/* Поисковая строка */}
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск по имени или дате..."
                className="w-full px-4 py-2.5 pl-10 rounded-xl border text-sm"
                style={{
                  borderColor: "rgba(19, 39, 63, 0.2)",
                  background: "#FFFFFF",
                  color: "#13273F",
                }}
                readOnly
              />
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(19, 39, 63, 0.6)"
                strokeWidth="2"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>

            {/* Фильтр */}
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1.5 rounded-lg border text-xs font-medium"
                style={{
                  borderColor: "rgba(19, 39, 63, 0.2)",
                  background: "#13273F",
                  color: "#FFFFFF",
                }}
              >
                Все
              </button>
              <button
                className="px-3 py-1.5 rounded-lg border text-xs font-medium"
                style={{
                  borderColor: "rgba(19, 39, 63, 0.2)",
                  background: "#FFFFFF",
                  color: "rgba(19, 39, 63, 0.7)",
                }}
              >
                Алина Игнатова
              </button>
              <button
                className="px-3 py-1.5 rounded-lg border text-xs font-medium"
                style={{
                  borderColor: "rgba(19, 39, 63, 0.2)",
                  background: "#FFFFFF",
                  color: "rgba(19, 39, 63, 0.7)",
                }}
              >
                Другие
              </button>
            </div>

            {/* Список консультаций */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {/* Консультация 1 */}
              <div className="border p-4 rounded-2xl" style={{ borderColor: "rgba(19, 39, 63, 0.2)", background: "rgba(19, 39, 63, 0.05)" }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold" style={{ color: "#13273F" }}>
                    15 ноября, 14:00
                  </div>
                  <div className="px-3 py-1 rounded-lg" style={{ background: "rgba(16, 185, 129, 0.1)" }}>
                    <div className="text-xs font-semibold" style={{ color: "#10B981" }}>
                      Проведено
                    </div>
                  </div>
                </div>
                <div className="text-xs mb-1" style={{ color: "rgba(19, 39, 63, 0.7)" }}>
                  Консультация • Работа с тревогой
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(19, 39, 63, 0.6)" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <div className="text-xs" style={{ color: "rgba(19, 39, 63, 0.6)" }}>
                    Алина Игнатова
                  </div>
                </div>
              </div>

              {/* Консультация 2 */}
              <div className="border p-4 rounded-2xl" style={{ borderColor: "rgba(19, 39, 63, 0.2)", background: "rgba(19, 39, 63, 0.05)" }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold" style={{ color: "#13273F" }}>
                    8 ноября, 16:00
                  </div>
                  <div className="px-3 py-1 rounded-lg" style={{ background: "rgba(16, 185, 129, 0.1)" }}>
                    <div className="text-xs font-semibold" style={{ color: "#10B981" }}>
                      Проведено
                    </div>
                  </div>
                </div>
                <div className="text-xs mb-1" style={{ color: "rgba(19, 39, 63, 0.7)" }}>
                  Консультация • Знакомство
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(19, 39, 63, 0.6)" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <div className="text-xs" style={{ color: "rgba(19, 39, 63, 0.6)" }}>
                    Алина Игнатова
                  </div>
                </div>
              </div>

              {/* Консультация 3 */}
              <div className="border p-4 rounded-2xl" style={{ borderColor: "rgba(19, 39, 63, 0.2)", background: "rgba(19, 39, 63, 0.05)" }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold" style={{ color: "#13273F" }}>
                    1 ноября, 14:00
                  </div>
                  <div className="px-3 py-1 rounded-lg" style={{ background: "rgba(16, 185, 129, 0.1)" }}>
                    <div className="text-xs font-semibold" style={{ color: "#10B981" }}>
                      Проведено
                    </div>
                  </div>
                </div>
                <div className="text-xs mb-1" style={{ color: "rgba(19, 39, 63, 0.7)" }}>
                  Консультация • Работа с тревогой
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(19, 39, 63, 0.6)" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <div className="text-xs" style={{ color: "rgba(19, 39, 63, 0.6)" }}>
                    Алина Игнатова
                  </div>
                </div>
              </div>

              {/* Консультация 4 */}
              <div className="border p-4 rounded-2xl" style={{ borderColor: "rgba(19, 39, 63, 0.2)", background: "rgba(19, 39, 63, 0.05)" }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold" style={{ color: "#13273F" }}>
                    25 октября, 16:00
                  </div>
                  <div className="px-3 py-1 rounded-lg" style={{ background: "rgba(16, 185, 129, 0.1)" }}>
                    <div className="text-xs font-semibold" style={{ color: "#10B981" }}>
                      Проведено
                    </div>
                  </div>
                </div>
                <div className="text-xs mb-1" style={{ color: "rgba(19, 39, 63, 0.7)" }}>
                  Консультация • Знакомство
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(19, 39, 63, 0.6)" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <div className="text-xs" style={{ color: "rgba(19, 39, 63, 0.6)" }}>
                    Алина Игнатова
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

function FilesAndFeedback() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border"
      style={{
        background: "#FFFFFF",
        borderColor: "rgba(19, 39, 63, 0.2)",
      }}
    >
      <div className="relative flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-4">
          <div className="text-base font-semibold text-center" style={{ color: "#13273F" }}>
            Файлы и обратная связь
          </div>
          
          {/* Консультация */}
          <div className="border p-4 rounded-2xl" style={{ borderColor: "rgba(19, 39, 63, 0.2)", background: "rgba(19, 39, 63, 0.03)" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <div className="text-sm font-semibold mb-1" style={{ color: "#13273F" }}>
                  15 ноября, 14:00
                </div>
                <div className="text-xs mb-2" style={{ color: "rgba(19, 39, 63, 0.7)" }}>
                  Консультация • Работа с тревогой
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(19, 39, 63, 0.6)" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <div className="text-xs font-semibold" style={{ color: "#13273F" }}>
                    Алина Игнатова
                  </div>
                </div>
              </div>
              <div className="px-3 py-1 rounded-lg" style={{ background: "rgba(16, 185, 129, 0.1)" }}>
                <div className="text-xs font-semibold" style={{ color: "#10B981" }}>
                  Проведено
                </div>
              </div>
            </div>

            <div className="pt-3 border-t space-y-3" style={{ borderColor: "rgba(19, 39, 63, 0.1)" }}>
              {/* Прикрепленные файлы */}
              <div>
                <div className="text-xs font-semibold mb-2" style={{ color: "#13273F" }}>
                  Прикрепленные файлы
                </div>
                <div className="space-y-2">
                  <div className="border p-2 rounded-xl flex items-center gap-2" style={{ borderColor: "rgba(19, 39, 63, 0.2)", background: "rgba(19, 39, 63, 0.02)" }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(19, 39, 63, 0.1)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#13273F" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium" style={{ color: "#13273F" }}>
                        Заметки_сессии.pdf
                      </div>
                      <div className="text-[10px]" style={{ color: "rgba(19, 39, 63, 0.6)" }}>
                        245 КБ
                      </div>
                    </div>
                    <button className="p-1 rounded-lg hover:opacity-70 transition-all" style={{ background: "rgba(19, 39, 63, 0.1)" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#13273F" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                  
                  <button className="w-full border-2 border-dashed p-2 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-70" style={{ borderColor: "rgba(19, 39, 63, 0.3)", background: "rgba(19, 39, 63, 0.02)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(19, 39, 63, 0.6)" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <div className="text-xs font-medium" style={{ color: "rgba(19, 39, 63, 0.7)" }}>
                      Прикрепить файл
                    </div>
                  </button>
                </div>
              </div>

              {/* Домашнее задание */}
              <div>
                <div className="text-xs font-semibold mb-2" style={{ color: "#13273F" }}>
                  Домашнее задание
                </div>
                <div className="border p-3 rounded-xl" style={{ borderColor: "rgba(19, 39, 63, 0.2)", background: "rgba(19, 39, 63, 0.02)" }}>
                  <textarea
                    className="w-full resize-none text-xs"
                    placeholder="Напишите домашнее задание для клиента..."
                    rows="4"
                    style={{
                      color: "#13273F",
                      background: "transparent",
                      outline: "none",
                      border: "none",
                      padding: 0,
                      margin: 0,
                    }}
                    defaultValue="В течение недели ведите дневник тревожных ситуаций. Записывайте время, место и ваши мысли в момент тревоги."
                  />
                </div>
                
                {/* Дедлайн */}
                <div className="mt-3">
                  <div className="text-xs font-semibold mb-2" style={{ color: "#13273F" }}>
                    Дедлайн
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      className="flex-1 border p-2 rounded-lg text-xs"
                      style={{
                        borderColor: "rgba(19, 39, 63, 0.2)",
                        background: "#FFFFFF",
                        color: "#13273F",
                        outline: "none",
                      }}
                      defaultValue="2024-11-22"
                    />
                    <button className="px-3 py-2 rounded-lg text-xs font-medium border transition-all hover:opacity-70" style={{ borderColor: "rgba(19, 39, 63, 0.2)", color: "rgba(19, 39, 63, 0.7)", background: "rgba(19, 39, 63, 0.02)" }}>
                      Следующая встреча
                    </button>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:opacity-70" style={{ borderColor: "rgba(19, 39, 63, 0.2)", color: "rgba(19, 39, 63, 0.7)", background: "#FFFFFF" }}>
                    Сохранить (пока не отправлять)
                  </button>
                  <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-90" style={{ background: "#13273F", color: "#FFFFFF" }}>
                    Отправить клиенту
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccordionItem({ q, a, isOpen, onToggle }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
      style={{
        background: `linear-gradient(180deg, ${PALETTE.panel2}, ${PALETTE.panel})`,
        borderColor: PALETTE.stroke,
        boxShadow: `0 28px 90px ${PALETTE.shadow}`,
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
    >
      {/* subtle sheen */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(800px 400px at 30% 10%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(700px 400px at 80% 30%, rgba(255,255,255,0.06), transparent 60%)",
        }}
      />
      {/* inner stroke */}
      <div
        className="pointer-events-none absolute inset-[1px] rounded-[22px]"
        style={{
          border: `1px solid ${PALETTE.stroke2}`,
          opacity: 0.5,
        }}
      />
      <button
        onClick={onToggle}
        className="relative w-full px-5 py-4 flex items-start justify-between gap-4 text-left"
      >
        <div className="flex items-start gap-3">
          <div>
            <div className="text-sm md:text-base font-medium" style={{ color: PALETTE.text }}>
              {q}
            </div>
            <div className="text-xs mt-1" style={{ color: PALETTE.muted2 }}>
              Нажмите, чтобы {isOpen ? "свернуть" : "развернуть"}
            </div>
          </div>
        </div>
        <div
          className={cn(
            "h-9 w-9 rounded-2xl border flex items-center justify-center transition-transform shrink-0",
            isOpen && "rotate-45"
          )}
          style={{
            borderColor: "rgba(78, 0, 0, 0.6)",
            background: "rgba(78, 0, 0, 0.15)",
          }}
        >
          <span className="text-xl leading-none" style={{ color: "#4E0000" }}>
            +
          </span>
        </div>
      </button>
      {isOpen ? (
        <div className="px-5 pb-5">
          <p className="text-sm leading-relaxed" style={{ color: PALETTE.muted }}>
            {a}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default function PsychologistLandingUpmini() {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const connectionLink = "https://t.me/your_bot_link"; // Замените на реальную ссылку
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 400);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(connectionLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const features = useMemo(
    () => [
      {
        title: "Онлайн запись",
        desc: "Клиент выбирает свободные слоты и записывается сам. Вы оба получаете уведомление.",
        shot: "Скрин: календарь и выбор времени",
      },
      {
        title: "Напоминания",
        desc: "Автоматическое напоминание перед сессией. Клиент не забудет.",
        shot: "Скрин: напоминание в Telegram/Max",
      },
      {
        title: "Файлы и обратная связь",
        desc: "После консультации специалист может прикреплять к консультации файлы и писать домашнее задание.",
        shot: "Скрин: добавление файлов и обратная связь",
      },
      {
        title: "Коммуникация",
        desc: "Отправляйте домашние задания и проверяйте выполнение в приложении.",
        shot: "Скрин: чат/домашние задания",
      },
      {
        title: "Оплата",
        desc: "Перевод картой в момент записи — без напоминаний.",
        shot: "Скрин: предоплата при записи",
      },
      {
        title: "Архив сессий",
        desc: "Записи не теряются в переписках. Всё сохраняется в истории как клиента, так и специалиста.",
        shot: "Скрин: история клиента",
      },
    ],
    []
  );

  const steps = useMemo(
    () => [
      {
        title: "Шаг 0. Бесплатная консультация",
        desc: "Поможем создать бота и настроить кабинет.",
        shot: "Скрин: консультация/онбординг",
      },
      {
        title: "Шаг 1. Заполните профиль",
        desc: "Имя, опыт, услуги и стоимость сессии. Занимает 5 минут.",
        shot: "Скрин: профиль психолога",
      },
      {
        title: "Шаг 2. Настройте расписание",
        desc:
          "Укажите рабочие дни и часы. Добавьте паузы между сессиями и время на отдых. Меняйте расписание в любой момент.",
        shot: "Скрин: расписание и паузы",
      },
      {
        title: "Шаг 3. Поделитесь ссылкой",
        desc: "Добавьте ссылку в профиль или отправьте клиентам в личных сообщениях.",
        shot: "Скрин: ссылка и кнопки",
      },
    ],
    []
  );

  const pains = useMemo(
    () => [
      {
        title: "Долгие переписки вместо записи сразу?",
        desc: "Согласование одной сессии растягивается на десяток сообщений.",
      },
      {
        title: "Переносы, отмены и пустые слоты?",
        desc: "Клиент переносит за час до сессии. Слот пропал, а деньги не получены.",
      },
      {
        title: "Оплата — отдельный квест?",
        desc: "Напоминать, проверять, вести учёт — всё вручную.",
      },
      {
        title: "Файлы и обратная связь теряются в переписках?",
        desc: "Клиент отправляет файлы и отзывы в чат, но их сложно найти и систематизировать.",
      },
    ],
    []
  );

  const reviews = useMemo(
    () => [
      {
        name: "Анна М.",
        role: "клинический психолог",
        text:
          "«Раньше тратила час в день на переписки о записи. Сейчас — ноль. Клиенты записываются сами, я просто вижу уведомления..»",
      },
      {
        name: "Екатерина С.",
        role: "гештальт-терапевт",
        text:
          "«Подключила предоплату — отмены сократились с 10–15 в месяц до 1. Это примерно 30 000 ₽, которые раньше просто терялись.»",
      },
      {
        name: "Дмитрий В.",
        role: "психотерапевт",
        text: "«Работаю уже 4 месяца с приложением, клиентам очень удобно.»",
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "Я не разбираюсь в технике. Справлюсь?",
        a:
          "Да. Настройка занимает 10 минут. Вы просто заполняете поля: имя, услуги, цены, расписание. Никакого кода, интеграций и сложных настроек. Если что-то непонятно — мы на связи. Также инструкцию по созданию бота вы сможете скачать, или обратиться к нашим менеджерам — они создадут бота за 5–10 минут.",
      },
      {
        q: "Что будет после 14 дней теста?",
        a:
          "Вы сами решаете — продолжить или нет. Если подходит — подписка 1 900 ₽/мес. Если нет — ничего платить не нужно. Также можно воспользоваться программой лояльности: пригласите коллегу-психолога и получите месяц пользования платформой дополнительно. Количество приглашённых коллег — без ограничений.",
      },
      {
        q: "Как проходит оплата сессии от клиента?",
        a:
          "Клиент вводит данные карты, деньги переводятся напрямую вам через сервис Тинькофф.",
      },
    ],
    []
  );

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: PALETTE.bg, color: PALETTE.text, overflowX: "hidden", width: "100%", maxWidth: "100vw" }}>
      {/* Background blur blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 h-[560px] w-[560px] rounded-full blur-3xl opacity-70"
          style={{
            background:
              `radial-gradient(circle at 30% 30%, ${PALETTE.blueGlowLight}, transparent 55%)`,
          }}
        />
        <div
          className="absolute top-10 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-60"
          style={{
            background:
              `radial-gradient(circle at 60% 40%, ${PALETTE.blueGlow}, transparent 55%)`,
          }}
        />
        <div
          className="absolute bottom-[-240px] left-[20%] h-[640px] w-[640px] rounded-full blur-3xl opacity-50"
          style={{
            background:
              `radial-gradient(circle at 50% 50%, ${PALETTE.blueGlowLight}, transparent 60%)`,
          }}
        />
      </div>

      {/* Top nav */}
      <header className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 md:px-1 pt-6">
          <GlassCard className="px-4 md:px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <svg width="40" height="40" viewBox="0 0 375 376" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M293.831 0H81.1695C36.3408 0 0 36.3465 0 81.1823V293.877C0 338.713 36.3408 375.059 81.1695 375.059H293.831C338.659 375.059 375 338.713 375 293.877V81.1823C375 36.3465 338.659 0 293.831 0Z" fill="#060F30"/>
                    <path d="M305.819 145.887C303.971 133.565 298.901 123.66 290.656 116.077C282.411 108.494 271.56 104.703 258.15 104.703C244.741 104.703 233.321 108.068 222.707 114.845C212.093 121.622 203.374 131.243 196.551 143.754V107.547H176.412L176.981 207.307C172.859 219.96 165.135 230.766 155.99 238.633C146.323 247.021 135.472 251.239 123.484 251.239C111.496 251.239 102.682 246.879 96.9014 238.159C91.1205 229.439 88.2301 215.695 88.2301 196.833V107.357H67.1914V205.127C67.1914 205.127 67.1914 219.771 69.0394 229.202C70.8874 241.523 75.9575 251.428 84.2024 259.011C92.4473 266.594 103.298 270.385 116.708 270.385C130.118 270.385 141.537 267.02 152.152 260.243C162.197 253.845 170.537 244.841 177.171 233.277L177.36 267.684H198.399V169.535C202.332 155.839 209.108 144.797 218.821 136.361C228.535 127.973 239.339 123.755 251.327 123.755C263.315 123.755 272.129 128.115 277.91 136.835C283.691 145.555 286.581 159.299 286.581 178.161V267.636H307.62V169.867C307.62 169.867 307.62 155.223 305.772 145.792L305.819 145.887Z" fill="#F2F2F2"/>
                  </svg>
                  <div>
                    <div className="text-xs" style={{ color: PALETTE.muted2 }}>
                      кабинет записи для психолога
                    </div>
                  </div>
                </div>
              </div>

              <nav className="hidden md:flex items-center gap-2">
                {[
                  ["Проблемы", "pains"],
                  ["Возможности", "features"],
                  ["Как начать", "how"],
                  ["Тариф", "pricing"],
                  ["FAQ", "faq"],
                ].map(([label, id]) => (
                  <button
                    key={id}
                    onClick={() => scrollToId(id)}
                    className="px-4 py-2 rounded-2xl border text-sm transition"
                    style={{
                      color: PALETTE.muted,
                      borderColor: "rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.04)",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollToId("cta")}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm md:text-base font-medium border transition-all duration-200"
                  style={{
                    color: "#FFFFFF",
                    background: "#4E0000",
                    borderColor: "rgba(78, 0, 0, 0.6)",
                    boxShadow: "rgba(78, 0, 0, 0.3) 0px 18px 60px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                  }}
                >
                  Создать кабинет
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 md:px-1 pt-10 md:pt-14">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
            {/* Левая колонка - Hero контент */}
            <div className="lg:col-span-6">
              <motion.div variants={containerV} initial="hidden" animate="show">
                <motion.div variants={itemV}>
                <div className="mb-4">
                  <span 
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm border"
                    style={{
                      background: "rgba(107, 126, 61, 0.15)",
                      borderColor: "rgba(107, 126, 61, 0.3)",
                      color: "rgba(19, 39, 63, 0.7)",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                    }}
                  >
                    14 дней бесплатно • без привязки карты
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
                  Кабинет записи психолога в{" "}
                  <span
                    style={{
                      color: "#13273F",
                    }}
                  >
                    Telegram
                  </span>{" "}
                  или{" "}
                  <span
                    style={{
                      color: "#13273F",
                    }}
                  >
                    Max
                  </span>
                </h1>

                <p className="mt-4 text-base md:text-lg leading-relaxed" style={{ color: PALETTE.muted }}>
                  Клиенты сами выбирают время, вносят предоплату и получают напоминания.
                  Без сайта и технических сложностей.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <PrimaryButton onClick={() => scrollToId("cta")}>
                    Попробовать 14 дней бесплатно
                  </PrimaryButton>
                  <button
                    onClick={() => scrollToId("features")}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm md:text-base font-medium border transition-all duration-200"
                    style={{
                      color: "rgba(10, 12, 16, 0.92)",
                      background: "#FFFFFF",
                      borderColor: "rgba(255, 255, 255, 0.25)",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 8px",
                    }}
                  >
                    Посмотреть функции
                  </button>
                </div>

                <div className="mt-7 grid grid-cols-3 gap-1 w-full min-w-0">
                  <MiniStat label="Запись" value="самостоятельно" />
                  <MiniStat label="Оплата" value="при записи" />
                  <MiniStat label="Напоминания" value="автоматически" />
                </div>

                <div className="mt-6">
                  <div className="text-xs" style={{ color: PALETTE.muted2 }}>
                    Без спешки и технических сложностей. Напишите нам в личные сообщения — мы бережно соберём ваш кабинет записи бесплатно.
                  </div>
                </div>

                {/* Mobile iPhones - показываем только на мобильных */}
                <div className="mt-8 lg:hidden">
                  <div className="flex flex-row items-stretch justify-center gap-2 overflow-x-auto pb-4">
                    {/* Mini App для психолога - мобильная версия */}
                    <div className="flex-shrink-0 flex flex-col">
                      <div className="mb-2 text-center">
                        <div className="text-xs font-semibold" style={{ color: "#000000" }}>
                          Mini App для психолога
                        </div>
                      </div>
                      <div
                        className="rounded-[1.5rem] border overflow-hidden relative flex-1"
                        style={{
                          borderColor: "#000000",
                          borderWidth: "2px",
                          background: "#000000",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1) inset",
                          width: "160px",
                          minHeight: "320px",
                        }}
                      >
                        {/* iPhone 15 Pro Max Dynamic Island */}
                        <div 
                          className="absolute top-1.5 left-1/2 transform -translate-x-1/2 z-10"
                          style={{
                            width: "60px",
                            height: "18px",
                            background: "#000000",
                            borderRadius: "9px",
                          }}
                        />
                        <div className="p-1" style={{ paddingTop: "1.25rem", background: "#FFFFFF", minHeight: "100%", fontSize: "0.5rem" }}>
                          {/* Встроенные кнопки Telegram */}
                          <div className="mt-1 mb-1 flex items-center justify-between">
                            <button
                              className="inline-flex items-center gap-0.5 px-1 py-0.5 text-[7px] font-medium transition-all duration-200"
                              style={{
                                borderRadius: "1rem",
                                background: "rgba(0, 0, 0, 0.06)",
                                color: "rgba(0, 0, 0, 0.6)",
                              }}
                            >
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                            <button
                              className="inline-flex items-center gap-0.5 px-1 py-0.5 text-[7px] font-medium transition-all duration-200"
                              style={{
                                borderRadius: "1rem",
                                background: "rgba(0, 0, 0, 0.06)",
                                color: "rgba(0, 0, 0, 0.6)",
                              }}
                            >
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="19" cy="12" r="1"></circle>
                                <circle cx="5" cy="12" r="1"></circle>
                              </svg>
                            </button>
                          </div>

                          <div className="flex items-center gap-0.5 mb-0.5">
                            <div className="h-4 w-4 rounded border" style={{ borderColor: "rgba(0,0,0,0.16)", background: "radial-gradient(circle at 30% 30%, rgba(0,0,0,0.08), rgba(0,0,0,0.02) 60%)" }} />
                            <div>
                              <div className="text-[8px] font-semibold" style={{ color: "#000000" }}>Психолог</div>
                              <div className="text-[7px]" style={{ color: "rgba(0,0,0,0.6)" }}>запись • предоплата</div>
                            </div>
                          </div>

                          <div className="mt-0.5 grid grid-cols-2 gap-0.5">
                            <div className="border p-0.5 flex flex-col h-full" style={{ borderRadius: "1rem", borderColor: "rgba(0,0,0,0.12)", background: "#13273F", paddingTop: "calc(0.125rem + 2px)", paddingBottom: "calc(0.125rem + 1px)", paddingLeft: "calc(0.125rem + 1px)", paddingRight: "calc(0.125rem + 1px)" }}>
                              <div className="text-[7px] h-[0.875rem]" style={{ color: "rgba(255,255,255,0.6)" }}>ближайшее</div>
                              <div className="mt-0.5 text-[8px] font-semibold min-h-[1.5rem] leading-tight" style={{ color: "#FFFFFF" }}>Сегодня 18:30</div>
                              <div className="mt-0.5 flex flex-wrap gap-0.5 min-h-[1.25rem]">
                                <span className="px-1 py-0.5 rounded-full text-[7px] border whitespace-nowrap" style={{ borderColor: "rgba(255,255,255,0.14)", background: "#13273F", color: "rgba(255,255,255,0.7)" }}>50 мин</span>
                                <span className="px-1 py-0.5 rounded-full text-[7px] border whitespace-nowrap" style={{ borderColor: "rgba(255,255,255,0.14)", background: "#13273F", color: "rgba(255,255,255,0.7)" }}>предоплата</span>
                              </div>
                            </div>
                            <div className="border p-0.5 flex flex-col h-full" style={{ borderRadius: "1rem", borderColor: "rgba(0,0,0,0.12)", background: "#13273F", paddingTop: "calc(0.125rem + 2px)", paddingBottom: "calc(0.125rem + 1px)", paddingLeft: "calc(0.125rem + 1px)", paddingRight: "calc(0.125rem + 1px)" }}>
                              <div className="text-[7px] h-[0.875rem]" style={{ color: "rgba(255,255,255,0.6)" }}>напоминание</div>
                              <div className="mt-0.5 text-[8px] font-semibold min-h-[1.5rem] leading-tight" style={{ color: "#FFFFFF" }}>за 2 часа</div>
                              <div className="mt-0.5 text-[7px] leading-relaxed min-h-[1.25rem]" style={{ color: "rgba(255,255,255,0.7)" }}>Авто-уведомление</div>
                            </div>
                          </div>

                          <div className="mt-0.5">
                            <button className="w-full border p-1" style={{ borderRadius: "1rem", background: "#FFFFFF", borderColor: "#13273F" }}>
                              <div className="text-center">
                                <div className="text-[8px] font-medium" style={{ color: "#13273F" }}>Мои слоты</div>
                                <div className="mt-0 text-[7px]" style={{ color: "rgba(19, 39, 63, 0.6)" }}>Управление расписанием</div>
                              </div>
                            </button>
                          </div>

                          <div className="mt-0.5 grid grid-cols-12 gap-0.5">
                            <button className="col-span-7 border p-1" style={{ borderRadius: "1rem", background: "#FFFFFF", borderColor: "#13273F" }}>
                              <div className="text-center">
                                <div className="text-[8px] font-medium" style={{ color: "#13273F" }}>Статистика</div>
                                <div className="mt-0 text-[7px]" style={{ color: "rgba(19, 39, 63, 0.6)" }}>Доходы, графики</div>
                              </div>
                            </button>
                            <button className="col-span-5 border p-1" style={{ borderRadius: "1rem", background: "#FFFFFF", borderColor: "#13273F" }}>
                              <div className="text-center">
                                <div className="text-[8px] font-medium" style={{ color: "#13273F" }}>История</div>
                                <div className="mt-0 text-[7px]" style={{ color: "rgba(19, 39, 63, 0.6)" }}>Архив</div>
                              </div>
                            </button>
                          </div>

                          <div className="mt-0.5">
                            <button className="w-full border p-1" style={{ borderRadius: "1rem", background: "#FFFFFF", borderColor: "#13273F" }}>
                              <div className="text-center">
                                <div className="text-[8px] font-medium" style={{ color: "#13273F" }}>Справочник</div>
                                <div className="mt-0 text-[7px]" style={{ color: "rgba(19, 39, 63, 0.6)" }}>Список всех клиентов</div>
                              </div>
                            </button>
                          </div>

                          <div className="mt-0.5 flex flex-col gap-0.5" style={{ perspective: "1000px" }}>
                            <div style={{ position: "relative", width: "100%", height: "auto" }}>
                              <motion.div 
                                className="border"
                                style={{
                                  borderRadius: "0.75rem",
                                  transformStyle: "preserve-3d",
                                  position: "relative",
                                  width: "100%",
                                }}
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                              >
                                <div 
                                  className="border p-1"
                                  style={{
                                    borderRadius: "0.75rem",
                                    background: "#13273F",
                                    borderColor: "rgba(255,255,255,0.3)",
                                    backfaceVisibility: "hidden",
                                    transform: "rotateY(0deg)",
                                    WebkitBackfaceVisibility: "hidden",
                                    paddingTop: "calc(0.25rem + 1px)",
                                    paddingBottom: "calc(0.25rem + 1px)",
                                  }}
                                >
                                  <div className="flex items-center justify-between mb-0.5">
                                    <div className="text-[7px] font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>15 янв, 14:00</div>
                                    <div className="text-[7px] px-0.5 py-0.5" style={{ borderRadius: "0.75rem", background: "rgba(16, 185, 129, 0.2)", color: "#10B981" }}>Оплачено</div>
                                  </div>
                                  <div className="flex flex-col items-center text-center mb-1">
                                    <div className="h-6 w-6 rounded-full border mb-0.5 shrink-0" style={{ borderColor: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)" }} />
                                    <div className="text-[8px] font-semibold mb-0.5" style={{ color: "#FFFFFF" }}>Имя Клиента</div>
                                    <div className="text-[7px] leading-relaxed px-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>Готова к консультации</div>
                                  </div>
                                  <div className="flex gap-0.5">
                                    <button className="flex-1 py-0.5 text-[7px] font-medium border" style={{ borderRadius: "0.75rem", background: "transparent", color: "#FFFFFF", borderColor: "rgba(255,255,255,0.5)" }}>История</button>
                                    <button className="flex-1 py-0.5 text-[7px] font-medium" style={{ borderRadius: "0.75rem", background: "#FFFFFF", color: "#000000" }}>Связаться</button>
                                  </div>
                                </div>
                                <div 
                                  className="border p-1"
                                  style={{
                                    borderRadius: "0.75rem",
                                    background: "#13273F",
                                    borderColor: "rgba(255,255,255,0.3)",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    backfaceVisibility: "hidden",
                                    transform: "rotateY(180deg)",
                                    WebkitBackfaceVisibility: "hidden",
                                    paddingTop: "calc(0.25rem + 1px)",
                                    paddingBottom: "calc(0.25rem + 1px)",
                                  }}
                                >
                                  <div className="mb-1 pb-0.5 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                                    <div className="text-[8px] font-semibold" style={{ color: "#FFFFFF" }}>История</div>
                                    <div className="flex items-center gap-0.5">
                                      <div className="text-[7px]" style={{ color: "rgba(255,255,255,0.6)" }}>Осталось:</div>
                                      <div className="text-[9px] font-semibold" style={{ color: "#FFFFFF" }}>3</div>
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between py-0.5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                                      <div>
                                        <div className="text-[8px] font-medium" style={{ color: "#FFFFFF" }}>10 янв, 14:00</div>
                                        <div className="text-[7px]" style={{ color: "rgba(255,255,255,0.6)" }}>Консультация</div>
                                      </div>
                                      <div className="text-[7px] px-0.5 py-0.5" style={{ borderRadius: "0.75rem", background: "rgba(16, 185, 129, 0.2)", color: "#10B981" }}>Оплачено</div>
                                    </div>
                                    <div className="flex items-center justify-between py-0.5" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                                      <div>
                                        <div className="text-[8px] font-medium" style={{ color: "#FFFFFF" }}>5 янв, 10:00</div>
                                        <div className="text-[7px]" style={{ color: "rgba(255,255,255,0.6)" }}>Консультация</div>
                                      </div>
                                      <div className="text-[7px] px-0.5 py-0.5" style={{ borderRadius: "0.75rem", background: "rgba(16, 185, 129, 0.2)", color: "#10B981" }}>Оплачено</div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                            <div className="border p-1" style={{ borderRadius: "0.75rem", background: "#13273F", borderColor: "rgba(255,255,255,0.3)", paddingTop: "calc(0.25rem + 1px)", paddingBottom: "calc(0.25rem + 1px)" }}>
                              <div className="flex items-center justify-between mb-1">
                                <div className="text-[7px] font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>16 янв, 10:30</div>
                                <div className="text-[7px] px-0.5 py-0.5" style={{ borderRadius: "0.75rem", background: "rgba(239, 68, 68, 0.2)", color: "#EF4444" }}>Не оплачено</div>
                              </div>
                              <div className="flex flex-col items-center text-center mb-1">
                                <div className="h-6 w-6 rounded-full border mb-0.5 shrink-0" style={{ borderColor: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)" }} />
                                <div className="text-[8px] font-semibold mb-0.5" style={{ color: "#FFFFFF" }}>Имя Клиента</div>
                                <div className="text-[7px] leading-relaxed px-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>Нужна повторная консультация</div>
                              </div>
                              <div className="flex gap-0.5">
                                <button className="flex-1 py-0.5 text-[7px] font-medium border" style={{ borderRadius: "0.75rem", background: "transparent", color: "#FFFFFF", borderColor: "rgba(255,255,255,0.5)" }}>История</button>
                                <button className="flex-1 py-0.5 text-[7px] font-medium" style={{ borderRadius: "0.75rem", background: "#FFFFFF", color: "#000000" }}>Связаться</button>
                              </div>
                            </div>
                          </div>

                          <div className="mt-0.5">
                            <div className="border p-1" style={{ borderRadius: "0.75rem", background: "#13273F", borderColor: "rgba(255,255,255,0.14)", paddingTop: "calc(0.25rem + 1px)", paddingBottom: "calc(0.25rem + 1px)" }}>
                              <div className="text-[8px] mb-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>Ссылка для подключения</div>
                              <div className="flex items-center gap-0.5">
                                <input type="text" readOnly value={connectionLink} className="flex-1 px-1 py-0.5 text-[7px] bg-transparent border" style={{ borderRadius: "0.75rem", color: "#FFFFFF", borderColor: "rgba(255,255,255,0.12)" }} />
                                <button onClick={handleCopyLink} className="p-0.5 border transition-all duration-200 flex items-center justify-center" style={{ borderRadius: "0.75rem", color: copied ? "#10B981" : "#FFFFFF", background: copied ? "rgba(16, 185, 129, 0.1)" : "#13273F", borderColor: copied ? "rgba(16, 185, 129, 0.3)" : "rgba(255,255,255,0.14)" }} title={copied ? "Скопировано!" : "Копировать"}>
                                  {copied ? (
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                  ) : (
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                    </svg>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mini App для клиента - мобильная версия */}
                    <div className="flex-shrink-0 flex flex-col">
                      <div className="mb-2 text-center">
                        <div className="text-xs font-semibold" style={{ color: "#000000" }}>
                          Mini App для клиента
                        </div>
                      </div>
                      <div
                        className="rounded-[1.5rem] border overflow-hidden relative flex-1"
                        style={{
                          borderColor: "#000000",
                          borderWidth: "2px",
                          background: "#000000",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1) inset",
                          width: "160px",
                          minHeight: "320px",
                        }}
                      >
                        {/* iPhone 15 Pro Max Dynamic Island */}
                        <div 
                          className="absolute top-1.5 left-1/2 transform -translate-x-1/2 z-10"
                          style={{
                            width: "60px",
                            height: "18px",
                            background: "#000000",
                            borderRadius: "9px",
                          }}
                        />
                        <div className="p-1" style={{ paddingTop: "1.25rem", background: "#FFFFFF", minHeight: "100%", fontSize: "0.5rem" }}>
                          {/* Встроенные кнопки Telegram */}
                          <div className="mt-1 mb-2 flex items-center justify-between">
                            <button
                              className="inline-flex items-center gap-0.5 px-1 py-0.5 text-[7px] font-medium transition-all duration-200"
                              style={{
                                borderRadius: "1rem",
                                background: "rgba(0, 0, 0, 0.06)",
                                color: "rgba(0, 0, 0, 0.6)",
                              }}
                            >
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                            <button
                              className="inline-flex items-center gap-0.5 px-1 py-0.5 text-[7px] font-medium transition-all duration-200"
                              style={{
                                borderRadius: "1rem",
                                background: "rgba(0, 0, 0, 0.06)",
                                color: "rgba(0, 0, 0, 0.6)",
                              }}
                            >
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="19" cy="12" r="1"></circle>
                                <circle cx="5" cy="12" r="1"></circle>
                              </svg>
                            </button>
                          </div>

                          <div className="space-y-1.5">
                            {/* Профиль */}
                            <div className="border px-0.5 py-1" style={{ borderRadius: "0.75rem", borderColor: "rgba(255, 255, 255, 0.2)", background: "#000000" }}>
                              <div className="grid grid-cols-3 items-center mb-1.5 gap-0.5">
                                <div className="flex flex-col items-center">
                                  <div className="text-[8px] font-semibold" style={{ color: "#FFFFFF" }}>2</div>
                                  <div className="text-[7px]" style={{ color: "rgba(255, 255, 255, 0.7)" }}>запланировано</div>
                                </div>
                                <div className="h-5 w-5 rounded-full border mx-auto" style={{ borderColor: "rgba(255, 255, 255, 0.3)", background: "rgba(255, 255, 255, 0.1)" }} />
                                <div className="flex flex-col items-center">
                                  <div className="text-[8px] font-semibold" style={{ color: "#FFFFFF" }}>12</div>
                                  <div className="text-[7px]" style={{ color: "rgba(255, 255, 255, 0.7)" }}>проведено</div>
                                </div>
                              </div>
                              <div className="text-[8px] font-semibold text-center mb-1" style={{ color: "#FFFFFF" }}>Имя клиента</div>
                              <div className="text-[7px] text-center mb-1.5" style={{ color: "rgba(255, 255, 255, 0.7)" }}>Клиент • Активен с января 2024</div>
                              <div className="flex gap-0.5">
                                <button className="flex-1 rounded border py-0.5 px-0.5 text-[7px] font-medium" style={{ borderRadius: "0.75rem", borderColor: "#FFFFFF", background: "#000000" }}>
                                  <span style={{ color: "#FFFFFF" }}>Анкета</span>
                                </button>
                                <button className="flex-1 rounded border py-0.5 px-0.5 text-[7px] font-medium" style={{ borderRadius: "0.75rem", borderColor: "#FFFFFF", background: "#000000" }}>
                                  <span style={{ color: "#FFFFFF" }}>Оплата</span>
                                </button>
                              </div>
                            </div>

                            {/* Карточки выбора */}
                            <div className="border p-0.5" style={{ borderRadius: "0.75rem", borderColor: "rgba(58, 65, 50, 0.3)", paddingTop: "calc(0.125rem + 1px)", paddingBottom: "calc(0.125rem + 1px)" }}>
                              <div className="text-[8px] font-semibold mb-0.5" style={{ color: PALETTE.text }}>С чего начнём?</div>
                              <div className="text-[7px] mb-1" style={{ color: PALETTE.muted }}>Выберите способ</div>
                              <div className="grid grid-cols-2 gap-0.5">
                                <button className="border p-0.5 relative overflow-hidden transition-all duration-200 hover:opacity-90 h-full" style={{ borderRadius: "0.75rem", borderWidth: "0.5px", borderColor: "#13273F", background: "#FFFFFF", minHeight: "2.5rem", paddingTop: "calc(0.125rem + 1px)" }}>
                                  <div className="flex flex-col items-start justify-between h-full min-h-[30px]">
                                    <div className="flex items-center justify-between w-full mb-auto">
                                      <div className="text-[7px] font-semibold text-left" style={{ color: "#13273F" }}>
                                        Выбрать услугу
                                      </div>
                                       <div
                                         className="h-2.5 w-2.5 rounded-full border flex items-center justify-center shrink-0"
                                         style={{
                                           borderColor: "#13273F",
                                           background: "#13273F",
                                         }}
                                       >
                                         <span className="text-[8px]" style={{ color: "rgb(255, 255, 255)" }}>→</span>
                                       </div>
                                     </div>
                                   </div>
                                 </button>
                                <button className="border p-0.5 relative overflow-hidden transition-all duration-200 hover:opacity-90 h-full" style={{ borderRadius: "0.75rem", borderWidth: "0.5px", borderColor: "#13273F", background: "#FFFFFF", minHeight: "2.5rem", paddingTop: "calc(0.125rem + 1px)" }}>
                                  <div className="flex flex-col items-start justify-between h-full min-h-[30px]">
                                    <div className="flex items-center justify-between w-full mb-auto">
                                      <div className="text-[7px] font-semibold text-left" style={{ color: "#13273F" }}>
                                        Выбрать эксперта
                                      </div>
                                       <div
                                         className="h-2.5 w-2.5 rounded-full border flex items-center justify-center shrink-0"
                                         style={{
                                           borderColor: "#13273F",
                                           background: "#13273F",
                                         }}
                                       >
                                         <span className="text-[8px]" style={{ color: "rgb(255, 255, 255)" }}>→</span>
                                       </div>
                                     </div>
                                   </div>
                                 </button>
                              </div>
                            </div>

                            {/* Встреча */}
                            <div className="border p-1" style={{ borderRadius: "0.75rem", borderColor: "rgba(58, 65, 50, 0.3)" }}>
                              <div className="mb-1">
                                <div className="text-[8px] font-semibold" style={{ color: PALETTE.text }}>Запланированные</div>
                                <div className="text-[7px]" style={{ color: PALETTE.muted }}>Ваши встречи</div>
                              </div>
                              <div className="h-px mb-1" style={{ background: "rgba(0, 0, 0, 0.1)" }}></div>
                              <div className="flex items-start justify-between gap-0.5 mb-0.5">
                                <div className="flex-1">
                                  <div className="text-[8px] font-semibold mb-0.5" style={{ color: "rgb(0, 0, 0)" }}>15 ноя, 14:00</div>
                                  <div className="text-[7px] mb-0.5" style={{ color: "rgba(0, 0, 0, 0.7)" }}>Консультация</div>
                                  <div className="inline-block px-1 py-0.5 rounded text-[7px]" style={{ background: "rgba(128, 128, 128, 0.1)", color: "rgba(0, 0, 0, 0.8)" }}>Эксперт - Алина</div>
                                </div>
                                <div className="h-5 w-5 rounded-full border shrink-0" style={{ borderColor: "rgba(0, 0, 0, 0.1)", background: "rgba(139, 115, 85, 0.15)" }} />
                              </div>
                              <div className="flex flex-col gap-0.5 mb-0.5">
                                <div className="flex gap-0.5">
                                  <button className="flex-1 border py-0.5 px-0.5 text-[7px] font-medium" style={{ borderRadius: "1rem", borderColor: "rgba(0, 0, 0, 0.2)", background: "rgba(255, 255, 255, 0.5)", color: "rgba(0, 0, 0, 0.8)" }}>Перенести</button>
                                  <button className="flex-1 border py-0.5 px-0.5 text-[7px] font-medium" style={{ borderRadius: "1rem", borderColor: "rgba(0, 0, 0, 0.2)", background: "rgba(255, 255, 255, 0.5)", color: "rgba(0, 0, 0, 0.8)" }}>Отменить</button>
                                </div>
                                <button className="w-full border py-0.5 px-0.5 text-[7px] font-medium" style={{ borderRadius: "1rem", borderColor: "rgba(0, 0, 0, 0.2)", background: "rgba(255, 255, 255, 0.5)", color: "rgba(0, 0, 0, 0.8)" }}>Написать преподавателю</button>
                              </div>
                              <div className="flex items-center gap-0.5">
                                <input type="text" readOnly value="https://meet.example.com/abc123" className="flex-1 px-1 py-0.5 text-[7px]" style={{ borderRadius: "1rem", color: "rgba(0, 0, 0, 0.8)", border: "1px solid rgba(0, 0, 0, 0.2)", background: "rgba(255, 255, 255, 0.5)", outline: "none" }} />
                                <button className="p-0.5 transition-all duration-200 flex items-center justify-center" style={{ borderRadius: "1rem", color: "rgba(0, 0, 0, 0.8)", background: "rgba(255, 255, 255, 0.5)", border: "1px solid rgba(0, 0, 0, 0.2)", outline: "none" }} title="Копировать">
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                  </svg>
                                </button>
                              </div>
                            </div>

                            {/* Прошедшие встречи */}
                            <div className="border p-1" style={{ borderRadius: "0.75rem", borderColor: "rgba(58, 65, 50, 0.3)" }}>
                              <div className="mb-1">
                                <div className="text-[8px] font-semibold" style={{ color: PALETTE.text }}>Прошедшие встречи</div>
                                <div className="text-[7px]" style={{ color: PALETTE.muted }}>История встреч</div>
                              </div>
                              <div className="h-px mb-1" style={{ background: "rgba(0, 0, 0, 0.1)" }}></div>
                              <div className="space-y-0.5">
                                <div className="border" style={{ borderRadius: "0.75rem", borderColor: "rgba(255, 255, 255, 0.2)", background: "rgba(255, 255, 255, 0.95)" }}>
                                  <div className="p-0.5">
                                    <div className="flex items-start justify-between gap-0.5">
                                      <div className="flex-1">
                                        <div className="text-[8px] font-semibold mb-0.5" style={{ color: "rgb(0, 0, 0)" }}>5 окт, 11:30</div>
                                        <div className="text-[7px] mb-0.5" style={{ color: "rgba(0, 0, 0, 0.7)" }}>Консультация</div>
                                        <div className="inline-block px-1 py-0.5 rounded text-[7px]" style={{ background: "rgba(128, 128, 128, 0.1)", color: "rgba(0, 0, 0, 0.8)" }}>Эксперт - Алина</div>
                                      </div>
                                      <div className="h-5 w-5 rounded-full border shrink-0" style={{ borderColor: "rgba(0, 0, 0, 0.1)", background: "rgba(139, 115, 85, 0.15)" }} />
                                    </div>
                                  </div>
                                </div>
                                <div className="h-px" style={{ background: "rgba(0, 0, 0, 0.1)" }}></div>
                                <div className="border" style={{ borderRadius: "0.75rem", borderColor: "rgba(255, 255, 255, 0.2)", background: "rgba(255, 255, 255, 0.95)" }}>
                                  <div className="p-0.5">
                                    <div className="flex items-start justify-between gap-0.5">
                                      <div className="flex-1">
                                        <div className="text-[8px] font-semibold mb-0.5" style={{ color: "rgb(0, 0, 0)" }}>4 окт, 21:00</div>
                                        <div className="text-[7px] mb-0.5" style={{ color: "rgba(0, 0, 0, 0.7)" }}>Консультация</div>
                                        <div className="inline-block px-1 py-0.5 rounded text-[7px]" style={{ background: "rgba(128, 128, 128, 0.1)", color: "rgba(0, 0, 0, 0.8)" }}>Эксперт - Алина</div>
                                      </div>
                                      <div className="h-5 w-5 rounded-full border shrink-0" style={{ borderColor: "rgba(0, 0, 0, 0.1)", background: "rgba(139, 115, 85, 0.15)" }} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pains */}
                <div className="mt-10 lg:mt-14">
                  <SectionTitle kicker="Проблемы" title="Знакомо?" desc="Типичные ситуации, которые съедают время и деньги." />
                  <div className="mt-7 flex flex-col gap-4">
                    {pains.map((p, index) => {
                      const isFromRight = index % 2 === 0; // Четные индексы (0, 2) - из правой, нечетные (1, 3) - из левой
                      const accentColor = "rgba(255, 255, 255, 0.5)";
                      const highlightColor = "#1e40af"; // темно-синий цвет
                      
                      // Ключевые слова для выделения
                      const highlightWords = [
                        ["Долгие переписки", "записи сразу", "десяток сообщений"],
                        ["Переносы", "отмены", "пустые слоты", "за час до сессии", "деньги не получены"],
                        ["Оплата", "отдельный квест", "вручную"],
                        ["Файлы", "обратная связь", "теряются", "сложно найти", "систематизировать"],
                      ];
                      
                      const highlightText = (text, words) => {
                        if (!text || !words || !Array.isArray(words)) return text;
                        let result = text;
                        words.forEach(word => {
                          if (!word) return;
                          try {
                            // Escape special regex characters
                            const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                            const regex = new RegExp(`(${escapedWord})`, 'gi');
                            result = result.replace(regex, (match) => 
                              `<strong style="font-weight: 700; color: ${highlightColor};">${match}</strong>`
                            );
                          } catch (e) {
                            console.error("Error highlighting text:", e);
                          }
                        });
                        return result;
                      };
                      
                      return (
                        <motion.div
                          key={p.title}
                          initial={{ 
                            opacity: 0, 
                            x: isFromRight ? 50 : -50 
                          }}
                          whileInView={{ 
                            opacity: 1, 
                            x: 0 
                          }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ 
                            duration: 0.6, 
                            delay: index * 0.1,
                            ease: "easeOut"
                          }}
                        >
                          <div className="relative rounded-3xl border p-5 md:p-7 transition-all hover:shadow-md"
                            style={{
                              borderColor: "rgba(19, 39, 63, 0.15)",
                              background: accentColor,
                            }}
                          >
                            <div>
                              <h3 
                                className="text-base md:text-lg font-semibold mb-2" 
                                style={{ color: PALETTE.text }}
                              >
                                {p.title}
                              </h3>
                              <p 
                                className="text-sm leading-relaxed" 
                                style={{ color: PALETTE.muted }}
                                dangerouslySetInnerHTML={{ __html: highlightText(p.desc, highlightWords[index] || []) }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Правая колонка - айфоны */}
            <div className="lg:col-span-6 hidden lg:block">
            <div className="lg:sticky lg:top-6">
              <motion.div variants={itemV}>
                <div
                  className={cn(
                    "relative",
                    "p-0 md:p-1"
                  )}
                  style={{
                    background: "transparent",
                    width: "100%",
                    overflow: "visible",
                    minWidth: "500px",
                  }}
                >
                  {/* Hero mock */}
                  <div 
                    className="flex flex-row items-start justify-between"
                    style={{ 
                      display: "flex !important",
                      flexDirection: "row !important",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      width: "100%",
                      overflow: "visible",
                      flexWrap: "nowrap !important",
                      gap: "10px",
                    }}
                  >
                    {/* Mini App для психолога */}
                    <div style={{ flex: "1", minWidth: 0, maxWidth: "50%" }}>
                      <div className="mb-4 text-center">
                        <div className="text-base md:text-lg font-semibold" style={{ color: "#000000" }}>
                          Mini App для психолога
                        </div>
                      </div>
                      <div
                        className="rounded-[2rem] border overflow-hidden relative"
                      style={{
                        borderColor: "#000000",
                        borderWidth: "3px",
                        background: "#000000",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1) inset",
                        width: "100%",
                        maxWidth: "240px",
                        minHeight: "500px",
                        margin: "0 auto",
                      }}
                      >
                        {/* iPhone 15 Pro Max Dynamic Island */}
                        <div 
                          className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10"
                          style={{
                            width: "90px",
                            height: "26px",
                            background: "#000000",
                            borderRadius: "13px",
                          }}
                        />
                        <div className="p-2" style={{ paddingTop: "2rem", background: "#FFFFFF", minHeight: "100%", fontSize: "0.7rem" }}>
                          {/* Встроенные кнопки Telegram */}
                          <div className="mt-2 mb-2 flex items-center justify-between">
                            <button
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium transition-all duration-200"
                              style={{
                                borderRadius: "1.5rem",
                                background: "rgba(0, 0, 0, 0.06)",
                                color: "rgba(0, 0, 0, 0.6)",
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                              Close
                            </button>
                            <button
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium transition-all duration-200"
                              style={{
                                borderRadius: "1.5rem",
                                background: "rgba(0, 0, 0, 0.06)",
                                color: "rgba(0, 0, 0, 0.6)",
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="19" cy="12" r="1"></circle>
                                <circle cx="5" cy="12" r="1"></circle>
                              </svg>
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className="h-8 w-8 rounded-xl border"
                                style={{
                                  borderColor: "rgba(0,0,0,0.16)",
                                  background:
                                    "radial-gradient(circle at 30% 30%, rgba(0,0,0,0.08), rgba(0,0,0,0.02) 60%)",
                                }}
                              />
                              <div>
                                <div className="text-xs font-semibold" style={{ color: "#000000" }}>Психолог</div>
                                <div className="text-[10px]" style={{ color: "rgba(0,0,0,0.6)" }}>
                                  запись • предоплата • напоминания
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-1.5 grid grid-cols-2 gap-1 items-start">
                            <div className="border p-2 flex flex-col h-full"
                                 style={{ borderRadius: "1.5rem", borderColor: "rgba(0,0,0,0.12)", background: "#13273F" }}>
                              <div className="text-[9px] h-[0.875rem]" style={{ color: "rgba(255,255,255,0.6)" }}>
                                ближайшее окно
                              </div>
                              <div className="mt-2 text-xs font-semibold min-h-[2rem] leading-tight" style={{ color: "#FFFFFF" }}>Сегодня 18:30</div>
                              <div className="mt-1 flex flex-wrap gap-1 min-h-[1.5rem]">
                                <span className="px-1.5 py-0.5 rounded-full text-[9px] border whitespace-nowrap"
                                      style={{ borderColor: "rgba(255,255,255,0.14)", background: "#13273F", color: "rgba(255,255,255,0.7)" }}>
                                  50 мин
                                </span>
                                <span className="px-1.5 py-0.5 rounded-full text-[9px] border whitespace-nowrap"
                                      style={{ 
                                        borderColor: "rgba(255,255,255,0.14)", 
                                        background: "#13273F", 
                                        color: "rgba(255,255,255,0.7)",
                                      }}>
                                  предоплата
                                </span>
                              </div>
                            </div>

                            <div className="border p-2 flex flex-col h-full"
                                 style={{ borderRadius: "1.5rem", borderColor: "rgba(0,0,0,0.12)", background: "#13273F" }}>
                              <div className="text-[9px] h-[0.875rem]" style={{ color: "rgba(255,255,255,0.6)" }}>
                                напоминание
                              </div>
                              <div className="mt-2 text-xs font-semibold min-h-[2rem] leading-tight" style={{ color: "#FFFFFF" }}>за 2 часа</div>
                              <div className="mt-1 text-[9px] leading-relaxed min-h-[1.5rem]" style={{ color: "rgba(255,255,255,0.7)" }}>
                                Авто-уведомление клиенту и вам.
                              </div>
                            </div>
                          </div>

                          <div className="mt-1.5">
                            <button className="w-full border-2 transition-all duration-200 cursor-pointer" style={{ borderRadius: "1.5rem", background: "#FFFFFF", borderColor: "#13273F" }}>
                              <div className="relative flex items-center justify-center p-2.5">
                                <div className="text-center">
                                  <div className="text-[10px] font-medium" style={{ color: "#13273F" }}>
                                    Мои доступные слоты
                                  </div>
                                  <div className="mt-0 text-[9px]" style={{ color: "rgba(19, 39, 63, 0.6)" }}>
                                    Управление расписанием и свободными окнами
                                  </div>
                                </div>
                              </div>
                            </button>
                          </div>

                          <div className="mt-1.5 grid grid-cols-12 gap-1">
                            <button
                              className="col-span-7 relative overflow-hidden border-2 transition-all duration-200 cursor-pointer"
                              style={{
                                borderRadius: "1.5rem",
                                background: "#FFFFFF",
                                borderColor: "#13273F",
                              }}
                            >
                              <div className="relative flex aspect-[16/10] items-center justify-center p-2.5">
                                <div className="text-center">
                                  <div className="text-[10px] font-medium" style={{ color: "#13273F" }}>
                                    Статистика
                                  </div>
                                  <div className="mt-0 text-[9px]" style={{ color: "rgba(19, 39, 63, 0.6)" }}>
                                    Доходы, количество сессий, графики
                                  </div>
                                </div>
                              </div>
                            </button>
                            <button
                              className="col-span-5 relative overflow-hidden border-2 transition-all duration-200 cursor-pointer"
                              style={{
                                borderRadius: "1.5rem",
                                background: "#FFFFFF",
                                borderColor: "#13273F",
                              }}
                            >
                              <div className="relative flex aspect-[16/10] items-center justify-center p-2.5">
                                <div className="text-center">
                                  <div className="text-[10px] font-medium" style={{ color: "#13273F" }}>
                                    История
                                  </div>
                                  <div className="mt-0 text-[9px]" style={{ color: "rgba(19, 39, 63, 0.6)" }}>
                                    Архив сессий и записей
                                  </div>
                                </div>
                              </div>
                            </button>
                          </div>

                          <div className="mt-1.5">
                            <button
                              className="w-full relative overflow-hidden border-2 transition-all duration-200 cursor-pointer"
                              style={{
                                borderRadius: "1.5rem",
                                background: "#FFFFFF",
                                borderColor: "#13273F",
                              }}
                            >
                              <div className="relative flex items-center justify-center p-2.5">
                                <div className="text-center">
                                  <div className="text-[10px] font-medium" style={{ color: "#13273F" }}>
                                    Справочник
                                  </div>
                                  <div className="mt-0 text-[9px]" style={{ color: "rgba(19, 39, 63, 0.6)" }}>
                                    Список всех клиентов специалиста
                                  </div>
                                </div>
                              </div>
                            </button>
                          </div>

                          <div className="mt-1.5 flex flex-col gap-1" style={{ perspective: "1000px" }}>
                                {/* Карточка консультации 1 */}
                                <div style={{ position: "relative", width: "100%", height: "auto" }}>
                                  <motion.div 
                                    className="border"
                                    style={{
                                      borderRadius: "1rem",
                                      transformStyle: "preserve-3d",
                                      position: "relative",
                                      width: "100%",
                                    }}
                                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                  >
                                    {/* Лицевая сторона */}
                                    <div 
                                      className="border p-2"
                                      style={{
                                        borderRadius: "1rem",
                                        background: "#13273F",
                                        borderColor: "rgba(255,255,255,0.3)",
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(0deg)",
                                        WebkitBackfaceVisibility: "hidden",
                                      }}
                                    >
                                      <div className="flex items-center justify-between mb-1.5">
                                        <div className="text-[9px] font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
                                          15 января, вт в 14:00 МСК
                                        </div>
                                        <div className="text-[9px] px-1 py-0.5" style={{ 
                                          borderRadius: "0.375rem",
                                          background: "rgba(16, 185, 129, 0.2)",
                                          color: "#10B981"
                                        }}>
                                          Оплачено
                                        </div>
                                      </div>
                                      <div className="flex flex-col items-center text-center mb-2">
                                        <div
                                          className="h-10 w-10 rounded-full border mb-1.5 shrink-0"
                                          style={{
                                            borderColor: "rgba(255,255,255,0.3)",
                                            background: "rgba(255,255,255,0.1)",
                                          }}
                                          aria-label="Фото клиента"
                                        />
                                        <div className="text-xs font-semibold mb-1" style={{ color: "#FFFFFF" }}>
                                          Имя Клиента
                                        </div>
                                        <div className="text-[10px] leading-relaxed px-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                                          <span style={{ color: "rgba(255,255,255,0.6)" }}>Привет!</span> Готова к консультации. 
                                          Хочу обсудить важные вопросы.
                                        </div>
                                      </div>
                                      <div className="flex gap-1">
                                        <button
                                          className="flex-1 py-1.5 text-[10px] font-medium transition-all duration-200 border"
                                          style={{
                                            borderRadius: "0.75rem",
                                            background: "transparent",
                                            color: "#FFFFFF",
                                            borderColor: "rgba(255,255,255,0.5)",
                                          }}
                                        >
                                          История
                                        </button>
                                        <button
                                          className="flex-1 py-1.5 text-[10px] font-medium transition-all duration-200"
                                          style={{
                                            borderRadius: "0.75rem",
                                            background: "#FFFFFF",
                                            color: "#000000",
                                          }}
                                        >
                                          Связаться
                                        </button>
                                      </div>
                                    </div>
                                    {/* Обратная сторона */}
                                    <div 
                                      className="border p-2"
                                      style={{
                                        borderRadius: "1rem",
                                        background: "#13273F",
                                        borderColor: "rgba(255,255,255,0.3)",
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)",
                                        WebkitBackfaceVisibility: "hidden",
                                      }}
                                    >
                                      <div className="text-xs font-semibold mb-2" style={{ color: "#FFFFFF" }}>
                                        История консультаций
                                      </div>
                                      <div className="mb-2 pb-1.5 border-b flex items-center gap-1.5 flex-wrap" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                                        <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>
                                          Осталось:
                                        </div>
                                        <div className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                                          3
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <div className="flex items-center justify-between py-1.5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                                          <div>
                                            <div className="text-[10px] font-medium" style={{ color: "#FFFFFF" }}>
                                              10 января, пт в 14:00 МСК
                                            </div>
                                            <div className="text-[9px] mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>
                                              Консультация
                                            </div>
                                          </div>
                                          <div className="text-[9px] px-1.5 py-0.5" style={{ 
                                            borderRadius: "0.75rem",
                                            background: "rgba(16, 185, 129, 0.2)",
                                            color: "#10B981"
                                          }}>
                                            Оплачено
                                          </div>
                                        </div>
                                        <div className="flex items-center justify-between py-1.5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                                          <div>
                                            <div className="text-[10px] font-medium" style={{ color: "#FFFFFF" }}>
                                              5 января, вс в 10:00 МСК
                                            </div>
                                            <div className="text-[9px] mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>
                                              Консультация
                                            </div>
                                          </div>
                                          <div className="text-[9px] px-1.5 py-0.5" style={{ 
                                            borderRadius: "0.75rem",
                                            background: "rgba(16, 185, 129, 0.2)",
                                            color: "#10B981"
                                          }}>
                                            Оплачено
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                </div>
                                {/* Карточка консультации 2 */}
                                <div className="border p-2"
                                     style={{
                                       borderRadius: "1rem",
                                       background: "#13273F",
                                       borderColor: "rgba(255,255,255,0.3)",
                                     }}>
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="text-[9px] font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
                                      16 января, ср в 10:30 МСК
                                    </div>
                                    <div className="text-[9px] px-1.5 py-0.5" style={{ 
                                      borderRadius: "0.75rem",
                                      background: "rgba(239, 68, 68, 0.2)",
                                      color: "#EF4444"
                                    }}>
                                      Не оплачено
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-center text-center mb-2">
                                    <div
                                      className="h-10 w-10 rounded-full border mb-1.5 shrink-0"
                                      style={{
                                        borderColor: "rgba(255,255,255,0.3)",
                                        background: "rgba(255,255,255,0.1)",
                                      }}
                                      aria-label="Фото клиента"
                                    />
                                    <div className="text-xs font-semibold mb-1" style={{ color: "#FFFFFF" }}>
                                      Имя Клиента
                                    </div>
                                    <div className="text-[10px] leading-relaxed px-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                                      <span style={{ color: "rgba(255,255,255,0.6)" }}>Здравствуйте!</span> Нужна повторная 
                                      консультация по предыдущей теме.
                                    </div>
                                  </div>
                                  <div className="flex gap-1">
                                    <button
                                      className="flex-1 py-1.5 text-[10px] font-medium transition-all duration-200 border"
                                      style={{
                                        borderRadius: "0.75rem",
                                        background: "transparent",
                                        color: "#FFFFFF",
                                        borderColor: "rgba(255,255,255,0.5)",
                                      }}
                                    >
                                      История
                                    </button>
                                    <button
                                      className="flex-1 py-1.5 text-[10px] font-medium transition-all duration-200"
                                      style={{
                                        borderRadius: "0.75rem",
                                        background: "#FFFFFF",
                                        color: "#000000",
                                      }}
                                    >
                                      Связаться
                                    </button>
                                  </div>
                                </div>
                          </div>

                          <div className="mt-2">
                            <div className="border p-2"
                                 style={{
                                   borderRadius: "1rem",
                                   background: "#13273F",
                                   borderColor: "rgba(255,255,255,0.14)",
                                 }}>
                              <div className="text-[10px] mb-1.5" style={{ color: "rgba(255,255,255,0.6)" }}>
                                Ссылка для подключения
                              </div>
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="text"
                                  readOnly
                                  value={connectionLink}
                                  className="flex-1 px-2 py-1.5 text-[10px] bg-transparent border"
                                  style={{
                                    borderRadius: "1rem",
                                    color: "#FFFFFF",
                                    borderColor: "rgba(255,255,255,0.12)",
                                  }}
                                />
                                <button
                                  onClick={handleCopyLink}
                                  className="p-1.5 border transition-all duration-200 flex items-center justify-center"
                                  style={{
                                    borderRadius: "1rem",
                                    color: copied ? "#10B981" : "#FFFFFF",
                                    background: copied ? "rgba(16, 185, 129, 0.1)" : "#13273F",
                                    borderColor: copied ? "rgba(16, 185, 129, 0.3)" : "rgba(255,255,255,0.14)",
                                  }}
                                  title={copied ? "Скопировано!" : "Копировать"}
                                >
                                  {copied ? (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                  ) : (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                    </svg>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Mini App для клиента */}
                    <div style={{ flex: "1", minWidth: 0, maxWidth: "50%" }}>
                      <div className="mb-4 text-center">
                      <div className="text-base md:text-lg font-semibold" style={{ color: "#000000" }}>
                        Mini App для клиента
                      </div>
                    </div>
                  <div
                    className="rounded-[2rem] border overflow-hidden relative"
                      style={{
                        borderColor: "#000000",
                        borderWidth: "3px",
                        background: "#000000",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1) inset",
                        width: "100%",
                        maxWidth: "240px",
                        minHeight: "500px",
                        margin: "0 auto",
                      }}
                  >
                    {/* iPhone 15 Pro Max Dynamic Island */}
                    <div 
                      className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10"
                      style={{
                        width: "90px",
                        height: "26px",
                        background: "#000000",
                        borderRadius: "13px",
                      }}
                    />
                    <div className="p-2" style={{ paddingTop: "2rem", background: "#FFFFFF", minHeight: "100%", fontSize: "0.7rem" }}>
                      {/* Встроенные кнопки Telegram */}
                      <div className="mt-2 mb-2 flex items-center justify-between">
                        <button
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium transition-all duration-200"
                          style={{
                            borderRadius: "1rem",
                            background: "rgba(0, 0, 0, 0.06)",
                            color: "rgba(0, 0, 0, 0.6)",
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          Close
                        </button>
                        <button
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium transition-all duration-200"
                          style={{
                            borderRadius: "1rem",
                            background: "rgba(0, 0, 0, 0.06)",
                            color: "rgba(0, 0, 0, 0.6)",
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                          </svg>
                        </button>
                      </div>

                      {/* Main content */}
                      <div className="space-y-2">
                        {/* Верхняя часть - Приветствие */}
                        <div className="border p-2 relative"
                             style={{
                               borderRadius: "1.5rem",
                               borderColor: "rgba(255, 255, 255, 0.2)",
                               background: "#000000",
                             }}>
                          {/* Профиль */}
                          <div className="flex flex-col items-center">
                            {/* Статистика и аватар */}
                            <div className="grid grid-cols-3 items-center mb-2 w-full gap-1">
                              {/* Слева - запланировано */}
                              <div className="flex flex-col items-center">
                                <div className="text-xs font-semibold" style={{ color: "#FFFFFF" }}>2</div>
                                <div className="text-[9px]" style={{ color: "rgba(255, 255, 255, 0.7)" }}>запланировано</div>
                              </div>

                              {/* Аватар по центру */}
                              <div className="flex items-center justify-center">
                                <div
                                  className="h-8 w-8 rounded-full border"
                                  aria-label="Фото профиля"
                                  style={{
                                    borderColor: "rgba(255, 255, 255, 0.3)",
                                    background: "rgba(255, 255, 255, 0.1)",
                                  }}
                                />
                              </div>

                              {/* Справа - проведено */}
                              <div className="flex flex-col items-center">
                                <div className="text-xs font-semibold" style={{ color: "#FFFFFF" }}>12</div>
                                <div className="text-[9px]" style={{ color: "rgba(255, 255, 255, 0.7)" }}>проведено</div>
                              </div>
                            </div>

                            {/* Имя */}
                            <div className="flex items-center gap-1 mb-1">
                              <div className="text-xs font-semibold" style={{ color: "#FFFFFF" }}>
                                Имя клиента
                              </div>
                            </div>

                            {/* Описание */}
                            <div className="text-[10px] text-center mb-2" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                              Клиент • Активен с января 2024
                            </div>

                            {/* Кнопки */}
                            <div className="flex gap-1.5 w-full">
                              <button
                                className="flex-1 rounded-lg border py-1.5 px-2 flex items-center justify-center transition-all duration-200 hover:opacity-90"
                                style={{
                                  borderRadius: "0.75rem",
                                  borderColor: "#FFFFFF",
                                  background: "#000000",
                                }}
                              >
                                <span className="text-[10px] font-medium" style={{ color: "#FFFFFF" }}>Моя анкета</span>
                              </button>
                              <button
                                className="flex-1 rounded-lg border py-1.5 px-2 flex items-center justify-center transition-all duration-200 hover:opacity-90"
                                style={{
                                  borderRadius: "0.75rem",
                                  borderColor: "#FFFFFF",
                                  background: "#000000",
                                }}
                              >
                                <span className="text-[10px] font-medium" style={{ color: "#FFFFFF" }}>Оплата</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Средняя часть - Карточки выбора */}
                        <div className="border p-2"
                             style={{
                               borderRadius: "1.5rem",
                               borderColor: "rgba(58, 65, 50, 0.3)",
                             }}>
                          <div className="text-[10px] font-semibold mb-1" style={{ color: PALETTE.text }}>
                            С чего начнём?
                          </div>
                          <div className="text-[9px] mb-2" style={{ color: PALETTE.muted }}>
                            Выберите удобный для вас способ
                          </div>
                          
                          <div className="grid grid-cols-2 gap-1.5">
                            <button
                              className="border-2 p-2 relative overflow-hidden transition-all duration-200 hover:opacity-90 h-full"
                              style={{
                                borderRadius: "1.25rem",
                                borderWidth: "0.5px",
                                borderColor: "#13273F",
                                background: "#FFFFFF",
                                minHeight: "60px",
                              }}
                            >
                              <div className="flex flex-col items-start justify-between h-full min-h-[50px]">
                                <div className="flex items-center justify-between w-full mb-auto">
                                  <div className="text-[9px] font-semibold text-left" style={{ color: "#13273F" }}>
                                    Выбрать услугу
                                  </div>
                                  <div
                                    className="h-4 w-4 rounded-full border flex items-center justify-center shrink-0"
                                    style={{
                                      borderColor: "#13273F",
                                      background: "#13273F",
                                    }}
                                  >
                                    <span className="text-[10px]" style={{ color: "rgb(255, 255, 255)" }}>→</span>
                                  </div>
                                </div>
                              </div>
                            </button>

                            <button
                              className="border-2 p-2 relative overflow-hidden transition-all duration-200 hover:opacity-90 h-full"
                              style={{
                                borderRadius: "1.25rem",
                                borderWidth: "0.5px",
                                borderColor: "#13273F",
                                background: "#FFFFFF",
                                minHeight: "60px",
                              }}
                            >
                              <div className="flex flex-col items-start justify-between h-full min-h-[50px]">
                                <div className="flex items-center justify-between w-full mb-auto">
                                  <div className="text-[9px] font-semibold text-left" style={{ color: "#13273F" }}>
                                    Выбрать эксперта
                                  </div>
                                  <div
                                    className="h-4 w-4 rounded-full border flex items-center justify-center shrink-0"
                                    style={{
                                      borderColor: "#13273F",
                                      background: "#13273F",
                                    }}
                                  >
                                    <span className="text-[10px]" style={{ color: "rgb(255, 255, 255)" }}>→</span>
                                  </div>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>

                        {/* Нижняя часть - Запланированные встречи */}
                        <div className="border p-2"
                             style={{
                               borderRadius: "1.5rem",
                               borderColor: "rgba(58, 65, 50, 0.3)",
                             }}>
                          <div className="mb-1.5">
                            <div className="text-[10px] font-semibold" style={{ color: PALETTE.text }}>
                              Запланированные встречи
                            </div>
                            <div className="text-[9px]" style={{ color: PALETTE.muted }}>
                              Ваши предстоящие встречи
                            </div>
                          </div>
                          {/* Разделительная линия */}
                          <div className="h-px mb-2" style={{ background: "rgba(0, 0, 0, 0.1)" }}></div>
                          <div className="space-y-2">
                            {/* Карточка встречи 1 */}
                            <div className="rounded-lg border"
                                 style={{
                                   borderColor: "rgba(255, 255, 255, 0.2)",
                                   background: "rgba(255, 255, 255, 0.95)",
                                 }}>
                              <div className="flex items-start justify-between gap-1.5 mb-1.5">
                                <div className="flex-1">
                                  <div className="text-[10px] font-semibold mb-0.5" style={{ color: "rgb(0, 0, 0)" }}>
                                    15 ноября в 14:00
                                  </div>
                                  <div className="text-[9px] mb-1" style={{ color: "rgba(0, 0, 0, 0.7)" }}>
                                    Консультация • Работа с тревогой
                                  </div>
                                  <div className="inline-block px-1.5 py-0.5 rounded text-[9px]"
                                       style={{
                                         background: "rgba(128, 128, 128, 0.1)",
                                         color: "rgba(0, 0, 0, 0.8)",
                                       }}>
                                    Эксперт - Алина Игнатова
                                  </div>
                                </div>
                                <div
                                  className="h-8 w-8 rounded-full border shrink-0"
                                  aria-label="Фото эксперта"
                                  style={{
                                    borderColor: "rgba(0, 0, 0, 0.1)",
                                    background: "rgba(139, 115, 85, 0.15)",
                                  }}
                                />
                              </div>
                              <div className="flex flex-col gap-1 mb-1.5">
                                <div className="flex gap-1">
                                  <button
                                    className="flex-1 border py-1 px-1.5 text-[9px] font-medium transition-all duration-200 hover:opacity-90"
                                    style={{
                                      borderRadius: "1rem",
                                      borderColor: "rgba(0, 0, 0, 0.2)",
                                      background: "rgba(255, 255, 255, 0.5)",
                                      color: "rgba(0, 0, 0, 0.8)",
                                    }}
                                  >
                                    Перенести
                                  </button>
                                  <button
                                    className="flex-1 border py-1 px-1.5 text-[9px] font-medium transition-all duration-200 hover:opacity-90"
                                    style={{
                                      borderRadius: "1rem",
                                      borderColor: "rgba(0, 0, 0, 0.2)",
                                      background: "rgba(255, 255, 255, 0.5)",
                                      color: "rgba(0, 0, 0, 0.8)",
                                    }}
                                  >
                                    Отменить
                                  </button>
                                </div>
                                <button
                                  className="w-full border py-1 px-1.5 text-[9px] font-medium transition-all duration-200 hover:opacity-90"
                                  style={{
                                    borderRadius: "1rem",
                                    borderColor: "rgba(0, 0, 0, 0.2)",
                                    background: "rgba(255, 255, 255, 0.5)",
                                    color: "rgba(0, 0, 0, 0.8)",
                                  }}
                                >
                                  Написать преподавателю
                                </button>
                              </div>
                              <div className="flex items-center gap-1">
                                <input
                                  type="text"
                                  readOnly
                                  value="https://meet.example.com/abc123"
                                  className="flex-1 px-1.5 py-1 text-[9px]"
                                  style={{
                                    borderRadius: "0.75rem",
                                    color: "rgba(0, 0, 0, 0.8)",
                                    border: "1px solid rgba(0, 0, 0, 0.2)",
                                    background: "rgba(255, 255, 255, 0.5)",
                                    outline: "none",
                                  }}
                                />
                                <button
                                  className="p-1 transition-all duration-200 flex items-center justify-center"
                                  style={{
                                    borderRadius: "0.75rem",
                                    color: "rgba(0, 0, 0, 0.8)",
                                    background: "rgba(255, 255, 255, 0.5)",
                                    border: "1px solid rgba(0, 0, 0, 0.2)",
                                    outline: "none",
                                  }}
                                  title="Копировать"
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Секция - Прошедшие встречи */}
                        <div className="border p-2"
                             style={{
                               borderRadius: "1.5rem",
                               borderColor: "rgba(58, 65, 50, 0.3)",
                             }}>
                          <div className="mb-2">
                            <div className="text-[10px] font-semibold" style={{ color: PALETTE.text }}>
                              Прошедшие встречи
                            </div>
                            <div className="text-[9px]" style={{ color: PALETTE.muted }}>
                              История ваших встреч
                            </div>
                          </div>
                          {/* Разделительная линия */}
                          <div className="h-px mb-2" style={{ background: "rgba(0, 0, 0, 0.1)" }}></div>
                          
                          <div className="space-y-2">
                            {/* Карточка встречи 1 */}
                            <div className="rounded-lg border"
                                 style={{
                                   borderColor: "rgba(255, 255, 255, 0.2)",
                                   background: "rgba(255, 255, 255, 0.95)",
                                 }}>
                              <div className="flex items-start justify-between gap-1.5">
                                <div className="flex-1">
                                  <div className="text-[10px] font-semibold mb-0.5" style={{ color: "rgb(0, 0, 0)" }}>
                                    5 октября в 11:30
                                  </div>
                                  <div className="text-[9px] mb-1" style={{ color: "rgba(0, 0, 0, 0.7)" }}>
                                    Консультация • Знакомство
                                  </div>
                                  <div className="inline-block px-1.5 py-0.5 rounded text-[9px]"
                                       style={{
                                         background: "rgba(128, 128, 128, 0.1)",
                                         color: "rgba(0, 0, 0, 0.8)",
                                       }}>
                                    Эксперт - Алина Игнатова
                                  </div>
                                </div>
                                <div
                                  className="h-8 w-8 rounded-full border shrink-0"
                                  aria-label="Фото эксперта"
                                  style={{
                                    borderColor: "rgba(0, 0, 0, 0.1)",
                                    background: "rgba(139, 115, 85, 0.15)",
                                  }}
                                />
                              </div>
                            </div>

                            {/* Разделитель */}
                            <div className="h-px" style={{ background: "rgba(0, 0, 0, 0.1)" }}></div>

                            {/* Карточка встречи 2 */}
                            <div className="rounded-lg border"
                                 style={{
                                   borderColor: "rgba(255, 255, 255, 0.2)",
                                   background: "rgba(255, 255, 255, 0.95)",
                                 }}>
                              <div className="flex items-start justify-between gap-1.5">
                                <div className="flex-1">
                                  <div className="text-[10px] font-semibold mb-0.5" style={{ color: "rgb(0, 0, 0)" }}>
                                    4 октября в 21:00
                                  </div>
                                  <div className="text-[9px] mb-1" style={{ color: "rgba(0, 0, 0, 0.7)" }}>
                                    Консультация • Знакомство
                                  </div>
                                  <div className="inline-block px-1.5 py-0.5 rounded text-[9px]"
                                       style={{
                                         background: "rgba(128, 128, 128, 0.1)",
                                         color: "rgba(0, 0, 0, 0.8)",
                                       }}>
                                    Эксперт - Алина Игнатова
                                  </div>
                                </div>
                                <div
                                  className="h-8 w-8 rounded-full border shrink-0"
                                  aria-label="Фото эксперта"
                                  style={{
                                    borderColor: "rgba(0, 0, 0, 0.1)",
                                    background: "rgba(139, 115, 85, 0.15)",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Sub-hero line */}
        <div className="mt-14 md:mt-20 mx-auto max-w-7xl">
              <GlassCard className="p-5 md:p-7">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="max-w-3xl">
                  <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>
                    Сессии под контролем: запись, оплата, напоминания в ТГ или Max
                  </div>
                  <div className="mt-2 text-sm md:text-base" style={{ color: PALETTE.muted }}>
                    Мини-приложение для психолога: клиенты сами выбирают время, вносят предоплату и получают напоминания.
                  </div>
                  </div>
                  <PrimaryButton onClick={() => scrollToId("cta")}>Протестировать 14 дней</PrimaryButton>
                </div>
              </GlassCard>
          </div>

          {/* Solution */}
          <section className="mx-auto max-w-7xl pt-14 md:pt-20">
              <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5">
              <SectionTitle
                kicker="Решение"
                title="Upmini — ваш кабинет записи"
                desc="Мини-приложение в Telegram или Max, которое избавляет от длительных переписок, контролирует расписание и оплату."
              />
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "без сайта",
                  "без разработчика",
                  "предоплата",
                  "напоминания",
                  "обратная связь",
                  "история клиентов",
                ].map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="flex justify-center">
                <MiniAppScreenshot type="client" />
              </div>
            </div>
              </div>
            </section>

            {/* Features */}
            <section id="features" className="mx-auto max-w-7xl pt-14 md:pt-20">
              <SectionTitle
            kicker="Функции"
            title="Всё для записи в одном приложении"
            desc="Каждая функция — как отдельный «виджет» внутри вашего Telegram/Max."
          />
          <div className="mt-7 grid grid-cols-1 features-grid lg:grid-cols-12 gap-4 items-stretch">
            {features.map((f, idx) => {
              const isBooking = f.title === "Онлайн запись";
              const isReminders = f.title === "Напоминания";
              const isCommunication = f.title === "Коммуникация";
              const isPayment = f.title === "Оплата";
              const isArchive = f.title === "Архив сессий";
              const isFiles = f.title === "Файлы и обратная связь";
              const isLast = idx === features.length - 1;
              return (
                <div
                  key={f.title}
                  className={cn(
                    "relative overflow-hidden rounded-3xl border shadow-[0_24px_80px_rgba(0,0,0,0.45)] p-5 md:p-7 flex flex-col",
                    idx < 2 ? "lg:col-span-6" : isLast ? "lg:col-span-4" : "lg:col-span-4"
                  )}
                  style={{
                    background: isBooking 
                      ? "rgb(19, 39, 63)"
                      : isReminders
                      ? "#FFFFFF"
                      : isCommunication
                      ? "rgb(19, 39, 63)"
                      : isPayment
                      ? "#FFFFFF"
                      : isArchive
                      ? "rgb(19, 39, 63)"
                      : isFiles
                      ? "#4E0000"
                      : `linear-gradient(180deg, ${PALETTE.panel2}, ${PALETTE.panel})`,
                    borderColor: isBooking ? "rgba(19, 39, 63, 0.2)" : isReminders ? "rgba(19, 39, 63, 0.2)" : isCommunication ? "rgba(19, 39, 63, 0.2)" : isPayment ? "rgba(19, 39, 63, 0.2)" : isArchive ? "rgba(19, 39, 63, 0.2)" : isFiles ? "rgba(78, 0, 0, 0.6)" : PALETTE.stroke,
                    boxShadow: isBooking 
                      ? "rgba(19, 39, 63, 0.2) 0px 28px 90px"
                      : isReminders
                      ? "rgba(19, 39, 63, 0.2) 0px 28px 90px"
                      : isCommunication
                      ? "rgba(19, 39, 63, 0.2) 0px 28px 90px"
                      : isPayment
                      ? "rgba(19, 39, 63, 0.2) 0px 28px 90px"
                      : isArchive
                      ? "rgba(19, 39, 63, 0.2) 0px 28px 90px"
                      : isFiles
                      ? "rgba(78, 0, 0, 0.3) 0px 18px 60px"
                      : `0 28px 90px ${PALETTE.shadow}`,
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                  }}
                >
                  {/* subtle sheen */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-60"
                    style={{
                      background: isBooking
                        ? "radial-gradient(800px 400px at 30% 10%, rgba(255,255,255,0.1), transparent 60%), radial-gradient(700px 400px at 80% 30%, rgba(255,255,255,0.06), transparent 60%)"
                        : isReminders
                        ? "radial-gradient(800px 400px at 30% 10%, rgba(19, 39, 63, 0.05), transparent 60%), radial-gradient(700px 400px at 80% 30%, rgba(19, 39, 63, 0.03), transparent 60%)"
                        : isCommunication
                        ? "radial-gradient(800px 400px at 30% 10%, rgba(255,255,255,0.1), transparent 60%), radial-gradient(700px 400px at 80% 30%, rgba(255,255,255,0.06), transparent 60%)"
                        : isPayment
                        ? "radial-gradient(800px 400px at 30% 10%, rgba(19, 39, 63, 0.05), transparent 60%), radial-gradient(700px 400px at 80% 30%, rgba(19, 39, 63, 0.03), transparent 60%)"
                        : isArchive
                        ? "radial-gradient(800px 400px at 30% 10%, rgba(255,255,255,0.1), transparent 60%), radial-gradient(700px 400px at 80% 30%, rgba(255,255,255,0.06), transparent 60%)"
                        : isFiles
                        ? "radial-gradient(800px 400px at 30% 10%, rgba(255,255,255,0.1), transparent 60%), radial-gradient(700px 400px at 80% 30%, rgba(255,255,255,0.06), transparent 60%)"
                        : "radial-gradient(800px 400px at 30% 10%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(700px 400px at 80% 30%, rgba(255,255,255,0.06), transparent 60%)",
                    }}
                  />
                  {/* inner stroke */}
                  <div
                    className="pointer-events-none absolute inset-[1px] rounded-[22px]"
                    style={{
                      border: `1px solid ${isBooking ? "rgba(19, 39, 63, 0.3)" : isReminders ? "rgba(19, 39, 63, 0.3)" : isCommunication ? "rgba(19, 39, 63, 0.3)" : isPayment ? "rgba(19, 39, 63, 0.3)" : isArchive ? "rgba(19, 39, 63, 0.3)" : isFiles ? "rgba(78, 0, 0, 0.3)" : PALETTE.stroke2}`,
                      opacity: 0.5,
                    }}
                  />
                  <div className="relative">
                    <div>
                      <h3 className="text-base md:text-lg font-semibold" style={isBooking || isCommunication || isArchive || isFiles ? { color: "#FFFFFF" } : isReminders || isPayment ? { color: "rgb(19, 39, 63)" } : {}}>{f.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed" style={isBooking || isCommunication || isArchive || isFiles ? { color: "rgba(255, 255, 255, 0.9)" } : isReminders || isPayment ? { color: "rgba(19, 39, 63, 0.7)" } : { color: PALETTE.muted }}>
                        {f.desc}
                      </p>
                    </div>
                    <div className="mt-4">
                      {isBooking ? (
                        <MiniAppScreenshot type="booking" />
                      ) : isReminders ? (
                        <TelegramReminderMessage />
                      ) : isCommunication ? (
                        <MiniAppScreenshot type="homework" />
                      ) : isPayment ? (
                        <MiniAppScreenshot type="payment" />
                      ) : isArchive ? (
                        <MiniAppScreenshot type="archive" />
                      ) : isFiles ? (
                        <FilesAndFeedback />
                      ) : (
                        <PlaceholderShot label={f.shot} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* How it works - справа от последнего элемента на ПК */}
            <div className="lg:col-span-8 hidden lg:flex flex-col">
              <div className="mb-3">
                <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm border" style={{ background: "rgba(107, 126, 61, 0.15)", borderColor: "rgba(107, 126, 61, 0.3)", color: "rgba(19, 39, 63, 0.7)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
                  Старт
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-semibold tracking-tight" style={{ color: "rgba(19, 39, 63, 0.95)" }}>
                Как начать
              </h2>
              <p className="mt-3 text-base md:text-lg leading-relaxed" style={{ color: "rgba(19, 39, 63, 0.7)" }}>
                Простой путь от нуля до первой записи.
              </p>
              <div className="mt-7 flex-1">
              <GlassCard className="p-5 md:p-7 h-full flex flex-col">
                <div className="space-y-4 flex-1">
                  {steps.map((s, i) => (
                    <div
                      key={s.title}
                      className="rounded-2xl border p-4"
                      style={{
                        borderColor: "rgba(255,255,255,0.12)",
                        background: "rgba(255,255,255,0.04)",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="h-9 w-9 rounded-2xl border flex items-center justify-center shrink-0"
                          style={{
                            borderColor: PALETTE.blueBorder,
                            background: PALETTE.bluePanel,
                          }}
                        >
                          <span className="text-sm font-semibold" style={{ color: PALETTE.blueLight }}>
                            {i}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm md:text-base font-semibold">{s.title}</div>
                          <div className="mt-1 text-sm leading-relaxed" style={{ color: PALETTE.muted }}>
                            {s.desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => scrollToId("cta")}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm md:text-base font-medium border transition-all duration-200"
                    style={{
                      color: "#FFFFFF",
                      background: "#4E0000",
                      borderColor: "rgba(78, 0, 0, 0.6)",
                      boxShadow: "rgba(78, 0, 0, 0.3) 0px 18px 60px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                    }}
                  >
                    Создать кабинет
                  </button>
                  <GhostButton onClick={() => scrollToId("pricing")}>Посмотреть тариф</GhostButton>
                </div>
              </GlassCard>
              </div>
            </div>
              </div>
            </section>

            {/* How it works - для мобильных */}
            <section id="how" className="mx-auto max-w-7xl pt-14 md:pt-20 lg:hidden">
          <SectionTitle kicker="Старт" title="Как начать" desc="Простой путь от нуля до первой записи." />
          <div className="mt-7 grid lg:grid-cols-12 gap-4">
            <div className="lg:col-span-5">
              <GlassCard className="p-5 md:p-7">
                <div className="space-y-4">
                  {steps.map((s, i) => (
                    <div
                      key={s.title}
                      className="rounded-2xl border p-4"
                      style={{
                        borderColor: "rgba(255,255,255,0.12)",
                        background: "rgba(255,255,255,0.04)",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="h-9 w-9 rounded-2xl border flex items-center justify-center shrink-0"
                          style={{
                            borderColor: PALETTE.blueBorder,
                            background: PALETTE.bluePanel,
                          }}
                        >
                          <span className="text-sm font-semibold" style={{ color: PALETTE.blueLight }}>
                            {i}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm md:text-base font-semibold">{s.title}</div>
                          <div className="mt-1 text-sm leading-relaxed" style={{ color: PALETTE.muted }}>
                            {s.desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => scrollToId("cta")}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm md:text-base font-medium border transition-all duration-200"
                    style={{
                      color: "#FFFFFF",
                      background: "#4E0000",
                      borderColor: "rgba(78, 0, 0, 0.6)",
                      boxShadow: "rgba(78, 0, 0, 0.3) 0px 18px 60px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                    }}
                  >
                    Создать кабинет
                  </button>
                  <GhostButton onClick={() => scrollToId("pricing")}>Посмотреть тариф</GhostButton>
                </div>
              </GlassCard>
            </div>

              </div>
            </section>

            {/* Benefits */}
            <section className="mx-auto max-w-7xl pt-14 md:pt-20">
          <SectionTitle kicker="Преимущества" title="Почему психологи выбирают Upmini.app" />
          <div className="mt-7 grid md:grid-cols-3 gap-4">
            {[
              {
                title: "Без технических сложностей",
                desc: "Не нужен сайт, разработчик или неделя на настройку. Запустите кабинет за 10 минут.",
              },
              {
                title: "Всё в Telegram",
                desc: "Клиенту не нужно скачивать приложение или переходить на сайт. Запись сразу в ТГ.",
              },
              {
                title: "Контроль записей и оплат",
                desc: "Просмотр всех записей и оплат в одном месте. Ничего не теряется.",
              },
            ].map((b) => {
              return (
                <div
                  key={b.title}
                  className="relative overflow-hidden rounded-3xl border shadow-[0_24px_80px_rgba(0,0,0,0.45)] p-5 md:p-7"
                  style={{
                    background: "rgb(19, 39, 63)",
                    borderColor: "rgba(19, 39, 63, 0.2)",
                    boxShadow: "rgba(19, 39, 63, 0.2) 0px 28px 90px",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-60"
                    style={{
                      background: "radial-gradient(800px 400px at 30% 10%, rgba(255,255,255,0.1), transparent 60%), radial-gradient(700px 400px at 80% 30%, rgba(255,255,255,0.06), transparent 60%)",
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-[1px] rounded-[22px]"
                    style={{
                      border: "1px solid rgba(19, 39, 63, 0.3)",
                      opacity: 0.5,
                    }}
                  />
                  <div className="relative">
                    <div>
                      <h3 className="text-base md:text-lg font-semibold" style={{ color: "#FFFFFF" }}>{b.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                        {b.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
              </div>
            </section>

            {/* Reviews */}
            <section className="mx-auto max-w-7xl pt-14 md:pt-20">
          <SectionTitle kicker="Отзывы" title="Отзывы психологов" desc="Фото и ссылки на профили добавим позже." />
          <div className="mt-7 grid md:grid-cols-3 gap-4">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="relative overflow-hidden rounded-3xl border shadow-[0_24px_80px_rgba(0,0,0,0.45)] p-5 md:p-7"
                style={{
                  background: "#FFFFFF",
                  borderColor: "rgba(19, 39, 63, 0.2)",
                  boxShadow: "rgba(19, 39, 63, 0.2) 0px 28px 90px",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-60"
                  style={{
                    background: "radial-gradient(800px 400px at 30% 10%, rgba(19, 39, 63, 0.05), transparent 60%), radial-gradient(700px 400px at 80% 30%, rgba(19, 39, 63, 0.03), transparent 60%)",
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-[1px] rounded-[22px]"
                  style={{
                    border: "1px solid rgba(19, 39, 63, 0.3)",
                    opacity: 0.5,
                  }}
                />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-12 w-12 rounded-3xl border"
                      style={{
                        borderColor: "rgba(19, 39, 63, 0.2)",
                        background: "rgba(19, 39, 63, 0.05)",
                      }}
                      aria-label="Фото психолога (плейсхолдер)"
                      title="Фото психолога (плейсхолдер)"
                    />
                    <div>
                      <div className="text-sm font-semibold" style={{ color: "#13273F" }}>{r.name}</div>
                      <div className="text-xs" style={{ color: "rgba(19, 39, 63, 0.6)" }}>
                        {r.role}
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(19, 39, 63, 0.7)" }}>
                    {r.text}
                  </p>
                </div>
              </div>
            ))}
              </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="mx-auto max-w-7xl pt-14 md:pt-20">
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5">
              <SectionTitle
                kicker="Тариф"
                title="14 дней бесплатно, затем 1 900 ₽/мес"
                desc="Полный доступ ко всем функциям. Без ограничений. Стоимость меньше 1 вашей консультации."
              />
            </div>

            <div className="lg:col-span-7 relative">
              {/* Красные и синие круги под подложку */}
              <div className="absolute -z-10 inset-0 overflow-hidden rounded-3xl">
                {/* Красные круги */}
                <div
                  className="absolute rounded-full opacity-20"
                  style={{
                    width: "200px",
                    height: "200px",
                    background: "#DC2626",
                    top: "-50px",
                    left: "-50px",
                  }}
                />
                <div
                  className="absolute rounded-full opacity-20"
                  style={{
                    width: "150px",
                    height: "150px",
                    background: "#DC2626",
                    bottom: "-30px",
                    right: "-30px",
                  }}
                />
                <div
                  className="absolute rounded-full opacity-15"
                  style={{
                    width: "120px",
                    height: "120px",
                    background: "#DC2626",
                    top: "50%",
                    right: "20%",
                    transform: "translateY(-50%)",
                  }}
                />
                {/* Синие круги */}
                <div
                  className="absolute rounded-full opacity-20"
                  style={{
                    width: "180px",
                    height: "180px",
                    background: "#13273F",
                    top: "20%",
                    right: "-40px",
                  }}
                />
                <div
                  className="absolute rounded-full opacity-15"
                  style={{
                    width: "140px",
                    height: "140px",
                    background: "#13273F",
                    bottom: "10%",
                    left: "10%",
                  }}
                />
                <div
                  className="absolute rounded-full opacity-20"
                  style={{
                    width: "100px",
                    height: "100px",
                    background: "#13273F",
                    top: "-20px",
                    right: "30%",
                  }}
                />
              </div>
              <GlassCard className="p-5 md:p-7">
                <div className="flex flex-col md:flex-row gap-4 md:items-end md:justify-between">
                  <div>
                    <div className="text-xs" style={{ color: PALETTE.muted2 }}>
                      14 дней бесплатно
                    </div>
                    <div className="mt-1 text-3xl md:text-4xl font-semibold">0 ₽</div>
                    <div className="mt-2 text-sm" style={{ color: PALETTE.muted }}>
                      Полный доступ • без привязки карты
                    </div>
                  </div>

                  <div className="text-left md:text-right">
                    <div className="text-xs" style={{ color: PALETTE.muted2 }}>
                      затем
                    </div>
                    <div className="mt-1 text-2xl md:text-3xl font-semibold">1 900 ₽/мес</div>
                    <div className="mt-2 text-sm" style={{ color: PALETTE.muted }}>
                      да-да, меньше 1 вашей консультации
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <div
                    className="rounded-3xl border p-5"
                    style={{
                      borderColor: "rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.04)",
                    }}
                  >
                    <div className="text-sm font-semibold">Подходит, если вы хотите</div>
                    <ul className="mt-3 space-y-2 text-sm" style={{ color: PALETTE.muted }}>
                      {[
                        "убрать переписки",
                        "снизить отмены",
                        "собрать расписание и оплату в одном месте",
                        "автоматизировать напоминания",
                      ].map((t) => (
                        <li key={t} className="flex items-center gap-2">
                          <span style={{ color: PALETTE.blueLight }}>•</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="rounded-3xl border p-5"
                    style={{
                      borderColor: "rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.04)",
                    }}
                  >
                    <div className="text-sm font-semibold">Вы получите</div>
                    <ul className="mt-3 space-y-2 text-sm" style={{ color: PALETTE.muted }}>
                      {[
                        "кабинет записи в Telegram/Max",
                        "предоплату при записи",
                        "напоминания",
                        "историю клиентов и архив сессий",
                      ].map((t) => (
                        <li key={t} className="flex items-center gap-2">
                          <span style={{ color: PALETTE.blueLight }}>•</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <PrimaryButton onClick={() => scrollToId("cta")}>Попробовать бесплатно</PrimaryButton>
                  <GhostButton onClick={() => scrollToId("faq")}>Вопросы и ответы</GhostButton>
                </div>
              </GlassCard>
            </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mx-auto max-w-7xl pt-14 md:pt-20">
          <SectionTitle kicker="FAQ" title="Частые вопросы" />
          <div className="mt-7 grid gap-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                q={f.q}
                a={f.a}
                isOpen={openFAQ === i}
                onToggle={() => setOpenFAQ(openFAQ === i ? -1 : i)}
              />
            ))}
              </div>
            </section>

            {/* Final CTA + Contact */}
            <section id="cta" className="mx-auto max-w-7xl pt-14 md:pt-20 pb-16">
              <GlassCard className="p-6 md:p-10">
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
                  Меньше хаоса, больше сессий
                    </h2>
                    <p className="mt-3 text-base md:text-lg" style={{ color: PALETTE.muted }}>
                      14 дней бесплатно. Без привязки карты.
                    </p>

                    {/* Форма для звонка */}
                    <div className="mt-4 pt-2">
                      <div className="rounded-2xl border p-5" style={{ borderColor: "rgba(19, 39, 63, 0.2)", background: "#FFFFFF" }}>
                        <div className="text-sm font-semibold mb-4" style={{ color: "#13273F" }}>
                          Мы вам перезвоним
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="tel"
                            placeholder="+7 (___) ___-__-__"
                            className="flex-1 px-4 py-3 rounded-2xl border text-sm"
                            style={{
                              borderColor: "rgba(19, 39, 63, 0.2)",
                              background: "#FFFFFF",
                              color: "#13273F",
                              outline: "none",
                            }}
                          />
                          <button
                            onClick={() => alert("Подключите действие: открыть Telegram чат")}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm md:text-base font-medium border transition-all duration-200"
                            style={{
                              color: "#13273F",
                              background: "#FFFFFF",
                              borderColor: "#13273F",
                            }}
                          >
                            Заказать сообщение в Telegram
                          </button>
                          <button
                            onClick={() => alert("Подключите действие: отправка формы звонка")}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm md:text-base font-medium border transition-all duration-200"
                            style={{
                              color: "#FFFFFF",
                              background: "#13273F",
                              borderColor: "rgba(19, 39, 63, 0.2)",
                              boxShadow: "rgba(19, 39, 63, 0.3) 0px 18px 60px",
                            }}
                          >
                            Заказать звонок
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-6 text-sm md:text-base" style={{ color: PALETTE.muted }}>
                      Или попробуйте самостоятельно
                    </p>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <button
                    onClick={() => alert("Подключите действие: открыть регистрацию/бота")}
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm md:text-base font-medium border transition-transform active:scale-[0.99]"
                    style={{
                      color: "#FFFFFF",
                      background: "#4E0000",
                      borderColor: "rgba(78, 0, 0, 0.6)",
                      boxShadow: "0 18px 60px rgba(78, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                    }}
                  >
                        <span>Создать кабинет</span>
                      </button>
                      <GhostButton onClick={() => alert("Подключите действие: открыть Telegram чат поддержки")}>
                        Написать в Telegram
                      </GhostButton>
                    </div>

                    <div className="mt-6 text-sm" style={{ color: PALETTE.muted2 }}>
                      Остались вопросы? Напишите нам в Telegram.
                    </div>
                  </div>

                  <div
                    className="mt-6 pt-6 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    style={{ borderColor: "#13273F" }}
                  >
                    <div className="flex items-center gap-3">
                      <svg width="40" height="40" viewBox="0 0 375 376" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M293.831 0H81.1695C36.3408 0 0 36.3465 0 81.1823V293.877C0 338.713 36.3408 375.059 81.1695 375.059H293.831C338.659 375.059 375 338.713 375 293.877V81.1823C375 36.3465 338.659 0 293.831 0Z" fill="#060F30"/>
                        <path d="M305.819 145.887C303.971 133.565 298.901 123.66 290.656 116.077C282.411 108.494 271.56 104.703 258.15 104.703C244.741 104.703 233.321 108.068 222.707 114.845C212.093 121.622 203.374 131.243 196.551 143.754V107.547H176.412L176.981 207.307C172.859 219.96 165.135 230.766 155.99 238.633C146.323 247.021 135.472 251.239 123.484 251.239C111.496 251.239 102.682 246.879 96.9014 238.159C91.1205 229.439 88.2301 215.695 88.2301 196.833V107.357H67.1914V205.127C67.1914 205.127 67.1914 219.771 69.0394 229.202C70.8874 241.523 75.9575 251.428 84.2024 259.011C92.4473 266.594 103.298 270.385 116.708 270.385C130.118 270.385 141.537 267.02 152.152 260.243C162.197 253.845 170.537 244.841 177.171 233.277L177.36 267.684H198.399V169.535C202.332 155.839 209.108 144.797 218.821 136.361C228.535 127.973 239.339 123.755 251.327 123.755C263.315 123.755 272.129 128.115 277.91 136.835C283.691 145.555 286.581 159.299 286.581 178.161V267.636H307.62V169.867C307.62 169.867 307.62 155.223 305.772 145.792L305.819 145.887Z" fill="#F2F2F2"/>
                      </svg>
                      <div className="text-xs" style={{ color: PALETTE.muted2 }}>
                        © {new Date().getFullYear()} Upmini.app • Кабинет записи для психолога • Telegram / Max
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        className="text-xs px-4 py-2 rounded-2xl border"
                        style={{
                          color: PALETTE.muted,
                          borderColor: "rgba(255,255,255,0.12)",
                          background: "rgba(255,255,255,0.04)",
                        }}
                        onClick={() => alert("Подключите ссылку: политика конфиденциальности")}
                      >
                        Политика конфиденциальности
                      </button>
                      <button
                        className="text-xs px-4 py-2 rounded-2xl border"
                        style={{
                          color: PALETTE.muted,
                          borderColor: "rgba(255,255,255,0.12)",
                          background: "rgba(255,255,255,0.04)",
                        }}
                        onClick={() => alert("Подключите ссылку: оферта")}
                      >
                        Оферта
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </section>
        </div>
      </main>
    </div>
  );
}


