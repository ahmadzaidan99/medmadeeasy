import { auth, clerkClient } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { CheckCircle, Clock } from 'lucide-react';

import { getDashboardCourses } from '@/actions/get-dashboard-courses';
import { CoursesList } from '@/components/courses-list';

import { InfoCard } from './_components/info-card';
import { Session } from '@clerk/nextjs/server';

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const sessions = await clerkClient.sessions.getSessionList({
    userId: userId!,
    status: 'active',
  });
  sessions
    ?.sort((a, b) => b.createdAt - a.createdAt)
    ?.forEach(async (session: Session, index: number) => {
      if (index > 0) await clerkClient.sessions.revokeSession(session.id);
    });

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId,
  );

  return (
    <div className='p-6 space-y-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <InfoCard
          icon={Clock}
          label='In Progress'
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label='Completed'
          numberOfItems={completedCourses.length}
          variant='success'
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
