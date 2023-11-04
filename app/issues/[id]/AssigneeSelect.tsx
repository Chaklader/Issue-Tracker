'use client'
import React from 'react'
import { Select } from '@radix-ui/themes'
import { Issue, User } from '@prisma/client'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Skeleton } from '@/app/components'
import { userInfo } from 'os'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const {
        data: users,
        error,
        isLoading,
    } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get<User[]>('/api/users').then((res) => res.data),
        staleTime: 60 * 1000,
        retry: 3,
    })

    if (isLoading) return <Skeleton />
    if (error) return null

    return (
        <Select.Root
            defaultValue={issue.assignedToUserId || ''}
            onValueChange={(userId) => {
                axios.patch('/api/issues/' + issue.id, {
                    assignedToUserId: userId || null,
                })
            }}
        >
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value="">Unassigned</Select.Item>
                    {users?.map((user) => (
                        <Select.Item key={user.id} value={user.id}>
                            {user.name}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect
