import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

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
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
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
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        .nav-link-desktop { position: relative; padding-bottom: 4px; transition: all 0.3s; }
        .nav-link-desktop::after { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 0; height: 2px; background: linear-gradient(90deg, transparent, #C9A496, transparent); transition: width 0.4s; }
        .nav-link-desktop:hover::after, .nav-link-desktop.active::after { width: 100%; }
        .nav-link-desktop.active { color: #C9A496; }
        .logo-gradient { background: linear-gradient(135deg, #C9A496 0%, #A5C3B1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .glass-effect { background: rgba(255, 250, 249, 0.85); backdrop-filter: blur(20px); }
        .glass-effect-dark { background: rgba(255, 250, 249, 0.95); backdrop-filter: blur(20px); }
        .cta-btn { background: linear-gradient(135deg, #C9A496 0%, #F8E7EC 100%); box-shadow: 0 4px 15px rgba(201, 164, 150, 0.25); transition: all 0.3s; }
        .cta-btn:hover { box-shadow: 0 6px 25px rgba(201, 164, 150, 0.4); transform: translateY(-2px); }
        .hamburger-line { display: block; width: 28px; height: 2.5px; background: #333; border-radius: 2px; transition: all 0.3s; }
        .hamburger-open .line-1 { transform: translateY(9px) rotate(45deg); }
        .hamburger-open .line-2 { opacity: 0; transform: translateX(-10px); }
        .hamburger-open .line-3 { transform: translateY(-9px) rotate(-45deg); }
      `}</style>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-effect-dark shadow-xl' : 'glass-effect shadow-md'
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
                className="w-7 h-7 text-[#C9A496] transition-transform duration-300 group-hover:scale-110" 
                strokeWidth={1.5} 
              />
              <h1 className="logo-gradient text-2xl lg:text-3xl font-semibold tracking-wide transition-all duration-300 group-hover:tracking-wider">
                Gulzar Laser & Aesthetics Centre
              </h1>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link-desktop px-4 py-2 text-sm font-medium text-[#333] hover:text-[#C9A496] ${
                      isActive ? 'active' : ''
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              <NavLink
                to="/book-appointment"
                className="cta-btn ml-4 px-6 py-3 rounded-full text-[#333] text-sm font-semibold"
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
          <div className="xl:hidden fixed inset-0 top-20 lg:top-24 bg-[#FFFAF9]/98 backdrop-blur-xl">
            <div className="h-full overflow-y-auto px-6 py-8">
              <div className="max-w-md mx-auto space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block pl-6 pr-4 py-4 text-base font-medium rounded-xl transition-all ${
                        isActive
                          ? 'text-[#C9A496] bg-[#F8E7EC]/60'
                          : 'text-[#333] hover:text-[#C9A496] hover:bg-[#F8E7EC]/40'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
                <NavLink
                  to="/book-appointment"
                  onClick={() => setIsOpen(false)}
                  className="block text-center mt-8 px-8 py-4 rounded-full text-[#333] text-base font-semibold cta-btn"
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
