export default function Annonces() {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="p-8 rounded-2xl text-white shadow-xl 
        bg-gradient-to-r from-[#6c2bf9] to-[#8f4bff]">
        <h1 className="text-3xl font-bold">Annonces</h1>
        <p className="opacity-90 mt-2 text-sm">
          Consultez les offres de stage disponibles.
        </p>
      </div>

      {/* GRID OFFRES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        <OfferCard 
          hopital="CHU Thenia"
          service="Cardiologie"
          city="Thenia"
          date="12/03/2025"
        />
        <OfferCard 
          hopital="EHS Bab El Oued"
          service="Urgences"
          city="Alger"
          date="15/03/2025"
        />
        <OfferCard 
          hopital="Clinique Salam"
          service="Dermatologie"
          city="Boumerdes"
          date="20/03/2025"
        />
      </div>
    </div>
  );
}

/* COMPONENT OFFRE*/
function OfferCard({ hopital, service, city, date }) {
  return (
    <div
      className="
        flex flex-col gap-2 p-6 rounded-xl
        bg-white/60 border border-gray-200
        shadow-lg backdrop-blur-sm
        hover:-translate-y-1 hover:shadow-2xl
        transition cursor-pointer
      "
    >
      <h3 className="text-lg font-semibold text-purple-700">{hopital}</h3>

      <p className="text-gray-700 text-sm">{service}</p>

      <div className="flex justify-between text-gray-500 text-xs mt-1">
        <span>{city}</span>
        <span>{date}</span>
      </div>

      <button
        className="mt-auto bg-purple-600 text-white px-4 py-2 rounded-lg text-sm
          hover:bg-purple-700 transition shadow-md"
      >
        Voir l’offre →
      </button>
    </div>
  );
}
