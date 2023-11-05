import React from 'react'
import prisma from '@/prisma/client'
import IssueActions from '@/app/issues/list/IssueActions'
import { Issue, Status } from '@prisma/client'
import Pagination from '@/app/components/Pagination'
import IssueTable, { columnNames } from '@/app/issues/list/issueTable'
import { Flex } from '@radix-ui/themes'

export interface IssueQuery {
    status: Status
    orderBy: keyof Issue
    page: string
}

interface Props {
    searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
    const statuses = Object.values(Status)

    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined

    const where = { status }

    const orderBy =
        columnNames.includes(searchParams.orderBy) && searchParams.orderBy
            ? { [searchParams.orderBy]: 'asc' }
            : undefined

    const page = parseInt(searchParams.page) || 1
    const pageSize = 10

    const issueCount = await prisma.issue.count({ where })

    const issues = await prisma.issue.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
    })
    return (
        <Flex direction="column" gap="3">
            <IssueActions />
            <IssueTable searchParams={searchParams} issues={issues} />
            <Pagination
                itemCount={issueCount}
                pageSize={pageSize}
                currentPage={page}
            />
        </Flex>
    )
}

export const dynamic = 'force-dynamic'
// export const revalidate = 60

export default IssuesPage
