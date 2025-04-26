import { MdCallMade } from "react-icons/md";

const Hero = () => {
  return (
    <main>
      <div className="relative bg-[url('/features/FeaturesPage.svg')] bg-cover bg-center h-72 md:h-96 mt-14">
        <div className="absolute inset-0 bg-gradient opacity-85"></div>
        <div className="relative h-full flex flex-col items-center justify-center space-y-6 px-2 md:px-6 py-16">
          <h1 className="text-yellow text-sm lg:text-lg uppercase font-bold tracking-wider">
            Features
          </h1>
          <h2 className="text-3xl md:text-2xl lg:text-3xl xl:text-5xl font-semibold text-white max-w-2xl tracking-wide mx-auto text-center">
            Explore the Powerful Features of Our Platform
          </h2>
        </div>
      </div>
    </main>
  );
};

export default Hero;
