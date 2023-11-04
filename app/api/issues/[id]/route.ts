import { NextRequest, NextResponse } from 'next/server'
import { issueSchema } from '@/app/validationSchema'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/auth/authOptions'

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } },
) {
    const session = getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({}, { status: 401 })
    }

    const body = await request.json()

    const validation = issueSchema.safeParse(body)
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    })

    if (!issue) {
        return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })
    }

    const { title, description } = body

    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title,
            description,
        },
    })

    return NextResponse.json(updatedIssue)
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } },
) {
    const session = getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({}, { status: 401 })
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    })

    if (!issue) {
        return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })
    }

    await prisma.issue.delete({
        where: { id: parseInt(params.id) },
    })

    return NextResponse.json({})
}
