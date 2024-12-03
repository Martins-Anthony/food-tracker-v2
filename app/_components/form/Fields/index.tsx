import React, { ChangeEvent } from 'react'

export const TYPE_FIELD = {
  INPUT_MAIL: 'email',
  INPUT_TEXT: 'text',
  INPUT_NUMBER: 'number',
  INPUT_DATE: 'date',
  INPUT_SELECT: 'select',
} as const

type FieldType = (typeof TYPE_FIELD)[keyof typeof TYPE_FIELD]

interface FieldsProps {
  type: FieldType
  id: string
  label?: string
  readOnly?: boolean
  required?: boolean
  value?: string | number
  defaultValue?: string | number
  options?: string[] // Pour `select`
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  className?: string
  placeholder?: string
}

const Fields: React.FC<FieldsProps> = ({
  type,
  id,
  label,
  readOnly = false,
  required = false,
  value,
  defaultValue,
  options = [],
  onChange,
  className = '',
  placeholder = '',
}) => {
  const isControlled = value !== undefined

  const inputProps = {
    id,
    name: id,
    required,
    min: type === TYPE_FIELD.INPUT_NUMBER ? 1 : undefined,
    readOnly,
    className:
      'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', //`form-control col ${readOnly ? 'form-control-plaintext' : ''}`,
    onChange,
    ...(isControlled ? { value } : { defaultValue }),
  }

  return (
    <li className={`grid gap-2 ${className}`}>
      {label && (
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor={id}
        >
          {label.charAt(0).toUpperCase() + label.slice(1)} :
        </label>
      )}
      {type === TYPE_FIELD.INPUT_SELECT ? (
        <select {...inputProps}>
          {options.map((option, index) => (
            <option
              key={index}
              value={option === 'Choisir une catégorie' ? '' : option}
            >
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...inputProps}
          type={type}
          placeholder={placeholder}
        />
      )}
    </li>
  )
}

export default Fields
