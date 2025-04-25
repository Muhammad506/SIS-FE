import Marquee from "react-fast-marquee";

const TechnologicalStack = () => {
  return (
    <main className="relative font-poppins bg-gradient-to-br from-[#ffb800] via-[#ff9800] to-[#ffb800] py-16 md:py-24 flex justify-center items-center">
      {/* Decorative Shapes */}
      <div className="h-6 w-16 md:h-14 md:w-40 bg-[#1C204B] rounded-tr-full rounded-br-full absolute left-0 bottom-2 z-10 shadow-xl"></div>
      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#97DB4E] absolute bottom-6 left-8 md:bottom-12 md:left-24 shadow-xl z-10"></div>
      <div className="h-6 w-16 md:h-14 md:w-40 bg-[#1C204B] rounded-tl-full rounded-bl-full absolute right-0 top-3 z-10 shadow-xl"></div>
      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#97DB4E] absolute top-6 right-8 md:top-14 md:right-24 shadow-xl z-10"></div>

      {/* Main Content */}
      <div className="max-w-screen-7xl w-full  flex flex-col items-center gap-8 text-center z-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-black text-sm md:text-base uppercase font-bold tracking-wider">
            Technological Stack
          </h1>
          <h2 className="text-3xl  xl:leading-14 text-center   md:text-4xl xl:text-5xl tracking-wide md:tracking-tight font-semibold  w-full md:w-[70%] lg:w-[90%] xl:w-[60%] mx-auto mb-4  text-white ">
            Our solution uses advanced technologies for a scalable platform
          </h2>
        </div>

        {/* Stack Icons */}
        <div className="relative w-full flex flex-col items-center">
          {/* Top Marquee */}
          <Marquee
            direction="right"
            speed={30}
            autoFill={true}
            className="mb-3 overflow-hidden"
          >
            <IconStrip />
          </Marquee>

          {/* Center Overlay Logo */}
          <div className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none">
            <div className="border border-solid rounded-full bg-[#021430] border-white shadow-lg">
              <img
                src="home/NavBar.png"
                className="w-28 md:w-32 h-28 md:h-32 p-3"
                alt="Overlay"
              />
            </div>
          </div>

          {/* Bottom Marquee */}
          <Marquee
            direction="left"
            speed={30}
            autoFill={true}
            className="mt-3 overflow-hidden"
          >
            <IconStrip />
          </Marquee>
        </div>
      </div>
    </main>
  );
};

const IconStrip = () => (
  <div className="flex gap-4 px-4">
    {[
      {
        src: "https://solar-intelli-solutions.odoo.com/web/image/784-4b6ab123/WhatsApp_Image_2024-08-16_at_7.42.25_PM-removebg-preview.webp",
        alt: "Git",
      },
      {
        src: "home/Tailwind.png",
        alt: "Tailwind",
      },
      {
        src: "https://is1-ssl.mzstatic.com/image/thumb/Purple125/v4/36/c6/3c/36c63ce1-05b8-f610-45b8-54fd1b68cdb7/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
        alt: "odoo",
      },
      {
        src: "https://cdn-icons-png.flaticon.com/256/121/121135.png",
        alt: "AI",
      },
      {
        src: "https://solar-intelli-solutions.odoo.com/web/image/781-f91a4d26/WhatsApp_Image_2024-08-16_at_7.41.41_PM-removebg-preview%20%281%29.webp",
        alt: "Mongo",
      },
      {
        src: "https://solar-intelli-solutions.odoo.com/web/image/789-6cc7c2c7/WhatsApp_Image_2024-08-16_at_7.svg",
        alt: "Express",
      },
      {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHVIL5HpOsOFQWomhpmB5b8lTVQ9rIVnV9fg&s",
        alt: "figma",
      },
      {
        src: "https://solar-intelli-solutions.odoo.com/web/image/800-ccb8542b/image-removebg-preview%20%281%29.webp",
        alt: "Node",
      },
      {
        src: "https://solar-intelli-solutions.odoo.com/web/image/787-cad08a8e/physics_753244.webp",
        alt: "React",
      },
      {
        src: "https://avatars.githubusercontent.com/u/529052?s=200&v=4",
        alt: "thingspeak",
      },
    ].map((tech, i) => (
      <img
        key={i}
        src={tech.src}
        alt={tech.alt}
        className="w-20 h-20 p-2 mx-2 border-2 border-white rounded-2xl"
      />
    ))}
  </div>
);

export default TechnologicalStack;
