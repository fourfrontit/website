import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Shield, Cpu, Gauge, Wrench, ArrowRight, Mail, Phone, ExternalLink, CircleCheck, Twitter, Linkedin, Youtube } from "lucide-react";

/*
  FourFront IT – Single‑Page partner-facing website (carousel + questionnaire view)
  Updates in this pass:
  • Replace “Popular right now” with a testimonial slider (one at a time)
  • Neutral cards (no colored fills) for Why/How sections; keep hover zoom
  • Maintain site-wide background glow (already global)
  • Projects: header fully white with text shadow, allow wrapping; SOW button filled theme color
  • Buttons: “How We Work” and “Book a scoping call” are filled (alt color)
  • Remove Cost Calculator and its usage
*/

// ---- Data (ensure defined before any component uses it) ----
const projects = [
  { key: "ws-upgrade", title: "Windows Server Upgrades", rate: "$65/hr", tier: "Standard", blurb: "Upgrade 2012/2016/2019 → 2022 with pre‑checks, backups, and validation.", details: ["Pre‑upgrade health checks","In‑place/side‑by‑side","Rollback plan","Validation & handover"] },
  { key: "fsmo", title: "Domain & FSMO Migrations", rate: "$65/hr", tier: "Standard", blurb: "Promote new DCs, transfer FSMO roles, decommission legacy controllers.", details: ["New DC build","FSMO transfer","SYSVOL checks","Decommission legacy DCs"] },
  { key: "ad-health", title: "AD Repairs & Health Checks", rate: "$65/hr", tier: "Standard", blurb: "Fix replication, DNS, stale objects, and GPO drift with a before/after report.", details: ["repadmin/dcdiag","DNS cleanup","GPO baseline","Stale object cleanup"] },
  { key: "hyperv", title: "Hyper‑V Implementation", rate: "$80/hr", tier: "Advanced", blurb: "Hosts, virtual switches, VMs, backup integration and (optional) clustering.", details: ["Host install","vSwitch/VLANs","VM builds","Optional cluster/replica"] },
  { key: "vmware", title: "VMware ESXi Implementation", rate: "$80/hr", tier: "Advanced", blurb: "ESXi install, vSwitch/VLANs, datastores, VMs, optional vCenter/HA/DRS.", details: ["ESXi install","Networking & storage","VM builds","Optional vCenter/HA/DRS"] },
  { key: "migrate", title: "VMware ↔ Hyper‑V Migration", rate: "$80/hr", tier: "Advanced", blurb: "Cross‑hypervisor VM moves with testing, rollback and documentation.", details: ["Discovery & planning","Test migration","Cutover","Rollback & evidence"] },
  { key: "rds", title: "RDS Setup", rate: "$80/hr", tier: "Advanced", blurb: "Connection Broker, Session Hosts, Gateway/SSL, collections and policies.", details: ["Roles deploy","Gateway + SSL","Collections","GPO hardening"] },
  { key: "avd", title: "Azure Virtual Desktop (AVD)", rate: "$95/hr", tier: "Premium", blurb: "Tenant, host pools, FSLogix, Conditional Access, monitoring & cost guardrails.", details: ["Host pools","FSLogix","CA + MFA","Autoscale & monitoring"] },
  { key: "m365", title: "M365 Security Hardening", rate: "$95/hr", tier: "Premium", blurb: "MFA, Conditional Access, mail protection, sharing controls, audit/logging.", details: ["MFA + CA","Mail hygiene","Sharing controls","Audit & alerts"] },
  { key: "rmm", title: "RMM Onboarding & Optimization", rate: "$80/hr", tier: "Advanced", blurb: "Agent rollout, policies, patching baselines, alert tuning and reporting.", details: ["Agent rollout","Policy baselines","Alert tuning","Reports & runbooks"] },
  { key: "patch", title: "Patch Compliance Audit", rate: "Fixed $800", tier: "Audit", blurb: "OS + 3rd‑party patch status, gaps, and remediation roadmap.", details: ["Compliance scan","Gap analysis","Executive report","Remediation plan"] },
  { key: "bdr", title: "Backup & DR Validation", rate: "Fixed $1,000", tier: "Audit", blurb: "Test restores (file/VM/db), RPO/RTO review, and audit‑ready evidence.", details: ["Test restores","RPO/RTO review","Evidence pack","Recommendations"] },
  { key: "adcheck", title: "AD Health Check", rate: "Fixed $650", tier: "Audit", blurb: "Focused assessment of a single domain with a concise risk report.", details: ["dcdiag/repadmin","DNS review","GPO review","Risk report"] },
] as const;

