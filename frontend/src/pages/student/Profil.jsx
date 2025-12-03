import { useState } from "react";
import { UploadCloud, CheckCircle } from "lucide-react";

export default function Profil() {

  // FORM
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    niveau: "",
    moyenne: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //  UPLOAD 
  const [docs, setDocs] = useState({
    cv: null,
    releve: null,
    attestation: null,
    lettre: null,
  });

  const handleUpload = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;

    setDocs({ ...docs, [key]: file });
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="p-8 rounded-2xl text-white shadow-xl 
        bg-gradient-to-r from-[#6c2bf9] to-[#8f4bff]">
        <h1 className="text-3xl font-bold">Profil étudiant</h1>
        <p className="opacity-90 mt-1 text-sm">
          Complétez vos informations personnelles et universitaires.
        </p>
      </div>

      {/* CARD FORM */}
      <div className="bg-white/60 rounded-2xl shadow-xl border border-gray-200 
        backdrop-blur-sm p-8">

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Informations personnelles
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Field name="nom" label="Nom" value={form.nom} onChange={handleChange}/>
          <Field name="prenom" label="Prénom" value={form.prenom} onChange={handleChange}/>
          <Field name="email" label="Email universitaire" type="email" placeholder="exemple@univ.dz" value={form.email} onChange={handleChange}/>
          <Field name="tel" label="Téléphone" placeholder="07 xx xx xx xx" value={form.tel} onChange={handleChange}/>
          <Field name="niveau" label="Niveau" placeholder="5ème année" value={form.niveau} onChange={handleChange}/>
          <Field name="moyenne" label="Moyenne Générale" type="number" placeholder="14.52" value={form.moyenne} onChange={handleChange}/>
        </form>

        <button
          className="
            mt-8 text-white px-8 py-3 rounded-xl font-medium shadow-md 
            bg-gradient-to-r from-[#6c2bf9] to-[#8f4bff] 
            hover:opacity-90 transition-all"
        >
         Enregistrer les informations
        </button>
      </div>

      {/* DOCUMENTS */}
      <div className="bg-white/60 rounded-2xl shadow-xl border border-gray-200 
        backdrop-blur-sm p-8">

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Documents justificatifs
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Téléversez vos documents (PDF / JPG / PNG).
        </p>

        <div className="flex flex-col gap-5">

          <UploadField
            label=" Curriculum Vitae (CV)"
            value={docs.cv}
            onChange={(e) => handleUpload(e, "cv")}
          />

          <UploadField
            label=" Relevé de notes"
            value={docs.releve}
            onChange={(e) => handleUpload(e, "releve")}
          />

          <UploadField
            label=" Attestation"
            value={docs.attestation}
            onChange={(e) => handleUpload(e, "attestation")}
          />

        </div>

        <button
          className="
            mt-8 text-white px-8 py-3 rounded-xl font-medium shadow-md 
            bg-gradient-to-r from-[#6c2bf9] to-[#8f4bff] 
            hover:opacity-90 transition-all
          "
        >
           Enregistrer les documents
        </button>
      </div>
    </div>
  );
}

/* ========= COMPONENT INPUT ========= */
function Field({ label, name, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-600 text-sm font-medium">{label}</label>
      <input
        name={name}
        {...props}
        className="
        p-3 rounded-xl bg-white/70 border border-gray-300
        focus:border-purple-500 outline-none transition
        "
      />
    </div>
  );
}

/* ========= COMPONENT UPLOAD ========= */
function UploadField({ label, value, onChange }) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>

      <label
        className="
        flex items-center justify-center gap-3
        bg-gray-50 border border-gray-200
        rounded-xl cursor-pointer py-3 px-4
        hover:bg-gray-100 transition
        "
      >
        <UploadCloud size={20} className="text-purple-600" />
        <span className="text-gray-600 text-sm">
          Importer un fichier
        </span>
        <input type="file" className="hidden" onChange={onChange} />
      </label>

      {value && (
        <div className="flex items-center gap-2 text-green-600 mt-2 text-sm">
          <CheckCircle size={18}/>
          <span>{value.name}</span>
        </div>
      )}
    </div>
  );
}
