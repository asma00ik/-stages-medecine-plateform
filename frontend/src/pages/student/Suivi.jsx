import {
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  ChevronRight
} from "lucide-react";

export default function Suivi() {

  const stages = [
    {
      id: 1,
      hopital: "CHU Thenia",
      service: "Cardiologie",
      periode: "Avril - Juin 2025",
      etat: "Validé",
      note: 16.5,
      attestation: true,
    },
    {
      id: 2,
      hopital: "EHS Bab El Oued",
      service: "Urgence",
      periode: "Janvier - Mars 2025",
      etat: "En cours",
      note: null,
      attestation: false,
    },
    {
      id: 3,
      hopital: "Clinique Salam",
      service: "Dermatologie",
      periode: "Novembre - Décembre 2024",
      etat: "Refusé",
      note: null,
      attestation: false,
    },
  ];

  return (
    <div className="space-y-10">

      {/* HEADER  */}
      <div className="p-8 rounded-2xl text-white shadow-xl 
        bg-gradient-to-r from-[#6c2bf9] to-[#8f4bff]">
        <h1 className="text-3xl font-bold">Suivi des stages</h1>
        <p className="opacity-90 mt-1 text-sm">
          Consultez vos progrès, notes et validations.
        </p>
      </div>

      {/* TABLE */}
      <StageTable stages={stages} />
    </div>
  );
}

/* =============== TABLE DE SUIVI ================= */
function StageTable({ stages }) {
  return (
    <div className="bg-white/80 rounded-2xl shadow-lg border overflow-hidden backdrop-blur-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-xs text-gray-500 uppercase tracking-wider bg-gray-50">
            <th className="p-4 text-left">Hôpital</th>
            <th className="p-4 text-left">Service</th>
            <th className="p-4 text-left">Période</th>
            <th className="p-4 text-left">État</th>
            <th className="p-4 text-left">Note</th>
            <th className="p-4 text-left">Attestation</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {stages.map((s) => (
            <tr
              key={s.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-4 font-medium text-gray-800">{s.hopital}</td>
              <td className="p-4">{s.service}</td>
              <td className="p-4 text-gray-600">{s.periode}</td>

              {/* BADGE STATUS */}
              <td className="p-4">
                <EtatBadge etat={s.etat} />
              </td>

              {/* NOTE */}
              <td className="p-4">
                {s.note ? (
                  <span className="font-semibold text-gray-800">{s.note}</span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>

              {/* ATTESTATION */}
              <td className="p-4">
                {s.attestation ? (
                  <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm">
                    <FileText size={15} /> Télécharger
                  </button>
                ) : (
                  <span className="text-gray-400 text-sm">—</span>
                )}
              </td>

              {/* DETAILS BTN */}
              <td className="p-4 text-right">
                <button className="p-2 rounded-md text-gray-400 hover:text-indigo-600 transition">
                  <ChevronRight size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================= BADGE STATUS ================= */
function EtatBadge({ etat }) {
  const styles = {
    "Validé": "bg-green-100 text-green-700",
    "En cours": "bg-yellow-100 text-yellow-700",
    "Refusé": "bg-red-100 text-red-700",
  };

  const icons = {
    "Validé": CheckCircle,
    "En cours": Clock,
    "Refusé": XCircle,
  };

  const Icon = icons[etat];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md 
        text-xs font-medium ${styles[etat]}`}
    >
      <Icon size={14} /> {etat}
    </span>
  );
}
