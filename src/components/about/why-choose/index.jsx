const WhyChoose = () => {
  return (
    <main className="max-w-7xl mx-auto pt-6 md:pt-10 px-4 md:px-8 lg:px-12 flex flex-col-reverse lg:flex-row items-center gap-10">
      {/* Content Section */}
      <div className="w-full lg:w-[55%] flex flex-col gap-6">
        <div className="space-y-3">
          <h1 className="text-green text-sm md:text-base uppercase font-bold font-funnel tracking-wider">
            Why Choose Us
          </h1>
          <h2 className=" text-gray-900  text-3xl text-start xl:leading-14   md:text-4xl xl:text-5xl tracking-wide md:tracking-tight font-semibold">
            Why Choose Solar Intelli Solutions?
          </h2>
        </div>
        <p className="text-gray-700 text-justify text-base leading-relaxed sm:text-lg lg:text-xl">
          At Solar Intelli Solutions, we offer unparalleled expertise in solar
          technology, ensuring reliable and scalable energy solutions for homes
          and businesses. Our robust platform enhances the efficiency of your
          solar systems, whether it’s a small residential setup or a large
          commercial installation.
        </p>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-[40%] flex justify-center items-center">
        <img
          className="w-full max-h-screen rounded-lg md:w-4/5 lg:w-full object-cover"
          src="/about/WhyChoose.svg"
          alt="Why Choose Us"
          loading="lazy"
        />
      </div>
    </main>
  );
};

export default WhyChoose;
