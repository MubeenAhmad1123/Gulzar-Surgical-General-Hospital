import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Droplet, Zap, Star, Heart, Shield, Clock, Award, TrendingUp, Smile, Sun, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';
// Import service images
import faceHIFU from '../assets/face_hifu.webp';
import weightLossDrips from '../assets/wieghtloss_drip.webp';
import hydraFacial from '../assets/hydraFacial_glow.webp';
import whiteningDrips from '../assets/whiteing_drips.webp';
import prpTreatment from '../assets/platelet_rich_plasma_therapy.webp';
import hollywoodPeel from '../assets/hollywood_peel.webp';
import chemicalPeel from '../assets/chemical_peel.webp';
import iplTreatment from '../assets/ipl_treatment.webp';
import dermalFillers from '../assets/dermal_filer.webp';
import cheekContouring from '../assets/cheek_countouring.webp';
import laserHairRemoval from '../assets/laser_hair_removal.webp';
import acneTreatment from '../assets/acne_pignntation_treatement.webp';
import skinGlow from '../assets/skin_glow_enhancment.webp';
import lesionRemoval from '../assets/lesion_removal.webp';
import antiAging from '../assets/anti_aging_treatments.webp';
import dentalServices from '../assets/dental_services.webp';
import qualityAssured from '../assets/quality_assured.webp';
import expertTeam from '../assets/expert_team.webp';
import servicesBg from '../assets/services_section_bg.webp';

