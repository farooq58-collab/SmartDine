import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ARSection from '../components/ARSection';
import ARDemoVideo from '../components/ARDemoVideo';
import FeaturesSection from '../components/FeaturesSection';
import ROICalculator from '../components/ROICalculator';
import TrendDashboard from '../components/TrendDashboard';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy-dark text-gray-100 flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ARSection />
        <ARDemoVideo />
        <FeaturesSection />
        <ROICalculator />
        <TrendDashboard />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
