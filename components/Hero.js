export default function Hero({ title, children }) {
  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <section className="relative -top-24 mx-4 max-w-2xl bg-white lg:-top-36 lg:ml-8 lg:-mb-24">
          <div className="p-8 lg:p-12">
            <h1 className="text-2xl lg:text-5xl">{title}</h1>
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}
