import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()
  const joke = await prisma.joke.create({
    data: {
      text: body.text,
      category: body.category,
      reaction: body.reaction,
      cringeLevel: body.cringeLevel,
    },
  })
  return NextResponse.json(joke)
}

export async function GET() {
  const jokes = await prisma.joke.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(jokes)
}