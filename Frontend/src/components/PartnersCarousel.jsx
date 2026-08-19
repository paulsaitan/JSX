import jollibeat from "../assets/Partners/jollibeat.png";
import kisko from "../assets/Partners/kisko.png";
import malasme from "../assets/Partners/malasme.png";
import mangsinakal from "../assets/Partners/mangsinakal.png";
import nyek from "../assets/Partners/nyek.png";
import puregreen from "../assets/Partners/puregreen.png";

const partners = [
  {
    id: 1,
    name: "jollibeat",
    image: jollibeat,
  },
  {
    id: 2,
    name: "kisko",
    image: kisko,
  },
  {
    id: 3,
    name: "malasme",
    image: malasme,
  },
  {
    id: 4,
    name: "mangsinakal",
    image: mangsinakal,
  },
  {
    id: 5,
    name: "nyek",
    image: nyek,
  },
  {
    id: 6,
    name: "puregreen",
    image: puregreen,
  },
];

const PartnersCarousel = () => {
  // Duplicate the partners to create a continuous loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section id="partners" className="overflow-hidden bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Trusted By
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Partners
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            We work with trusted technology partners to provide reliable
            networking solutions for businesses and IT professionals.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Left Fade */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent" />

          {/* Right Fade */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent" />

          {/* Moving Track */}
          <div className="flex w-max animate-partner-scroll">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="mx-4 flex h-36 w-52 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:shadow-lg sm:mx-6 sm:w-60"
              >
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="max-h-24 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
