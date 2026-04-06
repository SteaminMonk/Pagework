/*
 ============================================================
 TAILWIND CONFIG REQUIREMENTS (tailwind.config.js)
 ============================================================
 module.exports = {
   darkMode: 'class',
   theme: {
     extend: {
       colors: {
         cyan: { electric: '#00f2ff' },
         lavender: { soft: '#8b5cf6' },
         void: '#050505',
       },
       fontFamily: {
         display: ['"Syne"', 'sans-serif'],
         body: ['"DM Sans"', 'sans-serif'],
         mono: ['"JetBrains Mono"', 'monospace'],
       },
       animation: {
         'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
         'scan-line': 'scanLine 4s linear infinite',
         'float': 'float 6s ease-in-out infinite',
         'rotate-slow': 'rotateSlow 20s linear infinite',
       },
       keyframes: {
         pulseGlow: {
           '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
           '50%': { opacity: '1', transform: 'scale(1.05)' },
         },
         scanLine: {
           '0%': { transform: 'translateY(-100%)' },
           '100%': { transform: 'translateY(100vh)' },
         },
         float: {
           '0%, 100%': { transform: 'translateY(0px)' },
           '50%': { transform: 'translateY(-20px)' },
         },
         rotateSlow: {
           from: { transform: 'rotate(0deg)' },
           to: { transform: 'rotate(360deg)' },
         },
       },
       backdropBlur: { xs: '2px' },
       backgroundImage: {
         'grid-cyan': "linear-gradient(rgba(0,242,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,255,0.03) 1px, transparent 1px)",
         'radial-glow': 'radial-gradient(ellipse at center, rgba(0,242,255,0.15) 0%, transparent 70%)',
       },
       backgroundSize: { 'grid': '60px 60px' },
     },
   },
   plugins: [],
 }
 ============================================================
 REQUIRED GOOGLE FONTS (add to index.html <head>):
 <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet">
 ============================================================
 NPM DEPENDENCIES: framer-motion lucide-react
 ============================================================
*/

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import {
  Shield, TrendingUp, Activity, FlaskConical, Clock, ChevronRight,
  BarChart3, Zap, Lock, CheckCircle2, AlertTriangle, XCircle,
  ArrowRight, Mail, Phone, MapPin, Menu, X, Star, Layers,
  Microscope, HeartPulse, Pill, Package, FileCheck, RefreshCw,
  Users, DollarSign, Target, Gauge
} from "lucide-react";

// ─── Spring Config ────────────────────────────────────────────────────────────
const SPRING = { type: "spring", stiffness: 100, damping: 20 };
const SPRING_FAST = { type: "spring", stiffness: 200, damping: 25 };
const SPRING_SLOW = { type: "spring", stiffness: 60, damping: 18 };

// ─── Reveal Animation Variants ────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { ...SPRING } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};
const staggerChildren = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Utility: Animated Number ─────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }) {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    let start = displayed;
    const end = value;
    if (start === end) return;
    const duration = 800;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = (end - start) / steps;
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        setDisplayed(end);
        clearInterval(timer);
      } else {
        setDisplayed(current);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);
  return (
    <span>
      {prefix}{decimals > 0 ? displayed.toFixed(decimals) : Math.round(displayed).toLocaleString()}{suffix}
    </span>
  );
}

