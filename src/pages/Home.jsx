import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import heroImage from '../assets/hero.webp';
import doctorPortrait from '../assets/dr_sumaira_gulzar.webp';
import clinicInterior from '../assets/interior.webp';
import laserTreatment from '../assets/lazer.webp';
import happyClient from '../assets/patient_doctor.webp';
import FAQ from './FAQ';

const Home = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);
  const statsRef = useRef(null);
  const heroRef = useRef(null);
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false);

  const stats = [
    { value: 15, suffix: "+", label: "Years Experience" },
    { value: 1000, suffix: "+", label: "Happy Clients" },
    { value: 50, suffix: "+", label: "Treatments" },
    { value: 100, suffix: "%", label: "Satisfaction" }
  ];

  const services = [
    { icon: "✨", title: "Laser Hair Removal", description: "Permanent hair reduction with advanced technology" },
    { icon: "💆‍♀️", title: "Facial Treatments", description: "Premium facial therapies for radiant skin" },
    { icon: "💉", title: "Injectable Treatments", description: "Expert fillers and PRP treatments" },
    { icon: "🌟", title: "Skin Rejuvenation", description: "Anti-aging and glow enhancement" }
  ];

  const testimonials = [
    { name: "Sarah Ahmed", text: "The hydra facial treatment gave me instant results! My skin has never looked better.", rating: 5 },
    { name: "Fatima Khan", text: "Professional staff and amazing results. Highly recommend their laser treatments.", rating: 5 },
    { name: "Ayesha malik", text: "Best aesthetic center in the city. Dr. Sumaira is incredibly skilled and caring.", rating: 5 }
  ];

  // Story section images
  const storyImages = [
    { src: doctorPortrait, alt: "Dr. Sumaira Gulzar" },
    { src: clinicInterior, alt: "Clinic Interior" },
    { src: laserTreatment, alt: "Laser Treatment" },
    { src: happyClient, alt: "Happy Client" }
  ];

  // Hero visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Stats counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedStats) {
          setHasAnimatedStats(true);
          stats.forEach((stat, index) => {
            let current = 0;
            const increment = stat.value / 50;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.value) {
                current = stat.value;
                clearInterval(timer);
              }
              setAnimatedStats(prev => {
                const newStats = [...prev];
                newStats[index] = Math.floor(current);
                return newStats;
              });
            }, 30);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimatedStats]);

  // Other sections observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target.dataset.section;
            setVisibleSections((prev) => new Set([...prev, section]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const sections = document.querySelectorAll('.animate-section');
    sections.forEach((section) => observerRef.current.observe(section));

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-white via-emerald-50/30 to-white">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        data-section="hero"
        className="relative min-h-screen flex items-center bg-gradient-to-b from-white via-emerald-50/30 to-white overflow-hidden"
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(16 185 129) 1px, transparent 0)',
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div 
              className={`space-y-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-full text-sm font-medium border border-emerald-100">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Gulzar Laser & Aesthetics Centre
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Your Journey to
                <span className="block text-emerald-600 mt-2">
                  Radiant Skin
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Where advanced laser technology meets personalized care to help you achieve the confident, glowing skin you deserve
              </p>

<div className="flex flex-wrap gap-4 pt-4">
  <Link 
    to="/book-appointment"
    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-full font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 inline-block text-center"
  >
    Book Your Consultation
  </Link>
  <Link 
    to="/services"
    className="bg-white hover:bg-gray-50 text-emerald-700 px-8 py-3.5 rounded-full font-medium text-base shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 inline-block text-center"
  >
    View Services
  </Link>
</div>

              {/* Stats */}
              <div 
                ref={statsRef}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-200"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-1">
                      {animatedStats[index] || 0}{stat.suffix}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div 
              className={`relative transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-3xl shadow-2xl overflow-hidden">
                  <img 
                    src={heroImage} 
                    alt="Gulzar Aesthetics" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Certified</div>
                      <div className="text-sm text-gray-600">Expert Care</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-amber-200/20 rounded-full blur-3xl" />
      </section>

      {/* Our Story Section */}
      <section 
        data-section="story"
        className={`animate-section py-20 transition-all duration-1000 ease-out ${
          visibleSections.has('story') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 transition-all duration-1000 delay-100 ${
              visibleSections.has('story') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Our Story
                <span className="block text-2xl text-emerald-700 mt-2 font-normal">
                  Dedicated to Your Skin's Health & Beauty
                </span>
              </h2>
              
              <p className="text-gray-700 text-lg leading-relaxed">
                At Gulzar Laser & Aesthetics Centre, we believe that everyone deserves to feel confident in their own skin. Our state-of-the-art facility combines cutting-edge laser technology with personalized, compassionate care to deliver exceptional results.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed">
                Founded with a passion for helping clients achieve their aesthetic goals, we specialize in advanced skin therapies including laser treatments, rejuvenation procedures, and comprehensive skincare solutions tailored to your unique needs.
              </p>

              {/* Doctor Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100 shadow-lg mt-8 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 bg-emerald-200 rounded-full flex items-center justify-center text-3xl">
                    👩‍⚕️
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Dr. Sumaira Gulzar</h3>
                    <p className="text-emerald-700 font-medium">Medical Director & Lead Clinician</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>✓ MBBS, FCPS (Surgery)</p>
                  <p>✓ Certified Laser Specialist</p>
                </div>
              </div>
            </div>

            {/* Story Images Grid */}
            <div className={`grid grid-cols-2 gap-6 transition-all duration-1000 delay-300 ${
              visibleSections.has('story') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              {storyImages.map((image, index) => (
                <div 
                  key={index} 
                  className="aspect-square bg-gradient-to-br from-emerald-100 to-amber-50 rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-500"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section 
        data-section="why"
        className={`animate-section py-20 bg-gradient-to-b from-white to-emerald-50/30 transition-all duration-1000 ${
          visibleSections.has('why') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            visibleSections.has('why') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-700">Excellence in every treatment, care in every detail</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: "👨‍⚕️", title: "Expert Team", desc: "Certified professionals with years of experience in laser treatments and aesthetic procedures" },
              { icon: "🔬", title: "Advanced Technology", desc: "State-of-the-art laser equipment for safe, effective, and comfortable treatments" },
              { icon: "💚", title: "Personalized Care", desc: "Customized treatment plans tailored to your unique skin needs and aesthetic goals" }
            ].map((item, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-emerald-100 ${
                  visibleSections.has('why') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-5xl mb-4 hover:scale-125 hover:rotate-12 transition-all duration-300">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`bg-gradient-to-br from-emerald-600 to-green-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 ${
              visibleSections.has('why') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`} style={{ transitionDelay: '400ms' }}>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-emerald-50 leading-relaxed">
                To deliver exceptional skin therapy and aesthetic services through innovation, expertise, and compassion. We are committed to helping you achieve healthy, radiant skin in a safe, comfortable, and welcoming environment.
              </p>
            </div>
            
            <div className={`bg-gradient-to-br from-amber-100 to-emerald-100 rounded-2xl p-8 shadow-xl border border-emerald-200 hover:shadow-2xl hover:scale-105 transition-all duration-500 ${
              visibleSections.has('why') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`} style={{ transitionDelay: '550ms' }}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-800 leading-relaxed">
                To be the leading laser and aesthetic center in the region, recognized for clinical excellence, innovative treatments, and transformative results. We strive to set new standards in skincare while making quality treatments accessible to all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section 
        data-section="services"
        className={`animate-section py-20 transition-all duration-1000 ${
          visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            visibleSections.has('services') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Premium Aesthetic Services
            </h2>
            <p className="text-xl text-gray-700">Comprehensive skin therapy solutions tailored to meet all your aesthetic needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-emerald-100 cursor-pointer ${
                  visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                 <Link 
    to="/services" className="text-emerald-700 font-semibold text-sm group-hover:underline group-hover:translate-x-2 transition-transform duration-300 inline-block">
                  Learn More →
                 </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        data-section="testimonials"
        className={`animate-section py-20 bg-gradient-to-b from-emerald-50/30 to-white transition-all duration-1000 ${
          visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 ${
            visibleSections.has('testimonials') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
          </div>

          <div className="relative bg-white rounded-3xl shadow-2xl p-12 border border-emerald-100 hover:shadow-3xl transition-shadow duration-500">
            <div className="text-6xl text-emerald-200 mb-4">"</div>
            <p className="text-xl text-gray-800 mb-6 leading-relaxed">
              {testimonials[currentSlide].text}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">{testimonials[currentSlide].name}</p>
                <div className="flex gap-1 mt-2">
                  {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                    <span key={i} className="text-amber-400">⭐</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                      currentSlide === index ? 'bg-emerald-600 w-8' : 'bg-emerald-200 w-3'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
<FAQ/>
      {/* CTA Section */}
      <section 
        data-section="cta"
        className={`animate-section py-20 transition-all duration-1000 ${
          visibleSections.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 rounded-3xl shadow-2xl p-12 text-center text-white relative overflow-hidden hover:scale-105 transition-transform duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Skin?
              </h2>
              <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
                Schedule a consultation today and discover how our advanced laser treatments can help you achieve your aesthetic goals
              </p>
 <Link 
    to="/book-appointment"
    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-full font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 inline-block text-center"
  >
    Book Your Consultation
  </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;