// import Image from 'next/image'
import CreatePrescriptionForm from '../../components/PrescriptionForm'
import Layout from '@/components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen max-w-2xl bg-white px-5 w-full mt-5 mx-auto">
        <CreatePrescriptionForm/>
      </div>
    </Layout>
  )
}
