import { GoogleIcon } from '../../icons/googleIcon'

const GoogleLoginButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center gap-2 text-black p-2 px-10 mb-4 rounded-md font-bold border hover:bg-slate-100"
  >
    <div className="flex items-center">
      <span className="mr-2">Se connecter avec</span>
      <GoogleIcon size={16} />
      <span>oogle</span>
    </div>
  </button>
)

export default GoogleLoginButton
