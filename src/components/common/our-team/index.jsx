const OurTeam = () => {
  const teamData = [
    {
      name: "Umer Saleem",
      role: "Full Stack Developer ",
      description:
        "Umer is a Full Stack Developer who oversees the development and implementation of both front-end and back-end solutions, ensuring high performance and a seamless user experience across the platform.",
      image: "umer.jpg",
    },
    {
      name: "Syed Ubaid",
      role: "Front End Developer",
      description:
        "Ubaid specializes in crafting the front-end of our platform, ensuring an intuitive and visually appealing user interface that aligns with the company's vision and enhances the user experience.",
      image: "ubaid.jpg",
    },
    {
      name: "Anas Rafiq",
      role: "IOT Expert",
      description:
        "Anas, our IOT Expert, focuses on integrating smart technologies with solar systems, optimizing energy management and creating impactful IoT solutions that drive innovation in renewable energy.",
      image: "anas.jpg",
    },
  ];

  return (
    <main className="py-8 bg-[url('https://modinatheme.com/html/solarglow-html/assets/img/testimonial/map-shape.png')] bg-cover bg-center">
      <div className="text-center px-2 md:px-6 lg:px-20 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="gap-4 flex flex-col justify-center items-center text-center">
          <h1 className="text-green text-sm uppercase font-bold font-funnel tracking-wider">
            Meet Our Expert Team
          </h1>
          <h2 className="text-3xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl font-semibold tracking-tight md:tracking-wide w-full md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[60%] self-center flex font-krona text-gray-800 drop-shadow-md">
            Professionals Shaping the Future of Solar Energy
          </h2>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto gap-6 sm:gap-0 mt-10 sm:px-4 px-8">
          {teamData.map((member, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg max-w-xs w-full border border-gray-300 hover:shadow-md flex flex-col items-center transition-transform transform duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="rounded-full w-28 h-28 object-cover mb-4 border-4 border-[#0f1c47]"
              />
              <h2 className="text-xl text-[#0f1c47] mb-2 text-nowrap font-krona">
                {member.name}
              </h2>
              <p className="text-green font-funnel font-semibold mb-2">
                {member.role}
              </p>
              <p className="text-gray-600 text-sm md:text-base text-justify">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default OurTeam;
