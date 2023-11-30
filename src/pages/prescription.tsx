// import Image from 'next/image'
import CreatePrescriptionForm from '../components/PrescriptionForm'
import Layout from '@/components/Layout'
import api from '@/api/axios'
import router from 'next/router'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export default function Home() {
  const [medicines, setMedicines] = useState([])
  useEffect(() => {
    async function fetchMedicine() {
      try {
        const res = await api.get('medicine').then(res => res.data)
        setMedicines(res.data)
      } catch(error) {
        toast.error('')
      }
    }

    fetchMedicine()
  }, [])
  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center justify-between pt-24 pb-24 bg-white px-5">
        <CreatePrescriptionForm/>
      </div>
    </Layout>
  )
}
