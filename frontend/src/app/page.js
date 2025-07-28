import CTAForm from '@/components/CTAForm';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <Features />
      <Testimonials />
      <CTAForm />
      <Footer />
    </div>
  );
}