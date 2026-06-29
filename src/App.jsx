import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';
import ARSection from './components/ARSection';
import ARDemoVideo from './components/ARDemoVideo';
import TrendDashboard from './components/TrendDashboard';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-navy-dark text-gray-100 flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ARSection />
        <ARDemoVideo />
        <FeaturesSection />
        <TrendDashboard />
        <HowItWorks />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

export default App;
