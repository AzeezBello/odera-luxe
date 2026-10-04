import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const cookieName = 'odera_admin_session';
const secret = new TextEncoder().encode(process.env.SESSION_SECRET || 'dev-only-change-this-secret');

export async function createAdminSession() {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  const store = await cookies();
  store.set(cookieName, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function isAdmin() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.role === 'admin';
  } catch {
    return false;
  }
}

export async function clearAdminSession() {
  (await cookies()).delete(cookieName);
}
