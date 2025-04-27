import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        style={{
          border: '6px solid #f3f3f3',
          borderTop: '6px solid #007bff',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          margin: 'auto'
        }}
      />
      <p style={{ marginTop: '10px' }}>Chargement en cours...</p>
    </div>
  );
};

export default Loader;

