import { Bonuses } from "@/components/Bonuses";
import { BackgroundParticles } from "@/components/BackgroundParticles";
import { Days } from "@/components/Days";
import { Footer } from "@/components/Footer";
import { ForWho } from "@/components/ForWho";
import { Hero } from "@/components/Hero";
import { Industry } from "@/components/Industry";
import { Mentor } from "@/components/Mentor";
import { LiveSessionGallery } from "@/components/LiveSessionGallery";
import { Navbar } from "@/components/Navbar";
import { Pain } from "@/components/Pain";
import { Pricing } from "@/components/Pricing";
import { Ticker } from "@/components/Ticker";

export default function HomePage() {
  return (
    <main className="relative isolate overflow-x-clip bg-bg">
      <BackgroundParticles />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Ticker />
        <Pain />
        <Days />
        <ForWho />
        <Mentor />
        <LiveSessionGallery />
        <Bonuses />
        <Industry />
        <Pricing />
        <Footer />
      </div>
    </main>
  );
}
