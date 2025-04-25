const CTA = () => {
  return (
    <main className=" pt-6 lg:pt-10  bg-[#F5F5F5]  px-4 mx-auto md:px-10 lg:px-20 ">
      <section className="mx-auto container max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-10 ">
        {/* Left Content */}
        <div className="lg:w-[55%] space-y-6 self-center">
          <div className="space-y-4">
            <h1 className="text-[#5B9B37] text-sm md:text-base uppercase font-bold font-funnel tracking-wider">
              Take the Next Step
            </h1>
            <h2 className="text-3xl text-start xl:leading-14   md:text-4xl xl:text-5xl tracking-wide md:tracking-tight font-semibold  w-full md:w-[70%] lg:w-[90%] xl:w-[90%]  text-gray-900 ">
              Power that Doesn’t Cost the Earth
            </h2>
          </div>
          <p className="text-gray-700 text-justify text-base leading-relaxed sm:text-lg lg:text-xl lg:max-w-2xl">
            If you have questions or need advice, we’re here to help. Click
            below to visit our Contact Us page and share your details. Let us
            know your requirements, and our team will respond promptly. Your
            journey to smarter solutions starts with a click. We’re here to
            support your goals!
          </p>
          <div>
            <button className="bg-green hover:brightness-110 text-white px-8 py-3 rounded-full font-medium cursor-pointer transition-all text-sm lg:text-base">
              Let’s Connect
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:w-[40%] flex justify-center items-center self-center">
          <img
            className="max-h-screen h-[450px] w-auto "
            src="home/cta.svg"
            alt="CTA"
            loading="lazy"
          />
        </div>
      </section>
    </main>
  );
};

export default CTA;
