import React from "react";
import Hero from "../../components/home/hero";
import About from "../../components/home/about";
import CTA from "../../components/home/cta";
import TechnologicalStack from "../../components/home/technological-stack";
import Features from "../../components/home/features";
import Faqs from "../../components/common/faqs";
import Contact from "../../components/common/contact";
import OurTeam from "../../components/common/our-team";

const Home = () => {
  return (
    <div className="bg-[#F5F5F5]">
      <Hero />
      <About />
      <CTA />
      <TechnologicalStack />
      <Features />
      <Faqs />
      <Contact />
      <OurTeam />
    </div>
  );
};

export default Home;
