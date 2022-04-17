import { useState } from "react"
import useSWR, { useSWRConfig } from 'swr'

const UseUpdateUser = () => {
    const [res, serRes] = useState()
    const { mutate } = useSWRConfig()
    const submitUpdate = async (body) => {
        const response = await fetch('/api/users', {
            method: 'PUT',
            body: JSON.stringify(body)
        })
        if (!response.ok) return ('error del servidor')
        const data = await response.json()
        mutate('/api/users')
    }
    return {
        res,
        submitUpdate
    }
}
export default UseUpdateUser