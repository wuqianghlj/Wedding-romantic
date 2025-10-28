import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'data', 'rsvps.json')

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const now = new Date().toISOString()
    const record = { ...body, receivedAt: now }
    const dir = path.dirname(DATA_PATH)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    let arr = []
    if (fs.existsSync(DATA_PATH)) {
      const raw = fs.readFileSync(DATA_PATH, 'utf-8')
      arr = JSON.parse(raw || '[]')
    }
    arr.push(record)
    fs.writeFileSync(DATA_PATH, JSON.stringify(arr, null, 2), 'utf-8')
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
