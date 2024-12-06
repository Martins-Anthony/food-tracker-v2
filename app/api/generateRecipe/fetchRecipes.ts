import { Recipe } from '@/lib/types/recipes'
import { fetchImage } from '../generateImage/fetchImage'

// Générer des recettes
export const fetchRecipes = async (
  userStock: { nom: string; expired: string }[],
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (userStock.length === 0) {
    alert('Aucun stock utilisateur disponible.')
    return
  }

  setLoading(true)

  try {
    const response = await fetch('/api/generateRecipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: userStock, count: 5 }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Erreur API:', errorData.error)
      alert('Erreur lors de la génération des recettes.')
      return
    }

    const data = await response.json()
    const recipesWithImages = await Promise.all(
      data.recipes.map(async (recipe: Recipe) => {
        const imageUrl = await fetchImage(recipe.image_description)
        return { ...recipe, imageUrl }
      })
    )

    setRecipes(recipesWithImages)
  } catch (error) {
    console.error('Erreur lors de la génération des recettes:', error)
  } finally {
    setLoading(false)
  }
}
