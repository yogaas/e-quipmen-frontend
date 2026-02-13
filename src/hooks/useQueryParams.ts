import { useSearchParams } from 'react-router-dom'

export const useQueryParams = () => {
  const [params, setParams] = useSearchParams()

  const get = (key: string) => params.get(key)

  const set = (key: string, value: string) => {
    params.set(key, value)
    setParams(params)
  }

  return { get, set }
}