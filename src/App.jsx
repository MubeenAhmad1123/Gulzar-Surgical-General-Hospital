import { ScrollToTop } from './ScrollToTop';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import PatientInfo from "./pages/PatientInfo";
import FAQ from "./pages/FAQ";
import OurTeam from "./pages/Doctors";
import Gallery from "./pages/Gallery";
import BookAppointment from "./pages/BookAppointment";
import Admin from "./pages/AdminDashboard.jsx";

import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <Router>
      <ScrollToTop />  {/* <-- ADD THIS HERE */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/patient-info" element={<PatientInfo />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/admin" element={<Admin />} />

      </Routes>
      <Footer />
      <Analytics />
    </Router>
  );
}
