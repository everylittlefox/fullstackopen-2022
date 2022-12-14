import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    inputProps: { type, value, onChange },
    reset() {
      setValue('')
    }
  }
}
