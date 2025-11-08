import React, { useEffect, useRef, useState } from 'react';
import { Instagram, Facebook, Youtube, Sparkles, Camera, ZoomIn } from 'lucide-react';

// Import images
import galleryBg from '../assets/gallery bg.webp';
import hospitalExterior from '../assets/hospital-Exterior.webp';
import receptionArea from '../assets/reception-Area.webp';
import operationTheater from '../assets/opreation theater.webp';
import patientRoom from '../assets/patient room.webp';
import equipments from '../assets/equipments.webp';
import consultationImage from '../assets/counsultation.webp';
import laserTreatment from '../assets/laserTreatment.webp';
import skinRejuvenation from '../assets/skin-rejuvention.webp';
import clinicInterior from '../assets/clinicInterior.webp';
import waitingArea from '../assets/waiting area.webp';
import lab from '../assets/lab.webp';
import pharmacy from '../assets/pharmacy.webp';
import icu from '../assets/icu.webp';
import cssd from '../assets/Central Sterile Services Department (CSSD).webp';
import exterior from '../assets/exterior.webp';
import interior from '../assets/interior.webp';

const Gallery = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [selectedImage, setSelectedImage] = useState(null);
  const observerRef = useRef(null);

  const facilities = [
    { 
      category: "Hospital Exterior", 
      type: "Facility",
      emoji: "🏥",
      description: "Modern architecture designed for your comfort",
      image: hospitalExterior
    },
    { 
      category: "Reception Area", 
      type: "Facility",
      emoji: "🎀",
      description: "Welcoming space with attentive staff",
      image: receptionArea
    },
    { 
      category: "Operating Room", 
      type: "Equipment",
      emoji: "🔬",
      description: "State-of-the-art surgical facilities",
      image: operationTheater
    },
    { 
      category: "Patient Ward", 
      type: "Facility",
      emoji: "🛏️",
      description: "Comfortable recovery spaces",
      image: patientRoom
    },
    { 
      category: "Medical Equipment", 
      type: "Equipment",
      emoji: "⚕️",
      description: "Advanced diagnostic technology",
      image: equipments
    },
    { 
      category: "Consultation Room", 
      type: "Facility",
      emoji: "💬",
      description: "Private consultation spaces",
      image: consultationImage
    },
    { 
      category: "Laser Treatment", 
      type: "Equipment",
      emoji: "✨",
      description: "Latest laser technology",
      image: laserTreatment
    },
    { 
      category: "Skin Rejuvenation", 
      type: "Treatment",
      emoji: "🌟",
      description: "Advanced skincare treatments",
      image: skinRejuvenation
    }
  ];

  const galleryImages = [
    { id: 1, image: clinicInterior, title: "Clinic Interior", description: "Modern and comfortable treatment spaces" },
    { id: 2, image: waitingArea, title: "Waiting Area", description: "Relaxing environment for patients" },
    { id: 3, image: lab, title: "Laboratory", description: "Advanced diagnostic facilities" },
    { id: 4, image: pharmacy, title: "Pharmacy", description: "Complete pharmaceutical services" },
    { id: 5, image: icu, title: "ICU", description: "Intensive care unit with latest equipment" },
    { id: 6, image: cssd, title: "CSSD", description: "Central Sterile Services Department" },
    { id: 7, image: exterior, title: "Building Exterior", description: "Modern healthcare facility" },
    { id: 8, image: interior, title: "Interior Design", description: "Patient-friendly environment" },
    { id: 9, image: operationTheater, title: "Operating Theater", description: "Advanced surgical suite" }
  ];

  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, entry.target.dataset.index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const cards = document.querySelectorAll('.facility-card, .gallery-image');
    cards.forEach((card) => observerRef.current.observe(card));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50/30 to-amber-50/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-100/40 via-green-50/30 to-amber-50/40">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${galleryBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-full mb-6 shadow-sm border border-emerald-100 animate-fadeIn">
            <Camera className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">Visual Tour</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 animate-fadeInUp px-4">
            Our Facilities
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto animate-fadeInUp px-4" style={{ animationDelay: '0.1s' }}>
            Take a look at our modern facilities and patient-friendly environment
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Facility Cards with Scroll Animation */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 px-4">Facility Overview</h2>
            <p className="text-base sm:text-lg text-gray-700 px-4">Experience world-class healthcare in a comfortable setting</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {facilities.map((item, index) => (
              <div
                key={index}
                data-index={`facility-${index}`}
                className={`facility-card transform transition-all duration-700 ease-out ${
                  visibleCards.has(`facility-${index}`)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${(index % 4) * 100}ms` }}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group cursor-pointer h-full border border-emerald-100/50">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.category}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-700 border border-emerald-200/50 shadow-md">
                      {item.type}
                    </div>
                    <div className="absolute bottom-4 left-4 text-5xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 drop-shadow-lg">
                      {item.emoji}
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 bg-gradient-to-b from-white to-amber-50/30">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors duration-300">
                      {item.category}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Images Section */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 px-4">
              Facility Gallery
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-4 max-w-2xl mx-auto px-4">
              Explore our facility through these detailed images
            </p>
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full">
              <ZoomIn className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-emerald-700 font-medium">Click images to view larger</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((item, index) => (
              <div 
                key={item.id} 
                data-index={`gallery-${index}`}
                className={`gallery-image group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-emerald-100/50 cursor-pointer ${
                  visibleCards.has(`gallery-${index}`)
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${(index % 3) * 100}ms` }}
                onClick={() => setSelectedImage(item)}
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-5 sm:p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-base sm:text-lg">{item.title}</h4>
                      <ZoomIn className="w-5 h-5 flex-shrink-0" />
                    </div>
                    <p className="text-sm text-emerald-100">{item.description}</p>
                  </div>
                </div>
                {/* Permanent label */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                  <span className="text-xs font-semibold text-emerald-700">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div 
          data-index="cta"
          className={`bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 text-center text-white relative overflow-hidden transition-all duration-700 ${
            visibleCards.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="relative z-10">
            <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-80 animate-pulse" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4">
              Want to See More?
            </h2>
            <p className="text-base sm:text-lg mb-8 text-emerald-50 max-w-2xl mx-auto px-4">
              Follow us on social media for daily updates, treatment results, and special offers
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-emerald-700 hover:bg-amber-50 px-6 sm:px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-emerald-700 hover:bg-amber-50 px-6 sm:px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                <Facebook className="w-5 h-5" />
                Facebook
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-emerald-700 hover:bg-amber-50 px-6 sm:px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                <Youtube className="w-5 h-5" />
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-emerald-400 transition-colors text-4xl font-light"
            >
              ×
            </button>
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={selectedImage.image} 
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <div className="p-6 bg-gradient-to-b from-white to-emerald-50/30">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedImage.title}</h3>
                <p className="text-gray-600">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

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
          animation: fadeIn 0.6s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Gallery;