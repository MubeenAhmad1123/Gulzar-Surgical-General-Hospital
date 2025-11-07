import React, { useEffect, useRef, useState } from 'react';

const Gallery = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const observerRef = useRef(null);

  const facilities = [
    { 
      category: "Hospital Exterior", 
      type: "Facility",
      emoji: "🏥",
      description: "Modern architecture designed for your comfort"
    },
    { 
      category: "Reception Area", 
      type: "Facility",
      emoji: "🎀",
      description: "Welcoming space with attentive staff"
    },
    { 
      category: "Operating Room", 
      type: "Equipment",
      emoji: "🔬",
      description: "State-of-the-art surgical facilities"
    },
    { 
      category: "Patient Ward", 
      type: "Facility",
      emoji: "🛏️",
      description: "Comfortable recovery spaces"
    },
    { 
      category: "Medical Equipment", 
      type: "Equipment",
      emoji: "⚕️",
      description: "Advanced diagnostic technology"
    },
    { 
      category: "Consultation Room", 
      type: "Facility",
      emoji: "💬",
      description: "Private consultation spaces"
    },
    { 
      category: "Laser Treatment", 
      type: "Equipment",
      emoji: "✨",
      description: "Latest laser technology"
    },
    { 
      category: "Skin Rejuvenation", 
      type: "Treatment",
      emoji: "🌟",
      description: "Advanced skincare treatments"
    }
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, entry.target.dataset.index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = document.querySelectorAll('.facility-card');
    cards.forEach((card) => observerRef.current.observe(card));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50/30 to-amber-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Our Facilities
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Take a look at our modern facilities and patient-friendly environment
          </p>
        </div>

        {/* Facility Cards with Scroll Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {facilities.map((item, index) => (
            <div
              key={index}
              data-index={index}
              className={`facility-card transform transition-all duration-700 ease-out ${
                visibleCards.has(String(index))
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${(index % 3) * 150}ms` }}
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group cursor-pointer h-full border border-emerald-100/50">
                <div className="relative h-48 bg-gradient-to-br from-emerald-100/80 via-green-50 to-amber-50/60 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/30 to-green-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-7xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    {item.emoji}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-emerald-700 border border-emerald-200/50">
                    {item.type}
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-b from-white to-amber-50/30">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors duration-300">
                    {item.category}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Images Section - Placeholder for your images */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Facility Images
          </h2>
          <p className="text-gray-700 mb-10 text-center max-w-2xl mx-auto">
            Explore our facility through these detailed images
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group relative aspect-[4/3] bg-gradient-to-br from-emerald-50 to-amber-50/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100/50">
                {/* Placeholder for images - Replace with <img> tags */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-2">🖼️</div>
                    <p className="text-gray-700 font-medium">Image {item}</p>
                    <p className="text-sm text-gray-600">Add your image here</p>
                  </div>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 via-emerald-800/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="font-semibold text-lg mb-1">Facility Name</h4>
                    <p className="text-sm text-emerald-100">Add description here</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 rounded-3xl shadow-2xl p-10 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">
              Want to See More?
            </h2>
            <p className="text-lg mb-8 text-emerald-50">
              Follow us on social media for daily updates, treatment results, and special offers
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-emerald-700 hover:bg-amber-50 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                📱 Instagram
              </button>
              <button className="bg-white text-emerald-700 hover:bg-amber-50 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                👥 Facebook
              </button>
              <button className="bg-white text-emerald-700 hover:bg-amber-50 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                ▶️ YouTube
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;