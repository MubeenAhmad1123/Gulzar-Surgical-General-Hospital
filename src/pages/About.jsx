import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Heart, Award, Users, Clock, Shield, Zap, Target } from 'lucide-react';

const About = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [activeValue, setActiveValue] = useState(0);
  const observerRef = useRef(null);

  const stats = [
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "24/7", label: "Emergency Care", icon: Clock },
    { number: "1000+", label: "Happy Clients", icon: Users },
    { number: "100%", label: "Safe Procedures", icon: Shield }
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

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.dataset.section]));
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

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      clearInterval(valueInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50">
      {/* Hero Section with Parallax Effect */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 via-teal-50/30 to-amber-50/40">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.08) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Floating Animated Elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-teal-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-amber-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full mb-6 shadow-lg border border-emerald-100 animate-fade-in">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: '3s' }} />
              <span className="text-sm font-medium text-emerald-700">Gulzar Laser & Aesthetics Centre</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 tracking-tight animate-slide-up">
              Your Journey to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 mt-2 animate-gradient bg-[length:200%_auto]">
                Radiant Skin
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Where advanced laser technology meets personalized care to help you achieve the confident, glowing skin you deserve
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section with Stagger Animation */}
      <div 
        data-section="stats"
        className={`animate-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-20 transition-all duration-1000 ${
          visibleSections.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 shadow-xl border border-emerald-100/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div className="text-4xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-slate-600">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Story Section with Images */}
      <div 
        data-section="story"
        className={`animate-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 transition-all duration-1000 ${
          visibleSections.has('story') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-50">
          <div className="grid md:grid-cols-5 gap-0">
            {/* Left Image Column */}
            <div className="md:col-span-2 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/90 to-teal-600/90 z-10"></div>
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <Sparkles className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-2xl font-bold mb-2">Dr. Sumaira Gulzar</h3>
                  <p className="text-emerald-100 font-medium mb-3">Medical Director & Lead Clinician</p>
                  <div className="space-y-1 text-sm">
                    <p className="flex items-center gap-2">
                      <Award className="w-4 h-4" /> MBBS, FCPS (Surgery)
                    </p>
                    <p className="flex items-center gap-2">
                      <Target className="w-4 h-4" /> Certified Laser Specialist
                    </p>
                  </div>
                </div>
              </div>
              {/* Image Placeholder */}
              <div className="h-full min-h-[500px] bg-gradient-to-br from-emerald-200 via-teal-200 to-amber-200 flex items-center justify-center">
                <div className="text-center text-slate-600">
                  <p className="text-lg font-medium">Add Dr. Sumaira's Photo</p>
                  <p className="text-sm">Recommended: Professional portrait</p>
                </div>
              </div>
            </div>

            {/* Right Content Column */}
            <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 rounded-full mb-6 w-fit">
                <Heart className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">Our Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Dedicated to Your Skin's Health & Beauty
              </h2>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                At Gulzar Laser & Aesthetics Centre, we believe that everyone deserves to feel confident in their own skin. Our state-of-the-art facility combines cutting-edge laser technology with personalized, compassionate care to deliver exceptional results.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Founded with a passion for helping clients achieve their aesthetic goals, we specialize in advanced skin therapies including laser treatments, rejuvenation procedures, and comprehensive skincare solutions tailored to your unique needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Facility Images Gallery */}
      <div 
        data-section="gallery"
        className={`animate-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 transition-all duration-1000 ${
          visibleSections.has('gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Our State-of-the-Art Facility
          </h2>
          <p className="text-lg text-slate-600">Experience comfort and excellence in every corner</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Reception Area", desc: "Welcoming and comfortable space" },
            { title: "Treatment Room", desc: "Advanced equipment and technology" },
            { title: "Consultation Space", desc: "Private and professional setting" }
          ].map((item, index) => (
            <div 
              key={index}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Image Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-teal-100 to-amber-100 flex items-center justify-center">
                <div className="text-center text-slate-600">
                  <p className="text-lg font-medium">{item.title}</p>
                  <p className="text-sm">Add facility image here</p>
                </div>
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                <div className="p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-emerald-100">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section with Interactive Cards */}
      <div 
        data-section="values"
        className={`animate-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 transition-all duration-1000 ${
          visibleSections.has('values') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-12 text-center">
          Why Choose Us
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div 
                key={index}
                onClick={() => setActiveValue(index)}
                className={`cursor-pointer bg-gradient-to-br ${value.gradient} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 ${
                  activeValue === index ? 'border-emerald-500 scale-105' : 'border-emerald-100/50'
                }`}
              >
                <div className={`bg-white/80 backdrop-blur-sm w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 ${
                  activeValue === index ? 'scale-110 rotate-12' : ''
                }`}>
                  <Icon className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mission & Vision with Parallax Effect */}
      <div 
        data-section="mission"
        className={`animate-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 transition-all duration-1000 ${
          visibleSections.has('mission') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="group bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl p-10 shadow-xl border border-emerald-100/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Heart className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                To deliver exceptional skin therapy and aesthetic services through innovation, expertise, and compassion. We are committed to helping you achieve healthy, radiant skin in a safe, comfortable, and welcoming environment.
              </p>
            </div>
          </div>
          
          <div className="group bg-gradient-to-br from-white to-teal-50/30 rounded-3xl p-10 shadow-xl border border-teal-100/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-200/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-teal-100 to-cyan-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Sparkles className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                To be the leading laser and aesthetic center in the region, recognized for clinical excellence, innovative treatments, and transformative results. We strive to set new standards in skincare while making quality treatments accessible to all.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section with Animation */}
      <div 
        data-section="cta"
        className={`animate-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 transition-all duration-1000 ${
          visibleSections.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 rounded-3xl p-12 md:p-16 text-center shadow-2xl overflow-hidden bg-[length:200%_auto] animate-gradient">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          <div className="relative z-10">
            <Sparkles className="w-16 h-16 text-white mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Skin?
            </h2>
            <p className="text-xl text-emerald-50 mb-10 max-w-2xl mx-auto leading-relaxed">
              Schedule a consultation today and discover how our advanced laser treatments can help you achieve your aesthetic goals
            </p>
            <button className="bg-white text-emerald-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-110 inline-flex items-center gap-3 group">
              Book Your Consultation
              <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>

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
      `}</style>
    </div>
  );
};

export default About;