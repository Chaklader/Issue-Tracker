import React from 'react'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import IssueStatusBadge from '../../components/IssueStatusBadge'
import ReactMarkdown from 'react-markdown'
import { Issue } from '@prisma/client'

const IssueDetails = ({ issue }: { issue: Issue }) => {
    return (
        <>
            <Heading as="h1">{issue.title}</Heading>
            <Flex gap="3" py="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createAt.toDateString()}</Text>
            </Flex>
            <Card className="prose max-w-full" mt="4">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </>
    )
}

export default IssueDetails
