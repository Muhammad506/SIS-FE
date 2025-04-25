import { RxArrowRight } from "react-icons/rx";

const Contact = () => {
  return (
    <main className="pt-6 md:pt-10 px-4 md:px-8 xl:px-12 flex flex-col justify-center items-center">
      <section className="relative text-white bg-gradient-to-r from-[#021430] via-[#0f1c47] to-[#021430] px-4 md:px-8 py-4 md:py-0 rounded-3xl shadow-lg flex flex-col items-center overflow-hidden max-w-7xl w-full">
        <div className="container sm:px-2 md:px-8 lg:px-12 xl:px-16 mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-4 text-center lg:text-left">
            <h1 className="text-[#EAB308] text-xs md:text-base uppercase font-bold font-funnel tracking-wider">
              Contact Us to Explore How We Can Help!
            </h1>
            <h2 className="text-xl 2xl:text-5xl tracking-tight md:tracking-wide w-full md:w-[80%] lg:w-[90%] xl:w-[95%] sm:text-center md:text-left self-center flex font-krona text-white drop-shadow-md">
              We’re pleased to be welcoming customers to join us.
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start gap-4 mt-10">
              <button className="bg-gradient-to-r from-[#021430] via-[#0f1c47] to-[#021430] text-white cursor-pointer px-8 py-3 flex items-center rounded-full font-medium border-2 hover:border-[#EAB308] shadow-lg transform transition-all duration-300 relative overflow-hidden group hover:bg-blue-900 hover:text-white hover:scale-105 hover:shadow-xl">
                <span className="absolute inset-0 bg-white rounded-full transform scale-0 group-hover:scale-100 transition-all duration-500"></span>
                <span className="relative group-hover:text-blue-900 text-base lg:text-lg transition-all text-nowrap duration-500">
                  Contact Us
                </span>
                <span className="relative ml-2 text-lg transition-all duration-300 group-hover:text-blue-900">
                  <RxArrowRight className="size-6" />
                </span>
              </button>
            </div>
          </div>

          {/* Image Content */}
          <div className="lg:w-1/2 relative md:block hidden">
            <img
              src="baba.svg"
              alt="Solar Panel"
              className="w-full max-w-md md:max-w-lg mx-auto"
            />
            {/* Top-right shape */}
            <div className="absolute lg:-top-8 -top-14 -right-32 bg-green rounded-full lg:w-28 lg:h-28 w-20 h-20 opacity-75 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Decorative Bottom Element */}
      <div className="bg-green p-4 rounded-b-full sm:w-[90%] !md:w-[80%] xl:w-[70%] max-w-7xl h-12 mt-[-32px] md:mt-[-16px] shadow-md"></div>
    </main>
  );
};

export default Contact;
