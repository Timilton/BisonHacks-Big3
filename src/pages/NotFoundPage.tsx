import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';

export const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <div className="p-8 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <p className="text-6xl font-bold text-gradient mb-4">404</p>
          <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <a
            href="/provider/dashboard"
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            Return to Dashboard
          </a>
        </motion.div>
      </div>
    </Layout>
  );
};
