import { redirect } from 'next/navigation';
import { getAuthCookie } from '@/lib/auth/cookies';
import { verifyAuthToken } from '@/lib/auth/jwt';
import TrackerClient from './tracker-client';

export const dynamic = 'force-dynamic';

export default function TrackerPage() {
  const token = getAuthCookie();
  const user = token ? verifyAuthToken(token) : null;
  if (!user) redirect('/login');
  return <TrackerClient email={user.email} />;
}
