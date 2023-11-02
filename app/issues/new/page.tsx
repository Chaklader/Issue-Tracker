'use client'

import 'easymde/dist/easymde.min.css'
import React from 'react'
import { Button, TextField } from '@radix-ui/themes'
import SimpleMdeReact from 'react-simplemde-editor'

const NewIssuePage = () => {
    return (
        <div className="max-w-xl space-y-3">
            <TextField.Root>
                <TextField.Input placeholder="Title"></TextField.Input>
            </TextField.Root>
            <SimpleMdeReact placeholder="Description" />
            <Button>Submit New Issue</Button>
        </div>
    )
}

export default NewIssuePage
