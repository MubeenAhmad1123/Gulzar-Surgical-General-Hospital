import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Droplet, Zap, Star, Heart, Shield, Clock, Award, TrendingUp, Smile, Sun, Wind } from 'lucide-react';

const Services = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
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
      popular: true
    },
    {
      name: "Weight Loss Drips",
      price: "6,500",
      description: "IV therapy designed to boost metabolism and support your weight loss journey",
      icon: TrendingUp,
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      name: "Hydra Facial & Whitening Drips",
      price: "6,000",
      description: "Complete skin hydration and brightening combo for radiant, glowing skin",
      icon: Droplet,
      gradient: "from-cyan-500 to-emerald-500",
      popular: true
    },
    {
      name: "Vampire Facial",
      price: "5,000",
      description: "PRP microneedling treatment for natural skin rejuvenation and collagen boost",
      icon: Heart,
      gradient: "from-rose-500 to-pink-500"
    },
    {
      name: "Clever Facial",
      price: "5,000",
      description: "Advanced facial treatment combining multiple technologies for complete skin care",
      icon: Star,
      gradient: "from-amber-500 to-orange-500"
    },
    {
      name: "BB Glow Treatment",
      price: "5,000",
      description: "Semi-permanent foundation for flawless, natural-looking coverage",
      icon: Sun,
      gradient: "from-yellow-500 to-amber-500"
    },
    {
      name: "Hollywood Facial",
      price: "5,000",
      description: "Red carpet-ready skin with instant glow and rejuvenation",
      icon: Sparkles,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Chemical Peel (Face)",
      price: "5,000",
      description: "Exfoliation treatment to reduce fine lines, acne scars, and pigmentation",
      icon: Wind,
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      name: "Hydra Facial",
      price: "5,000",
      description: "Deep cleansing, exfoliation, and hydration for instantly refreshed skin",
      icon: Droplet,
      gradient: "from-blue-500 to-cyan-500",
      popular: true
    },
    {
      name: "Photo Facial",
      price: "3,500",
      description: "IPL treatment for sun damage, age spots, and uneven skin tone",
      icon: Zap,
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      name: "Carbon Laser Peel",
      price: "3,000",
      description: "Hollywood peel for pore refinement, oil control, and skin brightening",
      icon: Star,
      gradient: "from-slate-500 to-gray-600"
    },
    {
      name: "Feet & Hands Peel",
      price: "2,500",
      description: "Chemical peel treatment for softer, smoother hands and feet",
      icon: Sparkles,
      gradient: "from-teal-500 to-emerald-500"
    }
  ];

  const injectableServices = [
    {
      name: "Lip Fillers",
      price: "70,000",
      unit: "per ml",
      description: "Hyaluronic acid fillers for fuller, more defined lips",
      icon: Heart,
      gradient: "from-rose-500 to-pink-500"
    },
    {
      name: "Cheek Fillers",
      price: "60,000",
      unit: "per ml",
      description: "Add volume and contour to cheeks for youthful appearance",
      icon: Smile,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Dermal Fillers",
      price: "55,000",
      unit: "per ml",
      description: "Restore volume and smooth wrinkles for natural rejuvenation",
      icon: Sparkles,
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      name: "PRP Treatment",
      price: "25,000",
      unit: "per session",
      description: "Platelet-rich plasma therapy for hair growth and skin rejuvenation",
      icon: Zap,
      gradient: "from-amber-500 to-orange-500"
    }
  ];

  const specializedServices = [
    {
      name: "Laser Hair Removal",
      description: "Permanent hair reduction for face and body using advanced laser technology",
      icon: Zap
    },
    {
      name: "Acne & Pigmentation Treatment",
      description: "Comprehensive treatment for acne scars, pores, freckles, and pigmentation",
      icon: Shield
    },
    {
      name: "Skin Glow Enhancement",
      description: "Advanced treatments for luminous, radiant, and healthy-looking skin",
      icon: Sun
    },
    {
      name: "Lesion Removal",
      description: "Safe removal of moles, warts, skin tags, and other skin lesions",
      icon: Star
    },
    {
      name: "Anti-Aging Treatments",
      description: "Combat wrinkles, fine lines, and dark circles with proven therapies",
      icon: Clock
    },
    {
      name: "Dental Services",
      description: "Comprehensive dental care and cosmetic dentistry services",
      icon: Smile
    }
  ];

  const whyChoose = [
    {
      title: "Quality Assured",
      description: "Highest standards of care with international protocols",
      icon: Shield,
      color: "emerald"
    },
    {
      title: "Expert Team",
      description: "Certified professionals with years of experience",
      icon: Award,
      color: "teal"
    },
    {
      title: "Affordable Care",
      description: "Premium treatments at transparent, competitive pricing",
      icon: Star,
      color: "amber"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-100/40 via-teal-50/30 to-amber-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full mb-6 shadow-sm border border-emerald-100">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">Premium Aesthetic Services</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 tracking-tight">
            Our Medical Services
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive skin therapy solutions tailored to meet all your aesthetic needs
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Premium Facial Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Premium Facial Treatments</h2>
            <p className="text-lg text-slate-600">Advanced skin therapies for radiant, youthful skin</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumServices.map((service, index) => {
              const Icon = service.icon;
              const isVisible = visibleCards.has(`premium-${index}`);
              return (
                <div
                  key={index}
                  data-index={`premium-${index}`}
                  className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-emerald-100/50 group ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      POPULAR
                    </div>
                  )}
                  <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
                  <div className="p-6">
                    <div className={`bg-gradient-to-br ${service.gradient} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{service.name}</h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                        PKR {service.price}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Injectable Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Injectable Treatments</h2>
            <p className="text-lg text-slate-600">Expert filler and PRP treatments for natural enhancement</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {injectableServices.map((service, index) => {
              const Icon = service.icon;
              const isVisible = visibleCards.has(`injectable-${index}`);
              return (
                <div
                  key={index}
                  data-index={`injectable-${index}`}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-emerald-100/50 group ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
                  <div className="p-6">
                    <div className={`bg-gradient-to-br ${service.gradient} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{service.name}</h3>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                        PKR {service.price}
                      </span>
                    </div>
                    <p className="text-emerald-600 text-sm font-medium mb-3">{service.unit}</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Specialized Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Specialized Services</h2>
            <p className="text-lg text-slate-600">Comprehensive solutions for all your skin concerns</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializedServices.map((service, index) => {
              const Icon = service.icon;
              const isVisible = visibleCards.has(`specialized-${index}`);
              return (
                <div
                  key={index}
                  data-index={`specialized-${index}`}
                  className={`bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-emerald-100/50 hover:-translate-y-1 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{service.name}</h3>
                  <p className="text-slate-600 leading-relaxed">{service.description}</p>
                  <button className="mt-4 text-emerald-600 font-semibold text-sm hover:text-teal-600 transition-colors">
                    Learn More →
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Why Choose Our Services?</h2>
            <p className="text-lg text-slate-600">We combine medical expertise with compassionate care</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {whyChoose.map((item, index) => {
              const Icon = item.icon;
              const isVisible = visibleCards.has(`why-${index}`);
              return (
                <div
                  key={index}
                  data-index={`why-${index}`}
                  className={`text-center transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className={`bg-gradient-to-br from-${item.color}-100 to-${item.color}-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Icon className={`w-10 h-10 text-${item.color}-600`} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
            Book a consultation with our experts and discover the perfect treatment plan for your skin
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-50 transition-colors duration-300 shadow-lg hover:shadow-xl">
              Book Consultation
            </button>
            <button className="bg-emerald-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-800 transition-colors duration-300 border-2 border-white/30">
              View Price List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;