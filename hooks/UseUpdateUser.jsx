import { useState } from "react"
import { useSWRConfig } from 'swr'

const UseUpdateUser = () => {
    const [res, setRes] = useState({});
    const { mutate } = useSWRConfig();
    const submitUpdate = async (body) => {
        const response = await fetch('/api/users', {
            method: 'PUT',
            body: JSON.stringify(body)
        });
        if (!response.ok) return ('error del servidor')
        const data = await response.json()
        if (data) {
            setRes(data)
        }
        mutate('/api/users')
    };
    return {
        res,
        submitUpdate
    }
}
export default UseUpdateUser