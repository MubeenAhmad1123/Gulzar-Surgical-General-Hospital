import { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle, Sparkles, Heart, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import emailjs from '@emailjs/browser';

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const services = [
    { category: 'Premium Facials', items: [
      'Face HIFU - PKR 7,000',
      'Hydra Facial & Whitening Drips - PKR 6,000',
      'Vampire Facial - PKR 5,000',
      'Clever Facial - PKR 5,000',
      'BB Glow Treatment - PKR 5,000',
      'Hollywood Facial - PKR 5,000',
      'Chemical Peel (Face) - PKR 5,000',
      'Hydra Facial - PKR 5,000',
      'Photo Facial - PKR 3,500',
      'Carbon Laser Peel - PKR 3,000'
    ]},
    { category: 'Injectable Treatments', items: [
      'Lip Fillers - PKR 70,000/ml',
      'Cheek Fillers - PKR 60,000/ml',
      'Dermal Fillers - PKR 55,000/ml',
      'PRP Treatment - PKR 25,000/session',
      'Botox Treatment'
    ]},
    { category: 'Body & Weight Loss', items: [
      'Weight Loss Drips - PKR 6,500',
      'Feet & Hands Chemical Peel - PKR 2,500'
    ]},
    { category: 'Specialized Services', items: [
      'Laser Hair Removal',
      'Acne & Pigmentation Treatment',
      'Skin Glow Enhancement',
      'Lesion Removal (Moles, Warts, Tags)',
      'Anti-Aging & Rejuvenation',
      'Dental Services'
    ]},
    { category: 'General Medical', items: [
      'General Surgery Consultation',
      'Gynecology & Obstetrics',
      'Internal Medicine',
      'Diagnostic Services',
      'Emergency Care',
      'Medical Checkup'
    ]}
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user starts typing
  };

  const sendEmails = async (appointmentData) => {
    try {
      const bookingTime = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Karachi',
        dateStyle: 'full',
        timeStyle: 'short'
      });

      const emailData = {
        name: appointmentData.name,
        email: appointmentData.email,
        phone: appointmentData.phone,
        date: appointmentData.appointment_date,
        time: appointmentData.appointment_time,
        service: appointmentData.service,
        message: appointmentData.message || 'No additional notes',
        booking_time: bookingTime
      };

      // Send email to admin
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN,
        emailData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Send confirmation email to client
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CLIENT,
        emailData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      return true;
    } catch (error) {
      console.error('Email sending error:', error);
      return false;
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time || !formData.service) {
      setError('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Save to Supabase
      const { data, error: supabaseError } = await supabase
        .from('appointments')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            appointment_date: formData.date,
            appointment_time: formData.time,
            service: formData.service,
            message: formData.message,
            status: 'Pending'
          }
        ])
        .select();

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      // Send emails
      const emailsSent = await sendEmails(data[0]);
      
      if (!emailsSent) {
        console.warn('Emails failed to send, but appointment was saved');
      }

      // Show success message
      setSubmitted(true);
      setLoading(false);

      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          service: '',
          message: ''
        });
      }, 5000);

    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to book appointment. Please try again or call us directly.');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center border border-emerald-100/50 animate-fadeIn">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full p-6 shadow-lg animate-bounce">
              <CheckCircle className="w-20 h-20 text-emerald-600" />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-emerald-100/50 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">Booking Confirmed</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Appointment Scheduled!</h2>
          <p className="text-lg text-slate-600 mb-2">Thank you, <span className="font-semibold text-emerald-600">{formData.name}</span>!</p>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 mb-6 border border-emerald-100">
            <p className="text-slate-700 mb-2">
              <span className="font-semibold">Service:</span> {formData.service}
            </p>
            <p className="text-slate-700 mb-2">
              <span className="font-semibold">Date:</span> {formData.date}
            </p>
            <p className="text-slate-700">
              <span className="font-semibold">Time:</span> {formData.time}
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-amber-800">
              <strong>📧 Confirmation Email Sent</strong><br />
              Please check <strong>{formData.email}</strong> for your appointment details
            </p>
          </div>
          <p className="text-sm text-slate-500">
            Our team will contact you shortly at <strong>{formData.phone}</strong> to confirm your appointment
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full mb-6 shadow-sm border border-emerald-100">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">Schedule Your Visit</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-4">
            Book an Appointment
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Schedule your consultation with our expert aesthetic professionals
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="max-w-5xl mx-auto mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3 animate-shake">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800">Error</h3>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100/50">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Patient Information</h2>
                <p className="text-emerald-100">Fill in your details to book your appointment</p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-600" />
                Personal Details
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-stone-50"
                    placeholder="Enter your full name"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Mail className="inline w-4 h-4 mr-1 text-emerald-600" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-stone-50"
                    placeholder="your.email@example.com"
                    disabled={loading}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Phone className="inline w-4 h-4 mr-1 text-emerald-600" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-stone-50"
                    placeholder="03001234567"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                Appointment Details
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-stone-50"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Clock className="inline w-4 h-4 mr-1 text-emerald-600" />
                    Preferred Time *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-stone-50"
                    disabled={loading}
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Sparkles className="inline w-4 h-4 mr-1 text-emerald-600" />
                    Service Type *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-stone-50"
                    disabled={loading}
                  >
                    <option value="">Select a service</option>
                    {services.map((category) => (
                      <optgroup key={category.category} label={category.category}>
                        {category.items.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <MessageSquare className="inline w-4 h-4 mr-1 text-emerald-600" />
                Additional Notes or Special Requirements
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border-2 border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition resize-none bg-stone-50"
                placeholder="Please share any concerns, allergies, or specific requirements..."
                disabled={loading}
              />
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-100 rounded-2xl p-6 mb-8">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                Before Your Appointment
              </h4>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Please arrive 10 minutes early for registration</li>
                <li>• Bring any relevant medical records or prescriptions</li>
                <li>• Avoid makeup for facial treatments (if applicable)</li>
                <li>• Inform us of any allergies or medications you're taking</li>
                <li>• Contact us 24 hours in advance if you need to reschedule</li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 text-lg ${
                loading 
                  ? 'opacity-70 cursor-not-allowed' 
                  : 'hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Booking Appointment...
                </>
              ) : (
                <>
                  <CheckCircle className="w-6 h-6" />
                  Confirm Appointment
                </>
              )}
            </button>

            <p className="text-sm text-slate-500 text-center mt-4">
              * Required fields. We'll confirm your appointment within 24 hours via email or phone.
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 mb-2">Need immediate assistance?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+923218492868" className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow border border-emerald-100">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-slate-700">Call: 03218492868</span>
            </a>
            <a href="mailto:mubeenahma1123@gmail.com" className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow border border-emerald-100">
              <Mail className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-slate-700">Email Us</span>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}