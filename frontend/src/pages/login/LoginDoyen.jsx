import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginLayout from "../../components/LoginLayout";

const API_URL = "http://localhost:8000/api/accounts/login/admin/";

export default function LoginDoyen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Erreur de connexion");

      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard/admin");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginLayout title="Connexion Administrateur">
      <form className="space-y-4" onSubmit={handleLogin}>

        <div>
          <label className="text-gray-700 text-sm">Email administratif</label>
          <input
            type="email"
            className="input-pro"
            placeholder="doyen@univ.dz"
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

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button className="btn-pro" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </LoginLayout>
  );
}