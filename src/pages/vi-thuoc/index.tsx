"use client"

import React, { useEffect, useState } from 'react';
import {
  Box,
  TextInput,
  Textarea,
  Select,
  Button,
  Group,
  Text,
  ActionIcon,
  Grid,
  NumberInput,
} from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { useMedicines } from '@/hooks/useMedicines';
import { useForm } from '@mantine/form';
import api from '@/api/axios';
import { toast, ToastContainer } from 'react-toastify';
import Layout from '@/components/Layout';
export interface IMedicine {
  [key: string]: string
}


const CreateMedicineForm = () => {
  const form = useForm({
    initialValues: {
      name: '',
      description: ''
    },
    validate: {
      name: (value) => value.trim() === '' ? 'Name is required' : null,
      // medicine: (value) => value === '' ? 'Medicine is required' : null,
      // dosage: (value) => value.trim() === '' ? 'Dosage is required' : null,
      // unit: (value) => value === '' ? 'Unit is required' : null,
      // usage: (value) => value.trim() === '' ? 'Usage is required' : null,
    },
  });



  const handleSubmit = async (values: any) => {
    console.log(values);
    form.validate()
    try {
      const res = await api.post('medicine', values)
      if (res?.data?._id) {
        toast.success(`Tạo thành công bài thuốc ${res.data.name}`)
      }
    } catch(error: any) {
      toast.error(error.response.data.message)
    }
  }
  
  return (
    <Layout>
      <div className="min-h-screen max-w-4xl bg-white px-1 md:px-5 w-full mt-5 mx-auto">
        <Box className='w-full px-10'>
          <Text className="my-4 font-bold text-xl text-blue-500 underline">Tạo vị thuốc</Text>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            className="my-4"
            label="Tên"
            placeholder="Nhập tên vị thuốc"
            {...form.getInputProps('name')}
            error={form.errors.name}
          />

            <Textarea
              className="my-4 min-h-1"
              label="Mô tả"
              placeholder="Nhập nội dung"
              minRows={4}
              maxRows={12}
              autosize
              {...form.getInputProps('description')}
              error={form.errors.description}
            />

            <Group justify={'center'}>
              <Button className="my-4" type="submit">Tạo Vị Thuốc</Button>
            </Group>
            </form >
            {/* <ToastContainer /> */}
        </Box>
      </div>
    </Layout>
  );
};

export default CreateMedicineForm;