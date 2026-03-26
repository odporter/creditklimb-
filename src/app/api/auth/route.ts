import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import crypto from 'crypto'

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json')

interface User {
  id: string
  email: string
  passwordHash: string
  plan: 'free' | 'starter' | 'full' | 'mail-service'
  createdAt: string
  stripeCustomerId?: string
}

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
}

function generateId(): string {
  return crypto.randomBytes(16).toString('hex')
}

async function getUsers(): Promise<User[]> {
  if (!existsSync(USERS_FILE)) return []
  const data = await readFile(USERS_FILE, 'utf8')
  return JSON.parse(data)
}

async function saveUsers(users: User[]): Promise<void> {
  const dir = path.dirname(USERS_FILE)
  if (!existsSync(dir)) await mkdir(dir, { recursive: true })
  await writeFile(USERS_FILE, JSON.stringify(users, null, 2))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, email, password, plan } = body

    if (action === 'signup') {
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
      }

      const users = await getUsers()
      if (users.find(u => u.email === email)) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
      }

      const salt = generateId()
      const passwordHash = hashPassword(password, salt)
      const user: User = {
        id: generateId(),
        email,
        passwordHash,
        plan: plan || 'free',
        createdAt: new Date().toISOString(),
      }

      users.push(user)
      await saveUsers(users)

      const sessionId = generateId()
      const response = NextResponse.json({ 
        success: true, 
        user: { id: user.id, email: user.email, plan: user.plan } 
      })
      response.cookies.set('session', sessionId, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      // Store session
      const sessionsDir = path.join(process.cwd(), 'data', 'sessions')
      if (!existsSync(sessionsDir)) await mkdir(sessionsDir, { recursive: true })
      await writeFile(
        path.join(sessionsDir, `${sessionId}.json`), 
        JSON.stringify({ userId: user.id, createdAt: Date.now() })
      )

      return response
    }

    if (action === 'login') {
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
      }

      const users = await getUsers()
      const user = users.find(u => u.email === email)
      
      // For demo: accept any password for existing users, or create account
      if (!user) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
      }

      // Simple session
      const sessionId = generateId()
      const response = NextResponse.json({ 
        success: true, 
        user: { id: user.id, email: user.email, plan: user.plan } 
      })
      response.cookies.set('session', sessionId, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })

      const sessionsDir = path.join(process.cwd(), 'data', 'sessions')
      if (!existsSync(sessionsDir)) await mkdir(sessionsDir, { recursive: true })
      await writeFile(
        path.join(sessionsDir, `${sessionId}.json`), 
        JSON.stringify({ userId: user.id, createdAt: Date.now() })
      )

      return response
    }

    if (action === 'logout') {
      const sessionId = request.cookies.get('session')?.value
      if (sessionId) {
        const sessionsDir = path.join(process.cwd(), 'data', 'sessions')
        const sessionFile = path.join(sessionsDir, `${sessionId}.json`)
        if (existsSync(sessionFile)) {
          await import('fs').then(fs => fs.promises.unlink(sessionFile))
        }
      }
      const response = NextResponse.json({ success: true })
      response.cookies.delete('session')
      return response
    }

    if (action === 'upgrade') {
      const sessionId = request.cookies.get('session')?.value
      if (!sessionId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

      const sessionsDir = path.join(process.cwd(), 'data', 'sessions')
      const sessionFile = path.join(sessionsDir, `${sessionId}.json`)
      if (!existsSync(sessionFile)) return NextResponse.json({ error: 'Invalid session' }, { status: 401 })

      const session = JSON.parse(await readFile(sessionFile, 'utf8'))
      const users = await getUsers()
      const user = users.find(u => u.id === session.userId)
      if (!user) return NextResponse.json({ error: 'User not found' }, { status: 401 })

      user.plan = plan || 'full'
      await saveUsers(users)

      return NextResponse.json({ success: true, user: { id: user.id, email: user.email, plan: user.plan } })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Auth failed' }, { status: 500 })
  }
}
