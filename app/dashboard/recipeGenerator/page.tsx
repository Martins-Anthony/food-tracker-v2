'use client'

import { Section } from '@/app/_containers/layout/Section'
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { useAuth } from '@/lib/useAuth'
import RedirectsAfterAuth from '@/app/_components/authentication/RedirectsAfterAuth'
import { fetchUserStock } from '@/lib/userStock'
import { Button } from '@/app/_components/Button'
import { Recipe } from '@/lib/types/recipes'
import { fetchRecipes } from '@/app/api/generateRecipe/fetchRecipes'

export default function Page() {
  const [recipes, setRecipes] = useState<Recipe[]>([]) // Stocke les recettes générées
  const [userStock, setUserStock] = useState<
    { nom: string; expired: string }[]
  >([]) // Stock utilisateur avec les dates
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  // Récupérer le stock de l'utilisateur au chargement de la page
  useEffect(() => {
    const loadUserStock = async () => {
      if (user) {
        const stock = await fetchUserStock(user.uid) // Récupère le stock utilisateur
        setUserStock(stock)
      }
    }

    loadUserStock()
  }, [user])

  // Sauvegarder une recette
  const saveRecipe = async (userId: string, recipe: Recipe) => {
    try {
      console.log('testing userId', userId)
      const recipesRef = collection(db, `users/${userId}/savedRecipes`)
      console.log('Reference créée:', recipe)
      await addDoc(recipesRef, { ...recipe, createdAt: new Date() })
      alert('Recette sauvegardée avec succès !')
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la recette :', error)
      alert('Impossible de sauvegarder la recette.')
    }
  }
  
  if (!user) {
    return <RedirectsAfterAuth />
  }

  return (
    <Section>
      <h2 className="text-xl font-bold mb-4">Générer des recettes</h2>
      <Button
        type="button"
        onClick={() => fetchRecipes(userStock, setRecipes, setLoading)}
        label={loading ? 'Génération en cours...' : 'Générer des recettes'}
      />

      {recipes && recipes.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe: Recipe, index: number) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-md bg-white flex flex-col justify-between"
            >
              {/* Titre */}
              <h3 className="text-lg font-bold mb-2">{`Recette ${index + 1}: ${
                recipe.nom
              }`}</h3>
              {recipe.imageUrl && (
                <img
                  src={recipe.imageUrl}
                  alt={`Image de ${recipe.nom}`}
                  className="w-full h-auto rounded mb-4"
                />
              )}

              {/* Ingrédients */}
              <div className="text-sm text-gray-700 mb-4">
                {recipe.ingredients.length > 0 && (
                  <>
                    <h4 className="font-semibold">Ingrédients :</h4>
                    <ul className="list-disc list-inside mb-4">
                      {recipe.ingredients.map(
                        (ingredient: string, i: number) => (
                          <li key={i}>{ingredient}</li>
                        )
                      )}
                    </ul>
                  </>
                )}
              </div>

              {/* Étapes */}
              <div className="text-sm text-gray-700 mb-4">
                {recipe.etapes.length > 0 && (
                  <>
                    <h4 className="font-semibold">Étapes :</h4>
                    <ol className="list-decimal list-inside">
                      {recipe.etapes.map((step: string, i: number) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </>
                )}
              </div>

              {/* Bouton de sauvegarde */}
              <button
                type="button"
                onClick={() => saveRecipe(user.uid, recipe)}
                className="text-white py-2 px-4 rounded bg-primary hover:bg-primary/90 self-end"
              >
                Sauvegarder
              </button>
            </div>
          ))}
        </div>
      )}
    </Section>
  )
}