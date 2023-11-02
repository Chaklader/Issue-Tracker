'use client'

import 'easymde/dist/easymde.min.css'
import React, { useState } from 'react'
import { Button, Callout, TextField } from '@radix-ui/themes'
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

    const [error, setError] = useState('')

    const handle = async (data: IssueForm) => {
        try {
            await axios.post('/api/issues', data)
            router.push('/issues')
            router.refresh()
        } catch (error) {
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
            <form className="space-y-3" onSubmit={handleSubmit(handle)}>
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
        </div>
    )
}

export default NewIssuePage