const bundles = [
  { title: "New Site / Domain Setup", price: "From $1,600", bullets: ["AD DS, DNS, DHCP configured","File/print and baseline GPOs","Documentation and validation"] },
  { title: "Greenfield Deployment Pack", price: "From $3,400", bullets: ["Domain + virtualization (Hyper‑V/VMware)","Backup/DR configured + test restore","Monitoring via RMM + handover docs"] },
] as const;

// Testimonials for hero carousel
const testimonials = [
  { quote: "FourFront delivered our AD migration flawlessly and ahead of schedule.", author: "Samantha K.", role: "Ops Manager, FinServe MSP" },
  { quote: "Their documentation and validation checklists are the best we’ve seen.", author: "Michael T.", role: "Director, CloudNova" },
  { quote: "Zero surprises, great communication, and automation that saved us hours.", author: "Priyanka R.", role: "CTO, Apex Networks" },
] as const;

// ---- Tiny runtime tests (won't block render) ----
console.assert(Array.isArray(projects) && projects.length > 0, "[TEST] projects should be a non‑empty array");
console.assert(new Set(projects.map(p=>p.key)).size === projects.length, "[TEST] project keys should be unique");
console.assert(Array.isArray(bundles) && bundles.length > 0, "[TEST] bundles should be a non‑empty array");

