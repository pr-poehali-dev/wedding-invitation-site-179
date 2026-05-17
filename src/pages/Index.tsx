import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG =
  "https://cdn.poehali.dev/projects/35ad83e3-3f15-4a76-93cb-f00a72878b67/files/6e17803d-d86b-4a2e-98e3-beaae3cce5cd.jpg";
const GYPSOPHILA_IMG =
  "https://cdn.poehali.dev/projects/35ad83e3-3f15-4a76-93cb-f00a72878b67/files/e7336e04-0382-4aa2-b10c-7382afbd5c0e.jpg";
const RSVP_URL =
  "https://functions.poehali.dev/febcdcf1-c588-4649-97af-75e594cc4979";

const WEDDING_DATE = new Date("2026-07-04T16:00:00");

const DRINKS = [
  "Вино белое",
  "Вино красное",
  "Мартини",
  "Виски",
  "Водка",
];

// ── Intersection Observer hook for scroll animations ──
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── Countdown hook ──
function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  });
  return time;
}

export default function Index() {
  const countdown = useCountdown(WEDDING_DATE);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    attending: "",
    guests_count: "1",
    drinks: [] as string[],
    plus_one_first_name: "",
    plus_one_last_name: "",
    plus_one_drinks: [] as string[],
    song_request: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const toggleDrink = (list: string[], drink: string) =>
    list.includes(drink) ? list.filter((d) => d !== drink) : [...list, drink];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(RSVP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          attending: form.attending === "yes",
          guests_count: parseInt(form.guests_count),
          drinks: form.drinks,
          song_request: form.song_request || null,
          plus_one_first_name: form.guests_count === "2" ? form.plus_one_first_name : null,
          plus_one_last_name: form.guests_count === "2" ? form.plus_one_last_name : null,
          plus_one_drinks: form.guests_count === "2" ? form.plus_one_drinks : [],
        }),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else setError("Произошла ошибка. Попробуйте ещё раз.");
    } catch {
      setError("Произошла ошибка. Попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#ffffff", color: "#0a0a0a", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* BG photo with strong overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%)",
        }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(80,80,80,0.55) 0%, rgba(60,60,60,0.65) 60%, rgba(245,245,245,1) 100%)" }} />

        {/* Corner ornaments */}
        {["top-6 left-6 border-t border-l","top-6 right-6 border-t border-r","bottom-6 left-6 border-b border-l","bottom-6 right-6 border-b border-r"].map((cls, i) => (
          <div key={i} className={`absolute w-12 h-12 ${cls}`} style={{ borderColor: "rgba(0,0,0,0.35)" }} />
        ))}

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="tracking-[0.4em] text-xs uppercase mb-10 opacity-0 animate-fade-up" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Lato, sans-serif", animationFillMode: "forwards" }}>
            приглашают вас разделить радость этого дня
          </p>

          <h1 className="opacity-0 animate-fade-up" style={{ fontSize: "clamp(3.5rem,9vw,7rem)", fontWeight: 300, lineHeight: 1, color: "#ffffff", animationDelay: "0.25s", animationFillMode: "forwards" }}>
            Александр
            <span className="block italic" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.55em", fontWeight: 300 }}>&amp;</span>
            Виктория
          </h1>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 my-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
            <div className="h-px w-20" style={{ background: "#fff", opacity: 0.5 }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: "#fff", opacity: 0.7 }} />
            <div className="h-px w-20" style={{ background: "#fff", opacity: 0.5 }} />
          </div>

          <p className="text-xl italic opacity-0 animate-fade-up" style={{ color: "rgba(255,255,255,0.9)", fontWeight: 300, animationDelay: "0.7s", animationFillMode: "forwards" }}>
            4 июля 2026 года
          </p>
          <p className="mt-2 opacity-0 animate-fade-up" style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", fontFamily: "Lato, sans-serif", letterSpacing: "0.15em", animationDelay: "0.85s", animationFillMode: "forwards" }}>
            Вилла «Небеса» · Казань
          </p>
        </div>

        {/* ── COUNTDOWN ── */}
        <div className="relative z-10 mt-16 opacity-0 animate-fade-up" style={{ animationDelay: "1.1s", animationFillMode: "forwards" }}>
          <div className="flex gap-6 md:gap-10">
            {[
              { v: countdown.days, l: "дней" },
              { v: countdown.hours, l: "часов" },
              { v: countdown.minutes, l: "минут" },
              { v: countdown.seconds, l: "секунд" },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <div className="text-4xl md:text-5xl font-light" style={{ color: "#ffffff", minWidth: "2ch", display: "inline-block" }}>
                  {String(v).padStart(2, "0")}
                </div>
                <div className="text-xs tracking-widest uppercase mt-1" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Lato, sans-serif" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up" style={{ animationDelay: "1.4s", animationFillMode: "forwards" }}>
          <Icon name="ChevronDown" size={20} style={{ color: "rgba(0,0,0,0.35)" }} />
        </div>
      </section>

      {/* ── DETAILS ── */}
      <RevealSection>
        <div className="py-24 px-6 text-center" style={{ background: "#f5f5f5" }}>
          <SectionLabel>Детали</SectionLabel>
          <div className="grid md:grid-cols-3 gap-12 mt-16 max-w-4xl mx-auto">
            <DetailCard icon="Calendar" title="Дата" lines={["Суббота", "4 июля 2026"]} />
            <DetailCard icon="Clock" title="Начало" lines={["16:00", "Регистрация гостей"]} />
            <DetailCard icon="MapPin" title="Место" lines={["Вилла «Небеса»", "Казань, ул. Техническая, 4Б"]} />
          </div>
        </div>
      </RevealSection>

      {/* ── GYPSOPHILA DIVIDER ── */}
      <div className="relative h-40 overflow-hidden" style={{ background: "#555" }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `url(${GYPSOPHILA_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          filter: "grayscale(100%)",
          opacity: 0.45,
        }} />
      </div>

      {/* ── SCHEDULE ── */}
      <RevealSection>
        <div className="py-24 px-6" style={{ background: "#ffffff" }}>
          <div className="max-w-2xl mx-auto">
            <SectionLabel>Программа вечера</SectionLabel>
            <div className="mt-16 relative">
              <div className="absolute top-0 bottom-0 w-px" style={{ left: "72px", background: "rgba(0,0,0,0.1)" }} />
              {[
                { time: "16:00", event: "Начало мероприятия", desc: "Встреча гостей, welcome-зона" },
                { time: "16:30", event: "Церемония", desc: "Торжественная регистрация" },
                { time: "17:30", event: "Банкет", desc: "Торжественный ужин и поздравления" },
                { time: "22:00", event: "Вечеринка", desc: "Танцы и живая музыка" },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 mb-10 items-start">
                  <div className="text-right min-w-[60px] pt-0.5">
                    <span style={{ color: "#999", fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "Lato, sans-serif" }}>{item.time}</span>
                  </div>
                  <div className="w-2 h-2 mt-1.5 rotate-45 flex-shrink-0 relative z-10" style={{ background: "#0a0a0a", opacity: 0.6, marginLeft: "-4px" }} />
                  <div>
                    <p style={{ color: "#0a0a0a", fontWeight: 500, fontSize: "1.25rem" }}>{item.event}</p>
                    <p style={{ color: "#888", fontSize: "0.875rem", fontFamily: "Lato, sans-serif", marginTop: "2px" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── GYPSOPHILA DIVIDER before RSVP ── */}
      <div className="relative h-40 overflow-hidden" style={{ background: "#555" }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `url(${GYPSOPHILA_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          filter: "grayscale(100%)",
          opacity: 0.45,
        }} />
      </div>

      {/* ── RSVP ── */}
      <RevealSection>
        <div className="py-24 px-6" style={{ background: "#f5f5f5" }}>
          <div className="max-w-xl mx-auto">
            <SectionLabel>Подтверждение</SectionLabel>

            {/* Deadline highlight */}
            <div className="mt-6 mb-12 text-center">
              <div className="inline-block border px-6 py-3" style={{ borderColor: "#0a0a0a", borderWidth: "1px" }}>
                <p style={{ color: "#0a0a0a", fontFamily: "Lato, sans-serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                  Просим подтвердить присутствие
                </p>
                <p style={{ color: "#0a0a0a", fontSize: "1.5rem", fontWeight: 300, marginTop: "4px", fontStyle: "italic" }}>
                  до 1 июня 2026 года
                </p>
              </div>
            </div>

            {submitted ? (
              <div className="text-center py-16">
                <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center border" style={{ borderColor: "#0a0a0a" }}>
                  <Icon name="Check" size={22} style={{ color: "#0a0a0a" }} />
                </div>
                <p style={{ color: "#0a0a0a", fontSize: "2rem", fontStyle: "italic", fontWeight: 300 }}>
                  Спасибо, {form.first_name}!
                </p>
                <p style={{ color: "#888", fontFamily: "Lato, sans-serif", fontSize: "0.9rem", marginTop: "8px" }}>
                  {form.attending === "no"
                    ? "Жаль, что не увидимся — спасибо за ответ, вы всегда в наших сердцах."
                    : "Мы получили ваш ответ и с нетерпением ждём встречи."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Attending */}
                <div>
                  <FormLabel>Вы придёте?</FormLabel>
                  <div className="flex gap-4 mt-3">
                    {[{ val: "yes", label: "Приду" }, { val: "no", label: "К сожалению, не смогу" }].map(({ val, label }) => (
                      <label key={val} className="flex-1 flex items-center gap-3 border px-4 py-3 cursor-pointer" style={{
                        borderColor: form.attending === val ? "#0a0a0a" : "rgba(0,0,0,0.15)",
                        background: form.attending === val ? "rgba(0,0,0,0.05)" : "transparent",
                      }}>
                        <input type="radio" name="attending" value={val} checked={form.attending === val}
                          onChange={(e) => setForm({ ...form, attending: e.target.value })} className="sr-only" required />
                        <RadioDot active={form.attending === val} />
                        <span style={{ color: "#0a0a0a", fontFamily: "Lato, sans-serif", fontSize: "0.875rem" }}>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FormLabel>Имя *</FormLabel>
                    <WInput value={form.first_name} onChange={(v) => setForm({ ...form, first_name: v })} placeholder="Иван" required />
                  </div>
                  <div>
                    <FormLabel>Фамилия *</FormLabel>
                    <WInput value={form.last_name} onChange={(v) => setForm({ ...form, last_name: v })} placeholder="Петров" required />
                  </div>
                </div>

                {form.attending !== "no" && (
                  <>
                    {/* Guests count */}
                    <div>
                      <FormLabel>Количество гостей</FormLabel>
                      <div className="flex gap-4 mt-3">
                        {[{ val: "1", label: "Только я" }, { val: "2", label: "Я и +1" }].map(({ val, label }) => (
                          <label key={val} className="flex-1 flex items-center gap-3 border px-4 py-3 cursor-pointer" style={{
                            borderColor: form.guests_count === val ? "#0a0a0a" : "rgba(0,0,0,0.15)",
                            background: form.guests_count === val ? "rgba(0,0,0,0.05)" : "transparent",
                          }}>
                            <input type="radio" name="guests_count" value={val} checked={form.guests_count === val}
                              onChange={(e) => setForm({ ...form, guests_count: e.target.value })} className="sr-only" />
                            <RadioDot active={form.guests_count === val} />
                            <span style={{ color: "#0a0a0a", fontFamily: "Lato, sans-serif", fontSize: "0.875rem" }}>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* My drinks */}
                    <div>
                      <FormLabel>Ваши предпочтения в напитках</FormLabel>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {DRINKS.map((d) => {
                          const active = form.drinks.includes(d);
                          return (
                            <label key={d} className="flex items-center gap-3 border px-3 py-2.5 cursor-pointer" style={{
                              borderColor: active ? "#0a0a0a" : "rgba(0,0,0,0.15)",
                              background: active ? "rgba(0,0,0,0.05)" : "transparent",
                            }}
                              onClick={() => setForm({ ...form, drinks: toggleDrink(form.drinks, d) })}>
                              <CheckDot active={active} />
                              <span style={{ color: "#0a0a0a", fontFamily: "Lato, sans-serif", fontSize: "0.8rem" }}>{d}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Plus one section */}
                    {form.guests_count === "2" && (
                      <div className="border-t pt-7 space-y-6" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
                        <p style={{ color: "#777", fontFamily: "Lato, sans-serif", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                          Данные вашего гостя
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <FormLabel>Имя гостя</FormLabel>
                            <WInput value={form.plus_one_first_name} onChange={(v) => setForm({ ...form, plus_one_first_name: v })} placeholder="Мария" />
                          </div>
                          <div>
                            <FormLabel>Фамилия гостя</FormLabel>
                            <WInput value={form.plus_one_last_name} onChange={(v) => setForm({ ...form, plus_one_last_name: v })} placeholder="Петрова" />
                          </div>
                        </div>
                        <div>
                          <FormLabel>Напитки гостя</FormLabel>
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            {DRINKS.map((d) => {
                              const active = form.plus_one_drinks.includes(d);
                              return (
                                <label key={d} className="flex items-center gap-3 border px-3 py-2.5 cursor-pointer" style={{
                                  borderColor: active ? "#0a0a0a" : "rgba(0,0,0,0.15)",
                                  background: active ? "rgba(0,0,0,0.05)" : "transparent",
                                }}
                                  onClick={() => setForm({ ...form, plus_one_drinks: toggleDrink(form.plus_one_drinks, d) })}>
                                  <CheckDot active={active} />
                                  <span style={{ color: "#0a0a0a", fontFamily: "Lato, sans-serif", fontSize: "0.8rem" }}>{d}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Song */}
                    <div>
                      <FormLabel>Трек, который вы хотели бы услышать на свадьбе</FormLabel>
                      <WInput value={form.song_request} onChange={(v) => setForm({ ...form, song_request: v })} placeholder="Исполнитель — Название" />
                    </div>
                  </>
                )}

                {error && <p style={{ color: "#f87171", fontFamily: "Lato, sans-serif", fontSize: "0.875rem" }}>{error}</p>}

                <button type="submit" disabled={submitting}
                  className="w-full py-4 tracking-[0.25em] uppercase transition-opacity hover:opacity-80 disabled:opacity-50"
                  style={{ background: "#0a0a0a", color: "#ffffff", fontFamily: "Lato, sans-serif", fontSize: "0.8rem" }}>
                  {submitting ? "Отправляем..." : "Отправить ответ"}
                </button>
              </form>
            )}
          </div>
        </div>
      </RevealSection>

      {/* ── GYPSOPHILA DIVIDER 2 ── */}
      <div className="relative h-32 overflow-hidden" style={{ background: "#555" }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `url(${GYPSOPHILA_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
          filter: "grayscale(100%)",
          opacity: 0.45,
          transform: "scaleX(-1)",
        }} />
      </div>

      {/* ── CONTACTS ── */}
      <RevealSection>
        <div className="py-20 px-6 text-center" style={{ background: "#f5f5f5" }}>
          <div className="max-w-lg mx-auto">
            <SectionLabel>Контакты</SectionLabel>
            <p className="mt-6 italic text-xl" style={{ color: "#666", fontWeight: 300, fontSize: "1.1rem" }}>
              Если у вас есть вопросы, мы всегда на связи
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-8 mt-10">
              <a href="tel:+79872101312" className="flex items-center justify-center gap-3 hover:opacity-60 transition-opacity" style={{ color: "#0a0a0a" }}>
                <Icon name="Phone" size={15} style={{ color: "#888" }} />
                <span style={{ fontFamily: "Lato, sans-serif", fontSize: "0.9rem" }}>Александр</span>
                <span style={{ fontFamily: "Lato, sans-serif", fontSize: "0.9rem", color: "#888" }}>+7 987 210-13-12</span>
              </a>
              <a href="tel:+79274473211" className="flex items-center justify-center gap-3 hover:opacity-60 transition-opacity" style={{ color: "#0a0a0a" }}>
                <Icon name="Phone" size={15} style={{ color: "#888" }} />
                <span style={{ fontFamily: "Lato, sans-serif", fontSize: "0.9rem" }}>Виктория</span>
                <span style={{ fontFamily: "Lato, sans-serif", fontSize: "0.9rem", color: "#888" }}>+7 927 447-32-11</span>
              </a>
            </div>

            <div className="mt-16 pt-8 border-t" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              <p className="italic text-2xl" style={{ color: "#0a0a0a", fontWeight: 300 }}>Александр &amp; Виктория</p>
              <p className="mt-2" style={{ color: "rgba(0,0,0,0.3)", fontFamily: "Lato, sans-serif", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                04 · 07 · 2026
              </p>
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}

// ── Helper components ──

function RevealSection({ children }: { children: React.ReactNode }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-4">
        <div className="h-px w-10" style={{ background: "rgba(0,0,0,0.15)" }} />
        <p style={{ color: "#999", fontFamily: "Lato, sans-serif", letterSpacing: "0.3em", fontSize: "0.7rem", textTransform: "uppercase" }}>
          {children}
        </p>
        <div className="h-px w-10" style={{ background: "rgba(0,0,0,0.15)" }} />
      </div>
    </div>
  );
}

function DetailCard({ icon, title, lines }: { icon: string; title: string; lines: string[] }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-11 h-11 flex items-center justify-center mb-5 border" style={{ borderColor: "rgba(0,0,0,0.2)" }}>
        <Icon name={icon} size={18} style={{ color: "#0a0a0a" }} />
      </div>
      <p style={{ color: "#999", fontFamily: "Lato, sans-serif", letterSpacing: "0.2em", fontSize: "0.7rem", textTransform: "uppercase", marginBottom: "10px" }}>{title}</p>
      {lines.map((l, i) => (
        <p key={i} style={{ color: i === 0 ? "#0a0a0a" : "#666", fontSize: i === 0 ? "1.25rem" : "1rem", fontWeight: i === 0 ? 500 : 300 }}>{l}</p>
      ))}
    </div>
  );
}

function FormLabel({ children }: { children: React.ReactNode }) {
  return <p style={{ color: "#888", fontFamily: "Lato, sans-serif", letterSpacing: "0.18em", fontSize: "0.7rem", textTransform: "uppercase" }}>{children}</p>;
}

function WInput({ value, onChange, placeholder, required }: { value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full mt-2 px-4 py-3 bg-transparent border focus:outline-none"
      style={{ borderColor: "rgba(0,0,0,0.2)", color: "#0a0a0a", fontFamily: "Lato, sans-serif", fontSize: "0.875rem" }}
    />
  );
}

function RadioDot({ active }: { active: boolean }) {
  return (
    <div className="w-4 h-4 border flex items-center justify-center flex-shrink-0" style={{ borderColor: active ? "#0a0a0a" : "rgba(0,0,0,0.25)" }}>
      {active && <div className="w-2 h-2" style={{ background: "#0a0a0a" }} />}
    </div>
  );
}

function CheckDot({ active }: { active: boolean }) {
  return (
    <div className="w-3.5 h-3.5 border flex items-center justify-center flex-shrink-0" style={{ borderColor: active ? "#0a0a0a" : "rgba(0,0,0,0.25)" }}>
      {active && <div className="w-2 h-2" style={{ background: "#0a0a0a" }} />}
    </div>
  );
}