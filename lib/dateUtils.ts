import { differenceInDays, format } from 'date-fns'

export const getDaysRemaining = (date: string): number => {
  const targetDate = new Date(date)
  const today = new Date()
  const diff = differenceInDays(targetDate, today)
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
  if (daysRemaining < 0) {
    return 'bg-gradient-to-r from-red-500 to-red-700'
  } else if (daysRemaining <= 7) {
    return 'bg-gradient-to-r from-yellow-500 to-yellow-700'
  } else if (daysRemaining < 14) {
    return 'bg-gradient-to-r from-green-500 to-green-700'
  }
  return 'bg-gradient-to-r from-blue-500 to-blue-700'
}

export const formatDate = (date: string): string => {
  const parsedDate = new Date(date) // Utilise directement le constructeur Date
  return format(parsedDate, 'dd/MM/yyyy')
}

export const todayDate = () => {
  // Obtenir la date d'aujourd'hui au format ISO et extraire uniquement la partie date
  const today = new Date()
  return today.toISOString().split('T')[0]
}
