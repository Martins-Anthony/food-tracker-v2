'use client'

import { useState } from 'react'
import {
  getDaysRemaining,
  getDaysRemainingText,
  getBackgroundGradient,
  formatDate,
} from '@/lib/dateUtils'

export default function DateComponent() {
  const [date, setDate] = useState('')

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value)
  }

  const daysRemaining = date ? getDaysRemaining(date) : null
  const gradientClass = date ? getBackgroundGradient(date) : ''
  const formattedDate = date ? formatDate(date) : 'Pas de date sélectionnée'

  return (
    <div>
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        className="border rounded p-2"
      />
      {date && (
        <div className={`p-4 mt-4 ${gradientClass}`}>
          <p>Date sélectionnée : {formattedDate}</p>
          <p>{getDaysRemainingText(daysRemaining!)}</p>
        </div>
      )}
    </div>
  )
}
