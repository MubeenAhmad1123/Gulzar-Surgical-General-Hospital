import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, CreditCard, FileText, CheckCircle, Phone, Mail, Download, AlertCircle, Heart, Shield, Sparkles, ExternalLink } from 'lucide-react';

const PatientInfo = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
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

    return () => observerRef.current?.disconnect();
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
    { title: 'Outpatient Services', time: 'To be confirmed', icon: Clock, color: 'emerald' },
    { title: 'Emergency Services', time: '24/7, including all holidays', icon: AlertCircle, color: 'rose' },
    { title: 'Visiting Patients', time: 'Please contact for current policies', icon: Heart, color: 'teal' }
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
      fields: ['Full Name', 'Date of Birth', 'Contact Number', 'Email Address', 'Emergency Contact']
    },
    { 
      name: 'Medical History Form', 
      description: 'Past medical conditions and surgeries',
      color: 'teal',
      fields: ['Current Medications', 'Allergies', 'Past Surgeries', 'Chronic Conditions', 'Family History']
    },
    { 
      name: 'Treatment Consent Form', 
      description: 'Authorization for procedures and treatments',
      color: 'cyan',
      fields: ['Treatment Authorization', 'Risks Acknowledgment', 'Privacy Consent', 'Photo Consent']
    },
    { 
      name: 'Insurance Information Form', 
      description: 'Insurance provider and policy details',
      color: 'amber',
      fields: ['Insurance Provider', 'Policy Number', 'Group Number', 'Subscriber Information']
    }
  ];

  const generatePDF = (formType) => {
    // Create a simple PDF-like content
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full mb-6 shadow-sm border border-emerald-100">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">Patient Resources</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 tracking-tight">
            Patient Information
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know for your visit to Gulzar Laser & Aesthetics Centre
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Book Appointment Section */}
        <div
          data-section="booking"
          className={`mb-16 transition-all duration-700 ${
            visibleSections.has('booking') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Book Appointments</h2>
                <p className="text-emerald-50 text-lg leading-relaxed mb-6">
                  Schedule your visit by calling us at <span className="font-bold text-white">0303 7181546</span> or use our online contact form. We recommend booking in advance to ensure your preferred time slot.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 shadow-lg">
                    <Calendar className="w-5 h-5" />
                    Book Now
                  </button>
                  <a href="tel:03037181546" className="bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 border-2 border-white/30">
                    <Phone className="w-5 h-5" />
                    Call Us
                  </a>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30">
                  <Sparkles className="w-32 h-32 text-white opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visiting Hours */}
        <div
          data-section="hours"
          className={`mb-16 transition-all duration-700 ${
            visibleSections.has('hours') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Visiting Hours</h2>
            <p className="text-lg text-slate-600">Our facility hours and services availability</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {visitingHours.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                    item.color === 'emerald' ? 'border-emerald-100' : 
                    item.color === 'rose' ? 'border-rose-100' : 'border-teal-100'
                  } hover:-translate-y-1`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`bg-gradient-to-br ${
                    item.color === 'emerald' ? 'from-emerald-100 to-emerald-200' :
                    item.color === 'rose' ? 'from-rose-100 to-rose-200' : 'from-teal-100 to-teal-200'
                  } w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-md`}>
                    <Icon className={`w-8 h-8 ${
                      item.color === 'emerald' ? 'text-emerald-600' :
                      item.color === 'rose' ? 'text-rose-600' : 'text-teal-600'
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.time}</p>
                  {item.title === 'Emergency Services' && (
                    <div className="mt-4 bg-rose-50 border border-rose-200 rounded-lg p-3">
                      <p className="text-sm text-rose-700 font-medium">Always Available</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-6 bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 text-center">
            <p className="text-amber-800">
              <strong>Note:</strong> Specific outpatient hours will be confirmed. Please contact us for the most current information.
            </p>
          </div>
        </div>

        {/* Insurance & Payment */}
        <div
          data-section="payment"
          className={`mb-16 transition-all duration-700 ${
            visibleSections.has('payment') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Insurance & Payment</h2>
            <p className="text-lg text-slate-600">Flexible payment options for your convenience</p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-emerald-100/50">
            <p className="text-lg text-slate-700 mb-8 text-center leading-relaxed">
              We accept various insurance providers and offer flexible payment options including cash and major cards. 
              Contact us to verify your insurance coverage before your visit.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {paymentMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow border border-emerald-100"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                      <Icon className="w-7 h-7 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-1">{method.name}</h3>
                    <p className="text-sm text-slate-600">{method.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-2xl p-6 text-center">
              <p className="text-teal-800">
                <Phone className="inline w-5 h-5 mr-2" />
                <strong>Contact us at 0303 7181546</strong> to verify your insurance coverage and discuss payment options
              </p>
            </div>
          </div>
        </div>

        {/* Patient Forms - ENHANCED WITH DOWNLOADABLE FORMS */}
        <div
          data-section="forms"
          className={`mb-16 transition-all duration-700 ${
            visibleSections.has('forms') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Patient Forms & Documents</h2>
            <p className="text-lg text-slate-600">Download and complete forms before your appointment</p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-emerald-100/50">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <Download className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-emerald-900 font-semibold mb-2">Save Time at Check-In</p>
                  <p className="text-emerald-800">
                    Download and complete these forms before your appointment. Bring the completed forms along with your ID and insurance card to expedite the registration process.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${
                    doc.color === 'emerald' ? 'from-emerald-50 to-emerald-100 border-emerald-200' :
                    doc.color === 'teal' ? 'from-teal-50 to-teal-100 border-teal-200' :
                    doc.color === 'cyan' ? 'from-cyan-50 to-cyan-100 border-cyan-200' :
                    'from-amber-50 to-amber-100 border-amber-200'
                  } rounded-2xl p-6 border-2 hover:shadow-lg transition-all group`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <FileText className={`w-7 h-7 ${
                        doc.color === 'emerald' ? 'text-emerald-600' :
                        doc.color === 'teal' ? 'text-teal-600' :
                        doc.color === 'cyan' ? 'text-cyan-600' : 'text-amber-600'
                      }`} />
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2 text-lg">{doc.name}</h3>
                  <p className="text-slate-600 text-sm mb-4">{doc.description}</p>
                  
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
                    } text-white px-4 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg`}
                  >
                    <Download className="w-5 h-5" />
                    Download Form
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-blue-900 font-semibold mb-2">Need Help with Forms?</p>
                  <p className="text-blue-800 mb-3">
                    If you have questions about completing these forms or need assistance, our staff is happy to help. You can also complete the forms at the clinic before your appointment.
                  </p>
                  <a href="tel:03037181546" className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
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
          className={`mb-16 transition-all duration-700 ${
            visibleSections.has('checklist') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">First Visit Checklist</h2>
            <p className="text-lg text-slate-600">What to bring for your appointment</p>
          </div>
          <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl shadow-xl p-8 md:p-12 border-2 border-emerald-100">
            <div className="grid md:grid-cols-2 gap-6">
              {checklistItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all border border-emerald-100/50"
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <p className="text-slate-700 leading-relaxed pt-1">{item.text}</p>
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
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Have Questions?
            </h2>
            <p className="text-xl text-teal-50 mb-8 max-w-2xl mx-auto">
              Our team is here to help. Contact us for any questions or concerns about your visit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:03037181546" className="bg-white text-teal-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-teal-50 transition-colors shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                0303 7181546
              </a>
              <button className="bg-teal-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-teal-800 transition-colors border-2 border-white/30 inline-flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" />
                Email Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;