import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md"
      >
        <p className="text-8xl font-bold text-[#FF1A1A] mb-4">404</p>
        <h1 className="text-4xl font-bold text-[#0A0A0A] mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FF1A1A] text-white font-bold hover:bg-[#D60000] transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Return Home
        </Link>
      </motion.div>
    </div>
  );
};
