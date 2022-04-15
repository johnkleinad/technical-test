import { useEffect, useState } from "react";
import UserInfoCard from "../components/UserInfoCard";

const Home = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch('/api/users')
            .then((response) => response.json())
            .then((r) => setUsers(r))
    }, [])
    return <>
        <section className="absolute inset-0 p-4 bg-gray-scale-10">
            <h2 className="text-3xl font-semibold">Usuarios</h2>
            <div className="my-2">
                {users.map((user, key) => <UserInfoCard key={key} data={user}/>)}
            </div>
        </section>
    </>
}
export default Home;