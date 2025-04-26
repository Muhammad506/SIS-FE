import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.info("Sending...", { autoClose: false });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/send-contact",
        formData
      );
      console.log("Form submitted:", response.data);
      toast.dismiss();
      toast.success("Message sent successfully!", { autoClose: 3000 });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.dismiss();
      toast.error(
        error.response?.data?.error ||
          "Failed to send message. Please try again.",
        { autoClose: 3000 }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <div className="relative bg-[url('/contact/contact-bg.svg')] bg-cover bg-center h-72 md:h-96 mt-14 ">
        <div className="absolute inset-0 bg-gradient opacity-85"></div>
        <div className="relative flex flex-col items-center justify-center h-full text-center px-4 md:px-8 py-16 space-y-4">
          <h1 className="text-yellow text-sm lg:text-lg uppercase font-bold tracking-wider">
            Contact
          </h1>
          <h2 className="text-3xl md:text-2xl lg:text-3xl xl:text-5xl font-semibold text-white max-w-2xl tracking-wide">
            Let’s Connect and Build Something Amazing
          </h2>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="flex justify-center items-center py-16 bg-[url('https://modinatheme.com/html/solarglow-html/assets/img/testimonial/map-shape.png')] bg-cover bg-center bg-[#F7F7F7]">
        <div className="w-full max-w-2xl mx-4 bg-white shadow-2xl border border-gray-200 rounded-xl p-8">
          <h2 className="text-3xl md:text-2xl lg:text-3xl xl:text-5xl font-semibold text-green mx-auto  mb-4 text-center tracking-wide">
            Get In Touch
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Fill out the form below and we’ll get back to you as soon as
            possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {["name", "email"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-semibold text-gray-600 mb-1 capitalize"
                >
                  {field}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg  focus:outline-none focus:border-green-700"
                  placeholder={`Enter your ${field}`}
                  required
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg  focus:outline-none focus:border-green-700"
                placeholder="Write your message here"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white py-3 rounded-lg font-medium  transition ${
                isSubmitting
                  ? "bg-yellow cursor-not-allowed"
                  : "bg-green hover:brightness-110 cursor-pointer "
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
};

export default Contact;
