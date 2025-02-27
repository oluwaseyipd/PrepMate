import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
      />
    </div>
  );
};

export default Loader;
