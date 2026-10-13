import React from 'react';
import HeroSection from '../../components/home/HeroSection';
import CategorySection from '../../components/home/CategorySection';
import FeaturedVenuesSection from '../../components/home/FeaturedVenuesSection';
import FeaturedCarsSection from '../../components/home/FeaturedCarsSection';
import FeaturedServicesSection from '../../components/home/FeaturedServicesSection';
import RecommendedPackagesSection from '../../components/home/RecommendedPackagesSection';
import HowItWorksSection from '../../components/home/HowItWorksSection';
import BenefitsSection from '../../components/home/BenefitsSection';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import CTASection from '../../components/home/CTASection';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <FeaturedVenuesSection />
      <FeaturedCarsSection />
      <FeaturedServicesSection />
      <RecommendedPackagesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default Home;