const Services = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    // SEO: Update page title and meta description
    document.title = 'Medical Services - Gulzar Laser & Aesthetics Centre | Premium Treatments';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore our comprehensive range of aesthetic services including laser treatments, facial therapies, injectable treatments, and skin rejuvenation at competitive prices.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Explore our comprehensive range of aesthetic services including laser treatments, facial therapies, injectable treatments, and skin rejuvenation at competitive prices.';
      document.head.appendChild(meta);
    }

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

    document.querySelectorAll('[data-index]').forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const premiumServices = [
    {
      name: "Face HIFU",
      price: "7,000",
      description: "Non-invasive face lifting and skin tightening using High-Intensity Focused Ultrasound technology",
      icon: Sparkles,
      gradient: "from-emerald-500 to-teal-500",
      popular: true,
      image: faceHIFU
    },
    {
      name: "Weight Loss Drips",
      price: "6,500",
      description: "IV therapy designed to boost metabolism and support your weight loss journey",
      icon: TrendingUp,
      gradient: "from-teal-500 to-cyan-500",
      image: weightLossDrips
    },
    {
      name: "Hydra Facial & Whitening Drips",
      price: "6,000",
      description: "Complete skin hydration and brightening combo for radiant, glowing skin",
      icon: Droplet,
      gradient: "from-cyan-500 to-emerald-500",
      popular: true,
      image: whiteningDrips
    },
    {
      name: "Vampire Facial",
      price: "5,000",
      description: "PRP microneedling treatment for natural skin rejuvenation and collagen boost",
      icon: Heart,
      gradient: "from-rose-500 to-pink-500",
      image: prpTreatment
    },
    {
      name: "Clever Facial",
      price: "5,000",
      description: "Advanced facial treatment combining multiple technologies for complete skin care",
      icon: Star,
      gradient: "from-amber-500 to-orange-500",
      image: hydraFacial
    },
   
    {
      name: "Hollywood Facial",
      price: "5,000",
      description: "Red carpet-ready skin with instant glow and rejuvenation",
      icon: Sparkles,
      gradient: "from-purple-500 to-pink-500",
      image: hollywoodPeel
    },
    {
      name: "Chemical Peel (Face)",
      price: "5,000",
      description: "Exfoliation treatment to reduce fine lines, acne scars, and pigmentation",
      icon: Wind,
      gradient: "from-emerald-500 to-teal-500",
      image: chemicalPeel
    },
    {
      name: "Hydra Facial",
      price: "5,000",
      description: "Deep cleansing, exfoliation, and hydration for instantly refreshed skin",
      icon: Droplet,
      gradient: "from-blue-500 to-cyan-500",
      popular: true,
      image: hydraFacial
    },
    {
      name: "Photo Facial",
      price: "3,500",
      description: "IPL treatment for sun damage, age spots, and uneven skin tone",
      icon: Zap,
      gradient: "from-indigo-500 to-purple-500",
      image: iplTreatment
    },
    {
      name: "Carbon Laser Peel",
      price: "3,000",
      description: "Hollywood peel for pore refinement, oil control, and skin brightening",
      icon: Star,
      gradient: "from-slate-500 to-gray-600",
      image: hollywoodPeel
    },
    {
      name: "Feet & Hands Peel",
      price: "2,500",
      description: "Chemical peel treatment for softer, smoother hands and feet",
      icon: Sparkles,
      gradient: "from-teal-500 to-emerald-500",
      image: chemicalPeel
    }
  ];

  const injectableServices = [
    {
      name: "Lip Fillers",
      price: "70,000",
      unit: "per ml",
      description: "Hyaluronic acid fillers for fuller, more defined lips",
      icon: Heart,
      gradient: "from-rose-500 to-pink-500",
      image: dermalFillers
    },
    {
      name: "Cheek Fillers",
      price: "60,000",
      unit: "per ml",
      description: "Add volume and contour to cheeks for youthful appearance",
      icon: Smile,
      gradient: "from-purple-500 to-pink-500",
      image: cheekContouring
    },
    {
      name: "Dermal Fillers",
      price: "55,000",
      unit: "per ml",
      description: "Restore volume and smooth wrinkles for natural rejuvenation",
      icon: Sparkles,
      gradient: "from-emerald-500 to-teal-500",
      image: dermalFillers
    },
    {
      name: "PRP Treatment",
      price: "25,000",
      unit: "per session",
      description: "Platelet-rich plasma therapy for hair growth and skin rejuvenation",
      icon: Zap,
      gradient: "from-amber-500 to-orange-500",
      image: prpTreatment
    }
  ];

  const specializedServices = [
    {
      name: "Laser Hair Removal",
      description: "Permanent hair reduction for face and body using advanced laser technology",
      icon: Zap,
      image: laserHairRemoval
    },
    {
      name: "Acne & Pigmentation Treatment",
      description: "Comprehensive treatment for acne scars, pores, freckles, and pigmentation",
      icon: Shield,
      image: acneTreatment
    },
    {
      name: "Skin Glow Enhancement",
      description: "Advanced treatments for luminous, radiant, and healthy-looking skin",
      icon: Sun,
      image: skinGlow
    },
    {
      name: "Lesion Removal",
      description: "Safe removal of moles, warts, skin tags, and other skin lesions",
      icon: Star,
      image: lesionRemoval
    },
    {
      name: "Anti-Aging Treatments",
      description: "Combat wrinkles, fine lines, and dark circles with proven therapies",
      icon: Clock,
      image: antiAging
    },
    {
      name: "Dental Services",
      description: "Comprehensive dental care and cosmetic dentistry services",
      icon: Smile,
      image: dentalServices
    }
  ];

  const whyChoose = [
    {
      title: "Quality Assured",
      description: "Highest standards of care with international protocols",
      icon: Shield,
      color: "emerald",
      image: qualityAssured
    },
    {
      title: "Expert Team",
      description: "Certified professionals with years of experience",
      icon: Award,
      color: "teal",
      image: expertTeam
    },
    {
      title: "Affordable Care",
      description: "Premium treatments at transparent, competitive pricing",
      icon: Star,
      color: "amber",
      image: qualityAssured
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-100/40 via-teal-50/30 to-amber-50/40" aria-label="Services hero">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url(${servicesBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.08) 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-full mb-4 sm:mb-6 shadow-lg border border-emerald-100">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
            <span className="text-xs sm:text-sm font-medium text-emerald-700">Premium Aesthetic Services</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-4 sm:mb-6 tracking-tight">
            Our Medical Services
          </h1>
          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
            Comprehensive skin therapy solutions tailored to meet all your aesthetic needs
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Premium Facial Services */}
        <section className="mb-16 sm:mb-20" aria-labelledby="premium-treatments">
          <div className="text-center mb-8 sm:mb-12">
            <h2 id="premium-treatments" className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">Premium Facial Treatments</h2>
            <p className="text-base sm:text-lg text-slate-600">Advanced skin therapies for radiant, youthful skin</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {premiumServices.map((service, index) => {
              const Icon = service.icon;
              const isVisible = visibleCards.has(`premium-${index}`);
              return (
                <article
                  key={index}
                  data-index={`premium-${index}`}
                  className={`relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-emerald-100/50 group ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {service.popular && (
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg z-10">
                      POPULAR
                    </div>
                  )}
                  
                  {/* Service Image */}
                  <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={`${service.name} treatment at Gulzar Laser & Aesthetics Centre`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent`}></div>
                    <div className={`absolute bottom-4 left-4 bg-gradient-to-br ${service.gradient} w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">{service.name}</h3>
                    <div className="flex items-baseline gap-2 mb-2 sm:mb-3">
                      <span className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                        PKR {service.price}
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{service.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Injectable Services */}
        <section className="mb-16 sm:mb-20" aria-labelledby="injectable-treatments">
          <div className="text-center mb-8 sm:mb-12">
            <h2 id="injectable-treatments" className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">Injectable Treatments</h2>
            <p className="text-base sm:text-lg text-slate-600">Expert filler and PRP treatments for natural enhancement</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {injectableServices.map((service, index) => {
              const Icon = service.icon;
              const isVisible = visibleCards.has(`injectable-${index}`);
              return (
                <article
                  key={index}
                  data-index={`injectable-${index}`}
                  className={`bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-emerald-100/50 group ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Service Image */}
                  <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={`${service.name} - Injectable treatment`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent`}></div>
                    <div className={`absolute bottom-4 left-4 bg-gradient-to-br ${service.gradient} w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">{service.name}</h3>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                        PKR {service.price}
                      </span>
                    </div>
                    <p className="text-emerald-600 text-xs sm:text-sm font-medium mb-2 sm:mb-3">{service.unit}</p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{service.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Specialized Services */}
        <section className="mb-16 sm:mb-20" aria-labelledby="specialized-services">
          <div className="text-center mb-8 sm:mb-12">
            <h2 id="specialized-services" className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">Specialized Services</h2>
            <p className="text-base sm:text-lg text-slate-600">Comprehensive solutions for all your skin concerns</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {specializedServices.map((service, index) => {
              const Icon = service.icon;
              const isVisible = visibleCards.has(`specialized-${index}`);
              return (
                <article
                  key={index}
                  data-index={`specialized-${index}`}
                  className={`group relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-emerald-100/50 hover:-translate-y-1 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Background Image */}
                  <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={`${service.name} service`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center border border-emerald-100 shadow-lg">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">{service.name}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3 sm:mb-4">{service.description}</p>
                    <button className="text-emerald-600 font-semibold text-xs sm:text-sm hover:text-teal-600 transition-colors inline-flex items-center gap-1 group-hover:gap-2">
                      Learn More <span className="transition-all">→</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="mb-12 sm:mb-16" aria-labelledby="why-choose">
          <div className="text-center mb-8 sm:mb-12">
            <h2 id="why-choose" className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">Why Choose Our Services?</h2>
            <p className="text-base sm:text-lg text-slate-600">We combine medical expertise with compassionate care</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {whyChoose.map((item, index) => {
              const Icon = item.icon;
              const isVisible = visibleCards.has(`why-${index}`);
              return (
                <article
                  key={index}
                  data-index={`why-${index}`}
                  className={`text-center transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 mx-auto mb-6 rounded-2xl overflow-hidden shadow-xl">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/70 to-${item.color}-600/70 flex items-center justify-center backdrop-blur-[1px]`}>
                      <Icon className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-white drop-shadow-2xl" />
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{item.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center shadow-2xl" aria-label="Call to action">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-base sm:text-xl text-emerald-50 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Book a consultation with our experts and discover the perfect treatment plan for your skin
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
           <Link 
    to="/book-appointment" className="bg-white text-emerald-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-emerald-50 transition-colors duration-300 shadow-lg hover:shadow-xl">
              Book Consultation
            </Link>
            <button className="bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-emerald-800 transition-colors duration-300 border-2 border-white/30">
              View Price List
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;