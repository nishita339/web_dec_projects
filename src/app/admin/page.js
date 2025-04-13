// app/admin/page.js
'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

export default function AdminPage() {
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [occasion, setOccasion] = useState('');
  const [sendDate, setSendDate] = useState('');
  const [sendTime, setSendTime] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [scheduledGreetings, setScheduledGreetings] = useState([]);

  const occasions = ['Birthday', 'Anniversary', 'Holiday', 'Thank You', 'Other'];

  const handleScheduleGreeting = (e) => {
    e.preventDefault();
    const newGreeting = {
      id: Date.now(),
      recipientName,
      recipientEmail,
      occasion,
      sendDate,
      sendTime,
      customMessage,
    };
    setScheduledGreetings([...scheduledGreetings, newGreeting]);
    // Clear the form
    setRecipientName('');
    setRecipientEmail('');
    setOccasion('');
    setSendDate('');
    setSendTime('');
    setCustomMessage('');
  };

  const handleEditGreeting = (id) => {
    // Implement edit functionality (e.g., open a modal with the greeting details)
    console.log(`Edit greeting with ID: ${id}`);
  };

  const handleDeleteGreeting = (id) => {
    setScheduledGreetings(scheduledGreetings.filter((greeting) => greeting.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-64 py-6 px-3 hidden md:block">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-center">Greetify</h1>
        </div>
        <nav>
          <Link href="/" legacyBehavior>
            <a className="block py-2 px-4 hover:bg-gray-700 rounded">Dashboard</a>
          </Link>
          <Link href="/create_greetings" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Create Greeting
          </Link>
          <Link href="/schedule" legacyBehavior>
            <a className="block py-2 px-4 hover:bg-gray-700 rounded">Scheduled Greetings</a>
          </Link>
          <Link href="/settings" legacyBehavior>
            <a className="block py-2 px-4 hover:bg-gray-700 rounded">Settings</a>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">greetify – Email Greeting Scheduler</h2>
        </header>

        {/* Greeting Form */}
        <section className="bg-white shadow-md rounded-md p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Schedule a New Greeting</h3>
          <form onSubmit={handleScheduleGreeting} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="recipientName" className="block text-gray-700 text-sm font-bold mb-2">Recipient Name:</label>
              <input
                type="text"
                id="recipientName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="recipientEmail" className="block text-gray-700 text-sm font-bold mb-2">Recipient Email:</label>
              <input
                type="email"
                id="recipientEmail"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="occasion" className="block text-gray-700 text-sm font-bold mb-2">Occasion:</label>
              <select
                id="occasion"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                required
              >
                <option value="">Select an occasion</option>
                {occasions.map((occ) => (
                  <option key={occ} value={occ}>{occ}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sendDate" className="block text-gray-700 text-sm font-bold mb-2">Send Date:</label>
              <input
                type="date"
                id="sendDate"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={sendDate}
                onChange={(e) => setSendDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="sendTime" className="block text-gray-700 text-sm font-bold mb-2">Send Time:</label>
              <input
                type="time"
                id="sendTime"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={sendTime}
                onChange={(e) => setSendTime(e.target.value)}
                required
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="customMessage" className="block text-gray-700 text-sm font-bold mb-2">Custom Message:</label>
              <textarea
                id="customMessage"
                rows="4"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="col-span-full">
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Schedule Greeting
              </button>
            </div>
          </form>
        </section>

        {/* Scheduled Greetings List */}
        <section className="bg-white shadow-md rounded-md p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Scheduled Greetings</h3>
          {scheduledGreetings.length === 0 ? (
            <p className="text-gray-500">No greetings scheduled yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Recipient Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Occasion
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Send Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Send Time
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scheduledGreetings.map((greeting) => (
                    <tr key={greeting.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {greeting.recipientName}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {greeting.recipientEmail}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {greeting.occasion}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {greeting.sendDate}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {greeting.sendTime}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          onClick={() => handleEditGreeting(greeting.id)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2 focus:outline-none focus:shadow-outline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteGreeting(greeting.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}