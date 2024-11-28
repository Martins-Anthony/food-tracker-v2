interface ResetPasswordFormProps {
  email: string
  setEmail: (email: string) => void
  onSubmit: () => void
  onCancel: () => void
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  email,
  setEmail,
  onSubmit,
  onCancel,
}) => (
  <>
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="space-y-6 mb-2"
    >
      <label htmlFor="email">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="block w-full rounded-md border p-2"
      />
      <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary">
        Envoyer un lien de réinitialisation
      </button>
    </form>
    <button onClick={onCancel}>Retour</button>
  </>
)

export default ResetPasswordForm
