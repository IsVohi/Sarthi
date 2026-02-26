import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Impact } from "@/components/Impact";
import { LanguageSupport } from "@/components/LanguageSupport";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent relative overflow-x-hidden selection:bg-[#6366f1]/30 selection:text-white">
      <Navbar />
      <Hero />
      <SocialProof />
      <Features />
      <HowItWorks />
      <Impact />
      <LanguageSupport />
      <Footer />
    </main>
  );
}
