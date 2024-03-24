'use client';
import { redirect } from 'next/navigation';
import { Navbar } from './_components/navbar';
import { Sidebar } from './_components/sidebar';
import { auth, clerkClient, useAuth, useSession, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  useEffect(() => {
    const reloadSession = async () => {
      try {
        await user?.reload();
      } catch {
        //Logged out
      }
    };
    const intervalId = setInterval(() => {
      reloadSession();
    }, 20000);
    return () => clearInterval(intervalId);
  });
  return (
    <div className='h-full'>
      <div className='h-[80px] md:pl-56 fixed inset-y-0 w-full z-50'>
        <Navbar />
      </div>
      <div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50'>
        <Sidebar />
      </div>
      <main className='md:pl-56 pt-[80px] h-full'>{children}</main>
    </div>
  );
};

export default DashboardLayout;
