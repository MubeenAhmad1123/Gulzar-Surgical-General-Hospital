import React from 'react';
import { Sparkles, Heart, Award, Users, Clock, Shield } from 'lucide-react';

const About = () => {
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
      gradient: "from-emerald-50 to-teal-50"
    },
    {
      title: "Advanced Technology",
      description: "State-of-the-art laser equipment for safe, effective, and comfortable treatments",
      gradient: "from-teal-50 to-cyan-50"
    },
    {
      title: "Personalized Care",
      description: "Customized treatment plans tailored to your unique skin needs and aesthetic goals",
      gradient: "from-cyan-50 to-emerald-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 via-teal-50/30 to-amber-50/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full mb-6 shadow-sm border border-emerald-100">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">Gulzar Laser & Aesthetics Centre</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 tracking-tight">
              Your Journey to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mt-2">
                Radiant Skin
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Where advanced laser technology meets personalized care to help you achieve the confident, glowing skin you deserve
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100/50 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-3 rounded-xl mb-3">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-1">{stat.number}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Story Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12 border border-emerald-50">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 rounded-full mb-4">
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
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-emerald-200/50 via-teal-200/50 to-amber-200/50 flex items-center justify-center overflow-hidden shadow-2xl">
                <div className="text-center p-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                    <Sparkles className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Dr. Sumaira Gulzar</h3>
                    <p className="text-emerald-600 font-medium mb-3">Medical Director & Lead Clinician</p>
                    <p className="text-sm text-slate-600">MBBS, FCPS (Surgery)</p>
                    <p className="text-sm text-slate-600 mt-2">Certified Laser Specialist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 text-center">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className={`bg-gradient-to-br ${value.gradient} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-100/50`}>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl p-8 shadow-lg border border-emerald-100/50">
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Heart className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">
              To deliver exceptional skin therapy and aesthetic services through innovation, expertise, and compassion. We are committed to helping you achieve healthy, radiant skin in a safe, comfortable, and welcoming environment.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-white to-teal-50/30 rounded-3xl p-8 shadow-lg border border-teal-100/50">
            <div className="bg-gradient-to-br from-teal-100 to-cyan-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">
              To be the leading laser and aesthetic center in the region, recognized for clinical excellence, innovative treatments, and transformative results. We strive to set new standards in skincare while making quality treatments accessible to all.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Skin?
          </h2>
          <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
            Schedule a consultation today and discover how our advanced laser treatments can help you achieve your aesthetic goals
          </p>
          <button className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-50 transition-colors duration-300 shadow-lg hover:shadow-xl">
            Book Your Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;