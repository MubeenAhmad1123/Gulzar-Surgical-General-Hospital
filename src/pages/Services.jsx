const Services = () => {
  const services = [
    {
      title: "Laser Hair Removal",
      description: "Permanent hair reduction using advanced laser technology",
      icon: "✨"
    },
    {
      title: "Skin Rejuvenation",
      description: "Restore youthful glow with our rejuvenation treatments",
      icon: "🌟"
    },
    {
      title: "Facial Treatments",
      description: "Customized facials for all skin types and concerns",
      icon: "💆‍♀️"
    },
    {
      title: "Anti-Aging Treatments",
      description: "Combat signs of aging with proven procedures",
      icon: "⏰"
    },
    {
      title: "Acne Treatment",
      description: "Effective solutions for clear, healthy skin",
      icon: "🎯"
    },
    {
      title: "Body Contouring",
      description: "Sculpt and tone your body non-invasively",
      icon: "💪"
    }
  ];

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4 text-center">
          Our Services
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Discover our comprehensive range of aesthetic treatments designed to enhance your natural beauty
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-rosegold mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
              <button className="mt-6 text-sage font-semibold hover:text-sage/80 transition-colors">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;