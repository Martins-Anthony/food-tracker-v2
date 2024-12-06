import { NextResponse } from 'next/server'
import openai from '@/lib/openai' // Votre instance configurée d'OpenAI
import { promptRecipes } from './prompts'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { ingredients, count = 5 } = body

    // Validation des ingrédients
    if (
      !ingredients ||
      !Array.isArray(ingredients) ||
      ingredients.length === 0
    ) {
      return NextResponse.json(
        { error: 'Liste des ingrédients invalide ou manquante.' },
        { status: 400 }
      )
    }

    // Trier les ingrédients par date d'expiration
    const sortedIngredients = ingredients.sort(
      (a: { expired: string }, b: { expired: string }) =>
        new Date(a.expired).getTime() - new Date(b.expired).getTime()
    )

    // Préparer la liste des ingrédients pour le prompt
    const formattedIngredients = sortedIngredients
      .map(
        (ingredient: { nom: string; expired: string }) =>
          `${ingredient.nom} (expire le ${new Date(
            ingredient.expired
          ).toLocaleDateString()})`
      )
      .join(', ')

    const prompt = promptRecipes(count, formattedIngredients)

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    })
    // Extraire et nettoyer les recettes
    const content = response.choices[0].message?.content || ''
    let recipes = []
    try {
      // Nettoyer le contenu pour s'assurer qu'il s'agit d'un JSON valide
      const cleanedContent = content.trim().replace(/^```json|```$/g, '')
      recipes = JSON.parse(cleanedContent) // Convertir la chaîne JSON en tableau d'objets
    } catch (error) {
      console.error('Erreur de parsing JSON :', error, content)
      return NextResponse.json(
        { error: 'Format des recettes invalide.', content }, // Inclure la réponse brute pour déboguer
        { status: 500 }
      )
    }

    return NextResponse.json({ recipes })
  } catch (error: any) {
    console.error('Erreur lors de la génération des recettes :', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
