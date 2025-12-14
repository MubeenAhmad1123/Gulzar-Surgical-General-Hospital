import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import faqsBg from '../assets/faqs_bg.webp'; // your hero background image

const FAQ = ({ 
  backgroundImage = faqsBg, // use your image
  badgeText = 'Common Questions',
  title = 'Frequently Asked Questions',
  subtitle = 'Find answers to common questions about our treatments and services'
}) => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is laser hair removal permanent?",
      answer: "Laser hair removal provides long-lasting results. Most clients experience permanent hair reduction of 80-95% after completing their treatment series. Maintenance sessions may be needed occasionally."
    },
    {
      question: "How many sessions will I need?",
      answer: "The number of sessions varies depending on the treatment area, hair type, and individual factors. Typically, 6-8 sessions are recommended for optimal results, spaced 4-6 weeks apart."
    },
    {
      question: "Is the treatment painful?",
      answer: "Most clients describe the sensation as a slight pinch or snap. We use advanced cooling technology and numbing creams to ensure your comfort throughout the procedure."
    },
    {
      question: "What is the recovery time?",
      answer: "Most treatments have minimal to no downtime. You may experience slight redness or sensitivity immediately after, but this typically subsides within a few hours to a day."
    },
    {
      question: "Are the treatments safe?",
      answer: "Yes! All our treatments are FDA-approved and performed by certified professionals. We conduct thorough consultations to ensure treatments are appropriate for your skin type and concerns."
    },
    {
      question: "What should I avoid after treatment?",
      answer: "Avoid direct sun exposure, hot showers, saunas, and strenuous exercise for 24-48 hours. Always use SPF 30+ sunscreen and follow the specific aftercare instructions provided."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-100/40 via-teal-50/30 to-amber-50/40">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          aria-hidden="true"
        />
        
        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center relative z-10">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-full mb-6 shadow-sm border border-emerald-100 animate-fadeIn"
            role="status"
            aria-label={badgeText}
          >
            <HelpCircle className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span className="text-sm font-medium text-emerald-700">{badgeText}</span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-4 sm:mb-6 tracking-tight px-4 animate-fadeInUp">
            {title}
          </h1>
          
          {/* Subtitle */}
          <p 
            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4 animate-fadeInUp" 
            style={{ animationDelay: '0.1s' }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      {/* FAQ Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 border border-emerald-100/50 hover:shadow-xl"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex justify-between items-center hover:bg-emerald-50/30 transition-colors"
              >
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 pr-8">
                  {faq.question}
                </h3>
                <span 
                  className={`text-2xl sm:text-3xl text-emerald-600 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 sm:px-8 pb-5 sm:pb-6 text-slate-600 leading-relaxed text-sm sm:text-base animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FAQ;
