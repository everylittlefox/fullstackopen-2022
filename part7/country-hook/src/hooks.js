import axios from 'axios'
import { useState, useEffect } from 'react'

export const useCountry = (countryName) => {
  const [country, setCountry] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (countryName) {
      setCountry(null)
      setError(false)
      setLoading(true)
      axios
        .get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then((r) => {
          setCountry(r.data[0])
          setLoading(false)
        })
        .catch(() => {
          setError(true)
          setLoading(false)
        })
    }
  }, [countryName])

  return { country, error, loading }
}
