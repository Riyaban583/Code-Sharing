import { motion } from "framer-motion";
import { useEditorStore } from "../store/useEditorStore";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useState
} from "react";

function Register() {

  const navigate = useNavigate();
  const { theme, setTheme } = useEditorStore();

  const isDark = theme === "vs-dark";

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // ====================================
  // HANDLE REGISTER
  // ====================================
  const API_URL = import.meta.env.VITE_API_URL;
  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

     const response = await fetch(
  `${API_URL}/api/auth/register`,

        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            username,
            email,
            password,

          }),

        }

      );

      const data =
        await response.json();

      if (!response.ok) {

        alert(
          data.message ||
          "Registration failed"
        );

        return;

      }

      // Save Token
      localStorage.setItem(
        "token",
        data.token
      );

      // Save User
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert(
        "Account Created Successfully 🚀"
      );

      navigate("/home");

    } catch (error) {

      console.log(error);

      alert(
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  // ====================================
  // DEV ILLUSTRATION SVG
  // ====================================
  const DevIllustration = () => (
    <svg
      viewBox="0 0 260 295"
      width="220"
      height="250"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible", zIndex: 2 }}
    >
      <style>{`
        @keyframes regFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes regCode  { 0%{transform:translateY(0)} 100%{transform:translateY(-52px)} }
        @keyframes regCursor{ 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes regScreen{ 0%,100%{opacity:0.8} 50%{opacity:1} }
        @keyframes regHand  { 0%,100%{transform:translateY(0)} 30%{transform:translateY(-2px)} 70%{transform:translateY(1px)} }
        @keyframes regCoffee{ 0%,100%{transform:rotate(-4deg)} 50%{transform:rotate(4deg)} }
        @keyframes regTag1  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes regTag2  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
        .rfl{animation:regFloat 4s ease-in-out infinite}
        .rcs{animation:regCode 4s linear infinite}
        .rcb{animation:regCursor 1s step-end infinite}
        .rsp{animation:regScreen 3s ease-in-out infinite}
        .rht{animation:regHand 0.5s ease-in-out infinite}
        .rcw{animation:regCoffee 3s ease-in-out infinite;transform-origin:215px 250px}
        .rt1{animation:regTag1 3s ease-in-out infinite}
        .rt2{animation:regTag2 3.5s ease-in-out infinite}
      `}</style>

      <ellipse cx="130" cy="290" rx="52" ry="6" fill="rgba(234,88,12,0.12)" />

      <g className="rfl">

        {/* desk */}
        <rect x="22" y="194" width="216" height="8" rx="3" fill="#2a2a3e" />
        <rect x="18" y="200" width="224" height="80" rx="10" fill="#1a1a2e" />
        <rect x="18" y="200" width="224" height="10" rx="5" fill="#2a2a3e" />
        <circle cx="33" cy="205" r="2.8" fill="#ff5f57" />
        <circle cx="44" cy="205" r="2.8" fill="#ffbd2e" />
        <circle cx="55" cy="205" r="2.8" fill="#28c840" />
        <text x="130" y="208" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.28)" fontFamily="monospace">Register.jsx — NoteCode</text>

        {/* laptop screen */}
        <rect x="20" y="210" width="220" height="68" rx="3" fill="#0d0d1a" />
        <clipPath id="rclip"><rect x="20" y="210" width="220" height="68" /></clipPath>
        <g clipPath="url(#rclip)">
          <g className="rcs">
            <text x="28" y="223" fontSize="8.5" fill="#EA580C" fontFamily="monospace">const</text>
            <text x="60" y="223" fontSize="8.5" fill="#60a5fa" fontFamily="monospace">handleRegister</text>
            <text x="144" y="223" fontSize="8.5" fill="rgba(255,255,255,0.6)" fontFamily="monospace">{"= async () => {"}</text>
            <text x="28" y="235" fontSize="8.5" fill="rgba(255,255,255,0.28)" fontFamily="monospace">{"  // create account"}</text>
            <text x="28" y="247" fontSize="8.5" fill="#EA580C" fontFamily="monospace">{"  const"}</text>
            <text x="62" y="247" fontSize="8.5" fill="#60a5fa" fontFamily="monospace">res</text>
            <text x="78" y="247" fontSize="8.5" fill="rgba(255,255,255,0.55)" fontFamily="monospace">{"= await fetch("}</text>
            <text x="28" y="259" fontSize="8.5" fill="#34d399" fontFamily="monospace">{"    \"/api/auth/register\""}</text>
            <text x="28" y="271" fontSize="8.5" fill="rgba(255,255,255,0.45)" fontFamily="monospace">{"  );"}</text>
            <text x="28" y="283" fontSize="8.5" fill="rgba(255,255,255,0.45)" fontFamily="monospace">{"}"}</text>
            <text x="28" y="295" fontSize="8.5" fill="#EA580C" fontFamily="monospace">navigate</text>
            <text x="78" y="295" fontSize="8.5" fill="#60a5fa" fontFamily="monospace">("/home");</text>
          </g>
        </g>
        <rect className="rcb" x="212" y="220" width="2" height="11" rx="1" fill="#EA580C" />

        {/* status bar */}
        <rect x="46" y="271" width="168" height="15" rx="3" fill="#2a2a3e" />
        <rect x="51" y="275" width="55" height="2.5" rx="1" fill="rgba(234,88,12,0.5)" />
        <rect x="51" y="280" width="80" height="2.5" rx="1" fill="rgba(96,165,250,0.35)" />

        {/* monitor */}
        <rect x="58" y="110" width="144" height="88" rx="7" fill="#2d2b55" />
        <rect x="58" y="110" width="144" height="9" rx="4" fill="#3d3b65" />
        <circle cx="71" cy="115" r="2.5" fill="rgba(255,255,255,0.18)" />
        <circle cx="80" cy="115" r="2.5" fill="rgba(255,255,255,0.18)" />
        <circle cx="89" cy="115" r="2.5" fill="rgba(255,255,255,0.18)" />
        <rect x="62" y="119" width="136" height="75" rx="3" fill="#12102b" />
        <g className="rsp">
          <rect x="66" y="125" width="42" height="4" rx="2" fill="#EA580C" opacity="0.85" />
          <rect x="66" y="133" width="68" height="4" rx="2" fill="#7c3aed" opacity="0.75" />
          <rect x="66" y="141" width="52" height="4" rx="2" fill="#34d399" opacity="0.75" />
          <rect x="66" y="149" width="78" height="4" rx="2" fill="#60a5fa" opacity="0.65" />
          <rect x="66" y="157" width="38" height="4" rx="2" fill="#EA580C" opacity="0.55" />
          <rect x="66" y="165" width="62" height="4" rx="2" fill="#7c3aed" opacity="0.6" />
          <rect x="66" y="173" width="48" height="4" rx="2" fill="#34d399" opacity="0.5" />
          <rect x="66" y="181" width="72" height="4" rx="2" fill="#60a5fa" opacity="0.4" />
        </g>
        <rect x="122" y="198" width="16" height="7" rx="2" fill="#2a2a3e" />
        <rect x="108" y="203" width="44" height="3" rx="1.5" fill="#3a3a55" />

        {/* arms */}
        <rect x="33" y="165" width="25" height="33" rx="12" fill="#2a1f3d" />
        <rect x="202" y="165" width="25" height="33" rx="12" fill="#2a1f3d" />
        <rect x="33" y="190" width="25" height="11" rx="5.5" fill="#1e1a30" />
        <rect x="202" y="190" width="25" height="11" rx="5.5" fill="#1e1a30" />
        <g className="rht">
          <rect x="31" y="195" width="29" height="10" rx="5" fill="#e8a87c" />
          <rect x="200" y="195" width="29" height="10" rx="5" fill="#e8a87c" />
        </g>

        {/* body hoodie */}
        <rect x="68" y="105" width="124" height="66" rx="10" fill="#1f1635" />
        <rect x="80" y="110" width="100" height="56" rx="6" fill="#2a1f4a" />
        <rect x="105" y="126" width="50" height="24" rx="5" fill="#EA580C" />
        <text x="130" y="143" textAnchor="middle" fontSize="10" fill="white" fontFamily="monospace" fontWeight="700">{"</>"}</text>
        <rect x="108" y="105" width="44" height="10" rx="5" fill="#2a1f3d" />

        {/* neck */}
        <rect x="118" y="90" width="24" height="20" rx="8" fill="#e8a87c" />

        {/* head */}
        <rect x="85" y="43" width="90" height="28" rx="20" fill="#1a1025" />
        <rect x="82" y="50" width="96" height="22" rx="11" fill="#1a1025" />
        <rect x="85" y="53" width="90" height="52" rx="22" fill="#e8a87c" />
        <rect x="85" y="68" width="90" height="28" fill="#e8a87c" />
        {/* ears */}
        <rect x="81" y="64" width="10" height="18" rx="5" fill="#e8a87c" />
        <rect x="169" y="64" width="10" height="18" rx="5" fill="#e8a87c" />
        {/* glasses */}
        <rect x="92" y="68" width="28" height="18" rx="7" fill="none" stroke="#4a4a6a" strokeWidth="2" />
        <rect x="140" y="68" width="28" height="18" rx="7" fill="none" stroke="#4a4a6a" strokeWidth="2" />
        <line x1="120" y1="77" x2="140" y2="77" stroke="#4a4a6a" strokeWidth="2" />
        <line x1="82" y1="77" x2="92" y2="77" stroke="#4a4a6a" strokeWidth="1.5" />
        <line x1="168" y1="77" x2="179" y2="77" stroke="#4a4a6a" strokeWidth="1.5" />
        {/* eyes */}
        <ellipse cx="106" cy="77" rx="5" ry="5.5" fill="white" />
        <ellipse cx="154" cy="77" rx="5" ry="5.5" fill="white" />
        <ellipse cx="106" cy="78" rx="3" ry="3.5" fill="#1a1010" />
        <ellipse cx="154" cy="78" rx="3" ry="3.5" fill="#1a1010" />
        <circle cx="107.5" cy="76.5" r="1" fill="white" />
        <circle cx="155.5" cy="76.5" r="1" fill="white" />
        {/* eyebrows */}
        <path d="M 99 66 Q 106 63 113 66" stroke="#5a3e28" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 147 66 Q 154 63 161 66" stroke="#5a3e28" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* smile */}
        <path d="M 116 91 Q 130 100 144 91" stroke="#c2410c" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* blush */}
        <ellipse cx="98" cy="86" rx="6" ry="3" fill="#f87171" opacity="0.2" />
        <ellipse cx="162" cy="86" rx="6" ry="3" fill="#f87171" opacity="0.2" />
        {/* headphones */}
        <path d="M 85 70 Q 82 50 130 46 Q 178 50 175 70" stroke="#EA580C" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <rect x="81" y="68" width="9" height="15" rx="4.5" fill="#EA580C" />
        <rect x="170" y="68" width="9" height="15" rx="4.5" fill="#EA580C" />

        {/* coffee mug */}
        <g className="rcw">
          <rect x="204" y="246" width="22" height="20" rx="4" fill="#3a2a1a" />
          <rect x="202" y="243" width="26" height="5" rx="2" fill="#4a3520" />
          <text x="215" y="259" textAnchor="middle" fontSize="7" fill="rgba(234,88,12,0.9)" fontFamily="monospace">{"</>"}</text>
          <path d="M 226 253 Q 234 253 234 260 Q 234 267 226 267" stroke="#4a3520" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 209 240 Q 211 235 209 231" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 214 239 Q 216 234 214 230" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>

        {/* floating tags */}
        <g className="rt1" opacity="0.65">
          <rect x="15" y="128" width="40" height="14" rx="4" fill="rgba(124,58,237,0.22)" />
          <text x="35" y="138" textAnchor="middle" fontSize="8" fill="#a78bfa" fontFamily="monospace">register</text>
        </g>
        <g className="rt2" opacity="0.55">
          <rect x="13" y="150" width="40" height="14" rx="4" fill="rgba(52,211,153,0.18)" />
          <text x="33" y="160" textAnchor="middle" fontSize="8" fill="#34d399" fontFamily="monospace">async</text>
        </g>
        <g className="rt1" style={{ animationDelay: "1s" }} opacity="0.5">
          <rect x="16" y="172" width="32" height="14" rx="4" fill="rgba(96,165,250,0.18)" />
          <text x="32" y="182" textAnchor="middle" fontSize="8" fill="#60a5fa" fontFamily="monospace">{"{ }"}</text>
        </g>

      </g>
    </svg>
  );

  return (
    <div
      className={`min-h-screen flex justify-center items-center overflow-hidden relative px-4 py-8 transition-all duration-300 ${
        isDark ? "bg-[#09090f]" : "bg-gray-100"
      }`}
    >

      {/* ── FULL PAGE BACKGROUND ── */}

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(234,88,12,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(234,88,12,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(234,88,12,0.012) 3px, rgba(234,88,12,0.012) 4px)",
        }}
      />

      {/* Orb TL */}
      <div
        className="absolute rounded-full pointer-events-none animate-pulse"
        style={{
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(234,88,12,0.16) 0%, transparent 65%)",
          top: -180, left: -120,
        }}
      />

      {/* Orb BR */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 420, height: 420,
          background: "radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 65%)",
          bottom: -150, right: -100,
          animation: "pulse 8s ease-in-out infinite",
        }}
      />

      {/* Orb Mid */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300, height: 300,
          background: "radial-gradient(circle, rgba(234,88,12,0.06) 0%, transparent 70%)",
          top: "30%", left: "30%",
        }}
      />

      {/* Floating code lines */}
      {[
        { text: "const user = await register();",     left: "3%",  top: "18%", color: "rgba(234,88,12,0.22)",    delay: "0s",  dur: "14s" },
        { text: "import { useState } from 'react';",  left: "5%",  top: "58%", color: "rgba(124,58,237,0.18)",   delay: "3s",  dur: "16s" },
        { text: "navigate('/home');",                 right: "3%", top: "14%", color: "rgba(52,211,153,0.18)",   delay: "5s",  dur: "18s" },
        { text: "localStorage.setItem('token', t);",  right: "2%", top: "62%", color: "rgba(96,165,250,0.18)",   delay: "8s",  dur: "12s" },
        { text: "{ code, ship, repeat }",             left: "7%",  top: "80%", color: "rgba(234,88,12,0.16)",    delay: "2s",  dur: "20s" },
        { text: 'git commit -m "new account 🚀"',    right: "5%", top: "82%", color: "rgba(124,58,237,0.15)",   delay: "7s",  dur: "15s" },
      ].map((f, i) => (
        <div
          key={i}
          className="absolute font-mono text-xs pointer-events-none whitespace-nowrap"
          style={{
            left: f.left, right: f.right, top: f.top,
            color: f.color,
            opacity: 0,
            animation: `floatCodeAnim ${f.dur} linear ${f.delay} infinite`,
          }}
        >
          {f.text}
        </div>
      ))}

      {/* Corner brackets */}
      {[
        { top: 16, left: 16,   borderTop: "1.5px solid rgba(234,88,12,0.4)", borderLeft:  "1.5px solid rgba(234,88,12,0.4)" },
        { top: 16, right: 16,  borderTop: "1.5px solid rgba(234,88,12,0.4)", borderRight: "1.5px solid rgba(234,88,12,0.4)" },
        { bottom: 16, left: 16,  borderBottom: "1.5px solid rgba(234,88,12,0.4)", borderLeft:  "1.5px solid rgba(234,88,12,0.4)" },
        { bottom: 16, right: 16, borderBottom: "1.5px solid rgba(234,88,12,0.4)", borderRight: "1.5px solid rgba(234,88,12,0.4)" },
      ].map((s, i) => (
        <div key={i} className="absolute w-7 h-7 pointer-events-none" style={s} />
      ))}

      {/* CSS for floating code animation */}
      <style>{`
        @keyframes floatCodeAnim {
          0%   { opacity: 0; transform: translateY(0); }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { opacity: 0; transform: translateY(-80px); }
        }
      `}</style>

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "vs-dark" ? "light" : "vs-dark")}
        className={`absolute top-5 right-5 z-50 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
          isDark
            ? "bg-zinc-800 text-white border border-zinc-700 hover:border-orange-500"
            : "bg-white text-gray-700 border border-gray-200 shadow-sm hover:border-orange-400"
        }`}
      >
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* ── MAIN CARD ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl flex transition-all duration-300"
        style={{
          minHeight: 620,
          border: "1px solid rgba(234,88,12,0.15)",
          boxShadow: "0 0 80px rgba(234,88,12,0.1), 0 0 0 1px rgba(255,255,255,0.03)",
          background: isDark ? "#0f0f1a" : "#ffffff",
        }}
      >

        {/* ── LEFT PANEL ── */}
        <div
          className="hidden lg:flex flex-col items-center justify-between w-[50%] px-10 py-10 relative overflow-hidden"
          style={{ background: "#0c0c18" }}
        >
          {/* inner glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 100%, rgba(234,88,12,0.08) 0%, transparent 60%)",
            }}
          />

          {/* Brand */}
          <div className="flex items-center gap-2 z-10 self-start">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white text-xs font-bold font-mono">
              &lt;/&gt;
            </div>
            <span className="text-white text-sm font-medium">NoteCode</span>
          </div>

          {/* Illustration */}
          <div className="z-10">
            <DevIllustration />
          </div>

          {/* Tagline */}
          <div className="z-10 text-center">
            <h2 className="text-white text-xl font-semibold leading-snug mb-2">
              <span className="text-orange-500">Join the</span> Community.
              <br />
              <span className="text-orange-400">Build</span> Together.
            </h2>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Create your account and start sharing code snippets with developers worldwide.
            </p>
          </div>

          {/* Pills */}
          <div className="flex gap-2 flex-wrap justify-center z-10">
            {["Free forever", "Open source", "Dev community"].map((t) => (
              <span
                key={t}
                className="text-[10px] px-3 py-1 rounded-full border text-orange-400"
                style={{
                  borderColor: "rgba(234,88,12,0.3)",
                  background: "rgba(234,88,12,0.07)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div
          className="flex-1 flex flex-col justify-center px-10 py-10 lg:px-12 relative"
          style={{
            background: isDark ? "#0f0f1a" : "#ffffff",
          }}
        >
          {/* left border glow line */}
          <div
            className="absolute top-0 left-0 bottom-0 w-px hidden lg:block"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(234,88,12,0.3), transparent)",
            }}
          />

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1
              className={`text-3xl font-semibold mb-1 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Create Your{" "}
              <span className="text-orange-500">Account</span>
            </h1>
            <p
              className={`text-sm mb-7 leading-relaxed ${
                isDark ? "text-zinc-500" : "text-gray-500"
              }`}
            >
              Join NoteCode and start sharing your code snippets with developers worldwide.
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">

            {/* Username */}
            <div>
              <label className="block text-orange-500 text-xs font-semibold mb-2 uppercase tracking-wide">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className={`w-full px-4 py-3 pr-11 rounded-xl outline-none border text-sm transition-all duration-300 ${
                    isDark
                      ? "bg-zinc-900 text-white border-zinc-700 focus:border-orange-500 placeholder-zinc-600"
                      : "bg-gray-50 text-gray-900 border-gray-200 focus:border-orange-500 placeholder-gray-400"
                  }`}
                />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-orange-500 text-xs font-semibold mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className={`w-full px-4 py-3 pr-11 rounded-xl outline-none border text-sm transition-all duration-300 ${
                    isDark
                      ? "bg-zinc-900 text-white border-zinc-700 focus:border-orange-500 placeholder-zinc-600"
                      : "bg-gray-50 text-gray-900 border-gray-200 focus:border-orange-500 placeholder-gray-400"
                  }`}
                />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-orange-500 text-xs font-semibold mb-2 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  className={`w-full px-4 py-3 pr-11 rounded-xl outline-none border text-sm transition-all duration-300 ${
                    isDark
                      ? "bg-zinc-900 text-white border-zinc-700 focus:border-orange-500 placeholder-zinc-600"
                      : "bg-gray-50 text-gray-900 border-gray-200 focus:border-orange-500 placeholder-gray-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-orange-400 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all duration-300 disabled:opacity-60 mt-2"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c, #c2410c)",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </motion.button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className={`flex-1 h-px ${isDark ? "bg-zinc-800" : "bg-gray-100"}`} />
            <span className={`text-xs ${isDark ? "text-zinc-600" : "text-gray-400"}`}>secure registration</span>
            <div className={`flex-1 h-px ${isDark ? "bg-zinc-800" : "bg-gray-100"}`} />
          </div>

          {/* Security Badges */}
          <div className="flex gap-2 justify-center mb-5">
            {[
              { icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z", color: "rgba(52,211,153,0.7)", label: "SSL Encrypted" },
              { icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z", color: "rgba(96,165,250,0.7)", label: "2FA Ready" },
              { icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5", color: "rgba(234,88,12,0.7)", label: "Open Source" },
            ].map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                style={{
                  border: `0.5px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"}`,
                  background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                }}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke={b.color} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
                </svg>
                <span className={`text-[10px] ${isDark ? "text-zinc-500" : "text-gray-400"}`}>{b.label}</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <p
            className={`text-center text-sm ${
              isDark ? "text-zinc-500" : "text-gray-500"
            }`}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 hover:text-orange-400 font-semibold transition-colors"
            >
              Login
            </Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
}

export default Register;