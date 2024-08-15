import Image from "next/image";
import Navbar from "../components/global/navbar";
import { ContainerScroll } from "@/components/global/container-scroll-animation";
import { Button } from "@/components/ui/button";
import { LampComponent } from "../components/global/lamp";
import { CardContainer, CardItem, CardBody } from "../components/global/3d-card";
import { CheckIcon } from 'lucide-react'
import Sidebar from "@/components/global/sidebar";
import HeroSection from "@/components/sections/hero-section";
import PricingSection from "@/components/sections/pricing-section";



export default function Home() {
  return (
    <main>
      <Navbar />
      {/* <Sidebar /> */}
      {/* ContainerScroll Section */}
      <HeroSection />
      {/* LampComponent Section */}
      <section className="relative mt-10">
        <LampComponent />
      </section>
      <PricingSection />

    </main>

  );
}