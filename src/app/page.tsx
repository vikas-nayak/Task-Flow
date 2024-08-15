import Navbar from "@/components/global/navbar";
import HeroSection from "@/components/sections/hero-section";
import LampSection from "@/components/sections/lamp-section";
import PricingSection from "@/components/sections/pricing-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <div>Test Text Before HeroSection</div>
      <HeroSection />
      <div>Test Text After HeroSection</div>
      <LampSection />
      <PricingSection />
    </>
  );
  
}
