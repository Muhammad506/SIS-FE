import React from "react";

const featuresData = [
  {
    image:
      "https://solar-intelli-solutions.odoo.com/web/image/964-e3613a36/1_ifMTFgeeChgdNBy5yQuNWw.webp",
    title: "Real-Time Solar Plate Monitoring",
    content:
      "Our real-time solar plate monitoring system provides you with instant data on the performance of each individual solar plate. Whether it's energy production, temperature, or overall health of the panels, you’ll always be up-to-date with the status of your system. This enables you to identify issues early and take immediate action, ensuring that your solar panels perform at their best.",
    buttonText: "Learn More",
  },
  {
    image:
      "https://solar-intelli-solutions.odoo.com/web/image/1004-88c7a3ad/line-graph-with-bat-it-generative-ai_797840-3149.webp",
    title: "Energy Usage Tracking",
    content:
      "With our energy usage tracking feature, you can monitor how much energy your system is producing and consuming. The detailed analytics allow you to track usage patterns over time and compare them with your energy goals. This helps in reducing wastage and optimizing the efficiency of your solar power system, which can also lead to reduced electricity bills.",
    buttonText: "Learn More",
  },

  {
    image:
      "https://solar-intelli-solutions.odoo.com/web/image/977-650f2409/Pvcell.webp",
    title: "Active Solar Plates Display",
    content:
      "Our active solar plates display feature lets you see which panels are actively producing power. This visualization helps you understand which parts of your system are performing well and which need attention. With this feature, you can easily identify issues with individual panels and ensure that your solar system is running at peak efficiency.",
    buttonText: "Learn More",
  },
  {
    image:
      "https://solar-intelli-solutions.odoo.com/web/image/1003-6573b44a/touch-innovation-finger-activates-glowing-button-virtual-screen_904318-6698.webp",
    title: "On/Off Control System",
    content:
      "Take full control over your solar panels with our On/Off Control System. Whether you need to shut down a panel for maintenance or optimize energy production during peak hours, this feature allows you to manage the operation of each panel remotely. With a simple interface, you can adjust settings easily, ensuring that your system is always running according to your needs.",
    buttonText: "Learn More",
  },

  {
    image:
      "https://solar-intelli-solutions.odoo.com/web/image/999-f0b89ab4/WhatsApp%20Image%202024-08-20%20at%2015.42.16_a9235a24.webp",
    title: "Remote Access",
    content:
      "Manage your solar energy system from anywhere in the world. Whether you're at home or traveling, you can monitor the performance of your system and control settings remotely. This gives you ultimate convenience, ensuring that you can always stay connected to your energy production, no matter where you are.",
    buttonText: "Learn More",
  },
];

const AllFeatures = () => {
  return (
    <section className="relative pt-6 sm:pt-10 pb-4 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Features List */}
        <div className="space-y-6 sm:space-y-10 ">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center border border-gray-200 rounded-xl shadow-md justify-between gap-8 sm:gap-12 lg:gap-16 ${
                index % 2 === 0 ? "lg:flex-row-reverse" : ""
              } bg-white rounded-2xl  p-6 sm:p-8 lg:p-10`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Section */}
              <div className="flex-1 w-full lg:w-auto">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-64 sm:h-72 lg:h-96 object-cover "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1  ">
                <h1 className="text-green text-sm md:text-base uppercase font-bold  tracking-wider mb-2">
                  Feature
                </h1>
                <h3 className="text-2xl text-left sm:text-5xl font-semibold text-gray-800 leading-tight mb-6">
                  {feature.title}
                </h3>
                <p className="text-base text-justify sm:text-lg text-gray-600 leading-relaxed mb-6">
                  {feature.content}
                </p>
                <button className="px-6 py-2.5 bg-green text-white rounded-full font-medium hover:brightness-110 transition-all cursor-pointer">
                  {feature.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllFeatures;
