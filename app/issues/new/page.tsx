'use client'

import 'easymde/dist/easymde.min.css'
import React from 'react'
import { Button, TextField } from '@radix-ui/themes'
import SimpleMdeReact from 'react-simplemde-editor'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface IssueForm {
    title: string
    description: string
}

const NewIssuePage = () => {
    const router = useRouter()
    const { register, control, handleSubmit } = useForm<IssueForm>()

    return (
        <form
            className="max-w-xl space-y-3"
            onSubmit={handleSubmit(async (data) => {
                await axios.post('/api/issues', data)
                router.push('/issues')
                router.refresh()
            })}
        >
            <TextField.Root>
                <TextField.Input
                    placeholder="Title"
                    {...register('title')}
                ></TextField.Input>
            </TextField.Root>
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <SimpleMdeReact placeholder="Description" {...field} />
                )}
            />
            <Button>Submit New Issue</Button>
        </form>
    )
}

export default NewIssuePage
