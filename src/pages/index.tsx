import api from '@/api/axios';
import Layout from '@/components/Layout'
import { Select } from '@mantine/core';
import debounce  from 'lodash.debounce';
import { useState } from 'react';

interface MedicineEntry {
  dosage: {
    amount: number;
    unit: string;
  };
  medicine: {
    _id: string;
    description: string;
    dosage: string;
    name: string;
  };
}

interface MedicationRecord {
  description: '',
  usage: '',
  name: string;
  medicines: MedicineEntry[];
}
export default function Home() {
  const [optionPresciption, setOptionPresciption] = useState<string[]>([])
  const [prescriptions, setPrescriptions] = useState<MedicationRecord[]>([])
  const [prescriptionSelected, setPrescriptionSelected] = useState<MedicationRecord>()

  const debouncedSearch = debounce((searchTerm) => {
    if (searchTerm) {
      // Fetch search results from an API using the search term
      api.get(`prescription?name=${searchTerm}`).then((response) => {
        setOptionPresciption(response.data.map((item: {name: string}) => item.name))
        setPrescriptions(response.data)
      })
    }
  }, 500, { leading: true, trailing: true }); // D

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const selected = (prescriptions || []).find((item: {name: string}) => item?.name === value)
    if (selected) {
      setPrescriptionSelected(selected)
    }
  }

const handleChange = (v: string | null) => {
  debouncedSearch(v)
};
  return (
    <Layout>
      <div className="max-w-2xl m-auto mt-3 bg-white px-5 flex align-middle flex-col">
        <div className=''>
          <Select 
          className='w-full h-10'
          placeholder='Tìm kiếm bài thuốc'
          onSearchChange={handleChange}
          onSelect={handleSelect}
          searchable
          data={optionPresciption}
        />
        </div>

        <div className='mt-12'>
          <h3 className='font-bold'>{prescriptionSelected?.name}</h3>
          <ul className='list-decimal pl-8'>
            {prescriptionSelected?.medicines.map((item) => {
              return (
                <li className='leading-' key={item.medicine._id}>
                  {`${item.medicine.name} (${item.dosage.amount} ${item.dosage.unit})`}
                </li>
              )
            })}
          </ul>
          {prescriptionSelected?.usage && (
            <div className='mt-5'>
              <h6 className='font-bold'>Hướng dẫn sử dụng:</h6>
              <p className='max-w-md'>{prescriptionSelected?.usage}</p>
            </div>
          )}
          {prescriptionSelected?.description && (
            <div className='mt-5'>
              <h6 className='font-bold'>Mô tả:</h6>
              <p className='max-w-md'>{prescriptionSelected?.description}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
