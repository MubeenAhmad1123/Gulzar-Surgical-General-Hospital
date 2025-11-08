import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Heart, Award, Users, Clock, Shield, Zap, Target } from 'lucide-react';

// Import images
import doctorPortrait from '../assets/dr. Sumaira Gulzar.webp';
import receptionArea from '../assets/reception-Area.webp';
import clinicInterior from '../assets/clinicInterior.webp';
import consultation from '../assets/counsultation.webp';
import aboutBg from '../assets/about-bg.webp';

const About = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [activeValue, setActiveValue] = useState(0);
  const [animatedNumbers, setAnimatedNumbers] = useState({});
  const observerRef = useRef(null);
  const numbersAnimated = useRef(false);

  const stats = [
    { number: 15, suffix: "+", label: "Years Experience", icon: Award },
    { number: 24, suffix: "/7", label: "Emergency Care", icon: Clock },
    { number: 1000, suffix: "+", label: "Happy Clients", icon: Users },
    { number: 100, suffix: "%", label: "Safe Procedures", icon: Shield }
  ];

  const values = [
    {
      title: "Expert Team",
      description: "Certified professionals with years of experience in laser treatments and aesthetic procedures",
      gradient: "from-emerald-50 to-teal-50",
      icon: Users
    },
    {
      title: "Advanced Technology",
      description: "State-of-the-art laser equipment for safe, effective, and comfortable treatments",
      gradient: "from-teal-50 to-cyan-50",
      icon: Zap
    },
    {
      title: "Personalized Care",
      description: "Customized treatment plans tailored to your unique skin needs and aesthetic goals",
      gradient: "from-cyan-50 to-emerald-50",
      icon: Heart
    }
  ];

  const animateNumbers = () => {
    stats.forEach((stat, index) => {
      const duration = 2000;
      const steps = 60;
      const stepValue = stat.number / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const currentValue = Math.min(Math.floor(stepValue * currentStep), stat.number);
        
        setAnimatedNumbers((prev) => ({
          ...prev,
          [index]: currentValue
        }));

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, duration / steps);
    });
  };

  useEffect(() => {
    // Update page title for SEO
    document.title = 'About Us - Gulzar Laser & Aesthetics Centre | Expert Skin Care';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about Gulzar Laser & Aesthetics Centre - offering advanced laser treatments, skin rejuvenation, and aesthetic procedures with 15+ years of experience.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Learn about Gulzar Laser & Aesthetics Centre - offering advanced laser treatments, skin rejuvenation, and aesthetic procedures with 15+ years of experience.';
      document.head.appendChild(meta);
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.dataset.section]));
            
            if (entry.target.dataset.section === 'stats' && !numbersAnimated.current) {
              numbersAnimated.current = true;
              animateNumbers();
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );

    const sections = document.querySelectorAll('.animate-section');
    sections.forEach((section) => observerRef.current.observe(section));

    const valueInterval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % values.length);
    }, 4000);

    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      clearInterval(valueInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50">
      {/* Hero Section with Parallax Effect */}
      <section className="relative overflow-hidden" aria-label="Hero section">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 via-teal-50/30 to-amber-50/40">
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url(${aboutBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.08) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Floating Animated Elements */}
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-20 sm:w-24 h-20 sm:h-24 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-24 sm:w-32 h-24 sm:h-32 bg-teal-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 sm:left-1/3 w-16 sm:w-20 h-16 sm:h-20 bg-amber-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-full mb-4 sm:mb-6 shadow-lg border border-emerald-100 animate-fade-in">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 animate-spin" style={{ animationDuration: '3s' }} />
              <span className="text-xs sm:text-sm font-medium text-emerald-700">Gulzar Laser & Aesthetics Centre</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-slate-800 mb-4 sm:mb-6 tracking-tight animate-slide-up">
              Your Journey to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 mt-2 animate-gradient bg-[length:200%_auto]">
                Radiant Skin
              </span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed animate-fade-in px-4" style={{ animationDelay: '0.3s' }}>
              Where advanced laser technology meets personalized care to help you achieve the confident, glowing skin you deserve
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section with Counting Animation */}
      <section 
        data-section="stats"
        aria-label="Statistics"
        className={`animate-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-8 mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${
          visibleSections.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const displayNumber = animatedNumbers[index] ?? 0;
            return (
              <article 
                key={index} 
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-emerald-100/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl mb-2 sm:mb-3 lg:mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-emerald-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-1 sm:mb-2 group-hover:text-emerald-600 transition-colors tabular-nums">
                    {displayNumber}{stat.suffix}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-600">{stat.label}</div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Story Section with Images */}
      <section 
        data-section="story"
        aria-label="Our story"
        className={`animate-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 transition-all duration-1000 ${
          visibleSections.has('story') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-emerald-50">
          <div className="grid md:grid-cols-5 gap-0">
            {/* Left Image Column */}
            <div className="md:col-span-2 relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/90 to-teal-600/90 z-10"></div>
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-4 sm:p-6 lg:p-8">
                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 hover:scale-105 transition-transform duration-500">
                  <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 animate-pulse" />
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Dr. Sumaira Gulzar</h3>
                  <p className="text-emerald-100 font-medium mb-2 sm:mb-3 text-sm sm:text-base">Medical Director & Lead Clinician</p>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <p className="flex items-center gap-2 justify-center">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4" /> MBBS, FCPS (Surgery)
                    </p>
                    <p className="flex items-center gap-2 justify-center">
                      <Target className="w-3 h-3 sm:w-4 sm:h-4" /> Certified Laser Specialist
                    </p>
                  </div>
                </div>
              </div>
              {/* Doctor Image */}
              <img 
                src={doctorPortrait} 
                alt="Dr. Sumaira Gulzar - Medical Director at Gulzar Laser & Aesthetics Centre" 
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Right Content Column */}
            <div className="md:col-span-3 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 w-fit">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                <span className="text-xs sm:text-sm font-semibold text-emerald-700">Our Story</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4 sm:mb-6">
                Dedicated to Your Skin's Health & Beauty
              </h2>
              <p className="text-base sm:text-lg text-slate-600 mb-3 sm:mb-4 leading-relaxed">
                At Gulzar Laser & Aesthetics Centre, we believe that everyone deserves to feel confident in their own skin. Our state-of-the-art facility combines cutting-edge laser technology with personalized, compassionate care to deliver exceptional results.
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Founded with a passion for helping clients achieve their aesthetic goals, we specialize in advanced skin therapies including laser treatments, rejuvenation procedures, and comprehensive skincare solutions tailored to your unique needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Images Gallery */}
      <section 
        data-section="gallery"
        aria-label="Facility gallery"
        className={`animate-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 transition-all duration-1000 ${
          visibleSections.has('gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
            Our State-of-the-Art Facility
          </h2>
          <p className="text-base sm:text-lg text-slate-600">Experience comfort and excellence in every corner</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            { 
              title: "Reception Area", 
              desc: "Welcoming and comfortable space",
              image: receptionArea,
              alt: "Modern reception area at Gulzar Laser & Aesthetics Centre"
            },
            { 
              title: "Treatment Room", 
              desc: "Advanced equipment and technology",
              image: clinicInterior,
              alt: "State-of-the-art treatment room with advanced laser equipment"
            },
            { 
              title: "Consultation Space", 
              desc: "Private and professional setting",
              image: consultation,
              alt: "Private consultation room for personalized treatment planning"
            }
          ].map((item, index) => (
            <article 
              key={index}
              className="group relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 animate-scale-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Image */}
              <img 
                src={item.image} 
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                <div className="p-4 sm:p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base text-emerald-100">{item.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Values Section with Interactive Cards */}
      <section 
        data-section="values"
        aria-label="Our values"
        className={`animate-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 transition-all duration-1000 ${
          visibleSections.has('values') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-8 sm:mb-12 text-center">
          Why Choose Us
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <article 
                key={index}
                onClick={() => setActiveValue(index)}
                className={`cursor-pointer bg-gradient-to-br ${value.gradient} p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 animate-scale-in ${
                  activeValue === index ? 'border-emerald-500 scale-105' : 'border-emerald-100/50'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`bg-white/80 backdrop-blur-sm w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 ${
                  activeValue === index ? 'scale-110 rotate-12' : ''
                }`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">{value.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{value.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Mission & Vision with Parallax Effect */}
      <section 
        data-section="mission"
        aria-label="Mission and vision"
        className={`animate-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 transition-all duration-1000 ${
          visibleSections.has('mission') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <article className="group bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-emerald-100/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                To deliver exceptional skin therapy and aesthetic services through innovation, expertise, and compassion. We are committed to helping you achieve healthy, radiant skin in a safe, comfortable, and welcoming environment.
              </p>
            </div>
          </article>
          
          <article className="group bg-gradient-to-br from-white to-teal-50/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-teal-100/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-200/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-teal-100 to-cyan-100 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-teal-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                To be the leading laser and aesthetic center in the region, recognized for clinical excellence, innovative treatments, and transformative results. We strive to set new standards in skincare while making quality treatments accessible to all.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* CTA Section with Animation */}
      <section 
        data-section="cta"
        aria-label="Call to action"
        className={`animate-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 transition-all duration-1000 ${
          visibleSections.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-2xl overflow-hidden bg-[length:200%_auto] animate-gradient">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          <div className="relative z-10">
            <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-white mx-auto mb-4 sm:mb-6 animate-pulse" />
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Ready to Transform Your Skin?
            </h2>
            <p className="text-base sm:text-xl text-emerald-50 mb-6 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Schedule a consultation today and discover how our advanced laser treatments can help you achieve your aesthetic goals
            </p>
            <button className="bg-white text-emerald-600 px-6 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-emerald-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-110 inline-flex items-center gap-2 sm:gap-3 group">
              Book Your Consultation
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
          .animate-scale-in,
          .animate-slide-up,
          .animate-fade-in {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default About;