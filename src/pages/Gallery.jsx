const Gallery = () => {
  const images = [
    { category: "Laser Treatment", emoji: "✨" },
    { category: "Facial Services", emoji: "💆‍♀️" },
    { category: "Skin Rejuvenation", emoji: "🌟" },
    { category: "Treatment Room", emoji: "🏥" },
    { category: "Reception Area", emoji: "🎀" },
    { category: "Consultation", emoji: "💬" },
    { category: "Before & After", emoji: "📸" },
    { category: "Equipment", emoji: "🔬" }
  ];

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4 text-center">
          Gallery
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Take a visual tour of our state-of-the-art facility and see the transformative results we achieve
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((item, index) => (
            <div 
              key={index} 
              className="aspect-square bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group cursor-pointer"
            >
              <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-blush/30 to-sage/20 group-hover:from-rosegold/30 group-hover:to-blush/40 transition-all duration-300">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </div>
                <p className="text-sm font-semibold text-charcoal text-center px-4">
                  {item.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-rosegold mb-4">
            Want to See More?
          </h2>
          <p className="text-gray-600 mb-6">
            Follow us on social media for daily updates, treatment results, and special offers
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-rosegold hover:bg-rosegold/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300">
              Instagram
            </button>
            <button className="bg-sage hover:bg-sage/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300">
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;