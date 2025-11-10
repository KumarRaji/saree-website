import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link } from 'react-router-dom';
import { MenuIcon } from './icons/MenuIcon';
import { CloseIcon } from './icons/CloseIcon';

/* ---------------- small helpers ---------------- */
const NavItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `text-sm font-medium transition-colors duration-300 ${
        isActive ? 'text-primary' : 'text-text-primary hover:text-primary'
      }`
    }
    onClick={onClick}
  >
    {children}
  </NavLink>
);

/* ---------------- Dropdown ---------------- */
const Dropdown = ({ closeMobileMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (window.innerWidth > 1024) {
      setIsHovering(true);
      setIsOpen(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  };
  const handleMouseLeave = () => {
    if (window.innerWidth > 1024) {
      setIsHovering(false);
      timeoutRef.current = setTimeout(() => {
        if (!isHovering) setIsOpen(false);
      }, 100);
    }
  };
  const handleLinkClick = () => {
    setIsOpen(false);
    closeMobileMenu();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const menuItems = [
    {
      title: 'Traditional',
      items: [
        { name: 'Long Dress', path: '/dresses/long-dress', description: 'Floor-length elegant designs' },
        { name: 'Midi Dress', path: '/dresses/midi-dress', description: 'Classic knee-length styles' }
      ],
    },
  ];

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`text-sm font-medium transition-colors duration-300 flex items-center px-3 py-2 rounded-md ${
          isOpen ? 'text-primary bg-gray-50' : 'text-text-primary hover:text-primary hover:bg-gray-50'
        }`}
      >
        <span>Dresses</span>
        <svg
          className={`w-4 h-4 ml-1.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`absolute left-0 z-20 mt-1 w-72 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-in-out transform ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="py-2">
          {menuItems.map((section, idx) => (
            <div key={idx} className="px-3 py-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{section.title}</p>
              {section.items.map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  onClick={handleLinkClick}
                  className="block rounded-md px-3 py-2 hover:bg-gray-50 transition duration-150 ease-in-out group"
                >
                  <p className="text-sm font-medium text-gray-900 group-hover:text-primary">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5 group-hover:text-primary-dark">{item.description}</p>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------------- Modal (portal to <body>) ---------------- */
function LoginModal({ onClose }) {
  // Body scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = prev);
  }, []);

  // ESC to close
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-6 pt-6 pb-4 border-b">
          <h2 className="text-2xl font-serif font-bold text-text-primary">Login</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <form className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2.5 rounded-md font-medium hover:bg-primary-dark transition-colors duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="px-6 pb-6 text-center text-sm text-text-secondary">
          Don&apos;t have an account? <a href="#" className="text-primary hover:underline">Sign up</a>
        </p>
      </div>
    </div>,
    document.body
  );
}

/* ---------------- Header ---------------- */
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-serif font-bold text-primary relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2c-1.1 0-2 .9-2 2v1h4V4c0-1.1-.9-2-2-2zm-6 6l2-3h8l2 3v13H6V8zm2 2v9h8v-9l-1-1.5H9L8 10z" />
            </svg>
            <span>Saree Sansaar</span>
            {showTooltip && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap z-50">
                Premium Saree Collection
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-800" />
              </div>
            )}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/about">About Us</NavItem>
            <NavItem to="/women">Women</NavItem>
            <NavItem to="/men">Men</NavItem>
            <NavItem to="/new-arrivals">New Arrival</NavItem>
            <Dropdown closeMobileMenu={() => {}} />
          </nav>

          <div className="flex items-center">
            <button
              onClick={() => setShowLoginForm(true)}
              className="hidden lg:inline-block ml-8 bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors duration-300"
            >
              Login
            </button>

            {/* Mobile menu button */}
            <div className="lg:hidden ml-4">
              <button onClick={() => setIsMobileMenuOpen((s) => !s)}>
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/25 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-20 left-0 w-full bg-white shadow-lg transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col space-y-4 p-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <NavItem to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</NavItem>
            <NavItem to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</NavItem>
            <NavItem to="/women" onClick={() => setIsMobileMenuOpen(false)}>Women</NavItem>
            <NavItem to="/men" onClick={() => setIsMobileMenuOpen(false)}>Men</NavItem>
            <NavItem to="/new-arrivals" onClick={() => setIsMobileMenuOpen(false)}>New Arrival</NavItem>
            <Dropdown closeMobileMenu={() => setIsMobileMenuOpen(false)} />
            <button
              onClick={() => setShowLoginForm(true)}
              className="w-full mt-4 bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors duration-300"
            >
              Login
            </button>
          </nav>
        </div>
      </div>

      {/* Login Modal (portal) */}
      {showLoginForm && <LoginModal onClose={() => setShowLoginForm(false)} />}
    </header>
  );
}
