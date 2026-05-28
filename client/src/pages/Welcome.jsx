import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Loader from "../components/Loader";

function Welcome() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);

  }, []);

  // Loader Screen
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-black flex justify-center items-center overflow-hidden relative px-5">

      {/* Massive Background Glow */}
      <div className="absolute w-[700px] h-[700px] bg-orange-500/20 rounded-full blur-3xl top-[-250px] left-[-250px] animate-pulse"></div>

      <div className="absolute w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-3xl bottom-[-250px] right-[-250px] animate-pulse"></div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">

        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]"></div>

      </div>

      {/* Floating Particles */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-orange-500 rounded-full animate-bounce"></div>

      <div className="absolute top-40 right-32 w-3 h-3 bg-orange-400 rounded-full animate-ping"></div>

      <div className="absolute bottom-32 left-40 w-5 h-5 bg-orange-300 rounded-full animate-pulse"></div>

      <div className="absolute bottom-20 right-20 w-4 h-4 bg-orange-500 rounded-full animate-bounce"></div>

      {/* Floating Code Symbols */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{
          repeat: Infinity,
          duration: 3
        }}
        className="absolute top-32 left-1/4 text-orange-500 text-5xl font-bold opacity-20"
      >
        {"</>"}
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4
        }}
        className="absolute bottom-32 right-1/4 text-orange-400 text-6xl font-bold opacity-20"
      >
        {"{}"}
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 120 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.02 }}
        className="relative z-10 overflow-hidden bg-gradient-to-br from-zinc-900/90 to-black/80 backdrop-blur-2xl border border-orange-500/20 rounded-[40px] p-14 max-w-4xl text-center shadow-[0_0_100px_rgba(255,140,0,0.25)]"
      >

        {/* Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-orange-500/20 blur-3xl rounded-full"></div>

        {/* Small Floating Dots */}
        <div className="absolute top-10 left-10 w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>

        <div className="absolute bottom-10 right-10 w-3 h-3 bg-orange-500 rounded-full animate-ping"></div>

        {/* Logo */}
        <motion.h1
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.8,
            type: "spring"
          }}
          className="relative z-10 text-7xl md:text-8xl font-black text-white leading-tight"
        >

          Welcome to

          <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 drop-shadow-[0_0_30px_rgba(255,165,0,0.9)] animate-pulse">
            NoteCode
          </span>

        </motion.h1>

        {/* Animated Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.5, 1, 0.5],
            y: [0, -5, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 3
          }}
          className="relative z-10 mt-10"
        >

          <h2 className="text-orange-300 text-2xl font-semibold">
            Share • Collaborate • Innovate 🚀
          </h2>

          <p className="text-gray-400 mt-6 text-lg leading-9 max-w-3xl mx-auto">

            Experience a futuristic way to store, manage,
            and share code snippets with a premium developer experience.

          </p>

        </motion.div>

        {/* Buttons */}
        <div className="relative z-10 flex justify-center gap-6 mt-14 flex-wrap">

          {/* Login */}
          <motion.button
            whileHover={{
              scale: 1.08,
              boxShadow: "0px 0px 35px rgba(255,165,0,0.7)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-orange-400 to-orange-600 text-black font-bold px-12 py-4 rounded-2xl transition-all duration-300 text-lg"
          >
            Login
          </motion.button>

          {/* Register */}
          <motion.button
            whileHover={{
              scale: 1.08,
              backgroundColor: "#f97316",
              color: "#000"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/register")}
            className="border-2 border-orange-500 text-orange-500 px-12 py-4 rounded-2xl font-bold transition-all duration-300 text-lg"
          >
            Register
          </motion.button>

        </div>

      </motion.div>

    </div>
  );
}

export default Welcome;