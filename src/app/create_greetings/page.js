'use client';
import { useState } from 'react';

export default function GreetingsPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('✅ Request submitted successfully!');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('❌ Something went wrong. Try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Error submitting the form.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl p-8 rounded-xl max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">Send a Greeting</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            required
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            required
            placeholder="Write your message here..."
            rows="4"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Submit Request
          </button>
        </form>

        {status && <p className="mt-4 text-center text-sm text-gray-700">{status}</p>}
      </div>
    </div>
  );
}
