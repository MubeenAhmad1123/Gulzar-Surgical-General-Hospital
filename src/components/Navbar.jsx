import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../assets/logo.webp';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


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

  const mainNavItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Our Team', path: '/our-team' },
  ];

  const dropdownItems = [
    { name: 'Patient Info', path: '/patient-info' },
  
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .navbar-font {
          font-family: 'Poppins', sans-serif;
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
          height: 2.5px;
          background: linear-gradient(90deg, transparent, #10b981, transparent);
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.5);
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-link-desktop:hover::after,
        .nav-link-desktop.active::after {
          width: 100%;
        }
        
        .nav-link-desktop.active {
          color: #10b981;
        }
        
        .dropdown-container {
          position: relative;
        }
        
        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 40px rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.1);
          opacity: 0;
          transform: translateY(-10px);
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 180px;
          overflow: hidden;
        }

        .dropdown-menu.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
}


        
        .dropdown-item {
          display: block;
          padding: 0.75rem 1.25rem;
          color: #1f2937;
          transition: all 0.2s ease;
          border-left: 3px solid transparent;
        }
        
        .dropdown-item:hover {
          background: linear-gradient(90deg, rgba(16, 185, 129, 0.1), transparent);
          border-left-color: #10b981;
          color: #10b981;
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
          background: linear-gradient(180deg, #10b981, #34d399);
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }
        
        .mobile-nav-item:hover::before,
        .mobile-nav-item.active::before {
          transform: translateX(0);
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
        }
        
        .glass-effect-dark {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
        }
        
        .cta-btn {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
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
          box-shadow: 0 6px 25px rgba(16, 185, 129, 0.4);
          transform: translateY(-2px) scale(1.05);
        }
        
        .hamburger-line {
          display: block;
          width: 28px;
          height: 2.5px;
          background: #059669;
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
        
        .logo-img {
          transition: all 0.3s ease;
          filter: drop-shadow(0 2px 8px rgba(16, 185, 129, 0.2));
        }
        
        .logo-img:hover {
          transform: scale(1.05);
          filter: drop-shadow(0 4px 12px rgba(16, 185, 129, 0.3));
        }

        .more-btn {
          position: relative;
          transition: all 0.3s ease;
        }

        .more-btn:hover {
          color: #10b981;
        }

        .more-icon {
          transition: transform 0.3s ease;
        }

        .dropdown-menu {
  margin-top: 0;
}

      `}</style>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'glass-effect-dark shadow-xl border-b border-emerald-100'
          : 'glass-effect shadow-md'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 lg:h-24">

            {/* Logo */}
            <NavLink
              to="/"
              className="flex items-center group"
              onClick={() => setIsOpen(false)}
            >
<img
              src={logo}  // ← CHANGED HERE
              alt="Gulzar Laser & Aesthetics Centre"
              className="h-12 lg:h-16 w-auto logo-img"
            />
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link-desktop navbar-font px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 ${isActive ? 'active' : ''
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              {/* Dropdown Menu */}
              <div
                className="dropdown-container relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className="more-btn navbar-font px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 flex items-center gap-1">
                  More
                  <ChevronDown className={`w-4 h-4 more-icon ${isDropdownOpen ? 'rotate' : ''}`} />
                </button>

                <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
                  {dropdownItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className="dropdown-item navbar-font text-sm font-medium"
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>


              <NavLink
                to="/book-appointment"
                className="cta-btn ml-4 px-6 py-3 rounded-full text-white text-sm font-semibold navbar-font"
              >
                Book Appointment
              </NavLink>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-emerald-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
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
          <div className="lg:hidden mobile-menu-overlay fixed  top-20 lg:top-24 bg-white w-full">
            <div className="h-full  w-fulloverflow-y-auto px-6 py-9">
              <div className="max-w-md mx-auto space-y-2">
                {mainNavItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `mobile-menu-item mobile-nav-item block pl-6 pr-4 py-4 text-base font-medium navbar-font rounded-xl transition-all ${isActive
                        ? 'text-emerald-600 bg-emerald-50 active'
                        : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/60'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

                {/* Mobile Dropdown Items */}
                <div className="pt-4 pb-2">
                  <p className="px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider navbar-font mb-2">
                    More
                  </p>
                  {dropdownItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `mobile-menu-item mobile-nav-item block pl-6 pr-4 py-3 text-sm font-medium navbar-font rounded-xl transition-all ${isActive
                          ? 'text-emerald-600 bg-emerald-50 active'
                          : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/60'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>

                <NavLink
                  to="/book-appointment"
                  onClick={() => setIsOpen(false)}
                  className="mobile-menu-item cta-btn block text-center mt-8 px-8 py-4 rounded-full text-white text-base font-semibold navbar-font"
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