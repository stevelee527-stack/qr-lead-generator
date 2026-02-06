import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-dev-secret-change-in-production'
);

const COOKIE_NAME = 'admin-token';
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export { COOKIE_NAME, TOKEN_MAX_AGE };

export async function createToken(email: string): Promise<string> {
  return new SignJWT({ email, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_MAX_AGE}s`)
    .sign(JWT_SECRET_KEY);
}

export async function verifyToken(token: string): Promise<{ email: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_KEY);
    return payload as unknown as { email: string; role: string };
  } catch {
    return null;
  }
}

export function verifyCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return false;
  }

  const emailMatch = email.toLowerCase() === adminEmail.toLowerCase();

  const passwordBuffer = Buffer.from(password);
  const adminPasswordBuffer = Buffer.from(adminPassword);

  if (passwordBuffer.length !== adminPasswordBuffer.length) {
    return false;
  }

  const crypto = require('crypto');
  const passwordMatch = crypto.timingSafeEqual(passwordBuffer, adminPasswordBuffer);

  return emailMatch && passwordMatch;
}
