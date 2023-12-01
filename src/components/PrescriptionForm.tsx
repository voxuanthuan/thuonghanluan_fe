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
  Input,
} from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { useMedicines } from '../hooks/useMedicines'
import { useForm } from '@mantine/form';
import { IconTrash } from '@tabler/icons-react';
import api from '../api/axios';
import { toast, ToastContainer } from 'react-toastify';
export interface IMedicine {
  [key: string]: string
}

const units = [
  "gram",
  "lạng",
  "chén",
  "hạt",
  "viên",
  "lá",
  "cuộn",
  "cốc",
  "lọ",
  "ống",
  "túi",
  "đĩa",
  "ấm",
  "túi trà",
  "gói",
  "hộp",
];

const CreatePrescriptionComponent = () => {
  const [medicines, setMedicines] = useState<IMedicine[]>([]);

  useEffect(() => {
    api.get('medicine').then(res => setMedicines(res.data))
  }, [])


  const form = useForm({
    initialValues: {
      medicines: [
        {
          key: randomId(),
          medicine: '',
          dosage: {
            unit: 'gram',
            amount: 0,
          },
          usage: '',
          description: '',
        }
      ]
    },
    validate: {
      medicines: (value) => value[0].medicine.trim() === '' ? 'Name is required' : null,
      // medicine: (value) => value === '' ? 'Medicine is required' : null,
      // dosage: (value) => value.trim() === '' ? 'Dosage is required' : null,
      // unit: (value) => value === '' ? 'Unit is required' : null,
      // usage: (value) => value.trim() === '' ? 'Usage is required' : null,
    },
  });



  const handleAddMedicine = () => {
    form.insertListItem('medicines', {
      key: randomId(),
      name: '',
      medicine: '',
      dosage: {
        unit: 'gram',
        amount: 0,
      },
      usage: '',
      description: '',
    })
  };

  const handleSubmit = async (values: any) => {
    console.log(values);
    form.validate()
    try {
      const res = await api.post('prescription', values)
      if (res?.data?._id) {
        toast.success(`Tạo thành công bài thuốc ${res.data.name}`)
      }
    } catch(error: any) {
      toast.error(error.response.data.message)
    }
  }


  const medicinesOption = medicines.map((medicine) => ({
    value: medicine._id,
    label: medicine.name,
  }))

  
  return (
    <Box mx="auto">
      <Text className="my-4 font-bold text-2xl text-blue-400">Tạo bài thuốc</Text>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <TextInput
        className="my-4"
        label="Bài Thuốc"
        placeholder="Nhập tên bài thuốc"
        {...form.getInputProps('name')}
        error={form.errors.name}
      />
      
        {
          form.values.medicines.map((medicine, index) => {
            return (
              <Grid key={medicine.key} className="my-4">
                <Grid.Col span={6}>
                  <Select
                    label="Tên Vị thuốc"
                    placeholder="Nhập tên vị thuốc"
                    data={medicinesOption}
                    searchable
                    {...form.getInputProps(`medicines.${index}.medicine`)}
                    error={form.errors.name}
                  />
                </Grid.Col>
                <Grid.Col span={2}>
                  <NumberInput
                    label="Số Lượng"
                    {...form.getInputProps(`medicines.${index}.dosage.amount`)}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <Input.Wrapper label="Đơn vị">
                    <Input
                      {...form.getInputProps(`medicines.${index}.dosage.unit`)}
                      />
                  </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={1}>
                    <div className='mt-7'>
                      <ActionIcon color="red" onClick={() => form.removeListItem('medicines', index)}>
                        <IconTrash size="1rem" />
                      </ActionIcon>
                    </div>
                  </Grid.Col>
              </Grid>
            )
          })
        }
         <Group>
          <Button
              onClick={() => handleAddMedicine()}
            >
            Thêm vị thuốc
          </Button>
         </Group>
        
        <Group>
        <TextInput
            className="my-4 w-80"
            label="Phạm vi bài thuốc"
            defaultValue={'tính hàn'}
            // placeholder="Phạm vi bài thuốc"
            {...form.getInputProps('scope')}
            error={form.errors.name}
          />
          <Select
            className="my-4 w-72"
            label="Tính hàn/nhiệt của bài thuốc"
            placeholder="Nhập Tính hàn/nhiệt"
            data={['tính hàn', 'tính nhiệt', 'tính trung vị']}
            {...form.getInputProps('thermal ')}
            error={form.errors.name}
          />
        </Group>


        <Textarea
          className="my-4 min-h-1"
          label="Hướng dẫn Sử dụng"
          placeholder="Nhập nội dung"
          minRows={4}
          maxRows={12}
          autosize
          {...form.getInputProps('usage')}
          error={form.errors.usage}
        />

        <Group justify={'center'}>
          <Button className="my-4" type="submit">Tạo Bài Thuốc</Button>
        </Group>
        </form >
        {/* <ToastContainer /> */}
    </Box>
  );
};

export default CreatePrescriptionComponent;