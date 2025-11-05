const About = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-8 text-center">
          About Us
        </h1>
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            At Gulzar Laser & Aesthetics Centre, we believe that everyone deserves to feel confident in their own skin. 
            Our state-of-the-art facility combines cutting-edge technology with personalized care to deliver exceptional results.
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Founded with a passion for helping clients achieve their aesthetic goals, we offer a comprehensive range of 
            laser treatments, skincare services, and aesthetic procedures tailored to your unique needs.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-blush/30 p-6 rounded-xl text-center">
              <h3 className="text-xl font-semibold text-rosegold mb-2">Expert Team</h3>
              <p className="text-gray-600">Certified professionals with years of experience</p>
            </div>
            <div className="bg-blush/30 p-6 rounded-xl text-center">
              <h3 className="text-xl font-semibold text-rosegold mb-2">Advanced Technology</h3>
              <p className="text-gray-600">Latest equipment for safe, effective treatments</p>
            </div>
            <div className="bg-blush/30 p-6 rounded-xl text-center">
              <h3 className="text-xl font-semibold text-rosegold mb-2">Personalized Care</h3>
              <p className="text-gray-600">Customized treatment plans for every client</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;