import LoginLayout from "../../components/LoginLayout";

export default function LoginEtudiant() {
  return (
    <LoginLayout title="Connexion Étudiant">

      <form className="space-y-4">

        <div>
          <label className="text-gray-700 text-sm">Matricule</label>
          <input className="input-pro" placeholder="Ex: 225489632" />
        </div>

        <div>
          <label className="text-gray-700 text-sm">Email universitaire</label>
          <input type="email" className="input-pro" placeholder="exemple@univ.dz" />
        </div>

        <div>
          <label className="text-gray-700 text-sm">Mot de passe</label>
          <input type="password" className="input-pro" placeholder="••••••••" />
        </div>

        <div>
          <label className="text-gray-700 text-sm">Année universitaire</label>
          <input className="input-pro" placeholder="3e année" />
        </div>

        <button className="btn-pro">Se connecter</button>

      </form>

    </LoginLayout>
  );
}
