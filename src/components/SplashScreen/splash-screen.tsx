'use client';

import React, { useState, useEffect } from 'react';
import LogoIcon from '../icons/logo';

const SplashScreen: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return <>{loading ? <div className="fixed inset-0 flex items-center justify-center bg-background z-50 p-4">
      <div className="text-center animate-fadeIn">
        <LogoIcon className="h-56 md:h-72 w-auto" />
      </div>
    </div> : children}</>;
};

export default SplashScreen;