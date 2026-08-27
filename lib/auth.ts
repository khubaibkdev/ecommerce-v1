import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'

const SESSION_COOKIE = 'admin_session'
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 days

function getSecretKey() {
    const secret = process.env.AUTH_SECRET
    if (!secret) throw new Error('AUTH_SECRET environment variable is not set')
    return new TextEncoder().encode(secret)
}

export interface SessionPayload {
    username: string
    role: string
}

export const hashPassword = (password: string) => bcrypt.hash(password, 10)

export const verifyPassword = (password: string, hash: string) => bcrypt.compare(password, hash)

export async function createSessionToken(payload: SessionPayload) {
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
        .sign(getSecretKey())
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(token, getSecretKey())
        if (typeof payload.username !== 'string' || typeof payload.role !== 'string') return null
        return { username: payload.username, role: payload.role }
    } catch {
        return null
    }
}

export { SESSION_COOKIE, SESSION_TTL_SECONDS }
