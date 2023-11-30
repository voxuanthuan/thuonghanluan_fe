import axios from 'axios'
import useSWR from 'swr'
import api from '@/api/axios'

import { IMedicine } from '@/components/PrescriptionForm'

export function useMedicines(name: string) {

  const fetcher = (key: string): Promise<IMedicine[]> => {
    return  api.get(`${key}`).then(res => res.data)
  }
  const { data, error, isLoading } = useSWR('medicine', fetcher)

  return {medicines: data || [], error, isLoading}
}