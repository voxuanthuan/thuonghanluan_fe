// import Image from 'next/image'
import CreatePrescriptionForm from './components/PrescriptionForm'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24 pb-24 bg-white px-5">
      <CreatePrescriptionForm/>
    </main>
  )
}
