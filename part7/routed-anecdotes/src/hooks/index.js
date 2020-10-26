import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const setEmpty = () => {
    setValue('')
  }

  return {
    attributes: { type, value, onChange },
    setEmpty,
  }
}
