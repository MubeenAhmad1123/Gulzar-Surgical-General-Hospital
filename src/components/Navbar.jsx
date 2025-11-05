import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

// Simulated Router (since react-router-dom isn't available)
const Router = ({ children, currentPath }) => {
  return React.Children.map(children, child => {
    if (child.props.path === currentPath) {
      return child.props.element;
    }
    return null;
  });
};

const Route = () => null;

// Navbar Component
const Navbar = ({ currentPath, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Patient Info', path: '/patient-info' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
    { name: 'Our Team', path: '/our-team' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Book an Appointment', path: '/book-appointment' }
  ];

  const isActive = (path) => currentPath === path;

  const handleNavigation = (path) => {
    onNavigate(path);
    setIsOpen(false);
  };

  const handleKeyDown = (e, path) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigation(path);
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavigation('/')}
              className="text-2xl font-bold hover:text-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 rounded"
              aria-label="Go to home page"
            >
              HealthCare
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                onKeyDown={(e) => handleKeyDown(e, item.path)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 ${
                  isActive(item.path)
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                }`}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                onKeyDown={(e) => handleKeyDown(e, item.path)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 ${
                  isActive(item.path)
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                }`}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// Page Components
const HomePage = () => <div className="text-3xl font-bold text-gray-800">Welcome to HealthCare Home</div>;
const AboutPage = () => <div className="text-3xl font-bold text-gray-800">About Us</div>;
const ServicesPage = () => <div className="text-3xl font-bold text-gray-800">Our Services</div>;
const PatientInfoPage = () => <div className="text-3xl font-bold text-gray-800">Patient Information</div>;
const FAQPage = () => <div className="text-3xl font-bold text-gray-800">Frequently Asked Questions</div>;
const ContactPage = () => <div className="text-3xl font-bold text-gray-800">Contact Us</div>;
const OurTeamPage = () => <div className="text-3xl font-bold text-gray-800">Meet Our Team</div>;
const GalleryPage = () => <div className="text-3xl font-bold text-gray-800">Gallery</div>;
const BookAppointmentPage = () => <div className="text-3xl font-bold text-gray-800">Book an Appointment</div>;

// Main App Component
export default function App() {
  const [currentPath, setCurrentPath] = useState('/');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPath={currentPath} onNavigate={setCurrentPath} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Router currentPath={currentPath} onNavigate={setCurrentPath}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/patient-info" element={<PatientInfoPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/our-team" element={<OurTeamPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/book-appointment" element={<BookAppointmentPage />} />
        </Router>
      </main>
    </div>
  );
}