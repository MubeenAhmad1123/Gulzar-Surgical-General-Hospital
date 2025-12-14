import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Sparkles, Camera, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Import images
import galleryBg from '../assets/gallery_bg.webp';
import hospitalExterior from '../assets/hospital_exterior.webp';
import receptionArea from '../assets/reception_area.webp';
import operationTheater from '../assets/opreation_theater.webp';
import patientRoom from '../assets/patient_room.webp';
import equipments from '../assets/equipments.webp';
import consultationImage from '../assets/counsultation.webp';
import laserTreatment from '../assets/lazer.webp';
import skinRejuvenation from '../assets/skin_rejuvention.webp';
import clinicInterior from '../assets/interior.webp';
import waitingArea from '../assets/waiting_area.webp';
import lab from '../assets/lab.webp';
import pharmacy from '../assets/pharmacy.webp';
import icu from '../assets/icu.webp';
import cssd from '../assets/central_sterile_services_department_cssd.webp';
import exterior from '../assets/exterior.webp';
import interior from '../assets/interior.webp';

const Gallery = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const observerRef = useRef(null);

  const facilities = [
    { 
      category: "Hospital Exterior", 
      type: "Facility",
      description: "Modern architecture designed for your comfort",
      image: hospitalExterior
    },
    { 
      category: "Reception Area", 
      type: "Facility",
      description: "Welcoming space with attentive staff",
      image: receptionArea
    },
    { 
      category: "Operating Room", 
      type: "Equipment",
      description: "State-of-the-art surgical facilities",
      image: operationTheater
    },
    { 
      category: "Patient Ward", 
      type: "Facility",
      description: "Comfortable recovery spaces",
      image: patientRoom
    },
    { 
      category: "Medical Equipment", 
      type: "Equipment",
      description: "Advanced diagnostic technology",
      image: equipments
    },
    { 
      category: "Consultation Room", 
      type: "Facility",
      description: "Private consultation spaces",
      image: consultationImage
    },
    { 
      category: "Laser Treatment", 
      type: "Equipment",
      description: "Latest laser technology",
      image: laserTreatment
    },
    { 
      category: "Skin Rejuvenation", 
      type: "Treatment",
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

    const cards = document.querySelectorAll('.facility-card, .gallery-image, .cta-section');
    cards.forEach((card) => observerRef.current.observe(card));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const openModal = (item, index) => {
    setSelectedImage(item);
    setCurrentImageIndex(index);
    setImageLoaded(false);
  };

  const closeModal = () => {
    setImageLoaded(false);
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentImageIndex + 1) % galleryImages.length
      : (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    
    setImageLoaded(false);
    setCurrentImageIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

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
        />
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
        {/* Facility Cards */}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent" />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-700 border border-emerald-200/50 shadow-md">
                      {item.type}
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
                onClick={() => openModal(item, index)}
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-5 sm:p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-base sm:text-lg">{item.title}</h4>
                      <ZoomIn className="w-5 h-5 flex-shrink-0" />
                    </div>
                    <p className="text-sm text-emerald-100">{item.description}</p>
                  </div>
                </div>
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
          className={`cta-section bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 text-center text-white relative overflow-hidden transition-all duration-700 ${
            visibleCards.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float" style={{ animationDelay: '0s' }} />
            <div className="absolute bottom-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 right-10 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
          </div>
          <div className="relative z-10">
            <div className={`transition-all duration-700 ${visibleCards.has('cta') ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
              <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-6 opacity-80 animate-pulse" />
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4 transition-all duration-700 ${visibleCards.has('cta') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
              Ready to Experience Excellence?
            </h2>
            <p className={`text-base sm:text-lg mb-8 text-emerald-50 max-w-2xl mx-auto px-4 transition-all duration-700 ${visibleCards.has('cta') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
              Book your consultation today and discover our world-class facilities in person. Our expert team is ready to help you achieve your aesthetic goals.
            </p>
            <div className={`flex justify-center mb-10 transition-all duration-700 ${visibleCards.has('cta') ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
              <Link 
                to="/book-appointment"
                className="bg-white text-emerald-700 hover:bg-amber-50 px-8 sm:px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-2xl inline-flex items-center gap-2 animate-bounce-gentle"
              >
                <Sparkles className="w-5 h-5" />
                Book Your Consultation
              </Link>
            </div>
            
            <div className={`border-t border-emerald-400/30 pt-8 transition-all duration-700 ${visibleCards.has('cta') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
              <p className="text-emerald-100 mb-4 text-sm sm:text-base">Follow us for updates and behind-the-scenes</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20 hover:rotate-12"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20 hover:rotate-12"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20 hover:rotate-12"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-gradient-to-b from-white to-emerald-50/50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            data-index="bottom-cta"
            className={`cta-section bg-white rounded-3xl shadow-xl border-2 border-emerald-100 p-8 sm:p-12 text-center transition-all duration-700 relative overflow-hidden ${
              visibleCards.has('bottom-cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-100/40 to-transparent rounded-full blur-3xl animate-pulse-slow" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-amber-100/40 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative z-10">
              <div className={`mb-6 transition-all duration-700 ${visibleCards.has('bottom-cta') ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full mb-4 shadow-lg animate-bounce-gentle">
                  <Camera className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Impressed by What You've Seen?
                </h2>
              </div>
              
              <div className={`transition-all duration-700 ${visibleCards.has('bottom-cta') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-2">
                  Experience these world-class facilities in person. Schedule your visit today and let us show you why we're the premier choice for aesthetic care.
                </p>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-amber-50 border-2 border-emerald-200 px-4 py-2 rounded-full mb-6 animate-pulse-gentle">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <p className="text-base text-emerald-700 font-bold">
                    Limited consultation slots available this month!
                  </p>
                </div>
              </div>
              
              <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 ${visibleCards.has('bottom-cta') ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
                <Link 
                  to="/book-appointment"
                  className="group bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2 relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <Sparkles className="w-5 h-5 relative z-10 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="relative z-10">Schedule Your Visit</span>
                </Link>
                <Link 
                  to="/services"
                  className="group bg-white hover:bg-gradient-to-r hover:from-emerald-50 hover:to-amber-50 text-emerald-700 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg border-2 border-emerald-600 inline-flex items-center gap-2 relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-100/50 to-amber-100/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <span className="relative z-10">Explore Our Services</span>
                </Link>
              </div>

              <div className={`mt-8 pt-8 border-t border-gray-200 transition-all duration-700 ${visibleCards.has('bottom-cta') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div className="group cursor-default">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600 mb-1 group-hover:scale-110 transition-transform duration-300">15+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div className="group cursor-default">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600 mb-1 group-hover:scale-110 transition-transform duration-300">1000+</div>
                    <div className="text-sm text-gray-600">Happy Clients</div>
                  </div>
                  <div className="group cursor-default">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600 mb-1 group-hover:scale-110 transition-transform duration-300">100%</div>
                    <div className="text-sm text-gray-600">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Image Modal with Navigation */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 z-50 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-2 rounded-full transition-all duration-300 hover:rotate-90 border border-white/20"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Buttons */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 z-50 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>

          {/* Modal Content */}
          <div 
            className="relative max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              {/* Image Container with Loading State */}
              <div className="relative bg-gray-900">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <img 
                  src={selectedImage.image} 
                  alt={selectedImage.title}
                  className={`w-full h-auto max-h-[70vh] object-contain transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
              
              {/* Image Info */}
              <div className="p-6 bg-gradient-to-b from-gray-900 to-black border-t border-white/10">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                  <p className="text-gray-300 mb-4">{selectedImage.description}</p>
                  <Link 
                    to="/book-appointment"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Sparkles className="w-5 h-5" />
                    Book Appointment Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 px-1">
              {galleryImages.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => {
                    setImageLoaded(false);
                    setCurrentImageIndex(idx);
                    setSelectedImage(img);
                  }}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    idx === currentImageIndex 
                      ? 'border-emerald-500 scale-110' 
                      : 'border-white/20 hover:border-white/40 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={img.image} 
                    alt={img.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-15px) translateX(5px);
          }
        }

        @keyframes bounceGentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulseGentle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.2;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-bounce-gentle {
          animation: bounceGentle 2s ease-in-out infinite;
        }

        .animate-pulse-gentle {
          animation: pulseGentle 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulseSlow 4s ease-in-out infinite;
        }

        /* Hide scrollbar for thumbnail navigation */
        .overflow-x-auto::-webkit-scrollbar {
          height: 4px;
        }

        .overflow-x-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.5);
          border-radius: 2px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.7);
        }
      `}</style>
    </div>
  );
};

export default Gallery;