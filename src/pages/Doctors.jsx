const Doctors = () => {
  const team = [
    {
      name: "Dr. Sarah Ahmed",
      title: "Medical Director",
      specialty: "Dermatology & Laser Specialist",
      image: "👩‍⚕️"
    },
    {
      name: "Dr. Ayesha Khan",
      title: "Senior Aesthetician",
      specialty: "Facial Treatments & Skin Rejuvenation",
      image: "👩‍⚕️"
    },
    {
      name: "Dr. Fatima Ali",
      title: "Laser Technician",
      specialty: "Laser Hair Removal & Body Treatments",
      image: "👩‍⚕️"
    },
    {
      name: "Zara Hussain",
      title: "Clinical Coordinator",
      specialty: "Patient Care & Consultation",
      image: "👩‍💼"
    }
  ];

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4 text-center">
          Meet Our Team
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Our experienced and certified professionals are dedicated to helping you achieve your aesthetic goals
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="bg-blush/30 h-48 flex items-center justify-center text-8xl">
                {member.image}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-charcoal mb-1">{member.name}</h3>
                <p className="text-rosegold font-medium mb-2">{member.title}</p>
                <p className="text-gray-600 text-sm">{member.specialty}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-semibold text-rosegold mb-6">
            Why Choose Our Team?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">Certified Professionals</h3>
              <p className="text-gray-600">All team members hold advanced certifications and licenses</p>
            </div>
            <div>
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">Years of Experience</h3>
              <p className="text-gray-600">Decades of combined experience in aesthetic treatments</p>
            </div>
            <div>
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">Patient-Centered Care</h3>
              <p className="text-gray-600">Your comfort and satisfaction are our top priorities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;