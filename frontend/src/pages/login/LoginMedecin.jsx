<<<<<<< HEAD
import LoginLayout from "../../components/LoginLayout";

export default function LoginMedecin() {
  return (
    <LoginLayout title="Connexion Médecin">

      <form className="space-y-4">

        <div>
          <label className="text-gray-700 text-sm">Email</label>
          <input type="email" className="input-pro" placeholder="exemple@hopital.dz" />
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginLayout from "../../components/LoginLayout";

const API_LOGIN = "http://localhost:8000/api/accounts/login/doctor/";

export default function LoginMedecin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
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
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || data.message || "Erreur lors de la connexion");
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

      navigate("/dashboard/medecin");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginLayout title="Connexion Médecin">
      <form className="space-y-4" onSubmit={handleSubmit}>

        <div>
          <label className="text-gray-700 text-sm">Email</label>
          <input
            type="email"
            className="input-pro"
            placeholder="exemple@hopital.dz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
>>>>>>> ef9ad18c2c4d3b24b09bada37e8289dd8581bfb7
        </div>

        <div>
          <label className="text-gray-700 text-sm">Mot de passe</label>
<<<<<<< HEAD
          <input type="password" className="input-pro" placeholder="••••••••" />
        </div>

        <div>
          <label className="text-gray-700 text-sm">Service</label>
          <input className="input-pro" placeholder="Cardiologie" />
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" className="h-4 w-4" />
          <label className="text-gray-700">Je suis chef de service</label>
        </div>

        <button className="btn-pro">Se connecter</button>

      </form>

    </LoginLayout>
  );
}
=======
          <input
            type="password"
            className="input-pro"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        

        {error && <p className="text-red-600 text-sm">{error}</p>}

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
>>>>>>> ef9ad18c2c4d3b24b09bada37e8289dd8581bfb7
