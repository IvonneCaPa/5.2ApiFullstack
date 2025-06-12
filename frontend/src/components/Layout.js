import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, showHeader = true, showFooter = true }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {showHeader && <Header />}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;