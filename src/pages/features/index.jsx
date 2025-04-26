import React from "react";
import Faqs from "../../components/common/faqs";
import AllFeatures from "../../components/features/all-features";
import Hero from "../../components/features/hero";

const Features = () => {
  return (
    <div className="bg-[#F5F5F5] pb-6">
      <Hero />
      <AllFeatures />
      <Faqs />
    </div>
  );
};

export default Features;
