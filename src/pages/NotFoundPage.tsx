import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md"
      >
        <p className="text-8xl font-bold text-[#4DA3FF] mb-4">404</p>
        <h1 className="text-4xl font-bold text-[#F8FAFC] mb-2">Page Not Found</h1>
        <p className="text-[#B6C2D6] mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#4DA3FF] text-[#0B1E3B] font-bold hover:bg-[#5FB0FF] transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Return Home
        </Link>
      </motion.div>
    </div>
  );
};
