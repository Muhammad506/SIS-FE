import React from "react";
import Hero from "../../components/about/hero";
import WhyChoose from "../../components/about/why-choose";
import Contact from "../../components/common/contact";
import OurTeam from "../../components/common/our-team";

const About = () => {
  return (
    <div className="bg-[#F5F5F5]">
      <Hero />
      <WhyChoose />
      <Contact />
      <OurTeam />
    </div>
  );
};

export default About;
