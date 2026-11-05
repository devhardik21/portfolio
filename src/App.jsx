import { useEffect, useRef, useState } from "react";
import {
  profile,
  stats,
  experience,
  projects,
  skills,
  achievements,
  education,
  marquee,
} from "./data.js";
import {
  useReveal,
  useTyping,
  useCountUp,
  useActiveSection,
  useScrollProgress,
} from "./hooks.js";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "wins", label: "Wins" },
  { id: "contact", label: "Contact" },
];
const NAV_IDS = NAV.map((n) => n.id);

/* ---------- small helpers ---------- */

function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
  const [ref, seen] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${seen ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function SectionHead({ index, title, sub }) {
  return (
    <Reveal className="section-head">
      <span className="eyebrow">
        <i>{index}</i> {title}
      </span>
      <h2>{sub}</h2>
    </Reveal>
  );
}

function Icon({ name }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "github":
      return (
        <svg {...common}>
          <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 6L2 7" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    default:
      return null;
  }
}

/* ---------- global effects ---------- */

function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    let raf;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

function Navbar() {
  const active = useActiveSection(NAV_IDS);
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />
      <div className="nav-inner">
        <a href="#home" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-mark">H</span>
          <span className="logo-text">hardik<b>.dev</b></span>
        </a>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={active === n.id ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn-sm nav-cta">
          Let's talk
        </a>

        <button
          className={`burger ${open ? "open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

/* ---------- sections ---------- */

function Hero() {
  const typed = useTyping(profile.roles);
  const [ref, seen] = useReveal(0.3);

  return (
    <section id="home" className="hero">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="grid-bg" />

      <div className="container hero-inner">
        <div className="badge fade-up" style={{ animationDelay: "0.05s" }}>
          <span className="pulse" /> Open to full-time roles · Graduating May 2027
        </div>

        <h1 className="fade-up" style={{ animationDelay: "0.15s" }}>
          Hi, I'm <span className="grad">Hardik</span>
          <br />
          I build things that <em>think</em>.
        </h1>

        <p className="typing fade-up" style={{ animationDelay: "0.3s" }}>
          <span className="mono">&gt;</span> {typed}
          <span className="caret" />
        </p>

        <p className="lead fade-up" style={{ animationDelay: "0.4s" }}>
          {profile.tagline}
        </p>

        <div className="cta-row fade-up" style={{ animationDelay: "0.5s" }}>
          <a href="#projects" className="btn btn-primary">
            See my work <Icon name="arrow" />
          </a>
          <a href="#contact" className="btn btn-ghost">
            Get in touch
          </a>
          <div className="socials">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Icon name="github" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Icon name="linkedin" />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <Icon name="mail" />
            </a>
          </div>
        </div>

        <div ref={ref} className="stats fade-up" style={{ animationDelay: "0.65s" }}>
          {stats.map((s) => (
            <Stat key={s.label} {...s} start={seen} />
          ))}
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

function Stat({ n, suffix, label, start }) {
  const v = useCountUp(n, start);
  return (
    <div className="stat">
      <b>
        {v.toLocaleString()}
        {suffix}
      </b>
      <span>{label}</span>
    </div>
  );
}

function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((m, i) => (
          <span key={i}>
            {m} <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead index="01" title="About" sub="Engineer by craft, builder by habit." />

        <div className="about-grid">
          <Reveal className="about-text">
            <p>
              I'm a third-year B.Tech student in <strong>CSE (Data Science)</strong> at
              Bhilai Institute of Technology with a CPI of 8.59 — and I spend most of my
              time turning ideas into working products.
            </p>
            <p>
              Over three internships I've built an AI diagramming canvas used by
              educators, an e-commerce platform with role-based admin tooling, and
              data/PDF pipelines for transit systems at IIT Kharagpur's City Future Labs.
              Outside work, I compete in hackathons — and tend to finish on the podium.
            </p>
            <p>
              I like systems where the front end feels instant, the back end streams
              answers in real time, and the AI actually earns its place in the product.
            </p>
            <div className="chips">
              <span className="chip"><Icon name="pin" /> {profile.location}</span>
              <span className="chip">React · Node · Python</span>
              <span className="chip">AI · RAG · Realtime</span>
            </div>
          </Reveal>

          <div className="edu">
            {education.map((e, i) => (
              <Reveal key={e.school} delay={i * 120} className="glass edu-card">
                <div className="edu-top">
                  <span className="score">{e.score}</span>
                  <span className="muted">{e.period}</span>
                </div>
                <h3>{e.school}</h3>
                <p>{e.degree}</p>
                <span className="muted small">{e.place}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHead index="02" title="Experience" sub="Where I've shipped real things." />

        <div className="timeline">
          {experience.map((x, i) => (
            <Reveal key={x.company} delay={i * 80} className="t-item">
              <span className="t-dot" />
              <div className="glass t-card">
                <div className="t-head">
                  <div>
                    <h3>{x.role}</h3>
                    <p className="company">{x.company}</p>
                  </div>
                  <span className="period">{x.period}</span>
                </div>
                <ul>
                  {x.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="tags">
                  {x.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, i }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    const rx = ((y / r.height) - 0.5) * -6;
    const ry = ((x / r.width) - 0.5) * 6;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <Reveal delay={i * 120}>
      <article
        ref={ref}
        className={`project glass accent-${p.accent}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div className="spot" />
        <div className="project-top">
          <span className="kicker">{p.kicker}</span>
          <span className="idx">0{i + 1}</span>
        </div>
        <h3>{p.title}</h3>
        <p className="blurb">{p.blurb}</p>

        <div className="metric">
          <b>{p.metric.value}</b>
          <span>{p.metric.label}</span>
        </div>

        <ul>
          {p.points.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>

        <div className="tags">
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </article>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHead index="03" title="Projects" sub="Things I built because I was curious." />
        <div className="project-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
        <Reveal className="more">
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
            <Icon name="github" /> More on GitHub
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHead index="04" title="Skills" sub="The toolkit." />
        <div className="skills-grid">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 70} className="glass skill-card">
              <h3>{g.group}</h3>
              <div className="pills">
                {g.items.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Wins() {
  return (
    <section id="wins" className="section">
      <div className="container">
        <SectionHead index="05" title="Achievements" sub="Built fast. Placed well." />
        <div className="wins-grid">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 90} className="glass win">
              <span className="rank">{a.rank}</span>
              <h3>{a.title}</h3>
              <p>{a.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <Reveal className="glass contact-card">
          <div className="orb orb-c" />
          <span className="eyebrow">
            <i>06</i> Contact
          </span>
          <h2>
            Let's build something <span className="grad">great</span>.
          </h2>
          <p>
            I'm looking for full-time software roles starting 2027. If you have a
            problem worth solving, I'd love to hear about it.
          </p>

          <div className="cta-row center">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              <Icon name="mail" /> Say hello
            </a>
            <button className="btn btn-ghost" onClick={copy}>
              {copied ? "Copied ✓" : profile.email}
            </button>
          </div>

          <div className="contact-links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Icon name="github" /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Icon name="linkedin" /> LinkedIn
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
              <Icon name="phone" /> {profile.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <span>© {new Date().getFullYear()} Hardik Shandilya</span>
        <span className="muted">Built with React + Vite</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Wins />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
