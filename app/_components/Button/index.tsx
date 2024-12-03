import React from 'react'

interface ButtonProps {
  type: 'button' | 'submit' | 'reset'
  label: string
  onClick?: () => void // Optionnel : Pour gérer les événements de clic
  className?: string // Optionnel : Pour personnaliser les styles
}

export const Button: React.FC<ButtonProps> = ({
  type,
  label,
  onClick,
  className = '',
}) => {
  const styleDefaults = {
    className:
      label === 'Annuler'
        ? 'bg-gray-500 hover:bg-gray-600'
        : label === 'Supprimer'
        ? 'bg-red-500 hover:bg-red-600'
        : 'bg-primary hover:bg-primary/90',
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white py-2 px-4 rounded ${styleDefaults.className} ${className}`}
    >
      {label}
    </button>
  )
}
