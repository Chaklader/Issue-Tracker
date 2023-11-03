'use client'

import 'easymde/dist/easymde.min.css'
import React, { useState } from 'react'
import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMdeReact from 'react-simplemde-editor'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { issueSchema } from '@/app/validationSchema'
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import dynamic from 'next/dynamic'
import { Issue } from '@prisma/client'

type IssueFormData = z.infer<typeof issueSchema>
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false,
})

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const router = useRouter()
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema),
    })

    const [error, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)

    const onSubmit = async (data: IssueFormData) => {
        try {
            setSubmitting(true)
            await axios.post('/api/issues', data)
            router.push('/issues')
            router.refresh()
        } catch (error) {
            setSubmitting(false)
            setError('An Unexpected Error Occurred')
        }
    }

    return (
        <div className="max-w-xl">
            {error && (
                <Callout.Root color="red" className="mb-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                <TextField.Root>
                    <TextField.Input
                        placeholder="Title"
                        defaultValue={issue?.title}
                        {...register('title')}
                    ></TextField.Input>
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => (
                        <SimpleMdeReact placeholder="Description" {...field} />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    Submit New Issue {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default IssueForm
