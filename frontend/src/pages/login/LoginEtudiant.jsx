import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginLayout from "../../components/LoginLayout";

export default function LoginEtudiant() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [matricule, setMatricule] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [anneeUniv, setAnneeUniv] = useState("");

  // Erreurs
  const [matriculeError, setMatriculeError] = useState("");
  const [anneeUnivError, setAnneeUnivError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    // Matricule = année de bac + 8 chiffres => 12 chiffres
    const matriculeRegex = /^\d{12}$/;
    if (!matriculeRegex.test(matricule)) {
      setMatriculeError("Le matricule doit contenir 12 chiffres (année de bac + 8 chiffres).");
      valid = false;
    } else {
      const anneeBac = parseInt(matricule.slice(0, 4));
      const currentYear = new Date().getFullYear();
      if (anneeBac < 2000 || anneeBac > currentYear) {
        setMatriculeError(`Les 4 premiers chiffres du matricule doivent être une année de bac valide (2000-${currentYear}).`);
        valid = false;
      } else {
        setMatriculeError("");
      }
    }

    // Année universitaire 3-7
    const anneeUnivNum = parseInt(anneeUniv);
    if (isNaN(anneeUnivNum) || anneeUnivNum < 3 || anneeUnivNum > 7) {
      setAnneeUnivError("L'année universitaire doit être un nombre entre 3 et 7.");
      valid = false;
    } else {
      setAnneeUnivError("");
    }

    if (!valid) return;

    setLoading(true);

    // Simuler connexion
    setTimeout(() => {
      navigate("/student/dashboard");
    }, 800);
  };

  return (
    <LoginLayout title="Connexion Étudiant">
      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="text-gray-700 text-sm font-medium">Matricule</label>
          <input
            className={`input-pro ${matriculeError ? "border-red-500" : ""}`}
            placeholder="Ex: 202300012345"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
          />
          {matriculeError && <p className="text-red-500 text-sm mt-1">{matriculeError}</p>}
        </div>

        <div>
          <label className="text-gray-700 text-sm font-medium">Email universitaire</label>
          <input
            type="email"
            className="input-pro"
            placeholder="exemple@univ.dz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="text-gray-700 text-sm font-medium">Mot de passe</label>
          <input
            type="password"
            className="input-pro"
            placeholder="••••••••"
            minLength="6"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="text-gray-700 text-sm font-medium">Année universitaire</label>
          <input
            type="number"
            className={`input-pro ${anneeUnivError ? "border-red-500" : ""}`}
            placeholder="3"
            min="3"
            max="7"
            value={anneeUniv}
            onChange={(e) => setAnneeUniv(e.target.value)}
          />
          {anneeUnivError && <p className="text-red-500 text-sm mt-1">{anneeUnivError}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`btn-pro ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

      </form>
    </LoginLayout>
  );
}
