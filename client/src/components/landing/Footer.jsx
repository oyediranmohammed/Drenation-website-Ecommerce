import React from 'react';

function Footer() {
  return (
    <footer className="text-center py-6 text-sm text-black dark:text-gold border-t border-gold">
      &copy; {new Date().getFullYear()} Drenation Marketplace
    </footer>
  );
}

export default Footer;