// ─── Background: Grid + Orbs ──────────────────────────────────────────────────
function BackgroundCanvas() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: "linear-gradient(rgba(0,242,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Ambient orbs */}
      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(0,242,255,0.06) 0%, transparent 70%)",
          top: "-200px", left: "-200px",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)",
          bottom: "-100px", right: "-100px",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,242,255,0.3), transparent)" }}
        animate={{ top: ["-1%", "101%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
      />
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Services", "ROI Engine", "Compliance", "About", "Contact"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase().replace(" ", "-"))?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...SPRING, delay: 0.2 }}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
            scrolled
              ? "backdrop-blur-xl bg-black/40 border border-white/10 shadow-[0_0_40px_rgba(0,242,255,0.05)]"
              : "backdrop-blur-sm bg-transparent"
          }`}
        >
          {/* Logo */}
          <motion.div className="flex items-center gap-3 cursor-pointer" whileHover={{ scale: 1.02 }} transition={SPRING_FAST}>
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 opacity-20 blur-sm" />
              <div className="relative w-full h-full rounded-lg border border-cyan-400/40 flex items-center justify-center">
                <FlaskConical size={16} className="text-cyan-400" />
              </div>
            </div>
            <span className="font-display font-700 text-white text-lg tracking-tight" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
              RxForge<span className="text-cyan-400">.</span>
            </span>
          </motion.div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <motion.button
                key={l}
                onClick={() => scrollTo(l)}
                className="px-4 py-2 text-sm text-white/60 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/5 font-body"
                style={{ fontFamily: "DM Sans, sans-serif" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING_FAST}
              >
                {l}
              </motion.button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-black relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #00f2ff, #8b5cf6)",
                fontFamily: "DM Sans, sans-serif",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,242,255,0.4)" }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING_FAST}
              onClick={() => scrollTo("contact")}
            >
              <span className="relative z-10 font-semibold">Book Audit</span>
            </motion.button>
          </div>

          {/* Mobile menu toggle */}
          <motion.button
            className="md:hidden text-white/70 hover:text-cyan-400"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-28 px-8 backdrop-blur-2xl bg-black/80"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={SPRING}
          >
            {links.map((l, i) => (
              <motion.button
                key={l}
                onClick={() => scrollTo(l)}
                className="text-left py-4 text-2xl font-display text-white/80 hover:text-cyan-400 border-b border-white/5 transition-colors"
                style={{ fontFamily: "Syne, sans-serif" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...SPRING, delay: i * 0.06 }}
              >
                {l}
              </motion.button>
            ))}
            <motion.button
              className="mt-8 px-6 py-4 rounded-xl text-black font-semibold text-lg"
              style={{ background: "linear-gradient(135deg, #00f2ff, #8b5cf6)", fontFamily: "DM Sans, sans-serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => scrollTo("contact")}
            >
              Book Your Free Audit
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const onMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const stats = [
    { value: "340+", label: "Pharmacies Optimized" },
    { value: "$12M+", label: "Waste Recovered" },
    { value: "99.8%", label: "Compliance Rate" },
    { value: "48h", label: "Avg. Audit Turnaround" },
  ];

  return (
    <section
      ref={heroRef}
      id="hero"
      onMouseMove={onMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Glow-follow effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(ellipse 600px 500px at ${mousePos.x}% ${mousePos.y}%, rgba(0,242,255,0.07) 0%, transparent 70%)`,
        }}
      />

      {/* Floating geometric accent */}
      <motion.div
        className="absolute top-32 right-20 w-48 h-48 opacity-20 hidden lg:block"
        style={{ y }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full border border-cyan-400/30 rounded-full" />
        <div className="absolute inset-4 border border-violet-500/30 rounded-full" style={{ transform: "rotate(45deg)" }} />
        <div className="absolute inset-8 border border-cyan-400/20 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-16 w-32 h-32 opacity-15 hidden lg:block"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full border border-violet-500/40 rounded-lg" />
        <div className="absolute inset-3 border border-cyan-400/30 rounded-lg" style={{ transform: "rotate(20deg)" }} />
      </motion.div>

      <motion.div className="relative z-10 text-center max-w-6xl mx-auto px-6" style={{ opacity }}>
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...SPRING, delay: 0.3 }}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            Pharmacy Intelligence Platform
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-display leading-[0.95] mb-6"
          style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.5 }}
        >
          <span className="text-white">Precision</span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #00f2ff 0%, #8b5cf6 50%, #00f2ff 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s linear infinite",
            }}
          >
            Pharmacy
          </span>
          <br />
          <span className="text-white/90">Consulting</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.7 }}
        >
          We transform pharmacy operations through data-driven waste elimination, compliance fortification, and revenue recovery — engineered for the modern dispensary.
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.9 }}
        >
          <motion.button
            className="group relative px-8 py-4 rounded-xl text-black font-semibold text-base overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #00f2ff, #8b5cf6)",
              fontFamily: "DM Sans, sans-serif",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(0,242,255,0.4), 0 0 100px rgba(139,92,246,0.2)" }}
            whileTap={{ scale: 0.97 }}
            transition={SPRING_FAST}
            onClick={() => document.getElementById("roi-engine")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="relative z-10 flex items-center gap-2">
              Calculate Your ROI <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <motion.button
            className="px-8 py-4 rounded-xl text-white/80 font-medium text-base border border-white/10 hover:border-cyan-400/40 hover:text-cyan-400 transition-all hover:bg-cyan-400/5"
            style={{ fontFamily: "DM Sans, sans-serif" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={SPRING_FAST}
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore Services
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col items-center py-6 px-4 bg-black/40 backdrop-blur-sm hover:bg-white/5 transition-colors"
              variants={fadeUp}
            >
              <span
                className="text-3xl font-display font-800 mb-1"
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #00f2ff, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </span>
              <span className="text-white/40 text-xs" style={{ fontFamily: "DM Sans, sans-serif" }}>{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Shimmer keyframe injection */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </section>
  );
}

// ─── Services Bento Grid ──────────────────────────────────────────────────────
function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: <BarChart3 size={28} />, title: "Revenue Cycle Optimization",
      desc: "Deep-dive claim analysis, denial pattern identification, and reimbursement maximization protocols that reclaim lost margin from every dispensed unit.",
      tag: "FINANCIAL", span: "col-span-1 md:col-span-2", accent: "#00f2ff",
    },
    {
      icon: <Shield size={28} />, title: "Compliance Architecture",
      desc: "HIPAA, DEA, and state board compliance systems built from the ground up. Proactive audit preparation that eliminates exposure.",
      tag: "REGULATORY", span: "col-span-1", accent: "#8b5cf6",
    },
    {
      icon: <Package size={28} />, title: "Inventory Intelligence",
      desc: "AI-powered par-level modeling and waste elimination that cuts carrying costs while ensuring zero stockouts.",
      tag: "OPERATIONS", span: "col-span-1", accent: "#00f2ff",
    },
    {
      icon: <HeartPulse size={28} />, title: "Clinical Outcomes Consulting",
      desc: "MTM program design, adherence dashboards, and star rating improvement strategies that turn clinical performance into payer leverage.",
      tag: "CLINICAL", span: "col-span-1", accent: "#8b5cf6",
    },
    {
      icon: <Microscope size={28} />, title: "Operational Forensics",
      desc: "Full pharmacy workflow audit — from intake to adjudication — identifying bottlenecks, error pathways, and throughput constraints.",
      tag: "DIAGNOSTIC", span: "col-span-1 md:col-span-2", accent: "#00f2ff",
    },
    {
      icon: <Users size={28} />, title: "Staff Performance Systems",
      desc: "KPI frameworks, training curricula, and accountability structures that reduce turnover and optimize technician-to-RPh ratios.",
      tag: "HUMAN CAPITAL", span: "col-span-1", accent: "#8b5cf6",
    },
  ];

  return (
    <section id="services" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section header */}
        <motion.div
          className="mb-16"
          variants={staggerChildren}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            // 01 — Service Architecture
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-6xl font-display font-800 text-white leading-tight"
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
          >
            Six Vectors of
            <br />
            <span style={{
              background: "linear-gradient(135deg, #00f2ff, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Pharmacy Excellence</span>
          </motion.h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={staggerChildren}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: cy * 10, y: cx * -10 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`${service.span} relative group cursor-default`}
      variants={fadeUp}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: hovered ? 1.02 : 1 }}
      transition={SPRING_FAST}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
    >
      {/* Border gradient */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${service.accent}33, transparent)`,
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          border: `1px solid ${service.accent}22`,
        }}
      />

      {/* Card body */}
      <div className="relative rounded-2xl p-7 h-full bg-white/[0.02] backdrop-blur-sm overflow-hidden">
        {/* Background glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{ background: `radial-gradient(ellipse at 20% 20%, ${service.accent}0D 0%, transparent 60%)` }}
        />

        {/* Tag */}
        <span
          className="inline-block text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded-md mb-4 relative z-10"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            color: service.accent,
            background: `${service.accent}15`,
          }}
        >
          {service.tag}
        </span>

        {/* Icon */}
        <div className="mb-4 relative z-10" style={{ color: service.accent }}>
          {service.icon}
        </div>

        {/* Title */}
        <h3
          className="text-xl font-display font-700 text-white mb-3 relative z-10"
          style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
        >
          {service.title}
        </h3>

        {/* Desc */}
        <p className="text-white/50 text-sm leading-relaxed relative z-10" style={{ fontFamily: "DM Sans, sans-serif" }}>
          {service.desc}
        </p>

        {/* Arrow */}
        <div className="mt-5 flex items-center gap-1 relative z-10">
          <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-0" style={{ color: service.accent, fontFamily: "DM Sans, sans-serif" }}>
            Learn more
          </span>
          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: service.accent }} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── ROI Profit Engine ────────────────────────────────────────────────────────
function ROIEngine() {
  const [scripts, setScripts] = useState(800);
  const [waste, setWaste] = useState(12);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const avgScriptValue = 85;
  const avgWastePercentReduction = 0.65;
  const monthlyWasteDollars = scripts * avgScriptValue * (waste / 100);
  const monthlyRecovery = monthlyWasteDollars * avgWastePercentReduction;
  const yearlyRecovery = monthlyRecovery * 12;
  const feeEstimate = 18000;
  const netROI = yearlyRecovery - feeEstimate;

  const roiMultiple = feeEstimate > 0 ? (yearlyRecovery / feeEstimate).toFixed(1) : 0;

  return (
    <section id="roi-engine" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12"
        >
          <motion.span variants={fadeUp} className="inline-block text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            // 02 — ROI Profit Engine
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-display font-800 text-white leading-tight" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
            Calculate Your
            <br />
            <span style={{ background: "linear-gradient(135deg, #00f2ff, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Hidden Profit
            </span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={staggerChildren}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Sliders panel */}
          <motion.div variants={fadeUp} className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 border border-white/8 rounded-3xl" />
            <div className="relative bg-white/[0.02] backdrop-blur-sm p-8">
              <h3 className="text-white font-display text-xl mb-8 font-600" style={{ fontFamily: "Syne, sans-serif", fontWeight: 600 }}>
                Pharmacy Parameters
              </h3>

              {/* Scripts slider */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-white/60 text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>Monthly Prescriptions Filled</label>
                  <span className="font-mono text-cyan-400 text-lg font-500" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    {scripts.toLocaleString()}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range" min={100} max={5000} step={50} value={scripts}
                    onChange={(e) => setScripts(+e.target.value)}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #00f2ff ${((scripts - 100) / 4900) * 100}%, rgba(255,255,255,0.1) ${((scripts - 100) / 4900) * 100}%)`,
                      outline: "none",
                    }}
                  />
                </div>
                <div className="flex justify-between text-white/25 text-xs mt-1.5 font-mono" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                  <span>100</span><span>5,000</span>
                </div>
              </div>

              {/* Waste slider */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-white/60 text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>Current Waste / Shrinkage %</label>
                  <span className="font-mono text-violet-400 text-lg font-500" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    {waste}%
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range" min={1} max={30} step={0.5} value={waste}
                    onChange={(e) => setWaste(+e.target.value)}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #8b5cf6 ${((waste - 1) / 29) * 100}%, rgba(255,255,255,0.1) ${((waste - 1) / 29) * 100}%)`,
                      outline: "none",
                    }}
                  />
                </div>
                <div className="flex justify-between text-white/25 text-xs mt-1.5 font-mono" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                  <span>1%</span><span>30%</span>
                </div>
              </div>

              {/* Assumption note */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <p className="text-white/30 text-xs leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  Calculations based on industry avg. script value of $85, 65% waste reduction efficiency, and our standard annual consulting fee. Actual results vary by pharmacy profile.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Results panel */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            {/* Main recovery figure */}
            <div className="relative rounded-3xl overflow-hidden flex-1">
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,242,255,0.08), rgba(139,92,246,0.05))" }} />
              <div className="absolute inset-0 border border-cyan-400/20 rounded-3xl" />
              <div className="relative p-8 flex flex-col justify-center h-full">
                <p className="text-white/50 text-sm uppercase tracking-widest font-mono mb-3" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                  Potential Yearly Recovery
                </p>
                <div
                  className="text-5xl md:text-6xl font-display font-800 mb-2"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #00f2ff, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  $<AnimatedNumber value={yearlyRecovery} />
                </div>
                <p className="text-white/40 text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  / year recoverable from optimized operations
                </p>

                {/* Progress bar */}
                <div className="mt-6">
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #00f2ff, #8b5cf6)" }}
                      animate={{ width: `${Math.min((yearlyRecovery / 200000) * 100, 100)}%` }}
                      transition={SPRING_SLOW}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-white/25 text-xs font-mono" style={{ fontFamily: "JetBrains Mono, monospace" }}>$0</span>
                    <span className="text-white/25 text-xs font-mono" style={{ fontFamily: "JetBrains Mono, monospace" }}>$200K target</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-metrics row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Monthly Recovery", value: monthlyRecovery, prefix: "$", accent: "#00f2ff" },
                { label: "Net Annual ROI", value: netROI, prefix: "$", accent: "#8b5cf6" },
                { label: "ROI Multiple", value: parseFloat(roiMultiple), suffix: "x", accent: "#00f2ff", decimals: 1 },
              ].map((m) => (
                <div key={m.label} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center">
                  <div
                    className="text-xl font-display font-700 mb-1"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      color: m.accent,
                    }}
                  >
                    <AnimatedNumber value={m.value} prefix={m.prefix || ""} suffix={m.suffix || ""} decimals={m.decimals || 0} />
                  </div>
                  <p className="text-white/35 text-[10px] uppercase tracking-wider" style={{ fontFamily: "JetBrains Mono, monospace" }}>{m.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              className="w-full py-4 rounded-2xl font-semibold text-black relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #00f2ff, #8b5cf6)", fontFamily: "DM Sans, sans-serif" }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0,242,255,0.3)" }}
              whileTap={{ scale: 0.98 }}
              transition={SPRING_FAST}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Claim Your Recovery — Book a Free Audit
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Slider thumb style */}
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 12px rgba(0,242,255,0.6);
        }
        input[type=range]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 12px rgba(0,242,255,0.6);
        }
      `}</style>
    </section>
  );
}

// ─── Compliance Status Checker ────────────────────────────────────────────────
const COMPLIANCE_CHECKS = [
  { id: "hipaa", label: "HIPAA Privacy & Security", weight: 20, icon: <Lock size={16} /> },
  { id: "dea", label: "DEA Schedule Audited", weight: 20, icon: <FileCheck size={16} /> },
  { id: "pmp", label: "PMP Reporting Current", weight: 15, icon: <Activity size={16} /> },
  { id: "state", label: "State Board Renewal Active", weight: 15, icon: <Shield size={16} /> },
  { id: "340b", label: "340B Program Compliance", weight: 10, icon: <Pill size={16} /> },
  { id: "inventory", label: "Controlled Substance Inventory", weight: 10, icon: <Package size={16} /> },
  { id: "counseling", label: "Patient Counseling Protocols", weight: 5, icon: <Users size={16} /> },
  { id: "returns", label: "Reverse Distributor Process", weight: 5, icon: <RefreshCw size={16} /> },
];

function ComplianceChecker() {
  const [checks, setChecks] = useState(
    Object.fromEntries(COMPLIANCE_CHECKS.map((c) => [c.id, false]))
  );
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const score = COMPLIANCE_CHECKS.reduce((acc, c) => acc + (checks[c.id] ? c.weight : 0), 0);
  const risk = 100 - score;

  const riskLabel = risk >= 60 ? "CRITICAL" : risk >= 40 ? "HIGH" : risk >= 20 ? "MODERATE" : "LOW";
  const riskColor = risk >= 60 ? "#ff4444" : risk >= 40 ? "#ff8800" : risk >= 20 ? "#ffcc00" : "#00f2ff";
  const riskIcon = risk >= 60 ? <XCircle size={20} /> : risk >= 40 ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />;

  const toggle = (id) => setChecks((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section id="compliance" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12"
        >
          <motion.span variants={fadeUp} className="inline-block text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            // 03 — Compliance Diagnostic
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-display font-800 text-white leading-tight" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
            Your Regulatory
            <br />
            <span style={{ background: "linear-gradient(135deg, #00f2ff, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Risk Profile
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-white/45 max-w-xl" style={{ fontFamily: "DM Sans, sans-serif" }}>
            Toggle each compliance item to reveal your current risk exposure in real time.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={staggerChildren}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Toggles */}
          <motion.div variants={fadeUp} className="rounded-3xl border border-white/8 bg-white/[0.02] backdrop-blur-sm p-8">
            <h3 className="text-white/70 text-sm uppercase tracking-widest font-mono mb-6" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              Compliance Checklist
            </h3>
            <div className="space-y-3">
              {COMPLIANCE_CHECKS.map((c, i) => (
                <motion.div
                  key={c.id}
                  className="flex items-center justify-between p-3.5 rounded-xl cursor-pointer group transition-all"
                  style={{ background: checks[c.id] ? "rgba(0,242,255,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${checks[c.id] ? "rgba(0,242,255,0.2)" : "rgba(255,255,255,0.05)"}` }}
                  onClick={() => toggle(c.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={SPRING_FAST}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  // stagger via delay
                  custom={i}
                >
                  <div className="flex items-center gap-3">
                    <span style={{ color: checks[c.id] ? "#00f2ff" : "rgba(255,255,255,0.3)" }}>{c.icon}</span>
                    <span className="text-sm" style={{ fontFamily: "DM Sans, sans-serif", color: checks[c.id] ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)" }}>
                      {c.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "JetBrains Mono, monospace" }}>
                      {c.weight}pts
                    </span>
                    {/* Toggle switch */}
                    <div
                      className="relative w-10 h-5 rounded-full transition-all duration-300"
                      style={{ background: checks[c.id] ? "linear-gradient(90deg, #00f2ff, #8b5cf6)" : "rgba(255,255,255,0.1)" }}
                    >
                      <motion.div
                        className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-md"
                        animate={{ left: checks[c.id] ? "calc(100% - 18px)" : "2px" }}
                        transition={SPRING_FAST}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Risk gauge */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            {/* Gauge */}
            <div className="rounded-3xl border border-white/8 bg-white/[0.02] backdrop-blur-sm p-8 flex-1">
              <h3 className="text-white/70 text-sm uppercase tracking-widest font-mono mb-8" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                Risk Score Gauge
              </h3>

              {/* Circular gauge */}
              <div className="flex justify-center mb-8">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Track */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    {/* Progress */}
                    <motion.circle
                      cx="50" cy="50" r="40"
                      fill="none"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - risk / 100), stroke: riskColor }}
                      transition={SPRING_SLOW}
                      style={{ filter: `drop-shadow(0 0 8px ${riskColor}88)` }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                      className="text-4xl font-display font-800"
                      style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, color: riskColor }}
                      animate={{ color: riskColor }}
                      transition={{ duration: 0.3 }}
                    >
                      {risk}
                    </motion.span>
                    <span className="text-white/40 text-xs uppercase tracking-widest font-mono" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                      Risk Score
                    </span>
                  </div>
                </div>
              </div>

              {/* Status badge */}
              <motion.div
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl"
                animate={{ background: `${riskColor}18`, borderColor: `${riskColor}44` }}
                transition={{ duration: 0.3 }}
                style={{ border: "1px solid" }}
              >
                <motion.span animate={{ color: riskColor }} transition={{ duration: 0.3 }}>
                  {riskIcon}
                </motion.span>
                <motion.span
                  className="font-mono font-500 text-sm uppercase tracking-widest"
                  animate={{ color: riskColor }}
                  transition={{ duration: 0.3 }}
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {riskLabel} EXPOSURE
                </motion.span>
              </motion.div>
            </div>

            {/* Breakdown bars */}
            <div className="rounded-3xl border border-white/8 bg-white/[0.02] backdrop-blur-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white/60 text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>Compliance Coverage</span>
                <span className="font-mono text-cyan-400 text-sm" style={{ fontFamily: "JetBrains Mono, monospace" }}>{score} / 100 pts</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  animate={{ width: `${score}%`, background: score > 60 ? "linear-gradient(90deg,#00f2ff,#8b5cf6)" : score > 30 ? "#ffcc00" : "#ff4444" }}
                  transition={SPRING_SLOW}
                />
              </div>
              {risk >= 20 && (
                <motion.p
                  className="mt-4 text-white/40 text-sm leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  {risk >= 60 ? "⚠️ Immediate consultation recommended. Your pharmacy faces significant regulatory and financial risk." :
                   risk >= 40 ? "Proactive remediation advised. Several high-weight compliance gaps detected." :
                   "Good progress. Minor gaps remain — a targeted audit will seal your compliance posture."}
                </motion.p>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── About / Testimonials ─────────────────────────────────────────────────────
function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    { name: "Dr. Marcus Chen, PharmD", role: "Owner, Vitality Rx Group", quote: "RxForge identified $340K in annual waste we had normalized. Their audit paid for itself in 6 weeks.", rating: 5 },
    { name: "Sandra Okafor", role: "Director of Operations, MedPlus Network", quote: "Compliance posture went from critical to exemplary. The DEA pre-audit prep alone was worth the entire engagement.", rating: 5 },
    { name: "James Hartwell", role: "CFO, PharmaFirst Retail", quote: "Three years of stagnant margins reversed in one quarter. The ROI Engine numbers were conservative — we beat them.", rating: 5 },
  ];

  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.span variants={fadeUp} className="inline-block text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            // 04 — Client Outcomes
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-display font-800 text-white" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
            Results That
            <br />
            <span style={{ background: "linear-gradient(135deg, #00f2ff, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Speak for Themselves
            </span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={staggerChildren}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className="relative rounded-2xl p-7 group"
              style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
              whileHover={{ scale: 1.02, borderColor: "rgba(0,242,255,0.2)" }}
              transition={SPRING_FAST}
            >
              <div className="flex gap-1 mb-5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#00f2ff" className="text-cyan-400" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6 italic" style={{ fontFamily: "DM Sans, sans-serif", fontStyle: "italic", fontWeight: 300 }}>
                "{t.quote}"
              </p>
              <div>
                <p className="text-white font-600 text-sm" style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600 }}>{t.name}</p>
                <p className="text-white/35 text-xs mt-0.5" style={{ fontFamily: "DM Sans, sans-serif" }}>{t.role}</p>
              </div>

              {/* Decorative quote mark */}
              <span className="absolute top-4 right-6 text-6xl font-display leading-none opacity-5 text-cyan-400 pointer-events-none" style={{ fontFamily: "Syne, sans-serif" }}>"</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact Forge ────────────────────────────────────────────────────────────
