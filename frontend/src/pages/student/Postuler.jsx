import { useState } from "react";
import { UploadCloud, CheckCircle } from "lucide-react";

export default function Postuler() {

  const [files, setFiles] = useState({
    cv: null,
    lettre: null,
  });

  const handleFile = (e, type) => {
    setFiles({ ...files, [type]: e.target.files[0] });
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="p-8 rounded-2xl text-white shadow-xl 
        bg-gradient-to-r from-[#6c2bf9] to-[#8f4bff]">
        <h1 className="text-3xl font-bold">Postuler à un stage</h1>
        <p className="opacity-90 mt-1 text-sm">
          Complétez les informations et envoyez votre candidature.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* INFO STAGE LEFT */}
        <div className="lg:col-span-1 bg-white/60 shadow-lg border border-gray-200 
          rounded-2xl p-6 backdrop-blur-sm">

          <h2 className="text-xl font-semibold text-gray-800">Stage proposé</h2>

          <div className="mt-4 space-y-2 text-sm">
            <p><span className="font-semibold">Structure :</span> CHU Thenia</p>
            <p><span className="font-semibold"> Spécialité :</span> Cardiologie</p>
            <p><span className="font-semibold"> Durée :</span> 6 mois</p>
            <p><span className="font-semibold">Début :</span> 12/03/2025</p>
            <p><span className="font-semibold">Ville :</span> Thenia</p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 text-sm mb-2">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Stage hospitalier en cardiologie. Interaction directe avec les médecins spécialistes, 
              rotation en service, analyse de dossiers cliniques et participation aux réunions.
            </p>
          </div>
        </div>

        {/* FORM RIGHT */}
        <div className="lg:col-span-2 bg-white/60 shadow-lg border border-gray-200 
          rounded-2xl p-6 backdrop-blur-sm">

          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Dossier de candidature
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Field label="Nom" placeholder="Ex : Atmani" />
            <Field label="Prénom" placeholder="Ex : Kenza" />
            <Field label="Email universitaire" type="email" placeholder="exemple@univ.dz" />
            <Field label="Téléphone" placeholder="07 xx xx xx xx" />
            <Field label="Niveau" placeholder="5ème année" />
            <Field label="Filière" placeholder="Médecine" />

          </div>

          <h3 className="text-md font-semibold text-gray-700 mt-7 mb-3">
            Documents requis
          </h3>

          <div className="space-y-4">
            <UploadField
              label=" CV"
              value={files.cv}
              onChange={(e) => handleFile(e, "cv")}
            />
            <UploadField
              label=" Lettre de motivation"
              value={files.lettre}
              onChange={(e) => handleFile(e, "lettre")}
            />
          </div>

          <button
            className="mt-8 w-full text-white px-8 py-3 rounded-xl font-medium shadow-md 
            bg-gradient-to-r from-[#6c2bf9] to-[#8f4bff]
            hover:opacity-90 transition"
          >
            Envoyer ma candidature
          </button>
        </div>
      </div>
    </div>
  );
}


/*  COMPONENT FIELD */
function Field({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-600 text-sm font-medium">{label}</label>
      <input
        {...props}
        className="p-3 rounded-xl bg-white/70 border border-gray-300
        focus:border-purple-500 outline-none transition"
      />
    </div>
  );
}


/*  COMPONENT UPLOAD */
function UploadField({ label, onChange, value }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-medium text-gray-700">{label}</span>

      <label
        className="flex items-center justify-center gap-3 
        bg-gray-50 border border-gray-300 hover:bg-gray-100
        transition cursor-pointer rounded-xl py-3 px-4"
      >
        <UploadCloud size={20} className="text-purple-600" />
        <span className="text-sm text-gray-600">
          Importer le fichier
        </span>
        <input type="file" className="hidden" onChange={onChange} />
      </label>

      {value && (
        <div className="flex gap-2 items-center text-green-600 mt-1 text-sm">
          <CheckCircle size={16} />
          <span>{value.name}</span>
        </div>
      )}
    </div>
  );
}
