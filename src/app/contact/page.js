import Link from "next/link";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <div className="relative overflow-hidden py-16 px-6 md:px-24 lg:px-32">
        <div className="absolute inset-0 bg-indigo-50 opacity-10 -z-10 rounded-xl blur-xl"></div>
        <div className="container mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight mb-4">
              Get In Touch
            </h1>
            <p className="text-lg text-gray-600">
              We're here to assist you. Reach out with any questions or feedback.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form - Clean and Modern */}
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 border border-gray-100">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-8">Send Us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-4"
                    placeholder="Your Full Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-4"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-4"
                    placeholder="How can we help?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-md bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-colors duration-300"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>

            {/* Contact Information - Modern Cards */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-md bg-indigo-100 text-indigo-700">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <h3 className="font-semibold text-lg text-indigo-700">Our Location (India)</h3>
                </div>
                <p className="text-gray-600">
                  Greetify India Office<br />
                  Near Landmark, City Center<br />
                  Kota, Rajasthan, 324005
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-md bg-blue-100 text-blue-700">
                    <FaPhone className="text-xl" />
                  </div>
                  <h3 className="font-semibold text-lg text-blue-700">Call Us (India)</h3>
                </div>
                <p className="text-gray-600">
                  Main: +91 1234 567890<br />
                  Support: +91 9876 543210
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-md bg-green-100 text-green-700">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <h3 className="font-semibold text-lg text-green-700">Email Us</h3>
                </div>
                <p className="text-gray-600">
                  General Inquiries: info@greetify.com<br />
                  Support: support@greetify.com
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/" className="text-indigo-500 hover:underline">
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}