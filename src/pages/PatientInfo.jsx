const PatientInfo = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-8 text-center">
          Patient Information
        </h1>
        
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-rosegold mb-4">Before Your Visit</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-sage mr-3">•</span>
                <span>Arrive 15 minutes early to complete necessary paperwork</span>
              </li>
              <li className="flex items-start">
                <span className="text-sage mr-3">•</span>
                <span>Bring a list of current medications and allergies</span>
              </li>
              <li className="flex items-start">
                <span className="text-sage mr-3">•</span>
                <span>Avoid sun exposure and tanning before laser treatments</span>
              </li>
              <li className="flex items-start">
                <span className="text-sage mr-3">•</span>
                <span>Come with clean skin, free of makeup and lotions</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-rosegold mb-4">After Your Treatment</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-sage mr-3">•</span>
                <span>Follow all post-treatment care instructions provided</span>
              </li>
              <li className="flex items-start">
                <span className="text-sage mr-3">•</span>
                <span>Use SPF 30+ sunscreen daily to protect treated areas</span>
              </li>
              <li className="flex items-start">
                <span className="text-sage mr-3">•</span>
                <span>Avoid harsh skincare products for 24-48 hours</span>
              </li>
              <li className="flex items-start">
                <span className="text-sage mr-3">•</span>
                <span>Contact us immediately if you experience any concerns</span>
              </li>
            </ul>
          </div>

          <div className="bg-blush/30 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-rosegold mb-4">Payment & Insurance</h2>
            <p className="text-gray-700 leading-relaxed">
              We accept all major credit cards, debit cards, and cash. Payment is due at the time of service. 
              While most aesthetic procedures are not covered by insurance, we're happy to provide itemized 
              receipts for your records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;