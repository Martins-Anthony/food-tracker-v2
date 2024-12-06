import { NextResponse } from 'next/server';
import openai from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { description } = body;

    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { error: 'La description de l\'image est requise et doit être une chaîne de caractères.' },
        { status: 400 }
      );
    }

    // Appel à l'API OpenAI pour générer une image
    const response = await openai.images.generate({
      prompt: description,
      n: 1, // Génère une seule image
      size: '512x512', // Taille de l'image
    });

    // Retourner l'URL de l'image générée
    const imageUrl = response.data[0].url;

    return NextResponse.json({ imageUrl });
  } catch (error: any) {
    console.error('Erreur lors de la génération de l\'image :', error);
    return NextResponse.json(
      { error: error.message || 'Erreur interne du serveur.' },
      { status: 500 }
    );
  }
}

