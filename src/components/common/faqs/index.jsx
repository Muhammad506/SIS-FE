import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Faqs = () => {
  const faqItems = [
    {
      question: "How does Solar Plate Monitoring work on the platform?",
      answer:
        "Our Solar Plate Monitoring feature provides real-time insights into the performance of your solar panels. You can track parameters such as energy production, efficiency levels, and any potential issues directly from your dashboard. This ensures that your solar system is always running at optimal efficiency.",
    },
    {
      question:
        "Can I track energy usage and identify wastage through the system?",
      answer:
        "Yes, our Energy Usage Tracing feature helps you monitor daily, weekly, and monthly energy consumption. The Current Wastage Alert feature notifies you of any energy inefficiencies or wastage, enabling you to take corrective actions promptly to maximize energy savings.",
    },
    {
      question:
        "What is the Active Solar Plates Display, and how does it help?",
      answer:
        "The Active Solar Plates Display provides a visual overview of all active solar panels in your system. It highlights operational status, live energy output, and any inactive plates that may require attention, simplifying maintenance and performance tracking.",
    },
    {
      question: "How does the On/Off Control and Maintenance Scheduling work?",
      answer:
        "The On/Off Control feature allows you to remotely switch solar panels or systems on and off for better energy management. Additionally, our Maintenance Schedule feature ensures timely reminders and notifications for routine checkups and maintenance, prolonging the life of your solar system.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex items-center justify-center h-full bg-[#F7F7F7] pt-6 lg:pt-10 px-4">
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
            <div className=" h-full flex justify-end lg:pt-16 items-center relative ">
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
