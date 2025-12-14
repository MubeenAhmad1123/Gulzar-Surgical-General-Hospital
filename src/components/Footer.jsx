import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Mail, Phone, Clock, Send, Heart, Sparkles, } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';


import Call from '../assets/call.webp';
import Whatsapp from '../assets/whatsapp3.webp';
const Footer = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

const handleSubscribe = async () => {
  if (!email) {
    setEmailError('Email is required');
    return;
  }
  
  if (!validateEmail(email)) {
    setEmailError('Please enter a valid email');
    return;
  }

  setIsSubmitting(true);
  
  try {
    const subscribeTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Karachi',
      dateStyle: 'full',
      timeStyle: 'short'
    });

    // Email data for subscriber - using same template as appointments
    const emailData = {
      to_email: email,
      to_name: 'Valued Subscriber',
      from_name: 'Newsletter Subscription',
      client_name: 'Newsletter Subscriber',
      client_email: email,
      client_phone: 'N/A',
      preferred_date: subscribeTime,
      preferred_time: 'N/A',
      service: 'Newsletter Subscription',
      message: 'Thank you for subscribing to our newsletter! You will now receive exclusive beauty tips, special offers, and updates about our latest treatments and services.',
      booking_time: subscribeTime
    };

    // Send welcome email using existing client template
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CLIENT, // Using same template
      emailData,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    setIsSubmitting(false);
    setShowToast(true);
    setEmail('');
    setEmailError('');
    
    // Hide toast after 4 seconds
    setTimeout(() => setShowToast(false), 4000);
  } catch (error) {
    setIsSubmitting(false);
    setEmailError('Failed to subscribe. Please try again.');
    console.error('Newsletter subscription error:', error);
  }
};
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+923218492868?text=Hello! I would like to book an appointment.', '_blank');
  };

  const handleEmergencyCall = () => {
    window.location.href = 'tel:+92123456789';
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Our Team', path: '/our-team' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Patient Info', path: '/patient-info' },
    { name: 'Book Appointment', path: '/book-appointment' }
  ];

  const resources = [
    { name: 'FAQ', path: '/faq' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Careers', path: '/careers' }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        .footer-container {
          font-family: 'Inter', sans-serif;
          position: relative;
        }

        .footer-logo {
          font-family: 'Playfair Display', serif;
          letter-spacing: 0.5px;
        }

        .footer-gradient-bg {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #134e4a 100%);
          position: relative;
        }

        .footer-gradient-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(201, 164, 150, 0.05) 0%, rgba(165, 195, 177, 0.05) 100%);
          pointer-events: none;
        }

        /* Wave SVG at top */
        .wave-container {
          position: absolute;
          top: -1px;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
        }

        .wave-container svg {
          position: relative;
          display: block;
          width: calc(100% + 1.3px);
          height: 60px;
        }

        .wave-path {
          fill: #1e293b;
        }

        /* Floating Particles */
        .particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201, 164, 150, 0.3), transparent);
          pointer-events: none;
          animation: float 20s infinite ease-in-out;
        }

        .particle-1 {
          width: 4px;
          height: 4px;
          top: 10%;
          left: 15%;
          animation-delay: 0s;
          animation-duration: 15s;
        }

        .particle-2 {
          width: 6px;
          height: 6px;
          top: 40%;
          left: 80%;
          animation-delay: 2s;
          animation-duration: 18s;
        }

        .particle-3 {
          width: 3px;
          height: 3px;
          top: 70%;
          left: 25%;
          animation-delay: 4s;
          animation-duration: 22s;
        }

        .particle-4 {
          width: 5px;
          height: 5px;
          top: 20%;
          left: 60%;
          animation-delay: 1s;
          animation-duration: 16s;
        }

        .particle-5 {
          width: 4px;
          height: 4px;
          top: 85%;
          left: 70%;
          animation-delay: 3s;
          animation-duration: 20s;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(20px, -30px) scale(1.2);
            opacity: 0.5;
          }
          50% {
            transform: translate(-15px, -60px) scale(0.8);
            opacity: 0.4;
          }
          75% {
            transform: translate(30px, -40px) scale(1.1);
            opacity: 0.6;
          }
        }

        .glass-footer {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-link {
          position: relative;
          display: inline-block;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #C9A496, #A5C3B1);
          box-shadow: 0 0 8px rgba(201, 164, 150, 0.4);
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .footer-link:hover::after {
          width: 100%;
        }

        .footer-link:hover {
          color: #C9A496;
          transform: translateX(4px);
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 600;
        }

        .gradient-text {
          background: linear-gradient(135deg, #C9A496 0%, #F8E7EC 50%, #A5C3B1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .newsletter-btn {
          background: linear-gradient(135deg, #C9A496 0%, #F8E7EC 100%);
          box-shadow: 0 4px 15px rgba(201, 164, 150, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .newsletter-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s;
        }

        .newsletter-btn:hover::before {
          left: 100%;
        }

        .newsletter-btn:hover {
          box-shadow: 0 6px 25px rgba(201, 164, 150, 0.5);
          transform: translateY(-2px);
        }

        .newsletter-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .social-icon {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }

        .social-icon::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          padding: 2px;
          background: linear-gradient(135deg, #C9A496, #A5C3B1);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .social-icon:hover::before {
          opacity: 1;
        }

        .social-icon:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(201, 164, 150, 0.4);
          background: rgba(255, 255, 255, 0.1);
        }

        .contact-item {
          transition: all 0.3s ease;
        }

        .contact-item:hover {
          transform: translateX(4px);
        }

        .contact-item:hover .contact-icon {
          transform: scale(1.15);
          color: #C9A496;
        }

        .contact-icon {
          transition: all 0.3s ease;
        }

        .newsletter-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .newsletter-input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(201, 164, 150, 0.5);
          box-shadow: 0 0 0 3px rgba(201, 164, 150, 0.1);
          outline: none;
        }

        .newsletter-input.error {
          border-color: rgba(239, 68, 68, 0.5);
        }

        .sparkle-icon {
          filter: drop-shadow(0 0 8px rgba(201, 164, 150, 0.4));
          animation: sparkleRotate 3s ease-in-out infinite;
        }

        @keyframes sparkleRotate {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .fade-in-up-1 { animation-delay: 0.1s; }
        .fade-in-up-2 { animation-delay: 0.2s; }
        .fade-in-up-3 { animation-delay: 0.3s; }
        .fade-in-up-4 { animation-delay: 0.4s; }

        .heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        /* Toast Notification */
        .toast {
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(16, 185, 129, 0.3);
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 12px;
          animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .toast.hiding {
          animation: slideOutRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }

        .checkmark {
          width: 24px;
          height: 24px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }

        /* WhatsApp Button 3D Effect */
        .whatsapp-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 65px;
  height: 65px;
  background: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
        .whatsapp-btn::before {
          content: '';
          position: absolute;
          inset: -5px;
          background: linear-gradient(135deg, #25D366, #128C7E););
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .whatsapp-btn:hover::before {
          opacity: 1;
          animation: ripple 1.5s infinite;
        }

        .whatsapp-btn:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 
            0 8px 20px rgba(37, 211, 102, 0.5),
            0 12px 35px rgba(37, 211, 102, 0.4),
            inset 0 -3px 8px rgba(0, 0, 0, 0.2);
        }

        .whatsapp-btn:active {
          transform: translateY(-2px) scale(1.05);
        }

        @keyframes whatsappPulse {
          0%, 100% {
            box-shadow: 
              0 4px 12px rgba(37, 211, 102, 0.4),
              0 8px 24px rgba(37, 211, 102, 0.3),
              inset 0 -3px 8px rgba(0, 0, 0, 0.2);
          }
          50% {
            box-shadow: 
              0 6px 16px rgba(37, 211, 102, 0.5),
              0 10px 30px rgba(37, 211, 102, 0.4),
              inset 0 -3px 8px rgba(0, 0, 0, 0.2);
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        /* Emergency Call Button */
        .emergency-btn {
  position: fixed;
  bottom: 110px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
        .emergency-btn:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 
            0 8px 20px rgba(68, 256, 68, 0.5),
            0 12px 35px rgba(68, 256, 68, 0.4),
            inset 0 -3px 8px rgba(0, 0, 0, 0.2);
        }
.emergency-btn:hover::before {
         opacity: 1;
          animation: ripple 1.5s infinite;
        }


        @keyframes emergencyPulse {
          0%, 100% {
            box-shadow: 
              0 4px 12px rgba(239, 68, 68, 0.4),
              0 8px 24px rgba(239, 68, 68, 0.3),
              inset 0 -3px 8px rgba(0, 0, 0, 0.2);
          }
          50% {
            box-shadow: 
              0 6px 16px rgba(239, 68, 68, 0.6),
              0 10px 30px rgba(239, 68, 68, 0.5),
              inset 0 -3px 8px rgba(0, 0, 0, 0.2);
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .spinning {
          animation: spin 1s linear infinite;
        }
      `}</style>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast">
          <div className="checkmark">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7L5.5 10.5L12 3.5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="font-semibold">Successfully Subscribed!</div>
            <div className="text-sm text-green-100">Thank you for joining our newsletter</div>
          </div>
        </div>
      )}

{/* WhatsApp Floating Button */}
<div className="whatsapp-btn" onClick={handleWhatsAppClick} title="Chat on WhatsApp">
  <img 
    src={Whatsapp} 
    alt="WhatsApp" 
    className="w-20 h-20"
  />
</div>
{/* Emergency Call Button */}
<div className="emergency-btn" onClick={handleEmergencyCall} title="Emergency Call">
  <img 
    src={Call} 
    alt="Emergency Call" 
    className="w-20 h-20"
  />
</div>
      <footer className="footer-container footer-gradient-bg text-white overflow-hidden">
        {/* Wave Transition */}
        <div className="wave-container">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path className="wave-path" d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>

        {/* Floating Particles */}
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>

        {/* Decorative Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
            backgroundSize: '4px 4px'
          }}></div>
        </div>

        {/* Main Footer Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Column 1: Logo & About */}
            <div className="lg:col-span-1 fade-in-up fade-in-up-1">
              <div className="flex items-center space-x-3 mb-6">
                <Sparkles className="w-8 h-8 text-[#C9A496] sparkle-icon" strokeWidth={1.5} />
                <div className="footer-logo">
                  <h2 className="gradient-text text-2xl font-semibold">
                    Gulzar Laser
                  </h2>
                </div>
              </div>
              <p className="text-[#C9A496] text-sm font-medium mb-4">& Aesthetics Centre</p>
              <p className="text-slate-300 leading-relaxed mb-6 text-sm">
                Redefining Care and Confidence through innovative aesthetic treatments and personalized skincare solutions.
              </p>
              <div className="flex items-center gap-2 text-[#A5C3B1]">
                <Heart className="w-5 h-5 heartbeat" />
                <span className="text-sm font-medium">Your Beauty, Our Passion</span>
              </div>
            </div>

           {/* Column 2: Quick Links */}
<div className="fade-in-up fade-in-up-2">
  <h3 className="section-title text-sm mb-6 text-[#A5C3B1]">
    Quick Links
  </h3>
  <ul className="space-y-3">
    {quickLinks.map((link, index) => (
      <li key={index}>
        <Link 
          to={link.path}
          className="footer-link text-slate-300 text-sm"
        >
          {link.name}
        </Link>
      </li>
    ))}
  </ul>
</div>

{/* Column 3: Resources & Hours */}
<div className="fade-in-up fade-in-up-3">
  <h3 className="section-title text-sm mb-6 text-[#A5C3B1]">
    Resources
  </h3>
  <ul className="space-y-3 mb-8">
    {resources.map((link, index) => (
      <li key={index}>
        <Link 
          to={link.path}
          className="footer-link text-slate-300 text-sm"
        >
          {link.name}
        </Link>
      </li>
    ))}
  </ul>

  {/* Working Hours */}
  <div className="glass-footer rounded-xl p-4 mt-6">
    <div className="flex items-center gap-2 mb-3">
      <Clock className="w-4 h-4 text-[#C9A496]" />
      <h4 className="text-sm font-semibold text-[#A5C3B1]">Working Hours</h4>
    </div>
    <p className="text-xs text-slate-300 leading-relaxed">
      Mon - Sat: 9:00 AM - 8:00 PM<br/>
      Sunday: 10:00 AM - 6:00 PM
    </p>
  </div>
</div>
            {/* Column 4: Contact & Newsletter */}
            <div className="fade-in-up fade-in-up-4">
              <h3 className="section-title text-sm mb-6 text-[#A5C3B1]">
                Get In Touch
              </h3>
              
              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="contact-item flex items-start gap-3">
                  <MapPin className="contact-icon w-5 h-5 text-[#C9A496] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-300 leading-relaxed">
                    123 Beauty Street, Medical District<br />
                    Islamabad, Pakistan
                  </p>
                </div>
                <div className="contact-item flex items-center gap-3">
                  <Phone className="contact-icon w-5 h-5 text-[#C9A496] flex-shrink-0" />
                  <a href="tel:+92123456789" className="text-sm text-slate-300 hover:text-[#C9A496] transition-colors">
                    +92 123 456 789
                  </a>
                </div>
                <div className="contact-item flex items-center gap-3">
                  <Mail className="contact-icon w-5 h-5 text-[#C9A496] flex-shrink-0" />
                  <a href="mailto:info@gulzarlaser.com" className="text-sm text-slate-300 hover:text-[#C9A496] transition-colors">
                    info@gulzarlaser.com
                  </a>
                </div>
              </div>

              {/* Newsletter */}
              <div className="glass-footer rounded-xl p-4">
                <h4 className="text-sm font-semibold mb-3 text-[#A5C3B1]">Stay Updated</h4>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Subscribe for beauty tips and special offers
                </p>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Your email"
                      className={`newsletter-input flex-1 px-3 py-2.5 rounded-lg text-sm text-white placeholder-slate-400 ${emailError ? 'error' : ''}`}
                    />
                    <button
                      onClick={handleSubscribe}
                      disabled={isSubmitting}
                      className="newsletter-btn px-4 py-2.5 rounded-lg text-sm font-semibold text-[#333333] flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-[#333333] border-t-transparent rounded-full spinning"></div>
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {emailError && (
                    <p className="text-xs text-red-400">{emailError}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              
              {/* Social Icons */}
              <div className="flex gap-4 order-2 md:order-1">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="social-icon w-11 h-11 rounded-full flex items-center justify-center text-slate-300 hover:text-white border border-white/10"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>

              {/* Copyright */}
              <div className="text-center md:text-right order-1 md:order-2">
                <p className="text-sm text-slate-400">
                  © 2025 <span className="text-[#C9A496] font-semibold">Gulzar Laser & Aesthetics Centre</span>
                </p>
                <p className="text-xs text-slate-500 mt-1 flex items-center justify-center md:justify-end gap-1">
                  All Rights Reserved. Crafted with <Heart className="w-3 h-3 inline text-rose-400 heartbeat" /> in Pakistan
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;