'use client';
import { useState } from 'react';

export default function CTAForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://gradnext.onrender.com/api/cohort/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (submitted) {
    return (
      <section id="cta" className="py-20 bg-blue-50 text-center">
        <h2 className="text-2xl font-bold">Thank you for joining!</h2>
        <p>Check your email for next steps.</p>
      </section>
    );
  }

  return (
    <section id="cta" className="py-20 bg-blue-50 text-center">
      <h2 className="text-2xl font-bold mb-4">Join Our Cohort</h2>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-center gap-4 max-w-lg mx-auto">
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className="p-3 border rounded-lg flex-1"
        />
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="p-3 border rounded-lg flex-1"
        />
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Phone (optional)"
          className="p-3 border rounded-lg flex-1"
        />
        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg">Submit</button>
      </form>
    </section>
  );
}