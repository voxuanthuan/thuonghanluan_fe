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
      name: '',
      medicines: [
        {
          name: '',
          key: randomId(),
          medicine: '',
          dosage: {
            unit: 'gram',
            amount: 0,
          },
          usage: '',
          description: '',
        }
      ],
      usage: '',
      scope: '',
      thermal: ''
    },
    validate: {
      name: (value) => value === '' ? 'Vui lòng nhập tên bài thuốc' : null,
      medicines: (values) => values.filter(v => {
        return v.medicine === ""
      }).length > 0 ? 'Vui lòng nhập đầy đủ tên vị thuốc' : null,
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
    try {
      const res = await api.post('prescription', values)
      if (res?.data?._id) {
        form.reset();
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
    <Box mx="auto px-6">
      <h2 className="my-4 font-bold text-2xl text-blue-400">Tạo bài thuốc</h2>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <TextInput
        className="my-4"
        label="Bài Thuốc"
        placeholder="Nhập tên bài thuốc"
        {...form.getInputProps('name')}
        error={form.errors.name}
        />
        <section className="my-4">
        {
          form.values.medicines.map((medicine, index: any) => {
            return (
              <Grid key={medicine.key} className="my-6">
                <Grid.Col span={{ base: 12, md: 6,}}>
                  <TextInput
                    label="Tên Vị thuốc"
                    placeholder="Nhập tên vị thuốc"
                    {...form.getInputProps(`medicines.${index}.medicine`)}
                  />
                </Grid.Col>
                <Grid.Col span={{base: 6, md: 2}}>
                  <NumberInput
                    label="Số Lượng"
                    {...form.getInputProps(`medicines.${index}.dosage.amount`)}
                  />
                </Grid.Col>
                <Grid.Col span={{base: 4, md: 3}}>
                  <Input.Wrapper label="Đơn vị">
                    <Input
                      {...form.getInputProps(`medicines.${index}.dosage.unit`)}
                      />
                  </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={1}>
                    <div className='mt-7'>
                      <ActionIcon size={'lg'} color="red" onClick={() => form.removeListItem('medicines', index)}>
                        <IconTrash size="1rem" />
                      </ActionIcon>
                    </div>
                  </Grid.Col>
              </Grid>
            )
          })
        }
        {<span className='text-red-500'>{form.errors.medicines}</span>}
         <Group className='my-4'>
          <Button
              onClick={() => handleAddMedicine()}
            >
            Thêm vị thuốc
          </Button>
         </Group>
        </section>
        
        <Group>
        <TextInput
            className="my-4 w-full"
            label="Phạm vi bài thuốc"
            placeholder="Nhập Phạm vi bài thuốc"
            {...form.getInputProps('scope')}
          />
          <Select
            defaultValue={'tính hàn'}
            className="my-4 w-full"
            label="Tính hàn/nhiệt của bài thuốc"
            data={['tính hàn', 'tính nhiệt', 'tính trung vị']}
            {...form.getInputProps('thermal ')}
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