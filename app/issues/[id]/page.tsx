import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import ReactMarkdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import EditIssueButton from '@/app/issues/[id]/EditIssueButton'
import IssueDetails from '@/app/issues/[id]/IssueDetails'
import DeleteIssueButton from '@/app/issues/[id]/DeleteIssueButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/auth/authOptions'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions)

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    })

    if (!issue) notFound()

    return (
        <Grid columns={{ initial: '1', sm: '5' }} gap="5">
            <Box className="md:col-span-4">
                <IssueDetails issue={issue} />
            </Box>
            {session && (
                <Box>
                    <Flex direction="column" gap="4">
                        <EditIssueButton issueId={issue.id} />
                        <DeleteIssueButton issueId={issue.id} />
                    </Flex>
                </Box>
            )}
        </Grid>
    )
}

export default IssueDetailPage
