import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-dev-secret-change-in-production'
);

const COOKIE_NAME = 'admin-token';
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export { COOKIE_NAME, TOKEN_MAX_AGE };

export async function createToken(payload: { email: string; role: string; id: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_MAX_AGE}s`)
    .sign(JWT_SECRET_KEY);
}

export async function verifyToken(token: string): Promise<{ email: string; role: string; id: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_KEY);
    return payload as unknown as { email: string; role: string; id: string };
  } catch {
    return null;
  }
}

// Define a return type that matches what we need
type AuthUser = {
  id: string;
  email: string;
  role: string;
};

export async function verifyCredentials(email: string, password: string): Promise<AuthUser | null> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error('ADMIN_EMAIL or ADMIN_PASSWORD environment variables are not set');
    return null;
  }

  // Compare credentials against env vars (case-insensitive email check)
  if (email.toLowerCase() !== adminEmail.toLowerCase() || password !== adminPassword) {
    return null;
  }

  return {
    id: 'admin',
    email: adminEmail,
    role: 'ADMIN',
  };
}
