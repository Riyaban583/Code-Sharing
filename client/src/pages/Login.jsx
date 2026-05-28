import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import {
  useState
} from "react";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
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

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-black flex justify-center items-center overflow-hidden relative px-5 py-10">

      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-3xl top-[-200px] left-[-200px] animate-pulse"></div>

      <div className="absolute w-[500px] h-[500px] bg-orange-400/10 rounded-full blur-3xl bottom-[-200px] right-[-200px] animate-pulse"></div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">

        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]"></div>

      </div>

      {/* Floating Symbols */}
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

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.01 }}
        className="relative z-10 w-full max-w-lg overflow-hidden bg-gradient-to-br from-zinc-900/90 to-black/80 backdrop-blur-2xl border border-orange-500/20 rounded-[35px] p-12 shadow-[0_0_80px_rgba(255,140,0,0.25)]"
      >

        {/* Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-orange-500/20 blur-3xl rounded-full"></div>

        {/* Heading */}
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.7,
            type: "spring"
          }}
          className="relative z-10 text-5xl font-black text-center text-white"
        >

          Welcome Back

          <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            LOGIN
          </span>

        </motion.h1>

        {/* Subtitle */}
        <p className="relative z-10 text-center text-gray-400 mt-6 leading-10">
          Access your saved code snippets and continue collaborating with developers.
        </p>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="relative z-10 mt-10 space-y-6"
        >

          {/* Email */}
          <div>

            <label className="text-orange-400 text-sm font-semibold">
              Email Address
            </label>

            <input
              type="email"

              value={email}

              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }

              placeholder="Enter your email"

              required

              className="w-full mt-2 bg-zinc-800/80 text-white px-5 py-4 rounded-2xl outline-none border border-zinc-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-all duration-300"
            />

          </div>

          {/* Password */}
          <div>

            <label className="text-orange-400 text-sm font-semibold">
              Password
            </label>

            <input
              type="password"

              value={password}

              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }

              placeholder="Enter your password"

              required

              className="w-full mt-2 bg-zinc-800/80 text-white px-5 py-4 rounded-2xl outline-none border border-zinc-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-all duration-300"
            />

          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">

            <button
              type="button"
              className="text-orange-400 hover:text-orange-500 text-sm transition duration-300"
            >
              Forgot Password?
            </button>

          </div>

          {/* Login Button */}
          <motion.button

            whileHover={{
              scale: 1.03,
              boxShadow:
                "0px 0px 30px rgba(255,165,0,0.6)"
            }}

            whileTap={{
              scale: 0.95
            }}

            disabled={loading}

            type="submit"

            className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-black font-bold py-4 rounded-2xl transition-all duration-300 text-lg"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </motion.button>

        </form>

        {/* Footer */}
        <div className="relative z-10 mt-8 text-center">

          <p className="text-gray-400">

            Don’t have an account?

            <Link
              to="/register"
              className="text-orange-400 hover:text-orange-500 font-semibold ml-2 transition duration-300"
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