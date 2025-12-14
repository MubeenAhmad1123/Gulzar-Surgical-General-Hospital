import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, CreditCard, FileText, CheckCircle, Phone, Mail, Download, AlertCircle, Heart, Shield, Sparkles, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
// Import images
import patientInfoBg from '../assets/paitent_info_bg.webp';
import consultationImage from '../assets/counsultation.webp';
import newPatientRegImage from '../assets/new_patient_registration.webp';
import medicalHistoryImage from '../assets/medical_history.webp';
import treatmentConsentImage from '../assets/treatment_concent.webp';
import insuranceImage from '../assets/insurence.webp';
import patientDoctorImage from '../assets/patient_doctor.webp';
import visitingPatientImage from '../assets/visiting_patient.webp';
import emergencyImage from '../assets/emergency.webp';
import receptionImage from '../assets/reception.webp';

const PatientInfo = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.dataset.section]));
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
  }, []);

  const checklistItems = [
    { text: 'Valid photo ID (CNIC, passport, or driver\'s license)', icon: CheckCircle },
    { text: 'Insurance card and policy information', icon: Shield },
    { text: 'List of current medications and dosages', icon: FileText },
    { text: 'Previous medical records and test results (if available)', icon: FileText },
    { text: 'List of allergies and any relevant family medical history', icon: Heart },
    { text: 'Questions or concerns you want to discuss with your doctor', icon: AlertCircle }
  ];

  const visitingHours = [
    { 
      title: 'Outpatient Services', 
      time: 'To be confirmed', 
      icon: Clock, 
      color: 'emerald',
      image: patientDoctorImage
    },
    { 
      title: 'Emergency Services', 
      time: '24/7, including all holidays', 
      icon: AlertCircle, 
      color: 'rose',
      image: emergencyImage
    },
    { 
      title: 'Visiting Patients', 
      time: 'Please contact for current policies', 
      icon: Heart, 
      color: 'teal',
      image: visitingPatientImage
    }
  ];

  const paymentMethods = [
    { name: 'Cash Payments', description: 'Accepted at reception', icon: CreditCard },
    { name: 'Major Cards', description: 'Visa, MasterCard accepted', icon: CreditCard },
    { name: 'Insurance', description: 'Multiple providers accepted', icon: Shield },
    { name: 'Flexible Plans', description: 'Payment options available', icon: FileText }
  ];

  const documents = [
    { 
      name: 'New Patient Registration Form', 
      description: 'Personal information and contact details',
      color: 'emerald',
      image: newPatientRegImage,
      fields: ['Full Name', 'Date of Birth', 'Contact Number', 'Email Address', 'Emergency Contact']
    },
    { 
      name: 'Medical History Form', 
      description: 'Past medical conditions and surgeries',
      color: 'teal',
      image: medicalHistoryImage,
      fields: ['Current Medications', 'Allergies', 'Past Surgeries', 'Chronic Conditions', 'Family History']
    },
    { 
      name: 'Treatment Consent Form', 
      description: 'Authorization for procedures and treatments',
      color: 'cyan',
      image: treatmentConsentImage,
      fields: ['Treatment Authorization', 'Risks Acknowledgment', 'Privacy Consent', 'Photo Consent']
    },
    { 
      name: 'Insurance Information Form', 
      description: 'Insurance provider and policy details',
      color: 'amber',
      image: insuranceImage,
      fields: ['Insurance Provider', 'Policy Number', 'Group Number', 'Subscriber Information']
    }
  ];

  const generatePDF = (formType) => {
    const content = documents.find(doc => doc.name === formType);
    const pdfContent = `
GULZAR LASER & AESTHETICS CENTRE
${formType}

${content.description}

Required Information:
${content.fields.map((field, index) => `${index + 1}. ${field}: _______________________________`).join('\n')}

Patient Signature: ____________________    Date: ______________

Please complete this form and bring it to your appointment.
Contact: 0303 7181546
    `;
    
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formType.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-100/40 via-teal-50/30 to-amber-50/40">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${patientInfoBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-full mb-6 shadow-sm border border-emerald-100 animate-fadeIn">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">Patient Resources</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-4 sm:mb-6 tracking-tight px-4 animate-fadeInUp">
            Patient Information
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            Everything you need to know for your visit to Gulzar Laser & Aesthetics Centre
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Book Appointment Section */}
        <div
          data-section="booking"
          className={`mb-12 sm:mb-16 transition-all duration-700 ${
            visibleSections.has('booking') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url(${consultationImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <div className="bg-white/20 backdrop-blur-sm w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4">
                  <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Book Appointments</h2>
                <p className="text-emerald-50 text-base sm:text-lg leading-relaxed mb-6">
                  Schedule your visit by calling us at <span className="font-bold text-white">0303 7181546</span> or use our online contact form. We recommend booking in advance to ensure your preferred time slot.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
    to="/book-appointment" className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 transform">
                    <Calendar className="w-5 h-5" />
                    Book Now
                  </Link>
                  <a href="tel:03037181546" className="bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-800 transition-all flex items-center justify-center gap-2 border-2 border-white/30 hover:scale-105 transform">
                    <Phone className="w-5 h-5" />
                    Call Us
                  </a>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 group">
                  <img 
                    src={consultationImage} 
                    alt="Consultation" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visiting Hours */}
        <div
          data-section="hours"
          className={`mb-12 sm:mb-16 transition-all duration-700 ${
            visibleSections.has('hours') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 px-4">Visiting Hours</h2>
            <p className="text-base sm:text-lg text-slate-600 px-4">Our facility hours and services availability</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visitingHours.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${
                    item.color === 'emerald' ? 'border-emerald-100' : 
                    item.color === 'rose' ? 'border-rose-100' : 'border-teal-100'
                  } hover:-translate-y-2 group ${
                    visibleSections.has('hours') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <div className={`bg-gradient-to-br ${
                      item.color === 'emerald' ? 'from-emerald-100 to-emerald-200' :
                      item.color === 'rose' ? 'from-rose-100 to-rose-200' : 'from-teal-100 to-teal-200'
                    } w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 shadow-md`}>
                      <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${
                        item.color === 'emerald' ? 'text-emerald-600' :
                        item.color === 'rose' ? 'text-rose-600' : 'text-teal-600'
                      }`} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{item.time}</p>
                    {item.title === 'Emergency Services' && (
                      <div className="mt-4 bg-rose-50 border border-rose-200 rounded-lg p-3">
                        <p className="text-sm text-rose-700 font-medium">Always Available</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 sm:p-6 text-center">
            <p className="text-amber-800 text-sm sm:text-base">
              <strong>Note:</strong> Specific outpatient hours will be confirmed. Please contact us for the most current information.
            </p>
          </div>
        </div>

        {/* Insurance & Payment */}
        <div
          data-section="payment"
          className={`mb-12 sm:mb-16 transition-all duration-700 ${
            visibleSections.has('payment') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 px-4">Insurance & Payment</h2>
            <p className="text-base sm:text-lg text-slate-600 px-4">Flexible payment options for your convenience</p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 border border-emerald-100/50 relative overflow-hidden">
            <div 
              className="absolute top-0 right-0 w-64 h-64 opacity-5"
              style={{
                backgroundImage: `url(${receptionImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            <p className="text-base sm:text-lg text-slate-700 mb-8 text-center leading-relaxed relative z-10 px-4">
              We accept various insurance providers and offer flexible payment options including cash and major cards. 
              Contact us to verify your insurance coverage before your visit.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
              {paymentMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 sm:p-6 text-center hover:shadow-lg transition-all duration-300 border border-emerald-100 hover:-translate-y-1 ${
                      visibleSections.has('payment') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="bg-white w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-1 text-sm sm:text-base">{method.name}</h3>
                    <p className="text-xs sm:text-sm text-slate-600">{method.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-2xl p-4 sm:p-6 text-center relative z-10">
              <p className="text-teal-800 text-sm sm:text-base">
                <Phone className="inline w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <strong>Contact us at 0303 7181546</strong> to verify your insurance coverage and discuss payment options
              </p>
            </div>
          </div>
        </div>

        {/* Patient Forms - ENHANCED WITH IMAGES */}
        <div
          data-section="forms"
          className={`mb-12 sm:mb-16 transition-all duration-700 ${
            visibleSections.has('forms') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 px-4">Patient Forms & Documents</h2>
            <p className="text-base sm:text-lg text-slate-600 px-4">Download and complete forms before your appointment</p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 border border-emerald-100/50">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 mb-8">
              <div className="flex items-start gap-3">
                <Download className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-emerald-900 font-semibold mb-2 text-sm sm:text-base">Save Time at Check-In</p>
                  <p className="text-emerald-800 text-sm sm:text-base">
                    Download and complete these forms before your appointment. Bring the completed forms along with your ID and insurance card to expedite the registration process.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${
                    doc.color === 'emerald' ? 'from-emerald-50 to-emerald-100 border-emerald-200' :
                    doc.color === 'teal' ? 'from-teal-50 to-teal-100 border-teal-200' :
                    doc.color === 'cyan' ? 'from-cyan-50 to-cyan-100 border-cyan-200' :
                    'from-amber-50 to-amber-100 border-amber-200'
                  } rounded-2xl overflow-hidden border-2 hover:shadow-xl transition-all duration-500 group ${
                    visibleSections.has('forms') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={doc.image} 
                      alt={doc.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      doc.color === 'emerald' ? 'from-emerald-900/60' :
                      doc.color === 'teal' ? 'from-teal-900/60' :
                      doc.color === 'cyan' ? 'from-cyan-900/60' : 'from-amber-900/60'
                    } to-transparent`}></div>
                  </div>
                  
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-white w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <FileText className={`w-6 h-6 sm:w-7 sm:h-7 ${
                          doc.color === 'emerald' ? 'text-emerald-600' :
                          doc.color === 'teal' ? 'text-teal-600' :
                          doc.color === 'cyan' ? 'text-cyan-600' : 'text-amber-600'
                        }`} />
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2 text-base sm:text-lg">{doc.name}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm mb-4">{doc.description}</p>
                    
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-slate-700 mb-2">Required Fields:</p>
                      <div className="flex flex-wrap gap-2">
                        {doc.fields.slice(0, 3).map((field, i) => (
                          <span key={i} className={`text-xs px-2 py-1 rounded-full ${
                            doc.color === 'emerald' ? 'bg-emerald-200 text-emerald-800' :
                            doc.color === 'teal' ? 'bg-teal-200 text-teal-800' :
                            doc.color === 'cyan' ? 'bg-cyan-200 text-cyan-800' :
                            'bg-amber-200 text-amber-800'
                          }`}>
                            {field}
                          </span>
                        ))}
                        {doc.fields.length > 3 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-slate-200 text-slate-600">
                            +{doc.fields.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => generatePDF(doc.name)}
                      className={`w-full ${
                        doc.color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700' :
                        doc.color === 'teal' ? 'bg-teal-600 hover:bg-teal-700' :
                        doc.color === 'cyan' ? 'bg-cyan-600 hover:bg-cyan-700' :
                        'bg-amber-600 hover:bg-amber-700'
                      } text-white px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:scale-105 transform text-sm sm:text-base`}
                    >
                      <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                      Download Form
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-blue-900 font-semibold mb-2 text-sm sm:text-base">Need Help with Forms?</p>
                  <p className="text-blue-800 mb-3 text-sm sm:text-base">
                    If you have questions about completing these forms or need assistance, our staff is happy to help. You can also complete the forms at the clinic before your appointment.
                  </p>
                  <a href="tel:03037181546" className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all text-sm hover:scale-105 transform">
                    <Phone className="w-4 h-4" />
                    Call for Assistance
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* First Visit Checklist */}
        <div
          data-section="checklist"
          className={`mb-12 sm:mb-16 transition-all duration-700 ${
            visibleSections.has('checklist') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 px-4">First Visit Checklist</h2>
            <p className="text-base sm:text-lg text-slate-600 px-4">What to bring for your appointment</p>
          </div>
          <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 border-2 border-emerald-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {checklistItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-3 sm:gap-4 bg-white rounded-xl p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-emerald-100/50 hover:-translate-y-1 ${
                      visibleSections.has('checklist') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                    </div>
                    <p className="text-slate-700 leading-relaxed pt-1 text-sm sm:text-base">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div
          data-section="contact"
          className={`transition-all duration-700 ${
            visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url(${patientDoctorImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            <div className="relative z-10">
              <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-white mx-auto mb-4 opacity-80 animate-pulse" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 px-4">
                Have Questions?
              </h2>
              <p className="text-lg sm:text-xl text-teal-50 mb-8 max-w-2xl mx-auto px-4">
                Our team is here to help. Contact us for any questions or concerns about your visit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:03037181546" className="bg-white text-teal-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-teal-50 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 hover:scale-105 transform">
                  <Phone className="w-5 h-5" />
                  0303 7181546
                </a>
                <button className="bg-teal-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-teal-800 transition-all border-2 border-white/30 inline-flex items-center justify-center gap-2 hover:scale-105 transform">
                  <Mail className="w-5 h-5" />
                  Email Us
                </button>
              </div>
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

export default PatientInfo;