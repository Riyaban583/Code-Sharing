import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useEditorStore } from "../store/useEditorStore";

import {
  useState
} from "react";

function Login() {
  const { theme, setTheme } = useEditorStore();

  const navigate = useNavigate();

  const isDark = theme === "vs-dark";

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  // ====================================
  // HANDLE LOGIN
  // ====================================
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await fetch(

        "http://localhost:5000/api/auth/login",

        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

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
          "Login failed"
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
        "Login Successful 🚀"
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
      viewBox="0 0 260 300"
      width="240"
      height="285"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible", zIndex: 2 }}
    >
      <style>{`
        @keyframes devFloat {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes devCodeMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(-52px); }
        }
        @keyframes devCursor {
          0%,100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes devScreen {
          0%,100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        @keyframes devTyping {
          0%,100% { transform: translateY(0); }
          30% { transform: translateY(-2px); }
          60% { transform: translateY(1px); }
        }
        @keyframes devCoffee {
          0%,100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .dev-float { animation: devFloat 4s ease-in-out infinite; }
        .dev-code-scroll { animation: devCodeMove 4s linear infinite; }
        .dev-cursor { animation: devCursor 1s step-end infinite; }
        .dev-screen { animation: devScreen 3s ease-in-out infinite; }
        .dev-typing { animation: devTyping 0.5s ease-in-out infinite; }
        .dev-coffee { animation: devCoffee 3s ease-in-out infinite; transform-origin: 215px 252px; }
      `}</style>

      {/* Shadow */}
      <ellipse cx="130" cy="295" rx="55" ry="7" fill={isDark ? "rgba(234,88,12,0.15)" : "rgba(0,0,0,0.1)"} />

      <g className="dev-float">

        {/* ── DESK ── */}
        <rect x="22" y="196" width="216" height="9" rx="3" fill={isDark ? "#2a2a3e" : "#d1c4b0"} />
        <rect x="18" y="202" width="224" height="83" rx="10" fill={isDark ? "#1a1a2e" : "#ede8df"} />
        <rect x="18" y="202" width="224" height="10" rx="5" fill={isDark ? "#2a2a3e" : "#c9bfb2"} />

        {/* traffic lights */}
        <circle cx="33" cy="207" r="3" fill="#ff5f57" />
        <circle cx="44" cy="207" r="3" fill="#ffbd2e" />
        <circle cx="55" cy="207" r="3" fill="#28c840" />
        <text x="130" y="210" textAnchor="middle" fontSize="7.5" fill={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)"} fontFamily="monospace">
          index.js — NoteCode
        </text>

        {/* screen area */}
        <rect x="20" y="212" width="220" height="71" rx="3" fill={isDark ? "#0d0d1a" : "#1e1e2e"} />
        <clipPath id="codeClip2">
          <rect x="20" y="212" width="220" height="71" />
        </clipPath>
        <g clipPath="url(#codeClip2)">
          <g className="dev-code-scroll">
            <text x="28" y="225" fontSize="8.5" fill="#EA580C" fontFamily="monospace">const</text>
            <text x="60" y="225" fontSize="8.5" fill="#60a5fa" fontFamily="monospace">handleLogin</text>
            <text x="125" y="225" fontSize="8.5" fill="rgba(255,255,255,0.65)" fontFamily="monospace">{"= async () => {"}</text>
            <text x="28" y="237" fontSize="8.5" fill="rgba(255,255,255,0.3)" fontFamily="monospace">{"  // authenticate user"}</text>
            <text x="28" y="249" fontSize="8.5" fill="#EA580C" fontFamily="monospace">{"  const"}</text>
            <text x="62" y="249" fontSize="8.5" fill="#60a5fa" fontFamily="monospace">res</text>
            <text x="78" y="249" fontSize="8.5" fill="rgba(255,255,255,0.6)" fontFamily="monospace">{"= await fetch("}</text>
            <text x="28" y="261" fontSize="8.5" fill="#34d399" fontFamily="monospace">{"    \"/api/auth/login\""}</text>
            <text x="28" y="273" fontSize="8.5" fill="rgba(255,255,255,0.5)" fontFamily="monospace">{"  );"}</text>
            <text x="28" y="285" fontSize="8.5" fill="rgba(255,255,255,0.5)" fontFamily="monospace">{"}"}</text>
            <text x="28" y="297" fontSize="8.5" fill="#EA580C" fontFamily="monospace">export default</text>
            <text x="108" y="297" fontSize="8.5" fill="#60a5fa" fontFamily="monospace">Login;</text>
          </g>
        </g>

        {/* blinking cursor */}
        <rect
          className="dev-cursor"
          x="213" y="222"
          width="2" height="11"
          rx="1" fill="#EA580C"
        />

        {/* statusbar */}
        <rect x="48" y="274" width="164" height="16" rx="3" fill={isDark ? "#2a2a3e" : "#2d2b55"} />
        <rect x="53" y="278" width="55" height="2.5" rx="1" fill="rgba(234,88,12,0.5)" />
        <rect x="53" y="283" width="80" height="2.5" rx="1" fill="rgba(96,165,250,0.35)" />

        {/* ── MONITOR on desk ── */}
        <rect x="58" y="112" width="144" height="90" rx="7" fill={isDark ? "#2d2b55" : "#3b3660"} />
        <rect x="58" y="112" width="144" height="9" rx="4" fill={isDark ? "#3d3b65" : "#4a4580"} />
        <circle cx="72" cy="116" r="2.5" fill="rgba(255,255,255,0.2)" />
        <circle cx="81" cy="116" r="2.5" fill="rgba(255,255,255,0.2)" />
        <circle cx="90" cy="116" r="2.5" fill="rgba(255,255,255,0.2)" />
        <rect x="62" y="121" width="136" height="77" rx="3" fill={isDark ? "#1e1c3a" : "#12102b"} />
        <g className="dev-screen">
          <rect x="66" y="127" width="42" height="4" rx="2" fill="#EA580C" opacity="0.85" />
          <rect x="66" y="135" width="68" height="4" rx="2" fill="#7c3aed" opacity="0.75" />
          <rect x="66" y="143" width="52" height="4" rx="2" fill="#34d399" opacity="0.75" />
          <rect x="66" y="151" width="78" height="4" rx="2" fill="#60a5fa" opacity="0.65" />
          <rect x="66" y="159" width="38" height="4" rx="2" fill="#EA580C" opacity="0.55" />
          <rect x="66" y="167" width="62" height="4" rx="2" fill="#7c3aed" opacity="0.65" />
          <rect x="66" y="175" width="48" height="4" rx="2" fill="#34d399" opacity="0.5" />
          <rect x="66" y="183" width="72" height="4" rx="2" fill="#60a5fa" opacity="0.4" />
        </g>
        {/* monitor stand */}
        <rect x="122" y="200" width="16" height="8" rx="2" fill={isDark ? "#2a2a3e" : "#2d2b55"} />
        <rect x="110" y="206" width="40" height="4" rx="2" fill={isDark ? "#3a3a55" : "#3d3b65"} />

        {/* ── ARMS ── */}
        <rect x="33" y="167" width="24" height="34" rx="12" fill={isDark ? "#2a1f3d" : "#3b2d55"} />
        <rect x="202" y="167" width="24" height="34" rx="12" fill={isDark ? "#2a1f3d" : "#3b2d55"} />
        {/* forearms */}
        <rect x="33" y="192" width="24" height="12" rx="6" fill={isDark ? "#1e1a30" : "#2c2245"} />
        <rect x="202" y="192" width="24" height="12" rx="6" fill={isDark ? "#1e1a30" : "#2c2245"} />
        {/* hands */}
        <g className="dev-typing">
          <rect x="31" y="197" width="28" height="10" rx="5" fill="#e8a87c" />
          <rect x="200" y="197" width="28" height="10" rx="5" fill="#e8a87c" />
        </g>

        {/* ── BODY / HOODIE ── */}
        <rect x="68" y="107" width="124" height="68" rx="10" fill={isDark ? "#1f1635" : "#2d2050"} />
        {/* hoodie chest panel */}
        <rect x="80" y="112" width="100" height="58" rx="6" fill={isDark ? "#2a1f4a" : "#3a2b65"} />
        {/* NoteCode logo on hoodie */}
        <rect x="104" y="128" width="52" height="26" rx="5" fill="#EA580C" />
        <text x="130" y="145" textAnchor="middle" fontSize="10" fill="white" fontFamily="monospace" fontWeight="700">{"</>"}</text>
        {/* collar */}
        <rect x="108" y="107" width="44" height="10" rx="5" fill={isDark ? "#2a1f3d" : "#3b2d55"} />

        {/* ── NECK ── */}
        <rect x="118" y="92" width="24" height="20" rx="8" fill="#e8a87c" />

        {/* ── HEAD ── */}
        {/* hair */}
        <rect x="85" y="45" width="90" height="30" rx="20" fill={isDark ? "#1a1025" : "#15102a"} />
        <rect x="82" y="52" width="96" height="22" rx="11" fill={isDark ? "#1a1025" : "#15102a"} />
        {/* face */}
        <rect x="85" y="55" width="90" height="52" rx="22" fill="#e8a87c" />
        <rect x="85" y="70" width="90" height="30" fill="#e8a87c" />
        {/* ears */}
        <rect x="81" y="66" width="10" height="18" rx="5" fill="#e8a87c" />
        <rect x="169" y="66" width="10" height="18" rx="5" fill="#e8a87c" />
        {/* glasses frame */}
        <rect x="92" y="70" width="28" height="18" rx="7" fill="none" stroke={isDark ? "#4a4a6a" : "#3a3a5a"} strokeWidth="2" />
        <rect x="140" y="70" width="28" height="18" rx="7" fill="none" stroke={isDark ? "#4a4a6a" : "#3a3a5a"} strokeWidth="2" />
        <line x1="120" y1="79" x2="140" y2="79" stroke={isDark ? "#4a4a6a" : "#3a3a5a"} strokeWidth="2" />
        <line x1="82" y1="79" x2="92" y2="79" stroke={isDark ? "#4a4a6a" : "#3a3a5a"} strokeWidth="1.5" />
        <line x1="168" y1="79" x2="179" y2="79" stroke={isDark ? "#4a4a6a" : "#3a3a5a"} strokeWidth="1.5" />
        {/* eyes behind glasses */}
        <ellipse cx="106" cy="79" rx="5" ry="5.5" fill="white" />
        <ellipse cx="154" cy="79" rx="5" ry="5.5" fill="white" />
        <ellipse cx="106" cy="80" rx="3" ry="3.5" fill="#2a1a0e" />
        <ellipse cx="154" cy="80" rx="3" ry="3.5" fill="#2a1a0e" />
        <circle cx="107.2" cy="78.5" r="1" fill="white" />
        <circle cx="155.2" cy="78.5" r="1" fill="white" />
        {/* eyebrows */}
        <path d="M 99 68 Q 106 65 113 68" stroke="#5a3e28" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 147 68 Q 154 65 161 68" stroke="#5a3e28" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* smile */}
        <path d="M 116 93 Q 130 102 144 93" stroke="#c2410c" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* blush */}
        <ellipse cx="98" cy="88" rx="6" ry="3.5" fill="#f87171" opacity="0.2" />
        <ellipse cx="162" cy="88" rx="6" ry="3.5" fill="#f87171" opacity="0.2" />
        {/* headphones */}
        <path d="M 85 72 Q 82 52 130 48 Q 178 52 175 72" stroke={isDark ? "#EA580C" : "#c2410c"} strokeWidth="4" fill="none" strokeLinecap="round" />
        <rect x="81" y="70" width="8" height="14" rx="4" fill={isDark ? "#EA580C" : "#c2410c"} />
        <rect x="171" y="70" width="8" height="14" rx="4" fill={isDark ? "#EA580C" : "#c2410c"} />

        {/* ── COFFEE MUG ── */}
        <g className="dev-coffee">
          <rect x="204" y="248" width="22" height="20" rx="4" fill={isDark ? "#3a2a1a" : "#6b4c2a"} />
          <rect x="202" y="245" width="26" height="5" rx="2" fill={isDark ? "#4a3520" : "#8b6340"} />
          <text x="215" y="261" textAnchor="middle" fontSize="7" fill="rgba(234,88,12,0.9)" fontFamily="monospace">{"</>"}</text>
          <path d="M 226 255 Q 234 255 234 262 Q 234 269 226 269" stroke={isDark ? "#4a3520" : "#8b6340"} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* steam */}
          <path d="M 210 242 Q 212 238 210 234" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 215 241 Q 217 236 215 232" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>

        {/* ── FLOATING CODE TAGS ── */}
        <g opacity="0.6">
          <rect x="16" y="130" width="34" height="14" rx="4" fill={isDark ? "rgba(124,58,237,0.25)" : "rgba(124,58,237,0.15)"} />
          <text x="33" y="140" textAnchor="middle" fontSize="8" fill="#7c3aed" fontFamily="monospace">const</text>
        </g>
        <g opacity="0.5">
          <rect x="14" y="152" width="38" height="14" rx="4" fill={isDark ? "rgba(52,211,153,0.2)" : "rgba(52,211,153,0.15)"} />
          <text x="33" y="162" textAnchor="middle" fontSize="8" fill="#34d399" fontFamily="monospace">async</text>
        </g>
        <g opacity="0.55">
          <rect x="16" y="174" width="30" height="14" rx="4" fill={isDark ? "rgba(96,165,250,0.2)" : "rgba(96,165,250,0.15)"} />
          <text x="31" y="184" textAnchor="middle" fontSize="8" fill="#60a5fa" fontFamily="monospace">{"{ }"}</text>
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
      {/* Theme Toggle */}
      <button
        onClick={() =>
          setTheme(
            theme === "vs-dark" ? "light" : "vs-dark"
          )
        }
        className={`absolute top-5 right-5 z-50 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
          isDark
            ? "bg-zinc-800 text-white border border-zinc-700 hover:border-orange-500"
            : "bg-white text-gray-700 border border-gray-200 shadow-sm hover:border-orange-400"
        }`}
      >
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl flex transition-all duration-300 ${
          isDark
            ? "bg-[#0f0f1a] border border-zinc-800 shadow-[0_0_60px_rgba(234,88,12,0.1)]"
            : "bg-white border border-gray-200 shadow-2xl"
        }`}
        style={{ minHeight: "600px" }}
      >

        {/* ── LEFT PANEL ── */}
        <div
          className={`hidden lg:flex flex-col items-center justify-between w-[52%] px-10 py-10 relative overflow-hidden ${
            isDark ? "bg-[#0c0c18]" : "bg-[#0f0f1a]"
          }`}
        >
          {/* bg orbs */}
          <div
            className="absolute w-80 h-80 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(234,88,12,0.1) 0%, transparent 70%)",
              top: "-100px",
              right: "-80px",
            }}
          />
          <div
            className="absolute w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
              bottom: "-50px",
              left: "-30px",
            }}
          />

          {/* Brand */}
          <div className="flex items-center gap-2 z-10 self-start">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
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
              <span className="text-orange-500">Share Code.</span>
              <br />
              <span className="text-orange-400">Inspire</span> Developers.
            </h2>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Join NoteCode and start sharing your code snippets with developers worldwide.
            </p>
          </div>

          {/* Pills */}
          <div className="flex gap-2 flex-wrap justify-center z-10">
            {["Syntax highlighting", "Live collaboration", "Save snippets"].map((t) => (
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
        <div className="flex-1 flex flex-col justify-center px-10 py-10 lg:px-12">

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
              Welcome{" "}
              <span className="text-orange-500">Back</span>
            </h1>
            <p
              className={`text-sm mb-8 leading-relaxed ${
                isDark ? "text-zinc-500" : "text-gray-500"
              }`}
            >
              Login to your NoteCode account and continue sharing amazing code.
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">

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
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}
                >
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
                  placeholder="Enter your password"
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

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="w-4 h-4 rounded bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className={`text-xs ${isDark ? "text-zinc-400" : "text-gray-500"}`}>
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-xs text-orange-500 hover:text-orange-400 transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              type="submit"
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-all duration-300 disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </motion.button>

          </form>

          {/* Footer */}
          <p
            className={`text-center text-sm mt-6 ${
              isDark ? "text-zinc-500" : "text-gray-500"
            }`}
          >
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-orange-500 hover:text-orange-400 font-semibold transition-colors"
            >
              Register
            </Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
}

export default Login;