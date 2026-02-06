"use client";

import { useState } from "react";
import { createProjectAction } from "../actions/project";

export default function CreateProjectForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function onSubmit(e:React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = {title , description}
        const res = await createProjectAction(data);
        console.log(res)
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Create</button>
            </form>
        </>
    )
}