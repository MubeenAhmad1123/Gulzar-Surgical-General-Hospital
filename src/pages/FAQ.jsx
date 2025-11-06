import { useState } from 'react';

const FAQ = () => {
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
    <div className="min-h-screen bg-ivory">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center">
          Find answers to common questions about our treatments and services
        </p>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-blush/10 transition-colors"
              >
                <h3 className="text-lg font-semibold text-charcoal pr-8">
                  {faq.question}
                </h3>
                <span className={`text-2xl text-rosegold transition-transform duration-300 ${
                  openIndex === index ? 'rotate-45' : ''
                }`}>
                  +
                </span>
              </button>
              {openIndex === index && (
                <div className="px-8 pb-6 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;