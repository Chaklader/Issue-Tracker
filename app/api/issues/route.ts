import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { issueSchema } from '@/app/validationSchema'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/auth/authOptions'

export async function POST(request: NextRequest) {
    const session = getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({}, { status: 401 })
    }

    const body = await request.json()
    const validation = issueSchema.safeParse(body)

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const { title, description } = body

    const newIssue = await prisma.issue.create({
        data: { title, description },
    })

    return NextResponse.json(newIssue, { status: 201 })
}
