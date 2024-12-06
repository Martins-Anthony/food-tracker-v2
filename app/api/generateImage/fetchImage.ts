export const fetchImage = async (
  description: string
): Promise<string | null> => {
  try {
    const response = await fetch('/api/generateImage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    })

    if (!response.ok) {
      console.error("Erreur lors de la génération de l'image")
      return null
    }

    const data = await response.json()
    return data.imageUrl || null
  } catch (error) {
    console.error("Erreur lors de la génération de l'image :", error)
    return null
  }
}
