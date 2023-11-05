import React from 'react'
import { Table } from '@radix-ui/themes'
import NextLink from 'next/link'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { IssueStatusBadge, Link } from '@/app/components'
import { Issue } from '@prisma/client'
import { IssueQuery } from '@/app/issues/list/page'

interface Props {
    searchParams: IssueQuery
    issues: Issue[]
}

const IssueTable = async ({ searchParams, issues }: Props) => {
    return (
        <Table.Root variant="surface">
            <Table.Header>
                <Table.Row>
                    {columns.map((column, index) => (
                        <Table.ColumnHeaderCell
                            key={index}
                            className={column.className}
                        >
                            <NextLink
                                href={{
                                    query: {
                                        ...searchParams,
                                        orderBy: column.value,
                                    },
                                }}
                            >
                                {column.label}
                            </NextLink>
                            {column.value === searchParams.orderBy && (
                                <ArrowUpIcon className="inline" />
                            )}
                        </Table.ColumnHeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {issues.map((issue) => (
                    <Table.Row key={issue.id}>
                        <Table.Cell>
                            <Link href={`/issues/${issue.id}`}>
                                {issue.title}
                            </Link>
                            <div className="block md:hidden">
                                <IssueStatusBadge status={issue.status} />
                            </div>
                        </Table.Cell>
                        <Table.Cell className="hidden md:table-cell">
                            <div>
                                <IssueStatusBadge status={issue.status} />
                            </div>
                        </Table.Cell>
                        <Table.Cell className="hidden md:table-cell">
                            {issue.createAt.toDateString()}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}

const columns: {
    label: string
    value: keyof Issue
    className?: string
}[] = [
    {
        label: 'Issue',
        value: 'title',
    },
    {
        label: 'Status',
        value: 'status',
        className: 'hidden md:table-cell',
    },
    {
        label: 'Created',
        value: 'createAt',
        className: 'hidden md:table-cell',
    },
]

export const columnNames = columns.map((column) => column.value)

export default IssueTable
