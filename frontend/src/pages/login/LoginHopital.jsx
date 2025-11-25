<<<<<<< HEAD
import LoginLayout from "../../components/LoginLayout";

export default function LoginHopital() {
  return (
    <LoginLayout title="Connexion Hôpital">

      <form className="space-y-4">

        <div>
          <label className="text-gray-700 text-sm">Email établissement</label>
          <input type="email" className="input-pro" placeholder="direction@hopital.dz" />
=======
// src/pages/auth/LoginHopital.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginLayout from "../../components/LoginLayout";

const API_LOGIN = "http://localhost:8000/api/accounts/login/hospital/";

export default function LoginHopital() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

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
          code_etab: code,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.detail || data.message || "Erreur lors de la connexion"
        );
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

      navigate("/dashboard/hopital");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginLayout title="Connexion Hôpital">
      <form className="space-y-4" onSubmit={handleSubmit}>

        <div>
          <label className="text-gray-700 text-sm">Email établissement</label>
          <input
            type="email"
            className="input-pro"
            placeholder="direction@hopital.dz"
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
=======
          <input
            type="password"
            className="input-pro"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
>>>>>>> ef9ad18c2c4d3b24b09bada37e8289dd8581bfb7
        </div>

        <div>
          <label className="text-gray-700 text-sm">Code établissement</label>
<<<<<<< HEAD
          <input className="input-pro" placeholder="HSP1654" />
        </div>

        <button className="btn-pro">Se connecter</button>

      </form>

    </LoginLayout>
  );
}
=======
          <input
            className="input-pro"
            placeholder="HSP1654"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}

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
