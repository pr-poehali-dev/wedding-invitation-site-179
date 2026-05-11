import { useState } from "react";
import Icon from "@/components/ui/icon";

const BG_IMAGE =
  "https://cdn.poehali.dev/projects/35ad83e3-3f15-4a76-93cb-f00a72878b67/files/8e4b5dea-9518-4312-b3d6-db809b142405.jpg";

const GOLD = "#c4a460";
const SAGE = "#8a9e82";
const DARK = "#2c2416";
const IVORY = "#f8f4ef";
const CREAM = "#f0ebe2";

export default function Index() {
  const [form, setForm] = useState({
    name: "",
    guests: "1",
    dietary: "",
    attending: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="min-h-screen font-sans"
      style={{ background: IVORY, color: DARK }}
    >
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BG_IMAGE})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(248,244,239,0.55) 0%, rgba(248,244,239,0.75) 50%, rgba(248,244,239,0.95) 100%)",
          }}
        />

        {/* Decorative corners */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l" style={{ borderColor: GOLD, opacity: 0.6 }} />
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r" style={{ borderColor: GOLD, opacity: 0.6 }} />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l" style={{ borderColor: GOLD, opacity: 0.6 }} />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r" style={{ borderColor: GOLD, opacity: 0.6 }} />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p
            className="font-sans tracking-[0.35em] text-xs uppercase mb-8 opacity-0 animate-fade-up"
            style={{ color: SAGE }}
          >
            Together with their families
          </p>

          <h1
            className="font-serif opacity-0 animate-fade-up"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              color: DARK,
              animationDelay: "0.2s",
            }}
          >
            Charlotte
            <span
              className="block italic"
              style={{ color: GOLD, fontSize: "0.6em", fontWeight: 300 }}
            >
              &amp;
            </span>
            James
          </h1>

          <div className="flex items-center justify-center gap-4 my-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.45s" }}>
            <div className="h-px w-16" style={{ background: GOLD }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: GOLD }} />
            <div className="h-px w-16" style={{ background: GOLD }} />
          </div>

          <p
            className="font-serif text-2xl italic opacity-0 animate-fade-up"
            style={{ color: DARK, fontWeight: 300, animationDelay: "0.6s" }}
          >
            request the pleasure of your company
          </p>

          <p
            className="font-sans tracking-[0.2em] text-sm uppercase mt-6 opacity-0 animate-fade-up"
            style={{ color: SAGE, animationDelay: "0.75s" }}
          >
            Saturday, the fourteenth of September
            <br />
            Two thousand and twenty-five
          </p>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up"
          style={{ animationDelay: "1.2s" }}
        >
          <Icon name="ChevronDown" size={22} style={{ color: GOLD }} />
        </div>
      </section>

      {/* ── DETAILS ── */}
      <section className="py-24 px-6" style={{ background: CREAM }}>
        <div className="max-w-4xl mx-auto">
          <SectionTitle>Details</SectionTitle>
          <div className="grid md:grid-cols-3 gap-12 mt-16 text-center">
            <DetailCard icon="Calendar" title="Date" lines={["Saturday", "14 September 2025"]} />
            <DetailCard icon="Clock" title="Time" lines={["Ceremony at 3:00 PM", "Reception to follow"]} />
            <DetailCard icon="MapPin" title="Venue" lines={["Thornfield Hall", "Oxfordshire, England"]} />
          </div>
        </div>
      </section>

      {/* ── DRESS CODE ── */}
      <section className="py-16 px-6 text-center" style={{ background: IVORY }}>
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1" style={{ background: GOLD, opacity: 0.4 }} />
            <span className="font-sans tracking-[0.3em] text-xs uppercase" style={{ color: SAGE }}>Dress Code</span>
            <div className="h-px flex-1" style={{ background: GOLD, opacity: 0.4 }} />
          </div>
          <p className="font-serif text-3xl italic mt-2" style={{ color: DARK, fontWeight: 300 }}>Black Tie</p>
          <p className="font-sans text-sm mt-3" style={{ color: SAGE }}>Formal evening attire is kindly requested</p>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section className="py-24 px-6" style={{ background: CREAM }}>
        <div className="max-w-2xl mx-auto">
          <SectionTitle>Order of the Day</SectionTitle>
          <div className="mt-16 relative">
            <div
              className="absolute top-0 bottom-0 w-px"
              style={{ left: "88px", background: GOLD, opacity: 0.25 }}
            />
            {[
              { time: "2:30 PM", event: "Guests Arrive", desc: "Welcome drinks in the rose garden" },
              { time: "3:00 PM", event: "Wedding Ceremony", desc: "Chapel of St. Mary's, Thornfield" },
              { time: "4:00 PM", event: "Champagne Reception", desc: "Drinks & canapés on the south lawn" },
              { time: "6:00 PM", event: "Wedding Breakfast", desc: "Three-course dinner in the Grand Hall" },
              { time: "8:30 PM", event: "Speeches & Toasts", desc: "Words from the wedding party" },
              { time: "9:30 PM", event: "Dancing & Celebrations", desc: "Live music until midnight" },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 mb-10 items-start">
                <div className="text-right min-w-[76px] pt-0.5">
                  <span className="font-sans text-xs tracking-widest" style={{ color: GOLD }}>{item.time}</span>
                </div>
                <div className="w-2.5 h-2.5 mt-1 rotate-45 flex-shrink-0 relative z-10" style={{ background: GOLD, marginLeft: "-5px" }} />
                <div>
                  <p className="font-serif text-xl" style={{ color: DARK, fontWeight: 500 }}>{item.event}</p>
                  <p className="font-sans text-sm mt-1" style={{ color: SAGE }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RSVP ── */}
      <section id="rsvp" className="py-24 px-6" style={{ background: IVORY }}>
        <div className="max-w-xl mx-auto">
          <SectionTitle>RSVP</SectionTitle>
          <p className="font-serif italic text-center mt-4 mb-14" style={{ color: SAGE, fontSize: "1.05rem" }}>
            Kindly reply by the 1st of August, 2025
          </p>

          {submitted ? (
            <div className="text-center py-16">
              <div
                className="w-14 h-14 mx-auto mb-6 flex items-center justify-center"
                style={{ border: `1px solid ${GOLD}` }}
              >
                <Icon name="Check" size={22} style={{ color: GOLD }} />
              </div>
              <p className="font-serif text-3xl italic" style={{ color: DARK }}>
                Thank you, {form.name || "dear guest"}
              </p>
              <p className="font-sans text-sm mt-3" style={{ color: SAGE }}>
                We have received your response and look forward to celebrating with you.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Attending */}
              <div>
                <Label>Will you be attending?</Label>
                <div className="flex gap-4 mt-3">
                  {["Joyfully accepts", "Regretfully declines"].map((opt) => (
                    <label
                      key={opt}
                      className="flex-1 flex items-center gap-3 border px-4 py-3 cursor-pointer"
                      style={{
                        borderColor: form.attending === opt ? GOLD : "hsl(var(--border))",
                        background: form.attending === opt ? `${GOLD}18` : "transparent",
                      }}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value={opt}
                        checked={form.attending === opt}
                        onChange={(e) => setForm({ ...form, attending: e.target.value })}
                        className="sr-only"
                      />
                      <div
                        className="w-4 h-4 border flex items-center justify-center flex-shrink-0"
                        style={{ borderColor: form.attending === opt ? GOLD : "#ccc" }}
                      >
                        {form.attending === opt && <div className="w-2 h-2" style={{ background: GOLD }} />}
                      </div>
                      <span className="font-sans text-sm" style={{ color: DARK }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <Label>Full Name</Label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full mt-2 px-4 py-3 font-sans text-sm bg-transparent border focus:outline-none"
                  style={{ borderColor: "hsl(var(--border))", color: DARK }}
                />
              </div>

              {/* Guests */}
              <div>
                <Label>Number of Guests</Label>
                <select
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="w-full mt-2 px-4 py-3 font-sans text-sm border focus:outline-none appearance-none cursor-pointer"
                  style={{ borderColor: "hsl(var(--border))", color: DARK, background: IVORY }}
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                  ))}
                </select>
              </div>

              {/* Dietary */}
              <div>
                <Label>Dietary Requirements</Label>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {["No restrictions", "Vegetarian", "Vegan", "Gluten-free", "Halal", "Kosher"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-3 border px-3 py-2.5 cursor-pointer"
                      style={{
                        borderColor: form.dietary === opt ? GOLD : "hsl(var(--border))",
                        background: form.dietary === opt ? `${GOLD}18` : "transparent",
                      }}
                    >
                      <input
                        type="radio"
                        name="dietary"
                        value={opt}
                        checked={form.dietary === opt}
                        onChange={(e) => setForm({ ...form, dietary: e.target.value })}
                        className="sr-only"
                      />
                      <div
                        className="w-3.5 h-3.5 border flex items-center justify-center flex-shrink-0"
                        style={{ borderColor: form.dietary === opt ? GOLD : "#ccc" }}
                      >
                        {form.dietary === opt && <div className="w-2 h-2" style={{ background: GOLD }} />}
                      </div>
                      <span className="font-sans text-xs" style={{ color: DARK }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <Label>Message to the Couple (optional)</Label>
                <textarea
                  rows={3}
                  placeholder="Share your wishes..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full mt-2 px-4 py-3 font-sans text-sm bg-transparent border focus:outline-none resize-none"
                  style={{ borderColor: "hsl(var(--border))", color: DARK }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 font-sans text-sm tracking-[0.25em] uppercase hover:opacity-80 transition-opacity"
                style={{ background: DARK, color: IVORY }}
              >
                Send Reply
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="py-20 px-6 text-center" style={{ background: DARK, color: IVORY }}>
        <div className="max-w-xl mx-auto">
          <p className="font-sans tracking-[0.3em] text-xs uppercase mb-6" style={{ color: GOLD }}>Any Questions?</p>
          <p className="font-serif text-3xl italic mb-8" style={{ fontWeight: 300 }}>
            We would love to hear from you
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <a
              href="mailto:charlotte.james.wedding@email.com"
              className="flex items-center justify-center gap-3 font-sans text-sm tracking-wide hover:opacity-70 transition-opacity"
              style={{ color: IVORY }}
            >
              <Icon name="Mail" size={16} style={{ color: GOLD }} />
              charlotte.james.wedding@email.com
            </a>
            <a
              href="tel:+447700000000"
              className="flex items-center justify-center gap-3 font-sans text-sm tracking-wide hover:opacity-70 transition-opacity"
              style={{ color: IVORY }}
            >
              <Icon name="Phone" size={16} style={{ color: GOLD }} />
              +44 7700 000 000
            </a>
          </div>

          <div className="mt-16 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            <p className="font-serif italic text-lg" style={{ color: GOLD, fontWeight: 300 }}>Charlotte &amp; James</p>
            <p className="font-sans text-xs tracking-widest uppercase mt-2" style={{ color: "rgba(255,255,255,0.35)" }}>
              14 · IX · 2025
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center">
      <p className="font-sans tracking-[0.3em] text-xs uppercase mb-4" style={{ color: SAGE }}>
        — {children} —
      </p>
      <div className="flex items-center justify-center gap-3">
        <div className="h-px w-12" style={{ background: GOLD, opacity: 0.5 }} />
        <div className="w-1.5 h-1.5 rotate-45" style={{ background: GOLD, opacity: 0.7 }} />
        <div className="h-px w-12" style={{ background: GOLD, opacity: 0.5 }} />
      </div>
    </div>
  );
}

function DetailCard({ icon, title, lines }: { icon: string; title: string; lines: string[] }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-12 h-12 flex items-center justify-center mb-5"
        style={{ border: `1px solid ${GOLD}` }}
      >
        <Icon name={icon} size={20} style={{ color: GOLD }} />
      </div>
      <p className="font-sans tracking-[0.2em] text-xs uppercase mb-3" style={{ color: SAGE }}>{title}</p>
      {lines.map((l, i) => (
        <p key={i} className="font-serif text-xl" style={{ color: DARK, fontWeight: i === 0 ? 500 : 300 }}>{l}</p>
      ))}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-xs tracking-[0.2em] uppercase" style={{ color: SAGE }}>{children}</p>
  );
}