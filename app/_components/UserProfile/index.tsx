import { User } from 'firebase/auth'
import ProductsPage from '../ProductsPage'
import { Section } from '@/app/_containers/layout/Section'

interface UserProfileProps {
  user: User
  // onLogout: () => void
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  // , onLogout
  if (!user.uid) {
    return <p>Chargement des informations utilisateur...</p>
  }
  return (
    <>
      <Section>
        <p>Bienvenue, {user.displayName}</p>
        {user.photoURL ? (
          <img src={user.photoURL} alt="Profile" className="rounded-full" />
        ) : (
          <p>Pas de photo de profil</p>
        )}
      </Section>
      <ProductsPage userId={user.uid} />
    </>
  )
}

export default UserProfile
