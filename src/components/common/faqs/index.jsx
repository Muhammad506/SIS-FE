import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Faqs = () => {
  const faqItems = [
    {
      question: "How does the real-time solar plate monitoring system work?",
      answer:
        "Our real-time solar plate monitoring system provides instant data on each solar plate’s performance, including energy production, temperature, and overall health. This allows you to stay updated on your solar system’s status and quickly address any potential issues to ensure optimal performance.",
    },
    {
      question: "How does energy usage tracking help optimize my solar system?",
      answer:
        "The energy usage tracking feature helps you monitor your solar system's energy production and consumption. By analyzing detailed usage patterns over time, you can optimize your system’s efficiency, reduce wastage, and potentially lower your electricity bills.",
    },
    {
      question: "What does the active solar plates display feature show?",
      answer:
        "The active solar plates display feature highlights which panels are actively generating power. It gives you a clear visualization of your system’s performance, helping you identify which panels are functioning well and which ones may need attention to keep the system running at peak efficiency.",
    },
    {
      question:
        "Can I control my solar panels remotely with the On/Off Control System?",
      answer:
        "Yes! Our On/Off Control System allows you to remotely manage each panel, enabling you to turn them on or off as needed. Whether for maintenance or optimizing energy production during peak hours, this feature gives you complete control of your solar panels with an easy-to-use interface.",
    },
    {
      question: "Can I monitor and control my solar system from anywhere?",
      answer:
        "Absolutely! With the remote access feature, you can manage your solar energy system from anywhere in the world. Whether you are at home or traveling, you can monitor performance and control settings, ensuring you stay connected and in control of your solar system no matter where you are.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex items-center justify-center h-full  pt-6 lg:pt-10 px-4">
      <div className="max-w-7xl container mx-auto px-2 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* FAQ Text Section */}
          <div className="space-y-4 lg:w-1/2">
            <div className="flex flex-col justify-center items-start gap-4 w-full md:w-[80%] lg:w-[70%] xl:w-[100%]">
              <h1 className="text-green mx-auto md:mx-0 text-sm md:text-base uppercase font-bold font-funnel tracking-wider">
                Ask Something
              </h1>
              <h2 className="text-3xl xl:leading-14 text-center md:text-start md:text-4xl xl:text-5xl tracking-wide md:tracking-tight font-semibold w-full  mx-auto text-gray-900">
                Do You Have Any Question Please?
              </h2>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4 mt-10">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className={`border rounded-lg border-gray-200   ${
                    openIndex === index ? "bg-green" : "bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={`w-full text-left px-6 cursor-pointer py-4 font-semibold flex justify-between items-center focus:outline-none ${
                      openIndex === index ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {item.question}
                    <span
                      className={`transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      {openIndex === index ? (
                        <IoIosArrowUp className="w-6 h-6 text-white" />
                      ) : (
                        <IoIosArrowDown className="w-6 h-6 text-yellow" />
                      )}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? "max-h-screen" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 py-4 text-gray-700 text-justify bg-white">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right-Side Image  */}
          <div className="lg:block hidden py-10 lg:w-1/2">
            <div className=" h-full flex justify-end lg:pt-40 items-center relative ">
              <img
                src="Faq.svg"
                alt="Solar Worker"
                className="w-full rounded-lg h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
