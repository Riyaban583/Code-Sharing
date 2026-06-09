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

  const [loading, setLoading] =
    useState(false);

  // ====================================
  // HANDLE REGISTER
  // ====================================
  const handleRegister = async (
    e
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await fetch(

        "http://localhost:5000/api/auth/register",

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

  return (

    <div
  className={`min-h-screen flex justify-center items-center overflow-hidden relative px-5 transition-all duration-300 ${
    isDark ? "bg-black" : "bg-gray-100"
  }`}
>
  <button
  onClick={() =>
    setTheme(
      theme === "vs-dark"
        ? "light"
        : "vs-dark"
    )
  }
  className="absolute top-6 right-6 z-50 px-4 py-2 rounded-xl bg-orange-500 text-white"
>
  {theme === "vs-dark" ? "☀️" : "🌙"}
</button>

      {/* Background Glow */}
      <div className="absolute w-[650px] h-[650px] bg-orange-500/20 rounded-full blur-3xl top-[-250px] left-[-250px] animate-pulse"></div>

      <div className="absolute w-[500px] h-[500px] bg-orange-400/10 rounded-full blur-3xl bottom-[-200px] right-[-200px] animate-pulse"></div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">

        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]"></div>

      </div>

      {/* Floating Code Symbols */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{
          repeat: Infinity,
          duration: 3
        }}
        className="absolute top-28 left-1/4 text-orange-500 text-5xl font-bold opacity-20"
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

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.01 }}
       className={`relative z-10 w-full max-w-xl overflow-hidden backdrop-blur-2xl rounded-[35px] p-12 transition-all duration-300 ${
  isDark
    ? "bg-gradient-to-br from-zinc-900/90 to-black/80 border border-orange-500/20 shadow-[0_0_80px_rgba(255,140,0,0.25)]"
    : "bg-white border border-gray-200 shadow-2xl"
}`}
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
         className={`relative z-10 text-5xl font-black text-center ${
  isDark ? "text-white" : "text-gray-900"
}`}
        >

          Create Your

          <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            Account
          </span>

        </motion.h1>

        {/* Subtitle */}
       <p
  className={`relative z-10 text-center mt-6 leading-8 ${
    isDark ? "text-gray-400" : "text-gray-600"
  }`}
>
          Join NoteCode and start sharing your code snippets with developers worldwide.
        </p>

        {/* Form */}
        <form
          onSubmit={handleRegister}
          className="relative z-10 mt-10 space-y-6"
        >

          {/* Username */}
          <div>

            <label className="text-orange-400 text-sm font-semibold">
              Username
            </label>

            <input
              type="text"

              value={username}

              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }

              placeholder="Enter your username"

              required

              className={`w-full mt-2 px-5 py-4 rounded-2xl outline-none border transition-all duration-300 ${
  isDark
    ? "bg-zinc-800/80 text-white border-zinc-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
    : "bg-white text-black border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
}`}
            />

          </div>

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

              className={`w-full mt-2 px-5 py-4 rounded-2xl outline-none border transition-all duration-300 ${
  isDark
    ? "bg-zinc-800/80 text-white border-zinc-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
    : "bg-white text-black border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
}`}
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

              placeholder="Create a password"

              required

              className={`w-full mt-2 px-5 py-4 rounded-2xl outline-none border transition-all duration-300 ${
  isDark
    ? "bg-zinc-800/80 text-white border-zinc-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
    : "bg-white text-black border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
}`}
            />

          </div>

          {/* Register Button */}
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
              ? "Creating Account..."
              : "Create Account"}

          </motion.button>

        </form>

        {/* Footer */}
        <div className="relative z-10 mt-8 text-center">

         <p
  className={`${
    isDark ? "text-gray-400" : "text-gray-600"
  }`}
>

            Already have an account?

            <Link
              to="/login"
              className="text-orange-400 hover:text-orange-500 font-semibold ml-2 transition duration-300"
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