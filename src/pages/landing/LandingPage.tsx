import { HeroSection } from './sections/HeroSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { CtaSection } from './sections/CtaSection';

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
