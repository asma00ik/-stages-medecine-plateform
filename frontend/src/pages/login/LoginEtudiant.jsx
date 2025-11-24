// src/pages/auth/LoginEtudiant.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginLayout from "../../components/LoginLayout";

const API_LOGIN = "http://localhost:8000/api/accounts/login/student/";

export default function LoginEtudiant() {
  const navigate = useNavigate();

  const [matricule, setMatricule] = useState("");
  const [email, setEmail] = useState("");
  const [annee, setAnnee] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(API_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matricule,
          email,
          password,
          annee_universitaire: annee,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = data.detail || data.message || "Erreur de connexion";
        throw new Error(msg);
      }

      if (data.access) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
      } else if (data.token) {
        localStorage.setItem("accessToken", data.token);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/dashboard/etudiant");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginLayout title="Connexion Étudiant">
      <form className="space-y-4" onSubmit={handleSubmit}>

        <div>
          <label className="text-gray-700 text-sm">Matricule</label>
          <input
            className="input-pro"
            placeholder="Ex: 225489632"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-gray-700 text-sm">Email universitaire</label>
          <input
            type="email"
            className="input-pro"
            placeholder="exemple@univ.dz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-gray-700 text-sm">Mot de passe</label>
          <input
            type="password"
            className="input-pro"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-gray-700 text-sm">Année universitaire</label>
          <input
            className="input-pro"
            placeholder="3e année"
            value={annee}
            onChange={(e) => setAnnee(e.target.value)}
            required
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          className={`btn-pro ${loading ? "opacity-70 cursor-wait" : ""}`}
          disabled={loading}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

      </form>
    </LoginLayout>
  );
}