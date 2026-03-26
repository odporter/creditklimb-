import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('session')?.value
    
    if (!sessionId) {
      return NextResponse.json({ user: null })
    }

    const sessionsDir = path.join(process.cwd(), 'data', 'sessions')
    const sessionFile = path.join(sessionsDir, `${sessionId}.json`)

    if (!existsSync(sessionFile)) {
      return NextResponse.json({ user: null })
    }

    const session = JSON.parse(await readFile(sessionFile, 'utf8'))
    const usersFile = path.join(process.cwd(), 'data', 'users.json')
    
    if (!existsSync(usersFile)) {
      return NextResponse.json({ user: null })
    }

    const users = JSON.parse(await readFile(usersFile, 'utf8'))
    const user = users.find((u: any) => u.id === session.userId)

    if (!user) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({ 
      user: { id: user.id, email: user.email, plan: user.plan } 
    })
  } catch (error) {
    return NextResponse.json({ user: null })
  }
}
