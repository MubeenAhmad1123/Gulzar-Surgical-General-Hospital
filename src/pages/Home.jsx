const Home = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6">
            Welcome to Gulzar Laser & Aesthetics Centre
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your journey to radiant, confident skin starts here. Experience luxury skincare and advanced aesthetic treatments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-rosegold hover:bg-rosegold/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
              Book Consultation
            </button>
            <button className="bg-sage hover:bg-sage/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
              View Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;