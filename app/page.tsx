"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

// ─── Icons ────────────────────────────────────────────────────────────────────

const ExternalIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="opacity-50"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="opacity-45"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

export default function Home() {
  const { t } = useT();
  const p = t.portfolio;

  return (
    <main
      className="max-w-(--content-width) mx-auto"
      style={{
        padding: "calc(48px + 0.75rem + 3rem) var(--content-padding) 6rem",
      }}
    >
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        id="about"
        className="flex items-start gap-8 mb-14 pb-12 border-b border-border-subtle"
      >
        <img
          src="../public/avatar.jpg"
          alt="Ercan Yeşil"
          className="w-50 h-50"
        />
        <div>
          <h1 className="text-[1.75rem] font-bold tracking-[-0.04em] mb-3 text-text-primary">
            Ercan Yeşil
          </h1>
          <p className="text-[0.9375rem] text-(--color-text-secondary) leading-[1.75] max-w-130 mb-0">
            {p.bio1}
          </p>
          <p className="text-[0.9375rem] text-(--color-text-secondary) leading-[1.75] max-w-130 mb-0 mt-3">
            {p.bio2part1}{" "}
            <Link
              href="/articles"
              className="text-text-primary font-semibold underline underline-offset-[3px] decoration-[rgba(255,255,255,0.25)] hover:decoration-[rgba(255,255,255,0.7)] hover:opacity-100"
            >
              <strong>dev-radar</strong>
            </Link>
            {", "}{p.bio2part2}{" "}
            <strong className="text-text-primary font-semibold">{p.bio2role}</strong>{" "}
            {p.bio2at}{" "}
            <a
              href="https://wease.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary font-semibold underline underline-offset-[3px] decoration-[rgba(255,255,255,0.25)] hover:decoration-[rgba(255,255,255,0.7)] hover:opacity-100"
            >
              Wease
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── Latest Writing ────────────────────────────────────── */}
      <section className="mb-14">
        <p className="text-[0.8rem] font-bold tracking-[0.08em] uppercase text-text-muted mb-5">
          {p.latestWriting}
        </p>
        <div className="flex flex-col gap-0">
          <Link
            href="/articles"
            className={cn(
              "flex items-center justify-between gap-6 py-4",
              "border-t border-border-subtle last:border-b last:border-border-subtle",
              "transition-opacity duration-200 hover:opacity-70"
            )}
          >
            <span className="text-[0.9375rem] font-medium text-text-primary tracking-[-0.01em]">
              {p.openSourceWriting}
            </span>
            <span className="text-[0.78rem] text-text-muted font-mono shrink-0">
              Next.js ↗
            </span>
          </Link>
          <a
            href="https://github.com/ercanyesil"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center justify-between gap-6 py-4",
              "border-t border-border-subtle last:border-b last:border-border-subtle",
              "transition-opacity duration-200 hover:opacity-70"
            )}
          >
            <span className="text-[0.9375rem] font-medium text-text-primary tracking-[-0.01em]">
              {p.openSourceDesc}
            </span>
            <span className="text-[0.78rem] text-text-muted font-mono shrink-0">
              GitHub ↗
            </span>
          </a>
        </div>
      </section>

      {/* ── Connect ───────────────────────────────────────────── */}
      <section className="mb-14">
        <p className="text-[0.8rem] font-bold tracking-[0.08em] uppercase text-text-muted mb-5">
          {p.connect}
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { href: "https://github.com/ercanyesil", label: "GitHub" },
            { href: "https://www.linkedin.com/in/ercan-ye%C5%9Fil-4a5b28173/", label: "LinkedIn" },
            { href: "https://ercanyesil.com", label: "ercanyesil.com" },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-[0.35rem] px-3.5 py-[0.4rem]",
                "border border-border-card rounded-lg",
                "text-[0.85rem] font-medium text-(--color-text-secondary) tracking-[-0.01em]",
                "transition-[color,border-color,background] duration-200",
                "hover:text-text-primary hover:border-border-hover hover:bg-[rgba(255,255,255,0.04)] hover:opacity-100"
              )}
            >
              {label} <ExternalIcon />
            </a>
          ))}
        </div>
      </section>

      {/* ── Work Experience ───────────────────────────────────── */}
      <section id="work" className="mb-14">
        <p className="text-[0.8rem] font-bold tracking-[0.08em] uppercase text-text-muted mb-5">
          {p.workExperience}
        </p>
        <p className="text-[0.875rem] text-text-muted mb-2">
          {p.workSubtitle}
        </p>
        <div>
          {p.work.map((item) => (
            <div
              key={`${item.company}-${item.period}`}
              className="grid grid-cols-[180px_1fr] gap-x-8 gap-y-2 py-6 border-t border-border-subtle last:border-b last:border-border-subtle sm:grid-cols-1 sm:gap-4"
            >
              {/* Meta */}
              <div className="pt-[0.1rem]">
                <p className="text-[0.9375rem] font-bold text-text-primary mb-[0.2rem] tracking-[-0.02em]">
                  {item.title}
                </p>
                {(item as { companyUrl?: string }).companyUrl ? (
                  <a
                    href={(item as { companyUrl?: string }).companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-[0.3rem] text-[0.85rem] text-(--color-text-secondary) mb-[0.35rem] hover:text-text-primary hover:opacity-100"
                  >
                    {item.company} <ExternalIcon />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-[0.3rem] text-[0.85rem] text-(--color-text-secondary) mb-[0.35rem]">
                    {item.company}
                  </span>
                )}
                <p className="text-[0.78rem] text-text-muted uppercase tracking-[0.04em] font-mono">
                  {item.period}
                </p>
              </div>
              {/* Description */}
              <div>
                <p className="text-[0.9rem] text-(--color-text-secondary) leading-[1.7] m-0">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Selected Projects ─────────────────────────────────── */}
      <section id="projects" className="mb-14">
        <p className="text-[0.8rem] font-bold tracking-[0.08em] uppercase text-text-muted mb-5">
          {p.selectedProjects}
        </p>
        <div className="flex flex-col gap-0">
          {p.projects.map((project) => {
            const isExternal =
              project.url?.startsWith("http") ||
              project.url?.startsWith("https");
            const itemClass = cn(
              "flex items-center justify-between gap-6 py-4",
              "border-t border-border-subtle last:border-b last:border-border-subtle",
              "transition-opacity duration-200 hover:opacity-70"
            );
            const inner = (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.9375rem] font-semibold text-text-primary mb-[0.2rem] tracking-[-0.01em]">
                    {project.title}
                  </p>
                  <p className="text-[0.85rem] text-text-muted m-0 whitespace-nowrap overflow-hidden text-ellipsis">
                    {project.description}
                  </p>
                </div>
                <span className="text-[0.82rem] text-text-muted shrink-0 flex items-center gap-1 font-mono transition-[color] duration-200 hover:text-text-primary hover:opacity-100">
                  {project.tag} <ArrowRightIcon />
                </span>
              </>
            );
            return isExternal ? (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={itemClass}
              >
                {inner}
              </a>
            ) : (
              <Link
                key={project.title}
                href={project.url ?? "#"}
                className={itemClass}
              >
                {inner}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────── */}
      <section className="mb-14">
        <p className="text-[0.8rem] font-bold tracking-[0.08em] uppercase text-text-muted mb-5">
          {p.skills}
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "TypeScript", "JavaScript", "React", "Next.js", "React Native",
            "Expo", "Node.js", "Redux Toolkit", "React Query", "Zustand",
            "Three.js", "Framer Motion", "Tailwind CSS", "Styled Components",
            "MongoDB", "MySQL", "Firebase", "Supabase", "Docker", "Git", "Figma",
          ].map((skill) => (
            <span
              key={skill}
              className="px-3 py-[0.3rem] border border-border-card rounded-md text-[0.82rem] text-(--color-text-secondary) bg-bg-surface tracking-[-0.01em]"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* ── Education ─────────────────────────────────────────── */}
      <section className="mb-14">
        <p className="text-[0.8rem] font-bold tracking-[0.08em] uppercase text-text-muted mb-5">
          {p.education}
        </p>
        <div className="grid grid-cols-[180px_1fr] gap-x-8 gap-y-2 py-6 border-t border-border-subtle border-b sm:grid-cols-1 sm:gap-4">
          <div className="pt-[0.1rem]">
            <p className="text-[0.9375rem] font-bold text-text-primary mb-[0.2rem] tracking-[-0.02em]">
              {p.educationTitle}
            </p>
            <span className="inline-flex items-center gap-[0.3rem] text-[0.85rem] text-(--color-text-secondary) mb-[0.35rem]">
              {p.educationSchool}
            </span>
            <p className="text-[0.78rem] text-text-muted uppercase tracking-[0.04em] font-mono">
              {p.educationPeriod}
            </p>
          </div>
          <div>
            <p className="text-[0.9rem] text-(--color-text-secondary) leading-[1.7] m-0">
              {p.educationDesc}
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────── */}
      <section id="contact" className="mb-14">
        <p className="text-[0.8rem] font-bold tracking-[0.08em] uppercase text-text-muted mb-5">
          Get In Touch
        </p>
        <div className="flex flex-col gap-2 max-w-140">
          {/* Email */}
          <a
            href={`mailto:${p.contactEmail}`}
            className={cn(
              "flex items-center gap-4 px-5 py-4",
              "border border-border-subtle rounded-[10px]",
              "transition-[border-color,background] duration-200",
              "hover:border-border-hover hover:bg-[rgba(255,255,255,0.025)] hover:opacity-100"
            )}
            id="contact-email-btn"
          >
            <ContactIcon>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </ContactIcon>
            <div className="flex flex-col gap-[0.1rem] flex-1">
              <span className="text-[0.7rem] font-semibold tracking-[0.06em] text-text-muted font-mono uppercase">EMAIL</span>
              <span className="text-[0.9rem] font-medium text-text-primary tracking-[-0.01em]">{p.contactEmail}</span>
            </div>
          </a>

          {/* Twitter / X */}
          <a
            href="https://x.com/ercanyesil"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-4 px-5 py-4",
              "border border-border-card rounded-[10px]",
              "transition-[border-color,background] duration-200",
              "hover:border-border-hover hover:bg-[rgba(255,255,255,0.025)] hover:opacity-100",
              "group"
            )}
            id="contact-twitter-btn"
          >
            <ContactIcon>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </ContactIcon>
            <div className="flex flex-col gap-[0.1rem] flex-1">
              <span className="text-[0.7rem] font-semibold tracking-[0.06em] text-text-muted font-mono uppercase">TWITTER / X</span>
              <span className="text-[0.9rem] font-medium text-text-primary tracking-[-0.01em]">@ercanyesil</span>
            </div>
            <span className="text-[0.78rem] text-text-muted whitespace-nowrap shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Follow link →
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/ercan-ye%C5%9Fil-4a5b28173/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-4 px-5 py-4",
              "border border-border-subtle rounded-[10px]",
              "transition-[border-color,background] duration-200",
              "hover:border-border-hover hover:bg-[rgba(255,255,255,0.025)] hover:opacity-100"
            )}
            id="contact-linkedin-btn"
          >
            <ContactIcon>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </ContactIcon>
            <div className="flex flex-col gap-[0.1rem] flex-1">
              <span className="text-[0.7rem] font-semibold tracking-[0.06em] text-text-muted font-mono uppercase">LINKEDIN</span>
              <span className="text-[0.9rem] font-medium text-text-primary tracking-[-0.01em]">Ercan Yeşil</span>
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/ercanyesil"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-4 px-5 py-4",
              "border border-border-subtle rounded-[10px]",
              "transition-[border-color,background] duration-200",
              "hover:border-border-hover hover:bg-[rgba(255,255,255,0.025)] hover:opacity-100"
            )}
            id="contact-github-btn"
          >
            <ContactIcon>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </ContactIcon>
            <div className="flex flex-col gap-[0.1rem] flex-1">
              <span className="text-[0.7rem] font-semibold tracking-[0.06em] text-text-muted font-mono uppercase">GITHUB</span>
              <span className="text-[0.9rem] font-medium text-text-primary tracking-[-0.01em]">ercanyesil</span>
            </div>
          </a>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-border-subtle pt-8 flex items-center justify-between flex-wrap gap-3">
        <span className="text-[0.82rem] text-text-muted">
          © 2025 Ercan Yeşil
        </span>
      </footer>
    </main>
  );
}

// ─── Reusable contact card icon wrapper ───────────────────────────────────────
function ContactIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center w-9 h-9 border border-border-subtle rounded-lg text-(--color-text-secondary) shrink-0 transition-[background,color,border-color] duration-200 group-hover:bg-text-primary group-hover:text-bg-base group-hover:border-transparent">
      {children}
    </div>
  );
}
