const testimonials = [
  { name: 'Alice', quote: 'Amazing service!' },
  { name: 'Bob', quote: 'Helped me a lot.' },
];

export default function Testimonials() {
  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-bold mb-8">What People Say</h2>
      <div className="flex flex-col md:flex-row justify-center gap-8 px-4">
        {testimonials.map((t) => (
          <div key={t.name} className="p-6 border rounded-xl flex-1">
            <p className="italic mb-4">“{t.quote}”</p>
            <h4 className="font-semibold">— {t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}