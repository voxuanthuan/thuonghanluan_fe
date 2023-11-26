// import Image from 'next/image'
import CreatePrescriptionForm from './components/PrescriptionForm'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreatePrescriptionForm/>
    </main>
  )
}
