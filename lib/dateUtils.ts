//import { differenceInDays } from 'date-fns'

/**
 * Retourne une classe Tailwind pour le background en fonction de la date.
 */
/*
export const getBackgroundGradient = (date: string): string => {
  const today = new Date()
  const targetDate = new Date(date)
  const daysDifference = Math.ceil(
    (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (isNaN(targetDate.getTime())) {
    return 'bg-gray-100' // Couleur par défaut si la date est invalide
  }

  if (daysDifference < 0) {
    return 'bg-red-500 text-white' // Expiré
  } else if (daysDifference < 7) {
    return 'bg-yellow-500 text-black' // Moins de 7 jours
  } else if (daysDifference < 14) {
    return 'bg-green-300 text-black' // Moins de 14 jours
  } else {
    return 'bg-green-500 text-white' // Plus de 14 jours
  }
}
*/
/**
 * Retourne un message décrivant le temps restant ou l'expiration.
 */
/*
export const getDaysRemainingText = (date: string): string => {
  const today = new Date()
  const targetDate = new Date(date)
  const daysDifference = Math.ceil(
    (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (isNaN(targetDate.getTime())) {
    return 'Date invalide'
  }

  if (daysDifference < 0) {
    return `Expiré depuis ${Math.abs(daysDifference)} jour(s)`
  } else if (daysDifference === 0) {
    return `Dernier jour avant expiration`
  } else {
    return `${daysDifference} jour(s) restant(s)`
  }
}
*/

import { differenceInDays, format } from 'date-fns'

export const getDaysRemaining = (date: string): number => {
  const targetDate = new Date(date)
  const today = new Date()
  const diff = differenceInDays(targetDate, today)
  console.log(`Différence en jours pour ${date} : ${diff}`)
  return diff
}

export const getDaysRemainingText = (daysRemaining: number): string => {
  if (daysRemaining < 0) {
    return `Expiré depuis ${Math.abs(daysRemaining)} jours`
  } else if (daysRemaining === 0) {
    return 'Dernier jour avant expiration'
  }
  return `${daysRemaining} jours restants`
}

export const getBackgroundGradient = (date: string): string => {
  const daysRemaining = getDaysRemaining(date)
  console.log('daysRemaining', daysRemaining)
  if (daysRemaining < 0) {
    return 'bg-gradient-to-r from-red-500 to-red-700'
  } else if (daysRemaining <= 7) {
    return 'bg-gradient-to-r from-yellow-500 to-yellow-700'
  } else if (daysRemaining < 14) {
    return 'bg-gradient-to-r from-green-500 to-green-700'
  }
  console.log('Retourne bleu')
  return 'bg-gradient-to-r from-blue-500 to-blue-700'
}

export const formatDate = (date: string): string => {
  const parsedDate = new Date(date) // Utilise directement le constructeur Date
  return format(parsedDate, 'dd/MM/yyyy')
}
