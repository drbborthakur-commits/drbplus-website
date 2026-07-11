import React, { useState } from "react";
import {
  CLINIC,
  CLINICS,
  SERVICES,
  FAQS,
  BOOKING_AMOUNT_INR,
} from "./content.js";

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={s.page}>
      <Header />
      <Hero setChatOpen={setChatOpen} />
      <TrustStrip />
      <About />
      <Services />
      <Clinics />
      <Booking />
      <FaqSection openFaq={openFaq} setOpenFaq={setOpenFaq} />
      <Contact />
      <Footer />
      <FloatingButtons setChatOpen={setChatOpen} />
      {chatOpen && <ChatModal onClose={() => setChatOpen(false)} />}
      <GlobalStyle />
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header() {
  const links = [
    ["About", "#about"],
    ["Services", "#services"],
    ["Clinics", "#clinics"],
    ["Book Appointment", "#booking"],
    ["FAQ", "#faq"],
    ["Contact", "#contact"],
  ];
  return (
    <header style={s.header}>
      <div style={s.headerInner}>
        <a href="#top" style={s.logo}>
          <img src="/logo.png" alt="DRB PLUS Neuro-Psychiatry Clinic" style={s.logoImg} />
        </a>

        <nav style={s.nav}>
          {links.map(([label, href]) => (
            <a key={href} href={href} style={s.navLink}>
              {label}
            </a>
          ))}
        </nav>

        <div style={s.headerActions}>
          <a href="#booking" style={s.headerCta}>
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero({ setChatOpen }) {
  return (
    <section id="top" style={s.hero}>
      <div style={s.heroGlow} aria-hidden="true" />
      <div style={s.heroInner}>
        <p style={s.heroEyebrow}>
          Neuro-Psychiatric Care · Margherita &amp; Digboi, Assam
        </p>
        <h1 style={s.heroHeadline}>
          Reignite your inner strength.
          <br />
          Reimagine your life.
        </h1>
        <p style={s.heroSub}>
          {CLINIC.doctor} ({CLINIC.credentials}) offers compassionate,
          evidence-based psychiatric care and de-addiction treatment —
          a steady place to begin again.
        </p>
        <div style={s.heroActions}>
          <a href="#booking" style={s.btnPrimary}>
            Book an Appointment
          </a>
          <button style={s.btnGhost} onClick={() => setChatOpen(true)}>
            Ask our AI Assistant
          </button>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    CLINIC.credentials,
    "De-Addiction & Neuro-Psychiatry",
    "Margherita + Digboi",
    "Online Teleconsultation Available",
  ];
  return (
    <div style={s.trustStrip}>
      <div style={s.trustInner}>
        {items.map((t) => (
          <span key={t} style={s.trustItem}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- About ---------------- */
function About() {
  return (
    <section id="about" style={s.section}>
      <div style={s.sectionInner}>
        <p style={s.eyebrow}>About</p>
        <h2 style={s.h2}>Care that treats the whole person</h2>
        <p style={s.bodyLg}>
          DRB PLUS was founded on a simple idea: mental health and
          addiction recovery deserve the same care, privacy, and dignity
          as any other part of medicine. Under {CLINIC.doctor}, patients
          are assessed thoroughly, treated with a combination of
          medication and therapy where appropriate, and supported through
          every stage of recovery — not just the first appointment.
        </p>
        <ul style={s.aboutList}>
          <li>Medication management for psychiatric and neuro-psychiatric conditions</li>
          <li>Individual counselling, psychotherapy, and family support sessions</li>
          <li>Structured de-addiction programs with relapse-prevention planning</li>
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
function Services() {
  return (
    <section id="services" style={{ ...s.section, ...s.sectionAlt }}>
      <div style={s.sectionInner}>
        <p style={s.eyebrow}>Services</p>
        <h2 style={s.h2}>How we can help</h2>
        <div style={s.serviceGrid}>
          {SERVICES.map((sv) => (
            <div key={sv.id} style={s.serviceCard}>
              <h3 style={s.serviceTitle}>{sv.title}</h3>
              <p style={s.serviceBlurb}>{sv.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Clinics ---------------- */
function Clinics() {
  return (
    <section id="clinics" style={s.section}>
      <div style={s.sectionInner}>
        <p style={s.eyebrow}>Clinics</p>
        <h2 style={s.h2}>Visit us</h2>
        <div style={s.clinicGrid}>
          {CLINICS.map((c) => (
            <div key={c.id} style={s.clinicCard}>
              <h3 style={s.clinicName}>{c.name}</h3>
              <p style={s.clinicAddress}>{c.address}</p>
              <div style={s.clinicHours}>
                {c.hours.map((h) => (
                  <p key={h} style={s.clinicHourLine}>
                    {h}
                  </p>
                ))}
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  c.mapQuery
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={s.clinicMapLink}
              >
                Get Directions →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Booking + Payment ---------------- */
function Booking() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    clinic: CLINICS[0].id,
    service: SERVICES[0].id,
    date: "",
    time: "",
    notes: "",
  });
  const [status, setStatus] = useState("idle"); // idle | processing | paid | error
  const [errorMsg, setErrorMsg] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function isValid() {
    return (
      form.name.trim().length > 1 &&
      /^[0-9+\s-]{7,15}$/.test(form.phone.trim()) &&
      form.date &&
      form.time
    );
  }

  async function handlePayment(e) {
    e.preventDefault();
    if (!isValid()) {
      setErrorMsg("Please fill in your name, a valid phone number, date, and time.");
      return;
    }
    setErrorMsg("");
    setStatus("processing");

    try {
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: BOOKING_AMOUNT_INR }),
      });
      if (!orderRes.ok) throw new Error("Could not start payment. Please try again.");
      const order = await orderRes.json();

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: "INR",
        name: "DRB PLUS Neuro-Psychiatric Clinic",
        description: `Appointment booking advance — ${form.service}`,
        order_id: order.id,
        prefill: {
          name: form.name,
          contact: form.phone,
          email: form.email,
        },
        theme: { color: "#1B3A6B" },
        config: {
          display: {
            blocks: {
              upiBlock: {
                name: "Pay via UPI",
                instruments: [{ method: "upi" }],
              },
              other: {
                name: "Other payment methods",
                instruments: [
                  { method: "card" },
                  { method: "netbanking" },
                  { method: "wallet" },
                ],
              },
            },
            sequence: ["block.upiBlock", "block.other"],
            preferences: { show_default_blocks: false },
          },
        },
        handler: async function (response) {
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...response, booking: form }),
            });
            const verified = await verifyRes.json();
            if (verified.ok) {
              setStatus("paid");
              openWhatsAppConfirmation(form);
            } else {
              setStatus("error");
              setErrorMsg("Payment could not be verified. Please contact us on WhatsApp.");
            }
          } catch {
            setStatus("error");
            setErrorMsg("Payment succeeded but confirmation failed. Please message us on WhatsApp with your payment ID.");
          }
        },
        modal: {
          ondismiss: function () {
            setStatus("idle");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again or book via WhatsApp.");
    }
  }

  return (
    <section id="booking" style={{ ...s.section, ...s.sectionAlt }}>
      <div style={s.sectionInner}>
        <p style={s.eyebrow}>Book Appointment</p>
        <h2 style={s.h2}>Reserve your slot online</h2>
        <p style={s.bodyLg}>
          Fill in your details and confirm your slot with a small online
          booking advance of ₹{BOOKING_AMOUNT_INR}. Prefer to book without
          paying online?{" "}
          <a
            href={`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
              "Hi, I'd like to book an appointment at DRB PLUS Clinic."
            )}`}
            style={s.inlineLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book via WhatsApp instead
          </a>
          .
        </p>

        {status === "paid" ? (
          <div style={s.paidBox}>
            <h3 style={s.paidTitle}>Booking advance received ✓</h3>
            <p style={s.paidText}>
              We've opened WhatsApp with your booking details pre-filled —
              please tap send so our team can confirm your exact slot.
            </p>
          </div>
        ) : (
          <form style={s.form} onSubmit={handlePayment}>
            <div style={s.formGrid}>
              <Field label="Full Name">
                <input
                  style={s.input}
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your name"
                />
              </Field>
              <Field label="Phone (WhatsApp)">
                <input
                  style={s.input}
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                />
              </Field>
              <Field label="Email (optional)">
                <input
                  style={s.input}
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                />
              </Field>
              <Field label="Clinic">
                <select
                  style={s.input}
                  value={form.clinic}
                  onChange={(e) => update("clinic", e.target.value)}
                >
                  {CLINICS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Service">
                <select
                  style={s.input}
                  value={form.service}
                  onChange={(e) => update("service", e.target.value)}
                >
                  {SERVICES.map((sv) => (
                    <option key={sv.id} value={sv.title}>
                      {sv.title}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Preferred Date">
                <input
                  style={s.input}
                  type="date"
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                />
              </Field>
              <Field label="Preferred Time">
                <input
                  style={s.input}
                  type="time"
                  value={form.time}
                  onChange={(e) => update("time", e.target.value)}
                />
              </Field>
            </div>
            <Field label="Notes (optional)">
              <textarea
                style={{ ...s.input, ...s.textarea }}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Anything you'd like us to know before your visit"
              />
            </Field>

            {errorMsg && <p style={s.errorText}>{errorMsg}</p>}

            <button
              type="submit"
              style={s.btnPrimary}
              disabled={status === "processing"}
            >
              {status === "processing"
                ? "Processing…"
                : `Pay ₹${BOOKING_AMOUNT_INR} & Confirm Booking`}
            </button>
            <p style={s.paymentNote}>
              Secure payment via Razorpay — UPI, cards, netbanking, and
              wallets accepted. The remaining consultation fee is payable
              at the clinic.
            </p>

            <div style={s.orDivider}>
              <span style={s.orDividerLine} />
              <span style={s.orDividerText}>or</span>
              <span style={s.orDividerLine} />
            </div>

            <a
              href={buildUpiLink(form)}
              style={s.btnUpi}
              onClick={() => {
                if (!isValid()) {
                  setErrorMsg(
                    "Please fill in your name, phone, date, and time first."
                  );
                }
              }}
            >
              Pay ₹{BOOKING_AMOUNT_INR} directly via UPI
            </a>
            <p style={s.paymentNote}>
              Opens your UPI app to pay {CLINIC.upiId} directly. After
              paying, tap below to send us your booking details on
              WhatsApp so we can confirm your slot.
            </p>
            <button
              type="button"
              style={s.btnGhostSmall}
              onClick={() => {
                if (!isValid()) {
                  setErrorMsg(
                    "Please fill in your name, phone, date, and time first."
                  );
                  return;
                }
                setErrorMsg("");
                openWhatsAppConfirmation(form);
              }}
            >
              I've paid via UPI — send confirmation
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label style={s.fieldLabel}>
      {label}
      {children}
    </label>
  );
}

function buildUpiLink(form) {
  const note = `DRB PLUS Booking - ${form.name || "Patient"}`.slice(0, 50);
  const params = new URLSearchParams({
    pa: CLINIC.upiId,
    pn: "DRB PLUS Neuro-Psychiatric Clinic",
    am: String(BOOKING_AMOUNT_INR),
    cu: "INR",
    tn: note,
  });
  return `upi://pay?${params.toString()}`;
}

function openWhatsAppConfirmation(form) {
  const clinicName =
    CLINICS.find((c) => c.id === form.clinic)?.name || form.clinic;
  const text =
    `Hi, I've just paid the booking advance online.\n\n` +
    `Name: ${form.name}\n` +
    `Phone: ${form.phone}\n` +
    `Clinic: ${clinicName}\n` +
    `Service: ${form.service}\n` +
    `Preferred Date: ${form.date}\n` +
    `Preferred Time: ${form.time}\n` +
    (form.notes ? `Notes: ${form.notes}\n` : "") +
    `\nPlease confirm my slot.`;
  window.open(
    `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(text)}`,
    "_blank"
  );
}

/* ---------------- FAQ ---------------- */
function FaqSection({ openFaq, setOpenFaq }) {
  return (
    <section id="faq" style={s.section}>
      <div style={s.sectionInner}>
        <p style={s.eyebrow}>FAQ</p>
        <h2 style={s.h2}>Frequently asked questions</h2>
        <div style={s.faqList}>
          {FAQS.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} style={s.faqItem}>
                <button
                  style={s.faqQuestion}
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                >
                  <span>{f.q}</span>
                  <span style={s.faqIcon}>{open ? "−" : "+"}</span>
                </button>
                {open && <p style={s.faqAnswer}>{f.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  return (
    <section id="contact" style={{ ...s.section, ...s.sectionAlt }}>
      <div style={s.sectionInner}>
        <p style={s.eyebrow}>Contact</p>
        <h2 style={s.h2}>Get in touch</h2>
        <div style={s.contactGrid}>
          <div>
            <p style={s.contactLine}>📞 {CLINIC.phone}</p>
            <p style={s.contactLine}>✉️ {CLINIC.email}</p>
            <p style={s.contactLine}>📍 Margherita &amp; Digboi, Assam</p>
            <a
              href={`https://wa.me/${CLINIC.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={s.btnPrimary}
            >
              Chat on WhatsApp
            </a>
          </div>
          <iframe
            title="Clinic location"
            style={s.mapEmbed}
            src="https://www.google.com/maps?q=Dr.%20Biswadeep%20Borthakur%20Neuro-Psychiatrist%20Margherita&output=embed"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer style={s.footer}>
      <p style={s.footerBrand}>DRB PLUS</p>
      <p style={s.footerText}>
        © {new Date().getFullYear()} {CLINIC.name}. All rights reserved.
      </p>
      <div style={s.footerLinks}>
        <a href={CLINIC.instagram} style={s.footerLink} target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href={CLINIC.facebook} style={s.footerLink} target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href={`mailto:${CLINIC.email}`} style={s.footerLink}>Email</a>
      </div>
    </footer>
  );
}

/* ---------------- Floating buttons + Chat modal ---------------- */
function FloatingButtons({ setChatOpen }) {
  return (
    <div style={s.floatWrap}>
      <a
        href={`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
          "Hi, I'd like to book an appointment at DRB PLUS Clinic."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        style={s.floatWhatsapp}
        aria-label="Chat on WhatsApp"
      >
        💬
      </a>
      <button
        style={s.floatAssistant}
        onClick={() => setChatOpen(true)}
        aria-label="Open AI Assistant"
      >
        AI
      </button>
    </div>
  );
}

function ChatModal({ onClose }) {
  return (
    <div style={s.modalOverlay} onClick={onClose}>
      <div style={s.modalBox} onClick={(e) => e.stopPropagation()}>
        <div style={s.modalHeader}>
          <span>DRB PLUS Assistant</span>
          <button style={s.modalClose} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <iframe
          title="DRB PLUS AI Assistant"
          src="https://drbplus-chatbot.vercel.app/"
          style={s.modalIframe}
        />
      </div>
    </div>
  );
}

function GlobalStyle() {
  return (
    <style>{`
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { margin: 0; }
      a { cursor: pointer; }
      input:focus, select:focus, textarea:focus, button:focus, a:focus {
        outline: 2px solid #5CC8C0;
        outline-offset: 2px;
      }
      @media (prefers-reduced-motion: reduce) {
        * { animation: none !important; transition: none !important; }
      }
      @keyframes heroPulse {
        0%, 100% { opacity: 0.55; transform: scale(1); }
        50% { opacity: 0.85; transform: scale(1.06); }
      }
      @media (max-width: 780px) {
        .drbplus-nav-desktop { display: none !important; }
      }
    `}</style>
  );
}

/* ============================================================
   STYLES
   ============================================================ */
const COLOR = {
  navyDeep: "#071F38",
  navy: "#0C3359",
  teal: "#3ACDCF",
  coral: "#FB5847",
  cream: "#F4F1EA",
  ink: "#16213A",
};

const FONT_DISPLAY = "'Cormorant Garamond', Georgia, serif";
const FONT_BODY = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

const s = {
  page: {
    fontFamily: FONT_BODY,
    color: COLOR.ink,
    background: COLOR.cream,
    minHeight: "100vh",
  },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 40,
    background: "rgba(244,241,234,0.92)",
    backdropFilter: "blur(8px)",
    borderBottom: "1px solid rgba(27,58,107,0.1)",
  },
  headerInner: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "14px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    flexShrink: 0,
  },
  logoImg: {
    height: 38,
    width: "auto",
    display: "block",
  },
  nav: {
    display: "flex",
    gap: 20,
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
    flex: "1 1 auto",
    minWidth: 0,
  },
  navLink: {
    fontSize: 14,
    fontWeight: 500,
    color: COLOR.ink,
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
  navOpenMobile: {},
  headerActions: { display: "flex", alignItems: "center", gap: 12, flexShrink: 0 },
  headerPhone: {
    fontSize: 13,
    color: COLOR.navy,
    textDecoration: "none",
    display: "none",
  },
  headerCta: {
    background: COLOR.coral,
    color: "white",
    padding: "9px 16px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
  hamburger: { display: "none" },
  hamburgerBar: {},

  hero: {
    position: "relative",
    overflow: "hidden",
    background: `linear-gradient(180deg, ${COLOR.navyDeep} 0%, ${COLOR.navy} 100%)`,
    padding: "96px 20px 88px",
    textAlign: "center",
  },
  heroGlow: {
    position: "absolute",
    top: "-20%",
    left: "50%",
    transform: "translateX(-50%)",
    width: 620,
    height: 620,
    borderRadius: "50%",
    background: `radial-gradient(circle, ${COLOR.teal}55 0%, transparent 70%)`,
    animation: "heroPulse 6s ease-in-out infinite",
    pointerEvents: "none",
  },
  heroInner: { position: "relative", maxWidth: 720, margin: "0 auto" },
  heroEyebrow: {
    color: COLOR.teal,
    letterSpacing: 2,
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 18,
  },
  heroHeadline: {
    fontFamily: FONT_DISPLAY,
    fontStyle: "italic",
    fontWeight: 500,
    fontSize: "clamp(32px, 6vw, 54px)",
    lineHeight: 1.15,
    color: COLOR.cream,
    margin: "0 0 20px",
  },
  heroSub: {
    color: "rgba(244,241,234,0.82)",
    fontSize: 16,
    lineHeight: 1.6,
    maxWidth: 560,
    margin: "0 auto 34px",
  },
  heroActions: {
    display: "flex",
    gap: 14,
    justifyContent: "center",
    flexWrap: "wrap",
  },

  trustStrip: {
    background: COLOR.navy,
    borderTop: "1px solid rgba(244,241,234,0.12)",
  },
  trustInner: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "14px 20px",
    display: "flex",
    gap: 28,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  trustItem: {
    color: "rgba(244,241,234,0.75)",
    fontSize: 12.5,
    letterSpacing: 0.4,
  },

  section: { padding: "72px 20px" },
  sectionAlt: { background: "#EDE8DC" },
  sectionInner: { maxWidth: 920, margin: "0 auto" },
  eyebrow: {
    color: COLOR.coral,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontSize: "clamp(26px, 4vw, 38px)",
    fontWeight: 600,
    color: COLOR.navy,
    margin: "0 0 20px",
  },
  bodyLg: { fontSize: 16, lineHeight: 1.7, color: "#2B3550", maxWidth: 680 },
  inlineLink: { color: COLOR.navy, fontWeight: 600 },

  aboutList: {
    marginTop: 24,
    paddingLeft: 20,
    fontSize: 15,
    lineHeight: 1.9,
    color: "#2B3550",
  },

  serviceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 18,
    marginTop: 28,
  },
  serviceCard: {
    background: "white",
    border: "1px solid rgba(27,58,107,0.08)",
    borderRadius: 14,
    padding: "22px 20px",
    borderTop: `3px solid ${COLOR.teal}`,
  },
  serviceTitle: {
    fontFamily: FONT_DISPLAY,
    fontSize: 20,
    fontWeight: 600,
    color: COLOR.navy,
    margin: "0 0 8px",
  },
  serviceBlurb: { fontSize: 14, lineHeight: 1.6, color: "#4A5470", margin: 0 },

  clinicGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 18,
    marginTop: 28,
  },
  clinicCard: {
    background: "white",
    borderRadius: 14,
    padding: "24px 22px",
    border: "1px solid rgba(27,58,107,0.08)",
  },
  clinicName: {
    fontFamily: FONT_DISPLAY,
    fontSize: 22,
    color: COLOR.navy,
    margin: "0 0 6px",
  },
  clinicAddress: { fontSize: 14, color: "#4A5470", margin: "0 0 14px" },
  clinicHours: { marginBottom: 14 },
  clinicHourLine: { fontSize: 13.5, color: "#2B3550", margin: "0 0 4px" },
  clinicMapLink: {
    fontSize: 13,
    fontWeight: 600,
    color: COLOR.coral,
    textDecoration: "none",
  },

  form: { marginTop: 28 },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    marginBottom: 16,
  },
  fieldLabel: {
    display: "block",
    fontSize: 12.5,
    fontWeight: 600,
    color: COLOR.navy,
    marginBottom: 16,
  },
  input: {
    display: "block",
    width: "100%",
    marginTop: 6,
    padding: "10px 12px",
    fontSize: 14,
    borderRadius: 8,
    border: "1px solid rgba(27,58,107,0.2)",
    background: "white",
    fontFamily: FONT_BODY,
  },
  textarea: { minHeight: 80, resize: "vertical" },
  errorText: { color: "#B3261E", fontSize: 13.5, marginBottom: 12 },
  paymentNote: { fontSize: 12, color: "#6B7590", marginTop: 10 },

  orDivider: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    margin: "22px 0",
  },
  orDividerLine: {
    flex: 1,
    height: 1,
    background: "rgba(27,58,107,0.15)",
  },
  orDividerText: {
    fontSize: 12,
    color: "#8A93AC",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  btnUpi: {
    display: "block",
    textAlign: "center",
    background: "white",
    color: COLOR.navy,
    padding: "13px 26px",
    borderRadius: 999,
    fontSize: 14.5,
    fontWeight: 700,
    textDecoration: "none",
    border: `1.5px solid ${COLOR.navy}`,
  },
  btnGhostSmall: {
    display: "block",
    width: "100%",
    marginTop: 10,
    background: "none",
    color: COLOR.coral,
    padding: "10px 16px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
    border: `1px solid ${COLOR.coral}`,
    cursor: "pointer",
  },

  paidBox: {
    marginTop: 28,
    background: "white",
    border: `1px solid ${COLOR.teal}`,
    borderRadius: 14,
    padding: "26px 22px",
  },
  paidTitle: { fontFamily: FONT_DISPLAY, color: COLOR.navy, margin: "0 0 8px" },
  paidText: { fontSize: 14, color: "#2B3550", margin: 0 },

  faqList: { marginTop: 24 },
  faqItem: {
    borderBottom: "1px solid rgba(27,58,107,0.12)",
  },
  faqQuestion: {
    width: "100%",
    background: "none",
    border: "none",
    textAlign: "left",
    padding: "16px 0",
    fontSize: 15,
    fontWeight: 600,
    color: COLOR.navy,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  faqIcon: { fontSize: 18, color: COLOR.coral },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 1.7,
    color: "#4A5470",
    margin: "0 0 18px",
  },

  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24,
    alignItems: "start",
  },
  contactLine: { fontSize: 15, margin: "0 0 10px", color: "#2B3550" },
  mapEmbed: {
    width: "100%",
    height: 260,
    border: 0,
    borderRadius: 14,
  },

  footer: {
    background: COLOR.navyDeep,
    padding: "28px 20px",
    textAlign: "center",
  },
  footerText: { color: "rgba(244,241,234,0.6)", fontSize: 12.5, margin: "0 0 10px" },
  footerBrand: {
    fontFamily: FONT_DISPLAY,
    color: COLOR.teal,
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: 1,
    margin: "0 0 12px",
  },
  footerLinks: { display: "flex", gap: 18, justifyContent: "center" },
  footerLink: { color: COLOR.teal, fontSize: 12.5, textDecoration: "none" },

  floatWrap: {
    position: "fixed",
    bottom: 20,
    right: 20,
    zIndex: 50,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    alignItems: "flex-end",
  },
  floatWhatsapp: {
    width: 52,
    height: 52,
    borderRadius: "50%",
    background: "#25D366",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    textDecoration: "none",
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
  },
  floatAssistant: {
    width: 52,
    height: 52,
    borderRadius: "50%",
    background: COLOR.navy,
    color: COLOR.teal,
    border: "none",
    fontWeight: 700,
    fontSize: 13,
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    cursor: "pointer",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(10,22,40,0.6)",
    zIndex: 60,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  modalBox: {
    width: "100%",
    maxWidth: 420,
    height: "80vh",
    background: "white",
    borderRadius: "16px 16px 0 0",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  modalHeader: {
    background: COLOR.navy,
    color: "white",
    padding: "14px 18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: 600,
    fontSize: 14,
  },
  modalClose: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: 16,
    cursor: "pointer",
  },
  modalIframe: { flex: 1, border: 0, width: "100%" },

  btnPrimary: {
    display: "inline-block",
    background: COLOR.coral,
    color: "white",
    padding: "13px 26px",
    borderRadius: 999,
    fontSize: 14.5,
    fontWeight: 700,
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
  },
  btnGhost: {
    display: "inline-block",
    background: "transparent",
    color: COLOR.cream,
    padding: "13px 26px",
    borderRadius: 999,
    fontSize: 14.5,
    fontWeight: 700,
    border: `1.5px solid ${COLOR.teal}`,
    cursor: "pointer",
  },
};
