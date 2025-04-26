const About = () => {
  return (
    <main className=" pt-6 lg:pt-10 bg-[#F5F5F5] px-4 md:px-10 lg:px-20">
      <section className="max-w-7xl mx-auto container flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between xl:gap-10">
        {/* Image Section */}
        <div className="lg:w-[40%] flex justify-center items-center self-center">
          <img
            className="max-h-screen rounded-xl mt-6 xl:mt-0 xl:h-[450px]  w-auto"
            src="home/about.svg"
            alt="About"
            loading="lazy"
          />
        </div>

        {/* Content Section */}
        <div className="lg:w-[55%] space-y-6 self-center">
          <div className="space-y-4">
            <h1 className="text-green text-sm md:text-base uppercase font-bold  tracking-wider">
              About Us
            </h1>
            <h2 className="text-3xl text-start xl:leading-14 md:text-4xl xl:text-5xl tracking-wide md:tracking-tight font-semibold  w-full md:w-[70%] lg:w-[90%] xl:w-[90%]  text-gray-900 ">
              Get Connected for Enhanced Vision
            </h2>
          </div>
          <p className="text-gray-700 text-justify text-base leading-relaxed sm:text-lg lg:text-xl lg:max-w-2xl">
            At Solar Intelli Solutions, we specialize in innovative solar energy
            management systems designed to optimize energy efficiency and usage.
            Our platform provides a user-friendly interface to monitor and
            control solar panels in real-time, ensuring efficient and
            sustainable energy practices. With cutting-edge technologies and
            AI-driven insights, we are revolutionizing how solar energy is
            managed.
          </p>
          <div>
            <button className="bg-green hover:brightness-110 text-white px-8 py-3 rounded-full font-medium cursor-pointer transition-all text-sm lg:text-base">
              Discover More
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
