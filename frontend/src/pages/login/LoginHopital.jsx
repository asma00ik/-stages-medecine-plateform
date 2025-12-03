import LoginLayout from "../../components/LoginLayout";

export default function LoginHopital() {
  return (
    <LoginLayout title="Connexion Hôpital">

      <form className="space-y-4">

        <div>
          <label className="text-gray-700 text-sm">Email établissement</label>
          <input type="email" className="input-pro" placeholder="direction@hopital.dz" />
        </div>

        <div>
          <label className="text-gray-700 text-sm">Mot de passe</label>
          <input type="password" className="input-pro" placeholder="••••••••" />
        </div>

        <div>
          <label className="text-gray-700 text-sm">Code établissement</label>
          <input className="input-pro" placeholder="HSP1654" />
        </div>

        <button className="btn-pro">Se connecter</button>

      </form>

    </LoginLayout>
  );
}
