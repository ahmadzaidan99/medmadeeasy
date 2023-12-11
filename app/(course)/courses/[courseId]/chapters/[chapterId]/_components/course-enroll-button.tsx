'use client';

import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/format';
import { ConfirmModal } from '@/components/modals/confirm-modal';

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
  userId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
  userId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const onClick = async () => {
    // Open the ConfirmModal when the button is clicked
    setIsConfirmModalOpen(true);
  };

  const onConfirm = async () => {
    try {
      setIsLoading(true);

      await axios.post(`/api/courses/${courseId}/checkout`, {
        courseId: courseId,
        userId: userId,
        price: price,
      });
      toast.success(
        'Enrollment successful!, Please Wait For The Admin To Verify Your Transaction',
      );
    } catch (error) {
      toast.error(
        'You have already enrolled! Please Wait For The Admin To Verify Your Transaction',
      );
      console.error('Error creating purchase:', error);
    } finally {
      setIsLoading(false);
      // Close the ConfirmModal after handling the enrollment logic
      setIsConfirmModalOpen(false);
    }
  };

  return (
    <>
      {/* ConfirmModal Component */}
      <ConfirmModal onConfirm={onConfirm} Amount={formatPrice(price)}>
        {/* Customize the content inside the ConfirmModal as needed */}
        <Button size='sm' disabled={isLoading}>
          Enroll for {formatPrice(price)}
        </Button>
      </ConfirmModal>
    </>
  );
};
