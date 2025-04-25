import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const carouselData = [
  {
    id: 1,
    title: "Harness the Full Power of Solar Energy",
    description:
      "Upgrade to a smarter, more efficient energy solution. Monitor and control your solar energy usage. Optimize your energy system with cutting-edge technology. Maximize your energy savings and reduce waste. Enjoy a seamless experience with our advanced tools. Take control of your energy future today. Start using smart energy management now.",
    imgSrc: "/home/hero1.svg",
    bgImage: "/home/hero-bg.svg",
  },
  {
    id: 2,
    title: "Smart Solar Control at Your Fingertips",
    description:
      "Join the renewable energy revolution with Solar Intell Solutions. Save money by lowering your energy bills. Reduce your carbon footprint with clean solar energy. Enjoy a reliable and sustainable source of power. Take advantage of solar technology for long-term savings. Contribute to a greener, more sustainable world. Make the switch to solar today.",
    imgSrc: "/home/hero2.svg",
    bgImage: "/home/hero-bg.svg",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const currentBackground = carouselData[index].bgImage;

  return (
    <main
      className="relative flex items-center justify-center -mt-10 pb-8 md:pb-0 pt-20 md:pt-0 md:mt-14 lg:mt-0 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${currentBackground})` }}
    >
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <div className="relative w-full  max-w-screen-2xl  2xl:h-[calc(100vh-2rem)] z-10">
        <Carousel
          selectedItem={index}
          onChange={handleSelect}
          infiniteLoop
          autoPlay
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          showArrows={false}
          interval={3000}
        >
          {carouselData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row mt-10 md:mt-40 justify-center lg:justify-between text-center md:text-left items-center p-4 md:p-8 lg:p-10 2xl:px-40 gap-6 2xl:gap-32"
            >
              {/* Text Section */}
              <div className="flex flex-col gap-4 w-full md:w-[70%] lg:w-[50%] xl:w-[30%] 2xl:w-[55%] justify-center items-center md:items-start">
                <h1 className=" text-3xl text-start xl:leading-14  md:text-4xl xl:text-5xl tracking-wide md:tracking-tight font-bold text-white">
                  {item.title}
                </h1>
                <p className="text-base sm:text-lg text-white text-justify mt-0 2xl:mt-4">
                  {item.description}
                </p>
              </div>

              <div className="flex justify-center items-center w-[80%] md:w-auto lg:w-[40%] 2xl:w-[50%]">
                <img
                  src={item.imgSrc}
                  alt="Carousel Item"
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </main>
  );
};

export default Hero;
