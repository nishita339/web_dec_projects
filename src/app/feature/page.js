// app/features/page.js
import Link from "next/link";
import { FaClock, FaEnvelopeOpenText, FaCalendarAlt, FaMagic, FaShieldAlt, FaUsers, FaGift, FaHeart } from 'react-icons/fa';

const featuresList = [
  {
    icon: <FaClock />,
    title: 'Schedule with Ease',
    description: 'Plan your greetings ahead of time and let us handle the sending. Set it and forget it!',
    highlight: 'Save time and never miss an important date.',
  },
  {
    icon: <FaEnvelopeOpenText />,
    title: 'Personalized Touch',
    description: 'Craft unique, heartfelt messages that resonate with your recipients. Show them you truly care.',
    highlight: 'Make every greeting feel special and personal.',
  },
  {
    icon: <FaCalendarAlt />,
    title: 'All Occasions Covered',
    description: 'From birthdays and anniversaries to holidays and thank you notes, we support every reason to connect.',
    highlight: 'Stay connected for every significant moment.',
  },
  {
    icon: <FaMagic />,
    title: 'Simple & Intuitive',
    description: 'Our user-friendly interface makes automation a breeze. No tech expertise required!',
    highlight: 'Easy to use for everyone, on any device.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Secure & Reliable',
    description: 'Your data and scheduled greetings are safe with us. We ensure timely and secure delivery.',
    highlight: 'Trustworthy platform for your important messages.',
  },
  {
    icon: <FaUsers />,
    title: 'Group Love (Coming Soon)',
    description: 'Send personalized greetings to multiple people at once. Perfect for teams and large groups (in development).',
    highlight: 'Reach more people with less effort.',
  },
  {
    icon: <FaGift />,
    title: 'Surprise & Delight',
    description: 'Schedule unexpected "just because" messages to brighten someone\'s day.',
    highlight: 'Spread joy and strengthen relationships.',
  },
  {
    icon: <FaHeart />,
    title: 'Strengthen Connections',
    description: 'Automate the thoughtful gestures that help you maintain and nurture your important relationships.',
    highlight: 'Build stronger bonds effortlessly.',
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <div className="relative overflow-hidden py-20 px-6 md:px-24 lg:px-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-100 opacity-5 -z-10 rounded-xl blur-xl"></div>
        <div className="container mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-indigo-700 tracking-tight mb-6">
              Supercharge Your Connections with Greetify
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Explore the powerful features designed to make your greetings more thoughtful and your life easier.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuresList.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition duration-300">
                <div className="text-indigo-600 text-4xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                {feature.highlight && (
                  <p className="text-sm italic text-indigo-500">{feature.highlight}</p>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/" className="inline-block px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}