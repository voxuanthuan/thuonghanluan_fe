"use client"

import React, { useState, useRef } from 'react';
import {
  Box,
  TextInput,
  Textarea,
  Select,
  Button,
  Group,
  Text,
} from '@mantine/core';
import { useMedicines } from '../hooks/useMedicines';
import { useForm } from '@mantine/form';

export interface IMedicine {
  _id: string;
  name: string;
}

interface PrescriptionFormValues {
  name: string;
  medicine: string;
  dosage: string;
  unit: string;
  usage: string;
  description: string;
}

const CreatePrescriptionPage = () => {
  const [filteredMedicines, setFilteredMedicines] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const { medicines } = useMedicines('');

  // const handleMedicineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedMedicineId = event.target.value;
  //   const selectedMedicine = medicines.find(medicine => medicine._id === selectedMedicineId);
  //   setSelectedMedicine(selectedMedicine);
  // };

  // const onMedicineSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const searchTerm = event.target.value.toLowerCase();
  //   const filteredMedicines = medicines.filter(medicine => medicine.name.toLowerCase().includes(searchTerm));
  //   setFilteredMedicines(filteredMedicines);
  // };

  const form = useForm({
    initialValues: {
      name: '',
      medicine: '',
      dosage: '',
      unit: '',
      usage: '',
      description: '',
    },
    validate: {
      name: (value) => value.trim() === '' ? 'Name is required' : null,
      medicine: (value) => value === '' ? 'Medicine is required' : null,
      dosage: (value) => value.trim() === '' ? 'Dosage is required' : null,
      unit: (value) => value === '' ? 'Unit is required' : null,
      usage: (value) => value.trim() === '' ? 'Usage is required' : null,
    },
  });

  const handleSubmit = (values: any) => {
    // Submit form data to server or perform other actions
    console.log(values);
  };

  return (
    <Box p="md" m="md">
      <Text>Create Prescription</Text>
      <Box mt="md">
          <TextInput
            label="Name"
            placeholder="Enter prescription name"
            {...form.getInputProps('name')}
            error={form.errors.name}
          />
      </Box>

      <Box mt="md">
        <Group>
          <Select
              label="Medicine"
              placeholder="Select a medicine"
              data={medicines.map((medicine) => ({
                value: medicine._id,
                label: medicine.name,
              }))}
              searchable
              {...form.getInputProps('medicine')}
              error={form.errors.medicine}
            />
          <TextInput
            label="Dosage"
            placeholder="Enter dosage amount"
            {...form.getInputProps('dosage')}
            error={form.errors.dosage}
            />
          <Select
            label="Unit"
            placeholder="Select dosage unit"
            data={['mg', 'g', 'ml']}
            {...form.getInputProps('unit')}
            error={form.errors.unit}
            />
          </Group>
      </Box>

      <Box mt="md">
        <Textarea
          label="Usage"
          placeholder="Enter usage instructions"
          {...form.getInputProps('usage')}
          error={form.errors.usage}
        />
      </Box>

      <Box mt="md">
        <Textarea
          label="Description"
          placeholder="Enter prescription description"
          {...form.getInputProps('description')}
        />
      </Box>

      <Box mt="md">
        <Button
          type="submit"
          form="prescriptionForm"
          onClick={() => {
           handleSubmit(form.values);
          }}
        >
          Create Prescription
        </Button>
      </Box>

      <form id="prescriptionForm">
      </form>
    </Box>
  );
};

export default CreatePrescriptionPage;