// ---- Utilities ----
const smoothScroll = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// ---- Shell ----
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-slate-100">
      {/* Hide scrollbar utility injected here */}
      <style>{`.hide-scrollbar{scrollbar-width:none;-ms-overflow-style:none}.hide-scrollbar::-webkit-scrollbar{display:none}
.text-drop{ text-shadow:0 2px 8px rgba(0,0,0,.45) }
.card-zoom{ transition:transform .25s ease, box-shadow .25s ease }
.card-zoom:hover{ transform:scale(1.04) }
`}</style>
      <div className="absolute inset-0 -z-10 opacity-40" aria-hidden>
        <div className="pointer-events-none absolute -top-20 right-0 h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-600/30 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -left-10 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tr from-blue-500/20 to-fuchsia-500/20 blur-3xl" />
      </div>
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-slate-900/40 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <Cpu className="h-6 w-6 text-cyan-400" /> FourFront IT
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            {[{ label: "Home", href: "home" },{ label: "Projects & Pricing", href: "projects" },{ label: "Bundles", href: "bundles" },{ label: "How We Work", href: "process" },{ label: "Contact", href: "contact" }].map((n) => (
              <button key={n.href} onClick={() => smoothScroll(n.href)} className="hover:text-cyan-300 transition text-slate-200">
                {n.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button onClick={() => smoothScroll("contact")} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900">Get a scoped project</Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-16 space-y-36">{children}</main>
      <footer className="mt-20 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12 grid lg:grid-cols-4 gap-8 text-sm text-slate-300">
          <div>
            <div className="flex items-center gap-2 font-semibold"><Cpu className="h-5 w-5 text-cyan-400"/>FourFront IT</div>
            <p className="mt-2 opacity-80">Automation‑first project delivery for MSPs and modern businesses.</p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/15" aria-label="Follow us on X"><Twitter className="h-4 w-4"/></a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/15" aria-label="Follow us on LinkedIn"><Linkedin className="h-4 w-4"/></a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/15" aria-label="Follow us on YouTube"><Youtube className="h-4 w-4"/></a>
            </div>
          </div>

          <div>
            <div className="font-semibold">Head office</div>
            <address className="mt-2 not-italic leading-relaxed">
              401–570 East 8th Avenue,<br/>
              Vancouver, BC V5T 1S8, Canada.
            </address>
            <div className="mt-4">
              <div className="font-semibold">International</div>
              <p className="mt-1">Sri Lanka / Australia</p>
            </div>
          </div>

          <div>
            <div className="font-semibold">Call Us</div>
            <p className="mt-2">Available Monday to Friday, 8am–5pm (PT)</p>
            <p className="mt-1 font-medium">+1 (672) 762-3822</p>
            <div className="mt-4">
              <div className="font-semibold">Questions</div>
              <p className="mt-1">info@fourfrontit.com</p>
            </div>
          </div>

          <div>
            <div className="font-semibold">Quick Links</div>
            <div className="mt-2 flex flex-wrap gap-3">
              {[{ label: "Home", href: "home" },{ label: "Projects & Pricing", href: "projects" },{ label: "Bundles", href: "bundles" },{ label: "How We Work", href: "process" },{ label: "Contact", href: "contact" }].map((n) => (
                <Button key={n.href} variant="outline" className="border-white/20 text-slate-200" onClick={() => smoothScroll(n.href)}>
                  {n.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ---- Sections ----
function Hero() {
  return (
    <section id="home" className="grid lg:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Projects that <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">scale, automate</span>, and <span className="bg-gradient-to-r from-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">strengthen</span> your stack.
        </h1>
        <p className="mt-4 text-slate-300 max-w-xl">
          We deliver structured, partner‑ready projects with validation and handover. Transparent pricing, lean timelines, measurable outcomes.
        </p>
        <div className="mt-6 flex gap-3">
          <Button onClick={() => smoothScroll("projects")} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900">Explore Projects</Button>
          <Button onClick={() => smoothScroll("process")} className="bg-violet-500 hover:bg-violet-400 text-slate-900">How We Work</Button>
        </div>
        <div className="mt-6 flex items-center gap-3 text-slate-300 text-sm">
          <Shield className="h-4 w-4 text-emerald-400"/> Security‑first
          <Gauge className="h-4 w-4 text-cyan-300"/> Automation‑driven
          <Wrench className="h-4 w-4 text-violet-300"/> Documentation included
        </div>
      </div>
      <div className="relative">
        <HeroTestimonials />
      </div>
    </section>
  );
}

// Hero Testimonials slider (one at a time)
function HeroTestimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[idx];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur shadow-2xl">
      <div className="text-sm text-cyan-300 font-semibold">Testimonials</div>
      <figure className="mt-4">
        <blockquote className="text-lg leading-relaxed">“{t.quote}”</blockquote>
        <figcaption className="mt-3 text-slate-300 text-sm">— {t.author}, {t.role}</figcaption>
      </figure>
      <div className="mt-4 flex gap-2">
        {testimonials.map((_, i) => (
          <span key={i} className={`h-2 w-2 rounded-full ${i===idx? 'bg-cyan-400':'bg-white/20'}`} />
        ))}
      </div>
    </div>
  );
}

function ProjectsSlides({ onRequestSOW }: { onRequestSOW: (projectKey: string) => void }) {
  const scroller = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    const el = scroller.current;
    if (!el || intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScrollLeft - 5) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 360, behavior: "smooth" });
      }
    }, 4000);
  };
  const stopAuto = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, []);

  const slideBy = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLDivElement>("[data-card]");
    const width = card ? card.clientWidth + 24 : 320; // include gap
    el.scrollBy({ left: dir * width, behavior: "smooth" });
  };

  return (
    <section id="projects" className="relative">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Projects & Pricing</h2>
      </div>
      <p className="mt-2 text-slate-300">Choose a project to see scope details and start the questionnaire.</p>

      {/* Left/Right overlay arrows, styled like cards */}
      <button aria-label="Previous" className="hidden md:flex text-slate-200 hover:text-white absolute -left-16 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/10 shadow-xl hover:bg-white/15" onClick={() => slideBy(-1)}>
        &#8249;
      </button>
      <button aria-label="Next" className="hidden md:flex text-slate-200 hover:text-white absolute -right-16 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/10 shadow-xl hover:bg-white/15" onClick={() => slideBy(1)}>
        &#8250;
      </button>

      <div
        ref={scroller}
        onMouseEnter={stopAuto}
        onMouseLeave={startAuto}
        className="mt-8 overflow-x-auto [scroll-snap-type:x_mandatory] hide-scrollbar"
        aria-label="project-cards-carousel"
      >
        <div className="flex gap-6 min-w-max">
          {projects.map((p) => (
            <Card key={p.key} data-card className="w-[360px] shrink-0 scroll-snap-align-start border-white/10 bg-white/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-100 text-left flex items-center justify-between gap-3 text-drop">
                  <span className="pr-2 whitespace-normal break-words">{p.title}</span>
                  <span className={`text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10 ${p.tier === 'Standard' ? 'text-cyan-300' : p.tier === 'Advanced' ? 'text-violet-300' : p.tier === 'Premium' ? 'text-fuchsia-300' : 'text-emerald-300'}`}>{p.tier}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-left">
                <p className="text-sm text-slate-300 min-h-[3.5rem]">{p.blurb}</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-200">
                  {p.details.slice(0,4).map(d => (
                    <li key={d} className="flex items-start gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400"/> {d}</li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between">
                  <span className={`text-lg font-semibold ${p.tier === 'Standard' ? 'text-cyan-300' : p.tier === 'Advanced' ? 'text-violet-300' : p.tier === 'Premium' ? 'text-fuchsia-300' : 'text-emerald-300'}`}>{p.rate}</span>
                  <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900" onClick={() => onRequestSOW(p.key)}>Request SOW</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function BundlesSection() {
  return (
    <section id="bundles">
      <h2 className="text-3xl font-bold">Bundled Solutions</h2>
      <p className="mt-2 text-slate-300">Turnkey outcomes with documentation, validation, and onboarding questionnaires included.</p>

      <div className="mt-10 grid gap-6">
        {bundles.map((b, i) => (
          <div key={b.title} className="grid md:grid-cols-2 border border-white/10 rounded-2xl overflow-hidden bg-white/5">
            {/* Left pane: header + pricing with filled color */}
            <div className={`p-6 md:p-8 flex flex-col justify-center ${i % 2 === 0 ? 'bg-gradient-to-br from-cyan-600/40 to-violet-600/40' : 'bg-gradient-to-br from-fuchsia-600/40 to-emerald-600/40'}`}>
              <div className="text-2xl font-semibold text-white/95">{b.title}</div>
              <div className="mt-2 text-lg text-white/80">{b.price}</div>
            </div>
            {/* Right pane: bullets */}
            <div className="p-6 md:p-8">
              <ul className="space-y-2 text-slate-200 text-sm md:text-base">
                {b.bullets.map((x) => (
                  <li key={x} className="flex gap-3 items-start"><span className="mt-2 inline-block h-2 w-2 rounded-full bg-emerald-400"/> {x}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-xl font-semibold">Questionnaires Included</h3>
        <p className="mt-2 text-slate-300 text-sm">Each bundle ships with pre‑project questionnaires (environment, licensing, requirements, validation) plus project‑specific add‑ons. Faster scoping, fewer surprises.</p>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { title: "Discover", copy: "Short questionnaire + call to confirm scope, risks, and timelines." },
    { title: "Design", copy: "We finalize the SOW with milestones, acceptance criteria, and prerequisites." },
    { title: "Deliver", copy: "Engineers execute with validation checklists and evidence collection." },
    { title: "Document", copy: "Partner‑ready handover including configs, accounts, backups, and runbooks." },
    { title: "Develop", copy: "Enginuity program for ongoing optimization." },
  ];
  return (
    <section id="process">
      <h2 className="text-3xl font-bold">How We Work</h2>
      <p className="mt-2 text-slate-300">A five‑step, automation‑first approach designed for MSP delivery.</p>
      <div className="mt-8 grid md:grid-cols-5 gap-4">
        {steps.map((s, i) => (
          <Card key={s.title} className={`card-zoom border-white/10 bg-white/5`}>
            <CardHeader>
              <CardTitle className="text-slate-100">{i+1}. {s.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-slate-300">{s.copy}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Button onClick={() => smoothScroll("projects")} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900">See Projects</Button>
        <Button className="bg-violet-500 hover:bg-violet-400 text-slate-900" onClick={() => smoothScroll("contact")}>Book a scoping call</Button>
      </div>
    </section>
  );
}

// ---- Questionnaire View ----
function QuestionnairePage({ projectKey, onDone, onBackToMain }: { projectKey: string; onDone: () => void; onBackToMain: () => void }) {
  const project = projects.find(p => p.key === projectKey);
  const [submitted, setSubmitted] = useState(false);

  if (!project) {
    return (
      <section className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold">Project not found</h2>
        <p className="mt-2 text-slate-300">The selected project questionnaire could not be loaded.</p>
        <div className="mt-6 flex gap-3">
          <Button onClick={onBackToMain} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900">Back to main page</Button>
        </div>
      </section>
    );
  }

  if (submitted) {
    return (
      <section className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Thank you!</h2>
        <p className="mt-3 text-slate-300">A member of our team will review your {project.title} questionnaire and contact you with a scoped SOW.</p>
        <Button className="mt-6 bg-cyan-500 hover:bg-cyan-400 text-slate-900" onClick={onBackToMain}>Back to main page</Button>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold">{project.title} – Questionnaire</h2>
      <p className="mt-2 text-slate-300">Please complete the form below. This helps us validate scope, risks, and timelines.</p>
      <form className="mt-6 grid gap-4">
        {/* Contact */}
        <div className="grid md:grid-cols-2 gap-3">
          <Input required placeholder="Your name" className="bg-white/10 border-white/20 placeholder:text-slate-400" />
          <Input required type="email" placeholder="Work email" className="bg-white/10 border-white/20 placeholder:text-slate-400" />
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <Input placeholder="Company / MSP" className="bg-white/10 border-white/20 placeholder:text-slate-400" />
          <Input placeholder="Phone (optional)" className="bg-white/10 border-white/20 placeholder:text-slate-400" />
        </div>

        {/* Environment / Project specifics (basic dynamic prompts) */}
        <Textarea placeholder="Environment overview (versions, platforms, number of servers/users)" className="bg-white/10 border-white/20 placeholder:text-slate-400 min-h-[120px]" />
        <Textarea placeholder="Access & licensing available (admin creds, OS/M365/hypervisor licenses)" className="bg-white/10 border-white/20 placeholder:text-slate-400 min-h-[120px]" />
        <Textarea placeholder="Business requirements & downtime window" className="bg-white/10 border-white/20 placeholder:text-slate-400 min-h-[120px]" />

        {/* Quick checklist from project.details */}
        <div>
          <div className="text-sm text-slate-300 mb-2">Key items (tick those you need):</div>
          <div className="grid md:grid-cols-2 gap-2">
            {project.details.map(d => (
              <label key={d} className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="h-4 w-4" />
                <span>{d}</span>
              </label>
            ))}
          </div>
        </div>

        <Textarea placeholder="Anything else we should know?" className="bg-white/10 border-white/20 placeholder:text-slate-400 min-h-[120px]" />

        <div className="pt-2 flex items-center gap-3">
          <Button type="button" className="bg-cyan-500 hover:bg-cyan-400 text-slate-900" onClick={() => { setSubmitted(true); onDone(); }}>Send</Button>
          <Button type="button" variant="outline" className="border-white/20" onClick={onBackToMain}>Cancel</Button>
        </div>
      </form>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="max-w-3xl">
      <h2 className="text-3xl font-bold">Contact</h2>
      <p className="mt-2 text-slate-300">Send us your project idea. We’ll reply with a short questionnaire and a scoped SOW.</p>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-slate-100">Message us</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <form className="space-y-3">
              <Input placeholder="Your name" className="bg-white/10 border-white/20 placeholder:text-slate-400" />
              <Input placeholder="Company / MSP" className="bg-white/10 border-white/20 placeholder:text-slate-400" />
              <Input type="email" placeholder="Email" className="bg-white/10 border-white/20 placeholder:text-slate-400" />
              <Textarea placeholder="Tell us about your project…" className="bg-white/10 border-white/20 placeholder:text-slate-400 min-h-[140px]" />
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 w-full">Send</Button>
              <p className="text-xs text-slate-400">By submitting, you agree to our response via email. We don’t spam or sell data.</p>
            </form>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-slate-100">Direct</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-2">
            <p className="flex items-center gap-2"><Mail className="h-4 w-4"/> projects@fourfrontit.example <ExternalLink className="h-4 w-4 opacity-60"/></p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4"/> +1 (555) 014‑2025</p>
            <div className="pt-4 text-sm opacity-80">Prefer to skip email? Share your completed questionnaire and request a calendar link.</div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// ---- App ----
export default function Website() {
  const [view, setView] = useState<"main" | "questionnaire">("main");
  const [selectedProjectKey, setSelectedProjectKey] = useState<string | null>(null);

  const openQuestionnaire = (projectKey: string) => {
    setSelectedProjectKey(projectKey);
    setView("questionnaire");
    // optional: scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToMain = () => {
    setView("main");
    setSelectedProjectKey(null);
  };

  if (view === "questionnaire" && selectedProjectKey) {
    return (
      <Shell>
        <QuestionnairePage
          projectKey={selectedProjectKey}
          onDone={() => {/* could post to API or email in real app */}}
          onBackToMain={backToMain}
        />
      </Shell>
    );
  }

  return (
    <Shell>
      <Hero />
      {/* Value props */}
      <section className="mt-12" aria-label="why-us">
        <h2 className="text-2xl font-semibold text-center">Why partners choose us</h2>
        <div className="mt-8 grid md:grid-cols-5 gap-8">
          {[{ title: "MSP‑Centric", copy: "We understand RMMs, PSAs, and partner workflows." },{ title: "Automation‑First", copy: "We streamline and automate wherever possible." },{ title: "Structured Delivery", copy: "Every project includes validation checklists and handover docs." },{ title: "Transparent Pricing", copy: "No hidden costs. Simple hourly or fixed‑rate projects." },{ title: "Future‑Focused", copy: "Our scopes evolve with technology to keep you ahead." }].map((f, i) => (
            <Card key={f.title} className={`card-zoom min-h-[180px] border-white/10 bg-white/5`}>
              <CardHeader className="items-center text-center pb-2">
                <CardTitle className="text-slate-100 text-xl">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-base text-slate-200 leading-relaxed">{f.copy}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <ProjectsSlides onRequestSOW={openQuestionnaire} />
      <BundlesSection />
      <ProcessSection />
      <ContactSection />
    </Shell>
  );
}
