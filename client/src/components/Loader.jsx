import { motion } from "framer-motion";

function Loader() {
  return (

    <div className="h-screen bg-black flex flex-col justify-center items-center">

      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear"
        }}
        className="w-24 h-24 border-4 border-zinc-700 border-t-orange-500 rounded-full"
      />

      {/* Text */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          repeat: Infinity,
          duration: 1.5
        }}
        className="text-orange-500 text-5xl font-extrabold mt-8 tracking-widest"
      >
        NoteCode
      </motion.h1>

    </div>
  );
}

export default Loader;