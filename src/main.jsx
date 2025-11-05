import React, { useState, lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold hover:text-blue-100 transition-colors">
              HealthCare
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                }`}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
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
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                }`}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// Layout Component
const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

// Lazy-loaded Page Components
const HomePage = lazy(() => Promise.resolve({ 
  default: () => <div className="text-3xl font-bold text-gray-800">Welcome to HealthCare Home</div> 
}));

const AboutPage = lazy(() => Promise.resolve({ 
  default: () => <div className="text-3xl font-bold text-gray-800">About Us</div> 
}));

const ServicesPage = lazy(() => Promise.resolve({ 
  default: () => <div className="text-3xl font-bold text-gray-800">Our Services</div> 
}));

const PatientInfoPage = lazy(() => Promise.resolve({ 
  default: () => <div className="text-3xl font-bold text-gray-800">Patient Information</div> 
}));

const FAQPage = lazy(() => Promise.resolve({ 
  default: () => <div className="text-3xl font-bold text-gray-800">Frequently Asked Questions</div> 
}));

const ContactPage = lazy(() => Promise.resolve({ 
  default: () => <div className="text-3xl font-bold text-gray-800">Contact Us</div> 
}));

const OurTeamPage = lazy(() => Promise.resolve({ 
  default: () => <div className="text-3xl font-bold text-gray-800">Meet Our Team</div> 
}));

const GalleryPage = lazy(() => Promise.resolve({ 
  default: () => <div className="text-3xl font-bold text-gray-800">Gallery</div> 
}));

const BookAppointmentPage = lazy(() => Promise.resolve({ 
  default: () => <div className="text-3xl font-bold text-gray-800">Book an Appointment</div> 
}));

// Router Configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'patient-info', element: <PatientInfoPage /> },
      { path: 'faq', element: <FAQPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'our-team', element: <OurTeamPage /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'book-appointment', element: <BookAppointmentPage /> }
    ]
  }
]);

// App Component
export default function App() {
  return <RouterProvider router={router} />;
}