function ContactForge() {
  const [form, setForm] = useState({ name: "", email: "", pharmacy: "", message: "", service: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.pharmacy.trim()) e.pharmacy = "Pharmacy name required";
    if (!form.message.trim()) e.message = "Please describe your needs";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const inputBase = "w-full bg-white/[0.03] border rounded-xl px-5 py-4 text-white placeholder-white/20 outline-none transition-all duration-300 text-sm";
  const inputStyle = (field) =>
    `${inputBase} ${errors[field] ? "border-red-500/50 focus:border-red-400" : "border-white/8 focus:border-cyan-400/60 focus:bg-cyan-400/[0.03] focus:shadow-[0_0_20px_rgba(0,242,255,0.1)]"}`;

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16 text-center"
        >
          <motion.span variants={fadeUp} className="inline-block text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            // 05 — Contact Forge
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-display font-800 text-white" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
            Begin Your
            <br />
            <span style={{ background: "linear-gradient(135deg, #00f2ff, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Transformation
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-white/45 max-w-xl mx-auto" style={{ fontFamily: "DM Sans, sans-serif" }}>
            Every engagement starts with a complimentary 90-minute discovery audit. No obligation, no boilerplate — just precision analysis.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-5 gap-8"
          variants={staggerChildren}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Contact info */}
          <motion.div variants={fadeUp} className="md:col-span-2 flex flex-col gap-5">
            {[
              { icon: <Mail size={18} />, label: "Email", value: "consult@rxforge.io" },
              { icon: <Phone size={18} />, label: "Direct Line", value: "+1 (888) 479-FORGE" },
              { icon: <MapPin size={18} />, label: "Headquarters", value: "Chicago, IL · Remote Nationwide" },
              { icon: <Clock size={18} />, label: "Response SLA", value: "< 4 hours, business days" },
            ].map((c) => (
              <motion.div
                key={c.label}
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02]"
                whileHover={{ borderColor: "rgba(0,242,255,0.2)", scale: 1.01 }}
                transition={SPRING_FAST}
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  {c.icon}
                </div>
                <div>
                  <p className="text-white/35 text-xs uppercase tracking-wider font-mono mb-1" style={{ fontFamily: "JetBrains Mono, monospace" }}>{c.label}</p>
                  <p className="text-white/80 text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>{c.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div variants={fadeUp} className="md:col-span-3 rounded-3xl border border-white/8 bg-white/[0.02] backdrop-blur-sm p-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={SPRING}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-6"
                    animate={{ boxShadow: ["0 0 0px rgba(0,242,255,0)", "0 0 40px rgba(0,242,255,0.4)", "0 0 0px rgba(0,242,255,0)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle2 size={36} />
                  </motion.div>
                  <h3 className="text-white text-2xl font-display font-700 mb-3" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>Transmission Received</h3>
                  <p className="text-white/50 text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    A senior consultant will contact you within 4 business hours to schedule your complimentary discovery audit.
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form" className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        placeholder="Full Name"
                        value={form.name}
                        onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: null }); }}
                        className={inputStyle("name")}
                        style={{ fontFamily: "DM Sans, sans-serif" }}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1.5 ml-1" style={{ fontFamily: "DM Sans, sans-serif" }}>{errors.name}</p>}
                    </div>
                    <div>
                      <input
                        placeholder="Email Address"
                        type="email"
                        value={form.email}
                        onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: null }); }}
                        className={inputStyle("email")}
                        style={{ fontFamily: "DM Sans, sans-serif" }}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1.5 ml-1" style={{ fontFamily: "DM Sans, sans-serif" }}>{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <input
                      placeholder="Pharmacy / Organization Name"
                      value={form.pharmacy}
                      onChange={(e) => { setForm({ ...form, pharmacy: e.target.value }); setErrors({ ...errors, pharmacy: null }); }}
                      className={inputStyle("pharmacy")}
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    />
                    {errors.pharmacy && <p className="text-red-400 text-xs mt-1.5 ml-1" style={{ fontFamily: "DM Sans, sans-serif" }}>{errors.pharmacy}</p>}
                  </div>

                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className={`${inputBase} border-white/8 focus:border-cyan-400/60 focus:shadow-[0_0_20px_rgba(0,242,255,0.1)]`}
                    style={{ fontFamily: "DM Sans, sans-serif", color: form.service ? "white" : "rgba(255,255,255,0.2)" }}
                  >
                    <option value="" style={{ background: "#111", color: "rgba(255,255,255,0.4)" }}>Primary Service Interest</option>
                    {["Revenue Cycle Optimization", "Compliance Architecture", "Inventory Intelligence", "Clinical Outcomes", "Operational Forensics", "Full Transformation Package"].map((s) => (
                      <option key={s} value={s} style={{ background: "#111", color: "white" }}>{s}</option>
                    ))}
                  </select>

                  <div>
                    <textarea
                      placeholder="Describe your pharmacy's current challenges and goals..."
                      rows={4}
                      value={form.message}
                      onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: null }); }}
                      className={`${inputStyle("message")} resize-none`}
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1.5 ml-1" style={{ fontFamily: "DM Sans, sans-serif" }}>{errors.message}</p>}
                  </div>

                  <motion.button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-semibold text-black flex items-center justify-center gap-2 relative overflow-hidden disabled:opacity-70"
                    style={{ background: "linear-gradient(135deg, #00f2ff, #8b5cf6)", fontFamily: "DM Sans, sans-serif" }}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0,242,255,0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    transition={SPRING_FAST}
                  >
                    {loading ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        <Zap size={18} />
                        <span>Request Your Free Discovery Audit</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg border border-cyan-400/40 flex items-center justify-center">
                <FlaskConical size={16} className="text-cyan-400" />
              </div>
              <span className="font-display font-700 text-white text-lg" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
                RxForge<span className="text-cyan-400">.</span>
              </span>
            </div>
            <p className="text-white/30 text-sm max-w-xs" style={{ fontFamily: "DM Sans, sans-serif" }}>
              Clinical Futurism meets pharmacy excellence. Engineering profit and compliance for the modern dispensary.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            {[
              { head: "Services", links: ["Revenue Cycle", "Compliance", "Inventory", "Clinical", "Forensics"] },
              { head: "Company", links: ["About", "Case Studies", "Careers", "Press", "Contact"] },
              { head: "Legal", links: ["Privacy Policy", "Terms of Service", "HIPAA Notice", "Cookie Policy"] },
            ].map((col) => (
              <div key={col.head}>
                <p className="text-white/60 font-600 mb-4 uppercase tracking-wider text-xs font-mono" style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 500 }}>{col.head}</p>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}><a href="#" className="text-white/30 hover:text-cyan-400 transition-colors" style={{ fontFamily: "DM Sans, sans-serif" }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs" style={{ fontFamily: "DM Sans, sans-serif" }}>
            © 2025 RxForge Consulting Group LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["HIPAA Compliant", "DEA Registered Consultants", "NABP Member"].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-cyan-400/60" />
                <span className="text-white/20 text-xs" style={{ fontFamily: "JetBrains Mono, monospace" }}>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div
      className="min-h-screen text-white relative"
      style={{ backgroundColor: "#050505", fontFamily: "DM Sans, sans-serif" }}
    >
      <BackgroundCanvas />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Services />
        <ROIEngine />
        <ComplianceChecker />
        <About />
        <ContactForge />
      </main>
      <Footer />
    </div>
  );
}
