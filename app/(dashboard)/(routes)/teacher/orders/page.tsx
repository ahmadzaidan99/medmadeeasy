'use client';

import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import toast from 'react-hot-toast';

interface PurchaseType {
  id: string;
  title: string;
  price: number | null;
  email: string;
  active: boolean;
  createdAt: Date; // Assuming createdAt is a string, update it as needed
}

const handleEnableAction = async (record: PurchaseType) => {
  try {
    await axios.post(`/api/courses/purchases/activate`, {
      purchaseId: record.id,
    });
    // Log the response or perform other actions based on the response
    toast.success('Payment Verified Successfully');
  } catch (error) {
    console.error('Error enabling action:', error);
  }
};

const columns: ColumnsType<PurchaseType> = [
  {
    title: 'Course Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Active',
    dataIndex: 'active',
    key: 'active',
    render: (active: boolean) => (active ? 'Yes' : 'No'), // Update this line
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        {record.active === false && (
          <Button type='default' onClick={() => handleEnableAction(record)}>
            Verify Payment
          </Button>
        )}
      </Space>
    ),
  },
];

const PurchaseTable: React.FC = () => {
  const [data, setData] = useState<PurchaseType[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post('/api/courses/purchases');
        const fetcheddata = response.data;
        console.log(fetcheddata);
        if (fetcheddata) {
          // Extract the desired columns and create a new list of PurchaseType
          const newData: PurchaseType[] = fetcheddata.map(
            (item: {
              id: any;
              course: { title: any; price: any };
              email: any;
              active: any;
              createdAt: any;
            }) => ({
              id: item.id,
              title: item.course.title,
              price: item.course.price,
              email: item.email,
              active: item.active,
              createdAt: item.createdAt,
            }),
          );
          console.log(newData);
          setData(newData);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey='id' />
      <div>Total Purchases: {data.length}</div>
    </div>
  );
};

export default PurchaseTable;
