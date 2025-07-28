const features = [
  { title: 'Fast', desc: 'Lightning fast performance.' },
  { title: 'Secure', desc: 'Top-notch security.' },
  { title: 'Reliable', desc: '99.9% uptime guaranteed.' },
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-8">Features</h2>
      <div className="flex flex-col md:flex-row justify-center gap-8 px-4">
        {features.map((f) => (
          <div key={f.title} className="p-6 bg-white rounded-2xl shadow-md flex-1">
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}