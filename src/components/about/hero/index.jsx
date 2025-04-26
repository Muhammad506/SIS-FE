const Hero = () => {
  return (
    <section className="mt-14">
      {/* Top Section */}
      <div className="relative bg-[url('/about/aboutbg.svg')] bg-cover bg-center h-72 md:h-96 ">
        <div className="absolute inset-0 bg-gradient opacity-85"></div>
        <div className="relative h-full flex flex-col items-center justify-center space-y-4 px-4 md:px-6 py-16">
          <h1 className="text-yellow  lg:text-lg    text-sm md:text-base uppercase font-bold  tracking-wider">
            About Us
          </h1>
          <h2 className="  text-2xl  xl:leading-14   md:text-4xl xl:text-5xl tracking-wide md:tracking-tight  max-w-xl text-white font-semibold text-center">
            Innovating Solar Solutions for a Sustainable Future
          </h2>
        </div>
      </div>

      {/* Bottom Section */}
      <main className="max-w-7xl mx-auto pt-10 px-4 md:px-8 lg:px-12 flex flex-col lg:flex-row items-center gap-10 ">
        {/* Image Section */}
        <div className="w-full lg:w-[40%] flex justify-center items-center">
          <img
            className="w-full max-h-screen rounded-lg md:w-4/5 lg:w-full object-cover"
            src="about/WhoWeR.svg"
            alt="Who We Are"
            loading="lazy"
          />
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-[55%] flex flex-col gap-6">
          <div className="space-y-3">
            <h1 className="text-green text-sm md:text-base uppercase font-bold font-funnel tracking-wider">
              Who We Are
            </h1>
            <h2 className=" text-gray-900  text-3xl text-start xl:leading-14   md:text-4xl xl:text-5xl tracking-wide md:tracking-tight font-semibold">
              Get Connected for Enhanced Vision
            </h2>
          </div>
          <p className="text-gray-700 text-justify text-base leading-relaxed sm:text-lg lg:text-xl">
            We are a team of passionate engineers, energy experts, and
            technology enthusiasts dedicated to creating innovative solutions
            for a greener tomorrow. Our platform offers advanced tools for
            monitoring, controlling, and optimizing solar panel performance,
            making renewable energy more accessible and manageable for everyone.
          </p>
        </div>
      </main>
    </section>
  );
};

export default Hero;
