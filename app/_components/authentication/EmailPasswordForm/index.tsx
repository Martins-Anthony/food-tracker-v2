interface EmailPasswordFormProps {
  email: string
  password: string
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  isNewUser: boolean
  onSubmit: () => void
  toggleNewUser: () => void
  onResetPassword: () => void
}

const EmailPasswordForm: React.FC<EmailPasswordFormProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  isNewUser,
  onSubmit,
  toggleNewUser,
  onResetPassword,
}) => (
  <>
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="space-y-6"
    >
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full rounded-md border p-2"
        />
      </div>
      <div>
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="block w-full rounded-md border p-2"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90"
      >
        {isNewUser ? "S'inscrire" : 'Se connecter'}
      </button>
    </form>
    <div className="flex justify-between mt-2">
      <button onClick={onResetPassword}>Mot de passe oublié ?</button>
      <button onClick={toggleNewUser}>
        {isNewUser ? "J'ai déjà un compte" : 'Créer un compte'}
      </button>
    </div>
  </>
)

export default EmailPasswordForm
