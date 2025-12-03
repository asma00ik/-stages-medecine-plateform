export default function Dashboard() {
  return (
    <div className="space-y-14">

      {/* HEADER */}
      <div className="p-10 rounded-2xl text-white shadow-2xl 
        bg-gradient-to-r from-[#6c2bf9] to-[#8f4bff] backdrop-blur-xl">
        <h1 className="text-4xl font-bold">Bienvenue Kenza !</h1>
        <p className="opacity-90 mt-2">Heureux de vous revoir sur StageLink</p>
      </div>

      {/* STAT SECTION */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Statistiques</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          <StatCard title="Candidatures envoyées" value="3" />
          <StatCard title="Documents téléversés" value="4" />
          <StatCard title="Annonces disponibles" value="12" />
        </div>
      </section>

      {/* OPPORTUNITÉS */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Opportunités récentes</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <OfferCard 
            name="Hôpital Thenia" 
            field="Radiologie" 
            city="Thenia" 
          />
          <OfferCard 
            name="CHU Béjaia" 
            field="Cardiologie" 
            city="Bejaia" 
          />
          <OfferCard 
            name="Clinique Salam" 
            field="Dermatologie" 
            city="Boumerdes" 
          />
        </div>
      </section>

    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="p-6 rounded-xl bg-[#6c2bf9]/10 text-gray-800
      shadow-xl backdrop-blur-sm border border-purple-300/20
      hover:scale-[1.03] transition cursor-pointer">
      
      <h3 className="text-lg text-purple-700 font-semibold">{title}</h3>
      <p className="text-4xl font-bold mt-3">{value}</p>
    </div>
  );
}

function OfferCard({ name, field, city }) {
  return (
    <div className="
      flex flex-col p-6 rounded-xl 
      bg-purple-600/10 border border-purple-300/30
      shadow-lg backdrop-blur-md
      hover:bg-purple-600/20 hover:shadow-xl hover:-translate-y-1
      text-gray-800 transition
    ">
      <h3 className="text-xl font-semibold text-purple-700">{name}</h3>

      <p className="mt-3 text-gray-600">
        <strong>Service :</strong> {field}
      </p>

      <p className="text-gray-500 mt-1">
        <strong>Ville :</strong> {city}
      </p>

      <button
        className="mt-auto bg-purple-600 text-white px-4 py-2 rounded-lg text-sm
          hover:bg-purple-700 transition"
      >
        Voir l’offre
      </button>
    </div>
  );
}
