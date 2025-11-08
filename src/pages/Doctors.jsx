import React, { useState, useEffect, useRef } from 'react';
import { Award, Heart, Users, Clock, Sparkles, GraduationCap, Star, CheckCircle, Linkedin } from 'lucide-react';

// Import images
import drSumairaImage from '../assets/dr. Sumaira Gulzar.webp';
import drSarahImage from '../assets/Dr. Sarah Ahmed.webp';
import drAyeshaImage from '../assets/Dr. Ayesha Khan.webp';
import drFatimaImage from '../assets/Dr. Fatima Ali.webp';
import zaraImage from '../assets/Zara Hussain.webp';
import expertTeamImage from '../assets/Expert_Team.webp';
import qualityAssuredImage from '../assets/Quality_Assured.webp';

const DoctorsTeam = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [stats, setStats] = useState({ years: 0, patients: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const observerRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.dataset.section]));
            
            // Trigger stats animation
            if (entry.target.dataset.section === 'stats' && !hasAnimated) {
              setHasAnimated(true);
              animateStats();
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    document.querySelectorAll('[data-section]').forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [hasAnimated]);

  const animateStats = () => {
    const duration = 2000;
    const steps = 60;
    const yearTarget = 15;
    const patientTarget = 1000;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuad = 1 - Math.pow(1 - progress, 3);
      
      setStats({
        years: Math.floor(easeOutQuad * yearTarget),
        patients: Math.floor(easeOutQuad * patientTarget)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setStats({ years: yearTarget, patients: patientTarget });
      }
    }, stepDuration);
  };

  const teamMembers = [
    {
      name: 'Dr. Sarah Ahmed',
      role: 'Medical Director',
      specialty: 'Dermatology & Laser Specialist',
      image: drSarahImage,
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      name: 'Dr. Ayesha Khan',
      role: 'Senior Aesthetician',
      specialty: 'Facial Treatments & Skin Rejuvenation',
      image: drAyeshaImage,
      gradient: 'from-teal-500 to-cyan-500'
    },
    {
      name: 'Dr. Fatima Ali',
      role: 'Laser Technician',
      specialty: 'Laser Hair Removal & Body Treatments',
      image: drFatimaImage,
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      name: 'Zara Hussain',
      role: 'Clinical Coordinator',
      specialty: 'Patient Care & Consultation',
      image: zaraImage,
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  const whyChoose = [
    {
      icon: GraduationCap,
      title: 'Certified Professionals',
      description: 'All team members hold advanced certifications and licenses',
      color: 'emerald'
    },
    {
      icon: Award,
      title: 'Years of Experience',
      description: 'Decades of combined experience in aesthetic treatments',
      color: 'teal'
    },
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'Your comfort and satisfaction are our top priorities',
      color: 'rose'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-100/40 via-teal-50/30 to-amber-50/40">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url(${expertTeamImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-full mb-6 shadow-sm border border-emerald-100 animate-fadeIn">
            <Users className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">Expert Medical Team</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-4 sm:mb-6 tracking-tight px-4 animate-fadeInUp">
            Meet Our Doctors
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            Experienced medical professionals dedicated to your health and wellbeing
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Lead Physician Section */}
        <div
          data-section="lead"
          className={`mb-16 sm:mb-20 transition-all duration-700 ${
            visibleSections.has('lead') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100/50">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 sm:p-8 md:p-12">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-emerald-100 text-sm font-medium">Lead Physician</p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Dr. Sumaira Gulzar</h2>
                </div>
              </div>
              <p className="text-emerald-50 text-base sm:text-lg text-center sm:text-left">MBBS, Specialist in Laser & Cosmetic Treatments</p>
            </div>

            <div className="p-6 sm:p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 sm:p-6 border border-emerald-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="bg-emerald-100 p-2 rounded-lg flex-shrink-0">
                        <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-base sm:text-lg mb-2">Qualifications</h3>
                        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                          Medical Doctor with specialized training in surgical procedures, gynecology, and advanced laser treatments
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-5 sm:p-6 border border-teal-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="bg-teal-100 p-2 rounded-lg flex-shrink-0">
                        <Award className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-base sm:text-lg mb-2">Expertise</h3>
                        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                          Renowned for excellence in laser and cosmetic procedures, women's health, and general surgery
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 sm:p-6 border border-rose-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="bg-rose-100 p-2 rounded-lg flex-shrink-0">
                        <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-base sm:text-lg mb-2">Commitment</h3>
                        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                          Dedicated to providing compassionate, patient-centered care and advancing healthcare in the Vehari community
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 sm:p-8 border-2 border-slate-200 h-full flex flex-col justify-between">
                    <div>
                      <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-6 shadow-2xl overflow-hidden border-4 border-white group">
                        <img 
                          src={drSumairaImage} 
                          alt="Dr. Sumaira Gulzar" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <blockquote className="text-slate-700 italic text-center mb-6 leading-relaxed text-sm sm:text-base">
                        "My commitment is to provide each patient with the highest quality of care, combining medical expertise with genuine compassion. Your health and wellbeing are my top priorities."
                      </blockquote>
                    </div>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all hover:scale-105 transform"
                    >
                      <Linkedin className="w-5 h-5" />
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>

              {/* Stats Section with Animation */}
              <div 
                ref={statsRef}
                data-section="stats"
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
              >
                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-center shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                    {stats.years}+
                  </div>
                  <p className="text-emerald-100 font-medium text-sm sm:text-base">Years Experience</p>
                </div>
                <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl p-6 text-center shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                    {stats.patients}+
                  </div>
                  <p className="text-teal-100 font-medium text-sm sm:text-base">Patients Treated</p>
                </div>
                <div className="bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl p-6 text-center shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </div>
                  <p className="text-rose-100 font-medium text-sm sm:text-base">24/7 Available Care</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div
          data-section="team"
          className={`mb-16 sm:mb-20 transition-all duration-700 ${
            visibleSections.has('team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 px-4">Meet Our Team</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto px-4">
              Our experienced and certified professionals are dedicated to helping you achieve your aesthetic goals
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-emerald-100/50 group hover:-translate-y-2 ${
                  visibleSections.has('team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`h-2 bg-gradient-to-r ${member.gradient}`}></div>
                <div className="p-6">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto mb-4 overflow-hidden shadow-lg group-hover:scale-110 transition-transform border-4 border-stone-100">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 text-center mb-1">{member.name}</h3>
                  <p className={`text-transparent bg-clip-text bg-gradient-to-r ${member.gradient} font-semibold text-center mb-2 text-sm sm:text-base`}>
                    {member.role}
                  </p>
                  <p className="text-slate-600 text-sm text-center leading-relaxed">
                    {member.specialty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Section */}
        <div
          data-section="why"
          className={`transition-all duration-700 ${
            visibleSections.has('why') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 px-4">Why Choose Our Team?</h2>
            <p className="text-base sm:text-lg text-slate-600 px-4">Excellence in every aspect of patient care</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {whyChoose.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border-2 ${
                    item.color === 'emerald' ? 'border-emerald-100' :
                    item.color === 'teal' ? 'border-teal-100' : 'border-rose-100'
                  } hover:-translate-y-1 ${
                    visibleSections.has('why') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className={`bg-gradient-to-br ${
                    item.color === 'emerald' ? 'from-emerald-100 to-emerald-200' :
                    item.color === 'teal' ? 'from-teal-100 to-teal-200' : 'from-rose-100 to-rose-200'
                  } w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md`}>
                    <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${
                      item.color === 'emerald' ? 'text-emerald-600' :
                      item.color === 'teal' ? 'text-teal-600' : 'text-rose-600'
                    }`} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 text-center mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-center leading-relaxed text-sm sm:text-base">{item.description}</p>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url(${qualityAssuredImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            <div className="relative z-10">
              <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-white mx-auto mb-4 opacity-80 animate-pulse" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 px-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg sm:text-xl text-emerald-50 mb-8 max-w-2xl mx-auto px-4">
                Book a consultation with our expert team and discover personalized treatment plans designed just for you
              </p>
              <button className="bg-white text-emerald-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2 hover:scale-105 transform">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

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

export default DoctorsTeam;