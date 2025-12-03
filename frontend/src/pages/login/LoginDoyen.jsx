import LoginLayout from "../../components/LoginLayout";

export default function LoginDoyen() {
  return (
    <LoginLayout title="Connexion Administrateur">

      <form className="space-y-4">

        <div>
          <label className="text-gray-700 text-sm">Email administratif</label>
          <input type="email" className="input-pro" placeholder="doyen@univ.dz" />
        </div>

        <div>
          <label className="text-gray-700 text-sm">Mot de passe</label>
          <input type="password" className="input-pro" placeholder="••••••••" />
        </div>

        <button className="btn-pro">Se connecter</button>

      </form>

    </LoginLayout>
  );
}
