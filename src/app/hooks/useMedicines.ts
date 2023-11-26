import axios from 'axios'
import useSWR from 'swr'

import { IMedicine } from '../components/PrescriptionForm'

export function useMedicines(name: string) {

  const fetcher = (key: string): Promise<IMedicine[]> => {
    return  axios.get(`http://localhost:8080/${key}`, {
      method: "GET",
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
  }
  const { data, error, isLoading } = useSWR('api/medicine', fetcher)

  return {medicines: data || [], error, isLoading}
}