import LoginLayout from "../../components/LoginLayout";

export default function LoginMedecin() {
  return (
    <LoginLayout title="Connexion Médecin">

      <form className="space-y-4">

        <div>
          <label className="text-gray-700 text-sm">Email</label>
          <input type="email" className="input-pro" placeholder="exemple@hopital.dz" />
        </div>

        <div>
          <label className="text-gray-700 text-sm">Mot de passe</label>
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
