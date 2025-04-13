// app/pricing/page.js
import Link from "next/link";
import { FaCheck, FaTimes } from 'react-icons/fa';

const plans = [
  {
    name: 'Basic',
    price: 0,
    description: 'Perfect for getting started.',
    features: ['Schedule up to 5 greetings per month', 'Standard email templates', 'Basic support'],
    cta: 'Get Started (Free)',
    href: '/', // Replace with your registration link
    isPopular: false,
  },
  {
    name: 'Pro',
    price: 9,
    description: 'Unlock more scheduling power.',
    features: ['Unlimited greetings per month', 'Advanced email templates', 'Priority support', 'Custom branding'],
    cta: 'Upgrade to Pro',
    href: '/subscribe/pro', // Replace with your Pro subscription link
    isPopular: true,
  },
  {
    name: 'Business',
    price: 29,
    description: 'For teams and businesses.',
    features: ['All Pro features', 'Team collaboration (up to 5 users)', 'Dedicated account manager', 'API access'],
    cta: 'Contact Us',
    href: '/contact',
    isPopular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500">
      <div className="container mx-auto p-8 sm:p-12">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-tight">
            Choose the Perfect Greetify Plan for You
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Simple and flexible pricing to automate your thoughtful greetings.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-lg shadow-md p-6 ${plan.isPopular ? 'bg-indigo-100 dark:bg-gray-800 border-indigo-500 dark:border-indigo-400 border-2' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'} hover:shadow-lg transition duration-300 flex flex-col`}>
              {plan.isPopular && (
                <span className="absolute top-4 right-4 bg-indigo-500 text-white text-xs font-semibold py-1 px-2 rounded-full">Popular</span>
              )}
              <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-2">{plan.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{plan.description}</p>
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">${plan.price}</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">/month</span>
              </div>
              <ul className="mb-6 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-700 dark:text-gray-300 py-1">
                    <FaCheck className="mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href={plan.href} className={`block text-center rounded-full py-3 font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 ${plan.price === 0 ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700'}`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Have questions? <Link href="/contact" className="text-indigo-500 hover:underline">Contact us</Link>.
          </p>
          <Link href="/" className="inline-block mt-4 text-indigo-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}