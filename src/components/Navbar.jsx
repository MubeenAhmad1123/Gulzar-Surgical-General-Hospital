import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Patient Info', path: '/patient-info' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
    { name: 'Our Team', path: '/our-team' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .nav-link-desktop {
          position: relative;
          padding-bottom: 4px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-link-desktop::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #C9A496, transparent);
          box-shadow: 0 0 12px rgba(201, 164, 150, 0.6);
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-link-desktop:hover::after,
        .nav-link-desktop.active::after {
          width: 100%;
        }
        
        .nav-link-desktop.active {
          color: #C9A496;
        }
        
        .mobile-nav-item {
          position: relative;
          overflow: hidden;
        }
        
        .mobile-nav-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background: linear-gradient(180deg, #C9A496, #F8E7EC);
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 10px rgba(201, 164, 150, 0.5);
        }
        
        .mobile-nav-item:hover::before,
        .mobile-nav-item.active::before {
          transform: translateX(0);
        }
        
        .logo-container {
          font-family: 'Playfair Display', serif;
          letter-spacing: 0.5px;
        }
        
        .logo-gradient {
          background: linear-gradient(135deg, #C9A496 0%, #A5C3B1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .nav-text {
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.3px;
        }
        
        .glass-effect {
          background: rgba(255, 250, 249, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
        }
        
        .glass-effect-dark {
          background: rgba(255, 250, 249, 0.95);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
        }
        
        .cta-btn {
          background: linear-gradient(135deg, #C9A496 0%, #F8E7EC 100%);
          box-shadow: 0 4px 15px rgba(201, 164, 150, 0.25);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .cta-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s;
        }
        
        .cta-btn:hover::before {
          left: 100%;
        }
        
        .cta-btn:hover {
          box-shadow: 0 6px 25px rgba(201, 164, 150, 0.4);
          transform: translateY(-2px);
        }
        
        .hamburger-line {
          display: block;
          width: 28px;
          height: 2.5px;
          background: #333333;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hamburger-open .line-1 {
          transform: translateY(9px) rotate(45deg);
        }
        
        .hamburger-open .line-2 {
          opacity: 0;
          transform: translateX(-10px);
        }
        
        .hamburger-open .line-3 {
          transform: translateY(-9px) rotate(-45deg);
        }
        
        @keyframes slideInMobile {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInMenu {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .mobile-menu-overlay {
          animation: fadeInMenu 0.3s ease-out;
        }
        
        .mobile-menu-item {
          animation: slideInMobile 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }
        
        .mobile-menu-item:nth-child(1) { animation-delay: 0.05s; }
        .mobile-menu-item:nth-child(2) { animation-delay: 0.1s; }
        .mobile-menu-item:nth-child(3) { animation-delay: 0.15s; }
        .mobile-menu-item:nth-child(4) { animation-delay: 0.2s; }
        .mobile-menu-item:nth-child(5) { animation-delay: 0.25s; }
        .mobile-menu-item:nth-child(6) { animation-delay: 0.3s; }
        .mobile-menu-item:nth-child(7) { animation-delay: 0.35s; }
        .mobile-menu-item:nth-child(8) { animation-delay: 0.4s; }
        .mobile-menu-item:nth-child(9) { animation-delay: 0.45s; }
        
        .sparkle-icon {
          filter: drop-shadow(0 0 8px rgba(201, 164, 150, 0.4));
          animation: sparkleRotate 3s ease-in-out infinite;
        }
        
        @keyframes sparkleRotate {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
        }
      `}</style>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-effect-dark shadow-xl'
            : 'glass-effect shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 lg:h-24">
            
            {/* Logo */}
            <NavLink
              to="/"
              className="flex items-center space-x-3 group"
              onClick={() => setIsOpen(false)}
            >
              <Sparkles 
                className="w-7 h-7 text-[#C9A496] sparkle-icon transition-transform duration-300 group-hover:scale-110" 
                strokeWidth={1.5} 
              />
              <div className="logo-container">
                <h1 className="logo-gradient text-2xl lg:text-3xl font-semibold tracking-wide transition-all duration-300 group-hover:tracking-wider">
                  Gulzar Laser & Aesthetics Centre
                </h1>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link-desktop nav-text px-4 py-2 text-sm font-medium text-[#333333] hover:text-[#C9A496] ${
                      isActive ? 'active' : ''
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              
              <NavLink
                to="/book-appointment"
                className="cta-btn ml-4 px-6 py-3 rounded-full text-[#333333] text-sm font-semibold nav-text"
              >
                Book Appointment
              </NavLink>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 rounded-lg hover:bg-[#F8E7EC]/50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#C9A496] focus:ring-offset-2"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              <div className={`flex flex-col justify-between w-7 h-5 ${isOpen ? 'hamburger-open' : ''}`}>
                <span className="hamburger-line line-1" />
                <span className="hamburger-line line-2" />
                <span className="hamburger-line line-3" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="xl:hidden mobile-menu-overlay fixed inset-0 top-20 lg:top-24 bg-[#FFFAF9]/98 backdrop-blur-xl">
            <div className="h-full overflow-y-auto px-6 py-8">
              <div className="max-w-md mx-auto space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `mobile-menu-item mobile-nav-item block pl-6 pr-4 py-4 text-base font-medium nav-text rounded-xl transition-all ${
                        isActive
                          ? 'text-[#C9A496] bg-[#F8E7EC]/60 active'
                          : 'text-[#333333] hover:text-[#C9A496] hover:bg-[#F8E7EC]/40'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
                
                <NavLink
                  to="/book-appointment"
                  onClick={() => setIsOpen(false)}
                  className="mobile-menu-item cta-btn block text-center mt-8 px-8 py-4 rounded-full text-[#333333] text-base font-semibold nav-text"
                >
                  Book Appointment
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-20 lg:h-24" />
    </>
  );
};

export default Navbar;