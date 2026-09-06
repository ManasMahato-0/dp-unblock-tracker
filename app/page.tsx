import { redirect } from 'next/navigation';
import { getAuthCookie } from '@/lib/auth/cookies';
import { verifyAuthToken } from '@/lib/auth/jwt';

export const dynamic = 'force-dynamic';

export default function Home() {
  const token = getAuthCookie();
  const user = token ? verifyAuthToken(token) : null;
  redirect(user ? '/tracker' : '/login');
}
