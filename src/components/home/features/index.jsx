import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./Features.css";

const features = [
  {
    title: "Real-Time Solar Monitoring",
    description:
      "Stay informed with real-time data on the performance of each solar plate. Monitor energy production, status, and overall system health instantly, ensuring you always know how your system is performing.",
    image:
      "https://solar-intelli-solutions.odoo.com/web/image/964-e3613a36/1_ifMTFgeeChgdNBy5yQuNWw.webp",
  },
  {
    title: "Energy Usage Tracing",
    description:
      "Track your energy consumption with precision. Our platform provides detailed insights into energy usage patterns, helping you optimize energy production and reduce wastage.",
    image:
      "https://solar-intelli-solutions.odoo.com/web/image/1004-88c7a3ad/line-graph-with-bat-it-generative-ai_797840-3149.webp",
  },
  {
    title: "Active Solar Plates Display",
    description:
      "Visualize the status of your solar plates at a glance. Our platform displays which plates are active and which are inactive, allowing you to manage your energy production more effectively.",
    image:
      "https://solar-intelli-solutions.odoo.com/web/image/977-650f2409/Pvcell.webp",
  },
  {
    title: "On/Off Control",
    description:
      "Take full control of your solar panels with easy-to-use on/off switches. Whether you need to shut down a panel for maintenance or optimize usage during specific times, you can do it all remotely.",
    image:
      "https://solar-intelli-solutions.odoo.com/web/image/1003-6573b44a/touch-innovation-finger-activates-glowing-button-virtual-screen_904318-6698.webp",
  },
  {
    title: "Remote Access",
    description:
      "Manage your solar energy system from anywhere at any time. Whether you’re at home or on the go, you can monitor and control your panels remotely for ultimate convenience.",
    image:
      "https://solar-intelli-solutions.odoo.com/web/image/999-f0b89ab4/WhatsApp%20Image%202024-08-20%20at%2015.42.16_a9235a24.webp",
  },
];

const Features = () => {
  const swiperRef = useRef(null);

  return (
    <main className="pt-6 lg:pt-10 bg-[url('https://modinatheme.com/html/solarglow-html/assets/img/testimonial/map-shape.png')] bg-cover bg-center bg-[#F7F7F7]">
      <div className="max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center space-y-6 mb-10">
          <h1 className="text-green text-sm md:text-base uppercase font-bold tracking-wider">
            Our Features
          </h1>
          <h2 className="text-3xl xl:leading-14 text-center md:text-4xl xl:text-5xl tracking-wide md:tracking-tight font-semibold w-full md:w-[70%] lg:w-[90%] xl:w-[55%] mx-auto text-gray-900">
            Explore the Cutting-Edge Features of Our Solution
          </h2>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          loop={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {features.map((feature, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div
                className="w-full h-[440px] bg-white rounded-lg border border-gray-200  cursor-pointer  ease-in-out transform transition"
                onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
                onMouseLeave={() => swiperRef.current?.autoplay?.start()}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="h-[210px] w-full rounded-t-lg object-cover"
                />
                <div className="p-4 flex flex-col justify-between h-[230px]">
                  <h1 className="text-base md:text-lg font-semibold text-gray-800">
                    {feature.title}
                  </h1>
                  <hr className="my-2 border-gray-300" />
                  <p className="text-sm text-gray-600 text-justify line-clamp-5">
                    {feature.description}
                  </p>
                  <div className="flex justify-center">
                    <button className="mt-4 px-6 py-2 bg-green text-white cursor-pointer font-semibold duration-700 rounded-full hover:brightness-110 transition transform">
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
};

export default Features;
