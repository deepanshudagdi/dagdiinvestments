import { useState, useEffect, useRef } from "react";
const GOOGLE_FORM_URL = "https://forms.gle/xKwwVysuSoQoanvC7";

// ─── GOOGLE FONTS ───────────────────────────────────────────────────────────
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --teal:    #0D5C63;
      --teal-d:  #0A4449;
      --teal-l:  #1A7A83;
      --turq:    #2AABB8;
      --turq-l:  #5BCDD8;
      --amber:   #D4830A;
      --amber-l: #F0A020;
      --offwhite:#F5F2EC;
      --warm:    #EDE8DF;
      --charcoal:#1C1C1A;
      --mid:     #4A4A46;
      --border:  rgba(13,92,99,0.15);
    }

    html { scroll-behavior: smooth; }

    body { font-family: 'Inter', sans-serif; background: var(--offwhite); color: var(--charcoal); overflow-x: hidden; }

    .serif { font-family: 'Playfair Display', serif; }

    /* NAV */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 60px;
      background: rgba(245,242,236,0.92);
      backdrop-filter: blur(12px);
      border-bottom: 0.5px solid var(--border);
      transition: all 0.3s;
    }
    .nav.scrolled { padding: 14px 60px; }
    .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
    .nav-wordmark { font-family: 'Inter', sans-serif; font-weight: 600; font-size: 13px; letter-spacing: 0.18em; color: var(--teal); text-transform: uppercase; }
    .nav-links { display: flex; align-items: center; gap: 36px; list-style: none; }
    .nav-links a { font-size: 12px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--mid); text-decoration: none; transition: color 0.2s; }
    .nav-links a:hover { color: var(--teal); }
    .nav-cta { font-size: 12px; font-weight: 500; letter-spacing: 0.08em; color: var(--offwhite); background: var(--teal); padding: 9px 20px; border: none; cursor: pointer; transition: background 0.2s; text-decoration: none; }
    .nav-cta:hover { background: var(--teal-l); }

    .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; border: none; background: none; padding: 4px; }
    .hamburger span { display: block; width: 22px; height: 1.5px; background: var(--charcoal); transition: all 0.3s; }

    /* HERO */
    .hero {
      min-height: 100vh;
      display: flex; flex-direction: column; justify-content: flex-end;
      padding: 0 60px 80px;
      position: relative;
      overflow: hidden;
      background: var(--charcoal);
    }
    .hero-bg {
      position: absolute; inset: 0;
      background: linear-gradient(160deg, #0A3840 0%, #0D5C63 40%, #0A4449 70%, #1C1C1A 100%);
    }
    .hero-grid {
      position: absolute; inset: 0; opacity: 0.06;
      background-image:
        linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px);
      background-size: 60px 60px;
    }
    .hero-blocks {
      position: absolute; right: 60px; top: 50%; transform: translateY(-50%);
      width: 480px; height: 480px; opacity: 0.12;
    }
    .hero-content { position: relative; z-index: 2; max-width: 900px; }
    .hero-label {
      font-size: 11px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase;
      color: var(--turq-l); margin-bottom: 32px;
      display: flex; align-items: center; gap: 12px;
    }
    .hero-label::before { content: ''; display: block; width: 32px; height: 0.5px; background: var(--turq-l); }
    .hero-h1 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(52px, 8vw, 110px);
      font-weight: 900; line-height: 0.92;
      color: #F5F2EC;
      letter-spacing: -0.02em;
      margin-bottom: 36px;
    }
    .hero-h1 span { color: var(--turq); display: block; }
    .hero-rule { width: 60px; height: 2px; background: var(--amber); margin-bottom: 32px; }
    .hero-sub {
      font-size: clamp(15px, 1.8vw, 18px); font-weight: 300; line-height: 1.6;
      color: rgba(245,242,236,0.7); max-width: 500px; margin-bottom: 48px;
    }
    .hero-ctas { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
    .btn-primary {
      font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--charcoal); background: var(--amber-l);
      padding: 16px 32px; border: none; cursor: pointer; text-decoration: none;
      transition: background 0.2s; display: inline-block;
    }
    .btn-primary:hover { background: #e8b830; }
    .btn-ghost {
      font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;
      color: rgba(245,242,236,0.85); background: transparent;
      padding: 16px 32px; border: 0.5px solid rgba(245,242,236,0.3); cursor: pointer;
      text-decoration: none; transition: all 0.2s; display: inline-block;
    }
    .btn-ghost:hover { border-color: rgba(245,242,236,0.7); color: #F5F2EC; }
    .hero-scroll {
      position: absolute; bottom: 40px; right: 60px; z-index: 2;
      display: flex; flex-direction: column; align-items: center; gap: 8px;
    }
    .hero-scroll span { font-size: 10px; letter-spacing: 0.2em; color: rgba(245,242,236,0.4); text-transform: uppercase; writing-mode: vertical-rl; }
    .scroll-line { width: 0.5px; height: 60px; background: rgba(245,242,236,0.2); position: relative; overflow: hidden; }
    .scroll-line::after { content: ''; position: absolute; top: -100%; left: 0; right: 0; height: 100%; background: var(--turq); animation: scrollDown 2s infinite; }
    @keyframes scrollDown { to { top: 200%; } }

    /* SECTIONS */
    section { padding: 100px 60px; }

    .label-tag {
      font-size: 10px; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase;
      color: var(--teal); display: flex; align-items: center; gap: 10px; margin-bottom: 24px;
    }
    .label-tag::before { content: ''; display: block; width: 24px; height: 0.5px; background: var(--teal); }

    /* INTRO */
    .intro { background: var(--offwhite); }
    .intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
    .intro-left {}
    .intro-h2 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(38px, 5vw, 64px); font-weight: 900; line-height: 1.0;
      letter-spacing: -0.02em; color: var(--charcoal); margin-bottom: 40px;
    }
    .intro-h2 em { font-style: italic; color: var(--teal); }
    .intro-right {}
    .intro-copy { font-size: 17px; font-weight: 300; line-height: 1.8; color: var(--mid); margin-bottom: 60px; }
    .intro-pillars { display: flex; flex-direction: column; gap: 0; }
    .pillar { display: grid; grid-template-columns: 48px 1fr; gap: 20px; align-items: start; padding: 28px 0; border-top: 0.5px solid var(--border); }
    .pillar:last-child { border-bottom: 0.5px solid var(--border); }
    .pillar-num { font-size: 10px; font-weight: 600; letter-spacing: 0.15em; color: var(--amber); padding-top: 3px; }
    .pillar-title { font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--teal); margin-bottom: 6px; }
    .pillar-text { font-size: 14px; color: var(--mid); line-height: 1.6; }

    /* PHILOSOPHY */
    .philosophy { background: var(--teal-d); padding: 100px 60px; }
    .phil-h2 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(36px, 5vw, 64px); font-weight: 900; line-height: 1.05;
      color: var(--offwhite); letter-spacing: -0.02em; margin-bottom: 72px; max-width: 700px;
    }
    .phil-h2 span { color: var(--turq-l); display: block; }
    .phil-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.08); }
    .phil-card {
      background: var(--teal-d); padding: 52px 44px;
      transition: background 0.3s;
      position: relative; overflow: hidden;
    }
    .phil-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: var(--amber); transform: scaleX(0); transform-origin: left;
      transition: transform 0.4s;
    }
    .phil-card:hover { background: rgba(255,255,255,0.04); }
    .phil-card:hover::before { transform: scaleX(1); }
    .phil-icon { width: 40px; height: 40px; margin-bottom: 32px; }
    .phil-title { font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--turq-l); margin-bottom: 16px; }
    .phil-text { font-size: 15px; font-weight: 300; line-height: 1.7; color: rgba(245,242,236,0.65); }

    /* WHAT WE INVEST IN */
    .invest { background: var(--warm); }
    .invest-h2 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(36px, 4.5vw, 58px); font-weight: 900; line-height: 1.05;
      color: var(--charcoal); letter-spacing: -0.02em; margin-bottom: 72px; max-width: 600px;
    }
    .invest-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(13,92,99,0.1); }
    .invest-card {
      background: var(--warm); padding: 44px 36px; cursor: pointer;
      transition: all 0.3s; position: relative; overflow: hidden; min-height: 320px;
      display: flex; flex-direction: column; justify-content: flex-end;
    }
    .invest-card-bg {
      position: absolute; inset: 0; opacity: 0;
      background: var(--teal); transition: opacity 0.4s;
    }
    .invest-card:hover .invest-card-bg { opacity: 1; }
    .invest-card-content { position: relative; z-index: 1; }
    .invest-card-num {
      font-size: 10px; font-weight: 600; letter-spacing: 0.2em; color: var(--amber);
      margin-bottom: 20px; transition: color 0.3s;
    }
    .invest-card:hover .invest-card-num { color: var(--amber-l); }
    .invest-card-title {
      font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700;
      color: var(--charcoal); margin-bottom: 14px; transition: color 0.3s;
    }
    .invest-card:hover .invest-card-title { color: var(--offwhite); }
    .invest-card-text {
      font-size: 13px; font-weight: 300; line-height: 1.6; color: var(--mid);
      transition: color 0.3s;
    }
    .invest-card:hover .invest-card-text { color: rgba(245,242,236,0.75); }
    .invest-geo {
      width: 56px; height: 56px; margin-bottom: 40px;
      transition: transform 0.4s;
    }
    .invest-card:hover .invest-geo { transform: scale(1.1) rotate(5deg); }

    /* APPROACH */
    .approach { background: var(--offwhite); }
    .approach-h2 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(36px, 4.5vw, 56px); font-weight: 900; line-height: 1.0;
      color: var(--charcoal); letter-spacing: -0.02em; margin-bottom: 80px; max-width: 600px;
    }
    .approach-h2 span { display: block; color: var(--teal); }
    .steps { display: flex; flex-direction: column; gap: 0; }
    .step {
      display: grid; grid-template-columns: 80px 200px 1fr;
      align-items: start; padding: 36px 0;
      border-top: 0.5px solid var(--border);
      position: relative;
    }
    .step:last-child { border-bottom: 0.5px solid var(--border); }
    .step-num { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; color: var(--amber); padding-top: 4px; }
    .step-title { font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--teal); padding-top: 4px; }
    .step-text { font-size: 15px; font-weight: 300; line-height: 1.7; color: var(--mid); }
    .step-connector {
      position: absolute; left: 32px; top: 60px; bottom: -24px; width: 0.5px;
      background: rgba(13,92,99,0.15);
    }
    .step:last-child .step-connector { display: none; }

    /* WHY DAGDI */
    .why { background: var(--charcoal); padding: 100px 60px; }
    .why-top { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: end; margin-bottom: 72px; }
    .why-h2 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(36px, 4.5vw, 58px); font-weight: 900; line-height: 1.05;
      color: var(--offwhite); letter-spacing: -0.02em;
    }
    .why-sub { font-size: 15px; font-weight: 300; line-height: 1.7; color: rgba(245,242,236,0.55); }
    .why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(255,255,255,0.06); }
    .why-card { background: var(--charcoal); padding: 44px 36px; border-top: 2px solid transparent; transition: border-color 0.3s; }
    .why-card:hover { border-top-color: var(--turq); }
    .why-card-title { font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--turq-l); margin-bottom: 16px; }
    .why-card-text { font-size: 14px; font-weight: 300; line-height: 1.7; color: rgba(245,242,236,0.55); }

    /* PORTFOLIO */
    .portfolio { background: var(--offwhite); }
    .port-h2 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(36px, 4.5vw, 56px); font-weight: 900;
      color: var(--charcoal); letter-spacing: -0.02em; margin-bottom: 60px; max-width: 600px;
    }
    .port-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(13,92,99,0.1); margin-bottom: 48px; }
    .port-card { background: var(--offwhite); padding: 44px 36px; position: relative; overflow: hidden; }
    .port-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--amber); transform: scaleX(0); transform-origin: left; transition: transform 0.4s; }
    .port-card:hover::after { transform: scaleX(1); }
    .port-placeholder {
      width: 100%; height: 180px; background: var(--warm);
      border: 0.5px solid var(--border); margin-bottom: 28px;
      display: flex; align-items: center; justify-content: center;
    }
    .port-placeholder span { font-size: 10px; letter-spacing: 0.15em; color: rgba(74,74,70,0.4); text-transform: uppercase; }
    .port-type { font-size: 10px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--amber); margin-bottom: 8px; }
    .port-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--charcoal); margin-bottom: 8px; }
    .port-loc { font-size: 12px; color: var(--mid); margin-bottom: 16px; display: flex; align-items: center; gap: 6px; }
    .port-thesis { font-size: 13px; font-weight: 300; line-height: 1.6; color: var(--mid); }
    .port-note { font-size: 11px; color: rgba(74,74,70,0.5); font-style: italic; text-align: center; }

    /* ABOUT */
    .about { background: var(--teal-d); padding: 100px 60px; }
    .about-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: center; }
    .about-h2 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(36px, 4.5vw, 58px); font-weight: 900; line-height: 1.0;
      color: var(--offwhite); letter-spacing: -0.02em; margin-bottom: 32px;
    }
    .about-h2 span { color: var(--turq-l); display: block; }
    .about-copy { font-size: 16px; font-weight: 300; line-height: 1.8; color: rgba(245,242,236,0.65); margin-bottom: 24px; }
    .about-highlight {
      font-size: 13px; font-weight: 500; letter-spacing: 0.04em; color: var(--turq-l);
      padding: 20px 24px; border-left: 2px solid var(--amber);
      background: rgba(255,255,255,0.04);
    }
    .about-vis { display: flex; align-items: center; justify-content: center; }

    /* CONTACT */
    .contact { background: var(--teal); padding: 120px 60px; }
    .contact-inner { max-width: 800px; }
    .contact-h2 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(42px, 6vw, 80px); font-weight: 900; line-height: 0.95;
      color: var(--offwhite); letter-spacing: -0.03em; margin-bottom: 32px;
    }
    .contact-sub { font-size: 17px; font-weight: 300; color: rgba(245,242,236,0.7); margin-bottom: 52px; max-width: 500px; line-height: 1.6; }
    .contact-info { display: flex; flex-direction: column; gap: 16px; margin-top: 56px; padding-top: 40px; border-top: 0.5px solid rgba(245,242,236,0.2); }
    .contact-item { display: flex; align-items: center; gap: 16px; }
    .contact-label { font-size: 10px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(245,242,236,0.5); width: 70px; }
    .contact-val { font-size: 14px; color: rgba(245,242,236,0.85); }

    .btn-amber {
      font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--charcoal); background: var(--amber-l);
      padding: 18px 40px; border: none; cursor: pointer; text-decoration: none;
      display: inline-flex; align-items: center; gap: 10px;
      transition: background 0.2s;
    }
    .btn-amber:hover { background: #e8b830; }

    /* FOOTER */
    footer { background: var(--charcoal); padding: 60px; border-top: 0.5px solid rgba(255,255,255,0.08); }
    .footer-inner { display: grid; grid-template-columns: 1fr auto; gap: 40px; align-items: start; }
    .footer-brand { font-size: 12px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,242,236,0.5); margin-top: 10px; }
    .footer-tagline { font-size: 11px; color: rgba(245,242,236,0.3); margin-top: 6px; letter-spacing: 0.06em; }
    .footer-links { display: flex; gap: 32px; list-style: none; }
    .footer-links a { font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(245,242,236,0.4); text-decoration: none; transition: color 0.2s; }
    .footer-links a:hover { color: var(--turq-l); }
    .footer-copy { font-size: 11px; color: rgba(245,242,236,0.25); margin-top: 40px; }

    /* MOBILE */
    .mobile-menu {
      position: fixed; inset: 0; z-index: 200; background: var(--charcoal);
      display: flex; flex-direction: column; padding: 80px 40px 40px;
      transform: translateX(100%); transition: transform 0.35s cubic-bezier(.4,0,.2,1);
    }
    .mobile-menu.open { transform: translateX(0); }
    .mobile-menu a { font-size: 28px; font-family: 'Playfair Display', serif; font-weight: 700; color: var(--offwhite); text-decoration: none; padding: 20px 0; border-bottom: 0.5px solid rgba(255,255,255,0.08); display: block; }
    .mobile-menu a:hover { color: var(--turq-l); }
    .mobile-close { position: absolute; top: 24px; right: 24px; background: none; border: none; cursor: pointer; color: var(--offwhite); font-size: 24px; }

    /* REVEAL ANIMATIONS */
    .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-delay-1 { transition-delay: 0.1s; }
    .reveal-delay-2 { transition-delay: 0.2s; }
    .reveal-delay-3 { transition-delay: 0.3s; }
    .reveal-delay-4 { transition-delay: 0.4s; }

    @media (max-width: 900px) {
      /* NAV */
      .nav { padding: 16px 24px; }
      .nav.scrolled { padding: 12px 24px; }
      .nav-links { display: none; }
      .nav-cta { display: none; }
      .hamburger { display: flex; }

      /* SECTIONS */
      section { padding: 64px 24px; }

      /* HERO */
      .hero { padding: 0 24px 72px; min-height: 100svh; justify-content: flex-end; }
      .hero-blocks { display: none; }
      .hero-scroll { display: none; }
      .hero-label { margin-bottom: 20px; font-size: 10px; }
      .hero-h1 { font-size: clamp(44px, 12vw, 72px); margin-bottom: 24px; }
      .hero-rule { margin-bottom: 20px; }
      .hero-sub { font-size: 15px; margin-bottom: 36px; }
      .hero-ctas { flex-direction: column; align-items: flex-start; gap: 14px; }
      .btn-primary { width: 100%; text-align: center; justify-content: center; padding: 18px 24px; font-size: 13px; }
      .btn-ghost { width: 100%; text-align: center; padding: 18px 24px; font-size: 13px; }

      /* INTRO */
      .intro-grid { grid-template-columns: 1fr; gap: 36px; }
      .intro-h2 { font-size: clamp(32px, 9vw, 52px); margin-bottom: 0; }
      .intro-copy { font-size: 15px; margin-bottom: 40px; }
      .pillar { grid-template-columns: 40px 1fr; gap: 14px; padding: 22px 0; }
      .pillar-text { font-size: 13px; }

      /* PHILOSOPHY */
      .philosophy { padding: 64px 24px; }
      .phil-h2 { font-size: clamp(28px, 8vw, 48px); margin-bottom: 48px; }
      .phil-cards { grid-template-columns: 1fr; gap: 1px; }
      .phil-card { padding: 36px 28px; }

      /* ABOUT */
      .about { padding: 64px 24px; }
      .about-inner { grid-template-columns: 1fr; gap: 40px; }
      .about-vis { display: none; }
      .about-h2 { font-size: clamp(30px, 8vw, 48px); margin-bottom: 24px; }
      .about-copy { font-size: 15px; }
      .about-highlight { font-size: 13px; padding: 16px 18px; }

      /* CONTACT */
      .contact { padding: 72px 24px; }
      .contact-h2 { font-size: clamp(38px, 10vw, 64px); }
      .contact-sub { font-size: 15px; margin-bottom: 36px; }
      .btn-amber { width: 100%; justify-content: center; padding: 18px 24px; font-size: 13px; }
      .contact-info { margin-top: 40px; padding-top: 32px; gap: 20px; }
      .contact-item { flex-direction: column; align-items: flex-start; gap: 4px; }
      .contact-label { width: auto; }
      .contact-val { font-size: 15px; }

      /* FOOTER */
      footer { padding: 48px 24px; }
      .footer-inner { grid-template-columns: 1fr; gap: 32px; }
      .footer-links { flex-wrap: wrap; gap: 16px 24px; }
      .footer-copy { margin-top: 28px; }

      /* MOBILE MENU */
      .mobile-menu { padding: 100px 32px 48px; }
      .mobile-menu a { font-size: 32px; padding: 22px 0; }
    }

    @media (max-width: 600px) {
      section { padding: 56px 20px; }
      .hero { padding: 0 20px 60px; }

      /* HERO full-width button */
      .hero-ctas { width: 100%; }
      .btn-primary, .btn-ghost { width: 100%; box-sizing: border-box; display: block; text-align: center; }

      /* INTRO */
      .intro-copy { font-size: 14px; }
      .pillar { padding: 18px 0; }

      /* ABOUT */
      .about-h2 { line-height: 1.05; }

      /* CONTACT */
      .contact-h2 { line-height: 0.9; }

      /* FOOTER */
      .footer-links { gap: 12px 20px; }
      .nav-wordmark { font-size: 11px; letter-spacing: 0.12em; }
    }
  `}</style>
);

// ─── GEOMETRIC LOGO MARK ───────────────────────────────────────────────────
const LogoMark = ({ size = 36 }) => (
  <img
    src="/logo.png"
    alt="Dagdi Investments"
    width={size}
    height={size}
    style={{
      objectFit: "contain",
      display: "block",
    }}
  />
);

// Large decorative version
const LogoBlocks = ({ opacity = 0.12 }) => (
  <svg viewBox="0 0 300 300" fill="none" style={{ width: "100%", height: "100%" }} aria-hidden="true">
    <rect x="40" y="160" width="100" height="100" fill="#2AABB8" opacity={opacity * 8} />
    <rect x="120" y="80" width="100" height="100" fill="#5BCDD8" opacity={opacity * 6} />
    <rect x="40" y="80" width="80" height="80" fill="#1A7A83" opacity={opacity * 5} />
    <rect x="120" y="160" width="30" height="30" fill="#1A7A83" opacity={opacity * 4} />
    <rect x="180" y="40" width="60" height="40" fill="#D4830A" opacity={opacity * 7} />
    <rect x="40" y="40" width="80" height="40" fill="#2AABB8" opacity={opacity * 4} />
  </svg>
);

// ─── HOOK: INTERSECTION OBSERVER ──────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── COMPONENTS ────────────────────────────────────────────────────────────
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`} role="navigation" aria-label="Main navigation">
        <a href="#hero" className="nav-logo">
          <LogoMark size={32} />
          <span className="nav-wordmark">Dagdi Investments</span>
        </a>
        <ul className="nav-links">
          {["About", "Contact"].map((l) => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
        <a href="#contact" className="nav-cta">Start a Conversation</a>
        <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <span/><span/><span/>
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-label="Navigation menu">
        <button className="mobile-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>✕</button>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "48px" }}>
          <LogoMark size={28} />
          <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em", color: "rgba(245,242,236,0.5)", textTransform: "uppercase" }}>Dagdi Investments</span>
        </div>
        {["About", "Contact"].map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
        <div style={{ marginTop: "auto", paddingTop: "40px" }}>
          <a href="#contact" onClick={() => setMenuOpen(false)} style={{ display: "block", background: "var(--amber-l)", color: "var(--charcoal)", textAlign: "center", padding: "18px 24px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'Inter', sans-serif" }}>
            Start a Conversation →
          </a>
          <p style={{ fontSize: "11px", color: "rgba(245,242,236,0.25)", marginTop: "24px", letterSpacing: "0.06em" }}>Real Estate • Investments • Long-Term Value</p>
        </div>
      </div>
    </>
  );
};

const Hero = () => (
  <section id="hero" className="hero" aria-labelledby="hero-heading">
    <div className="hero-bg" />
    <div className="hero-grid" />
    <div className="hero-blocks" aria-hidden="true"><LogoBlocks opacity={1} /></div>
    <div className="hero-content">
      <p className="hero-label">Dagdi Investments</p>
      <h1 id="hero-heading" className="hero-h1">
        Built on<br /><span>Solid Ground.</span>
      </h1>
      <div className="hero-rule" />
      <p className="hero-sub">Strategic real estate investments built for long-term value.</p>
      <div className="hero-ctas">
        <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" > Start a Conversation </a>
      </div>
    </div>
    <div className="hero-scroll" aria-hidden="true">
      <span>Scroll</span>
      <div className="scroll-line" />
    </div>
  </section>
);

const Intro = () => (
  <section id="about" className="intro" aria-labelledby="intro-heading">
    <div className="label-tag reveal">Dagdi Investments</div>
    <div className="intro-grid">
      <div className="intro-left">
        <h2 id="intro-heading" className="intro-h2 reveal reveal-delay-1">
          Real estate.<br /><em>Viewed differently.</em>
        </h2>
      </div>
      <div className="intro-right">
        <p className="intro-copy reveal reveal-delay-2">
          Dagdi Investments approaches real estate as a productive, long-term asset class. We don't trade paper or chase quick flips — we deploy capital into tangible opportunities where active ownership, smart leverage, and maximum utilization build enduring, compound value.
        </p>
        <div className="intro-pillars">
          {[
            { n: "01", t: "Owning Assets", d: "Securing tangible property built on solid ground." },
            { n: "02", t: "Smart Leverage", d: "Deploying controlled capital to scale responsibly." },
            { n: "03", t: "Asset Utilization", d: "Putting every square foot to active, productive work." },
          ].map(({ n, t, d }, i) => (
            <div className={`pillar reveal reveal-delay-${i + 2}`} key={n}>
              <span className="pillar-num">{n}</span>
              <div>
                <div className="pillar-title">{t}</div>
                <div className="pillar-text">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Philosophy = () => (
  <section id="philosophy" className="philosophy" aria-labelledby="phil-heading">
    <h2 id="phil-heading" className="phil-h2 reveal">
      We don't chase property.<br /><span>We build position.</span>
    </h2>
    <div className="phil-cards">
      {[
        {
          icon: (
            <svg viewBox="0 0 40 40" fill="none" className="phil-icon">
              <rect x="4" y="24" width="16" height="12" fill="#2AABB8" opacity="0.4"/>
              <rect x="16" y="16" width="16" height="12" fill="#5BCDD8" opacity="0.4"/>
              <rect x="4" y="16" width="12" height="8" fill="#1A7A83" opacity="0.4"/>
              <circle cx="30" cy="10" r="4" fill="#D4830A" opacity="0.7"/>
            </svg>
          ),
          t: "Location",
          d: "Understanding where value is moving — not just where it is today. We study economic forces, infrastructure and demographic shifts before any address matters.",
        },
        {
          icon: (
            <svg viewBox="0 0 40 40" fill="none" className="phil-icon">
              <rect x="4" y="28" width="8" height="8" fill="#2AABB8" opacity="0.4"/>
              <rect x="16" y="20" width="8" height="16" fill="#5BCDD8" opacity="0.4"/>
              <rect x="28" y="12" width="8" height="24" fill="#D4830A" opacity="0.5"/>
              <line x1="4" y1="36" x2="36" y2="36" stroke="rgba(245,242,236,0.2)" strokeWidth="0.5"/>
            </svg>
          ),
          t: "Fundamentals",
          d: "Evaluating demand, accessibility, development and long-term potential. Every opportunity must stand on its own merits — not on market momentum.",
        },
        {
          icon: (
            <svg viewBox="0 0 40 40" fill="none" className="phil-icon">
              <circle cx="20" cy="20" r="15" stroke="rgba(42,171,184,0.3)" strokeWidth="0.5"/>
              <circle cx="20" cy="20" r="8" stroke="rgba(42,171,184,0.5)" strokeWidth="0.5"/>
              <circle cx="20" cy="20" r="2" fill="#D4830A"/>
              <line x1="20" y1="12" x2="20" y2="20" stroke="#5BCDD8" strokeWidth="1" strokeLinecap="round"/>
              <line x1="20" y1="20" x2="27" y2="20" stroke="rgba(245,242,236,0.4)" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          ),
          t: "Time",
          d: "Building value through patience and disciplined ownership. We think in years, not quarters — durable appreciation rather than short-term speculation.",
        },
      ].map(({ icon, t, d }, i) => (
        <div className={`phil-card reveal reveal-delay-${i + 1}`} key={t}>
          {icon}
          <div className="phil-title">{t}</div>
          <p className="phil-text">{d}</p>
        </div>
      ))}
    </div>
  </section>
);

const WhatWeInvest = () => {
  const items = [
    {
      n: "01", t: "Residential",
      d: "Strategically selected residential assets in locations with durable demand.",
      icon: (
        <svg viewBox="0 0 56 56" fill="none" className="invest-geo">
          <rect x="8" y="28" width="20" height="20" fill="#0D5C63" opacity="0.5"/>
          <rect x="24" y="18" width="20" height="20" fill="#2AABB8" opacity="0.5"/>
          <rect x="8" y="18" width="16" height="10" fill="#1A7A83" opacity="0.5"/>
        </svg>
      ),
    },
    {
      n: "02", t: "Commercial",
      d: "Properties positioned around economic activity and long-term demand.",
      icon: (
        <svg viewBox="0 0 56 56" fill="none" className="invest-geo">
          <rect x="8" y="12" width="12" height="36" fill="#0D5C63" opacity="0.5"/>
          <rect x="22" y="20" width="12" height="28" fill="#2AABB8" opacity="0.5"/>
          <rect x="36" y="28" width="12" height="20" fill="#1A7A83" opacity="0.5"/>
          <rect x="8" y="8" width="6" height="4" fill="#D4830A" opacity="0.7"/>
        </svg>
      ),
    },
    {
      n: "03", t: "Land",
      d: "Land assets with strong location fundamentals and future development potential.",
      icon: (
        <svg viewBox="0 0 56 56" fill="none" className="invest-geo">
          <rect x="6" y="32" width="44" height="12" fill="#0D5C63" opacity="0.3"/>
          <rect x="14" y="18" width="28" height="14" fill="#2AABB8" opacity="0.4"/>
          <polygon points="28,8 14,18 42,18" fill="#1A7A83" opacity="0.4"/>
          <rect x="22" y="8" width="4" height="2" fill="#D4830A" opacity="0.8"/>
        </svg>
      ),
    },
    {
      n: "04", t: "Opportunities",
      d: "Selective investments where disciplined capital can unlock exceptional value.",
      icon: (
        <svg viewBox="0 0 56 56" fill="none" className="invest-geo">
          <rect x="8" y="28" width="18" height="18" fill="#0D5C63" opacity="0.4" transform="rotate(-10 8 28)"/>
          <rect x="22" y="18" width="18" height="18" fill="#2AABB8" opacity="0.4" transform="rotate(5 22 18)"/>
          <rect x="16" y="8" width="12" height="12" fill="#D4830A" opacity="0.5"/>
        </svg>
      ),
    },
  ];
  return (
    <section id="portfolio" className="invest" aria-labelledby="invest-heading">
      <div className="label-tag reveal">Where We See Value</div>
      <h2 id="invest-heading" className="invest-h2 reveal reveal-delay-1">
        Built around<br />enduring demand.
      </h2>
      <div className="invest-grid">
        {items.map(({ n, t, d, icon }, i) => (
          <div className={`invest-card reveal reveal-delay-${i + 1}`} key={n}>
            <div className="invest-card-bg" />
            <div className="invest-card-content">
              {icon}
              <div className="invest-card-num">{n}</div>
              <div className="invest-card-title">{t}</div>
              <p className="invest-card-text">{d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Approach = () => (
  <section id="approach" className="approach" aria-labelledby="approach-heading">
    <div className="label-tag reveal">The Dagdi Approach</div>
    <h2 id="approach-heading" className="approach-h2 reveal reveal-delay-1">
      From opportunity<br /><span>to ownership.</span>
    </h2>
    <div className="steps">
      {[
        { n: "01", t: "Identify", d: "Find opportunities with compelling fundamentals — locations where demand, growth potential and value creation converge." },
        { n: "02", t: "Analyze", d: "Study the location, market dynamics, supply constraints, infrastructure and the economics behind the opportunity." },
        { n: "03", t: "Underwrite", d: "Evaluate risk, value and potential through disciplined financial analysis. Every number must make sense before we proceed." },
        { n: "04", t: "Acquire", d: "Deploy capital selectively and with conviction — only when the opportunity meets our criteria on price, location and potential." },
        { n: "05", t: "Create Value", d: "Hold, improve and manage assets with a long-term perspective. Value is built through time, not transactions." },
      ].map(({ n, t, d }, i) => (
        <div className={`step reveal reveal-delay-${(i % 3) + 1}`} key={n}>
          <div className="step-connector" aria-hidden="true" />
          <span className="step-num">{n}</span>
          <span className="step-title">{t}</span>
          <p className="step-text">{d}</p>
        </div>
      ))}
    </div>
  </section>
);

const WhyDagdi = () => (
  <section className="why" aria-labelledby="why-heading">
    <div className="why-top">
      <h2 id="why-heading" className="why-h2 reveal serif">Built for<br />the long term.</h2>
      <p className="why-sub reveal reveal-delay-1">
        Dagdi Investments combines deep local market understanding with the discipline of institutional investment thinking.
      </p>
    </div>
    <div className="why-grid">
      {[
        { t: "Local Intelligence", d: "Deep understanding of the specific markets, locations and dynamics we operate in." },
        { t: "Disciplined Capital", d: "Every investment must have a clear reason. We would rather miss an opportunity than force one." },
        { t: "Long-Term Thinking", d: "We optimize for durable value creation, not short-term noise or market cycles." },
        { t: "Selective Approach", d: "Quality over quantity. Fewer, better investments held with conviction." },
      ].map(({ t, d }, i) => (
        <div className={`why-card reveal reveal-delay-${i + 1}`} key={t}>
          <div className="why-card-title">{t}</div>
          <p className="why-card-text">{d}</p>
        </div>
      ))}
    </div>
  </section>
);

const Portfolio = () => (
  <section className="portfolio" aria-labelledby="port-heading">
    <div className="label-tag reveal">Selected Opportunities</div>
    <h2 id="port-heading" className="port-h2 reveal reveal-delay-1">A disciplined<br />approach to assets.</h2>
    <div className="port-grid">
      {[
        { type: "Residential Development", loc: "Beawar, Rajasthan", thesis: "Residential asset in a growing secondary city with improving infrastructure and sustained housing demand." },
        { type: "Land Investment", loc: "Rajasthan", thesis: "Land positioned along a developing corridor with long-term appreciation potential tied to economic activity." },
        { type: "Opportunity", loc: "Placeholder Location", thesis: "This card will display a real portfolio asset once details are provided." },
      ].map(({ type, loc, thesis }, i) => (
        <div className={`port-card reveal reveal-delay-${i + 1}`} key={i}>
          <div className="port-placeholder"><span>Image Placeholder</span></div>
          <div className="port-type">{type}</div>
          <div className="port-title">{loc}</div>
          <div className="port-loc">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="0.8"/>
              <circle cx="5" cy="5" r="1.5" fill="currentColor"/>
            </svg>
            Investment Thesis
          </div>
          <p className="port-thesis">{thesis}</p>
        </div>
      ))}
    </div>
    <p className="port-note">Portfolio details are placeholders. Real asset information will be added by Dagdi Investments.</p>
  </section>
);

const About = () => (
  <section className="about" aria-labelledby="about-heading">
    <div className="about-inner">
      <div>
        <div className="label-tag reveal" style={{ color: "var(--turq-l)" }}>
          <span style={{ background: "var(--turq-l)", height: "0.5px", width: "24px", display: "inline-block", marginRight: "10px" }} />
          About Us
        </div>
        <h2 id="about-heading" className="about-h2 reveal reveal-delay-1">
          Own the asset.<br />Put it to work.<br /><span>Grow with conviction.</span>
        </h2>
        <p className="about-copy reveal reveal-delay-2">
          At Dagdi Investments, we believe in owning and utilizing assets — not trading them. Real wealth creation comes from productive, hands-on ownership, not from trying to time market swings or flip positions for quick gains.
        </p>
        <p className="about-copy reveal reveal-delay-3">
          We put capital into assets, businesses, and resources where we can actively generate utility, drive real-world value, and build stable, cash-flowing foundations.
        </p>
        <div className="about-highlight reveal reveal-delay-4">
          We take a patient, grounded approach. We invest strictly in what we understand, put those assets to work, and hold them with long-term conviction.
        </div>
      </div>
      <div className="about-vis" aria-hidden="true">
        <svg viewBox="0 0 320 320" fill="none" style={{ width: "100%", maxWidth: "320px" }}>
          <rect x="40" y="180" width="100" height="100" fill="#2AABB8" opacity="0.15"/>
          <rect x="120" y="100" width="100" height="100" fill="#5BCDD8" opacity="0.1"/>
          <rect x="40" y="100" width="80" height="80" fill="#1A7A83" opacity="0.12"/>
          <rect x="120" y="180" width="34" height="34" fill="#1A7A83" opacity="0.1"/>
          <rect x="180" y="60" width="60" height="40" fill="#D4830A" opacity="0.2"/>
          <rect x="40" y="60" width="80" height="40" fill="#2AABB8" opacity="0.08"/>
          <rect x="40" y="180" width="100" height="100" stroke="rgba(42,171,184,0.3)" strokeWidth="0.5" fill="none"/>
          <rect x="120" y="100" width="100" height="100" stroke="rgba(42,171,184,0.2)" strokeWidth="0.5" fill="none"/>
          <rect x="180" y="60" width="60" height="40" stroke="rgba(212,131,10,0.4)" strokeWidth="0.5" fill="none"/>
        </svg>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="contact" aria-labelledby="contact-heading">
    <div className="contact-inner">
      <div className="label-tag reveal" style={{ color: "rgba(245,242,236,0.5)" }}>
        <span style={{ background: "rgba(245,242,236,0.3)", height: "0.5px", width: "24px", display: "inline-block" }} />
        Get In Touch
      </div>
      <h2 id="contact-heading" className="contact-h2 reveal reveal-delay-1">
        Let's build<br />what lasts.
      </h2>
      <p className="contact-sub reveal reveal-delay-2">
        Have a property, investment opportunity or partnership worth discussing?
      </p>
      <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-amber reveal reveal-delay-3" > Start a Conversation → </a>
      <div className="contact-info reveal reveal-delay-4">
        {[
          { l: "Email", v: "support@dagdiinvestments.com" },
          { l: "Phone", v: "+91 8197344182" },
          { l: "Office", v: "College Road, In Front of Shani Mandir, Beawar, Rajasthan, India" },
        ].map(({ l, v }) => (
          <div className="contact-item" key={l}>
            <span className="contact-label">{l}</span>
            <span className="contact-val">{v}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer role="contentinfo">
    <div className="footer-inner">
      <div>
        <a href="#hero" className="nav-logo" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "10px" }}>
          <LogoMark size={28} />
          <span className="footer-brand">Dagdi Investments</span>
        </a>
        <p className="footer-tagline">Real Estate • Investments • Long-Term Value</p>
      </div>
      <ul className="footer-links">
        {["About", "Contact"].map((l) => (
          <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
        ))}
      </ul>
    </div>
    <p className="footer-copy">© 2026 Dagdi Investments. All rights reserved.</p>
  </footer>
);

// ─── APP ───────────────────────────────────────────────────────────────────
export default function DagdiInvestments() {
  useReveal();
  return (
    <>
      <FontLink />
      <a href="#main" style={{ position: "absolute", left: "-9999px", top: 0, zIndex: 9999, background: "var(--teal)", color: "#fff", padding: "8px 16px" }} className="skip-link">
        Skip to main content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Intro />

        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
