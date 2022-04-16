import { useEffect, useState } from "react";
import UserInfoCard from "../components/UserInfoCard";
import MainLayout from "../layout/Main";

const Home = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch('/api/users')
            .then((response) => response.json())
            .then((r) => setUsers(r))
    }, [])
    return <>
        <MainLayout title={'Usuarios'}>
            <div className="my-2 py-5 divide-y divide-neutral-300">
                {users.map((user, key) => <UserInfoCard key={key} data={user} />)}
                {users.map((user, key) => <UserInfoCard key={key} data={user} />)}
                {users.map((user, key) => <UserInfoCard key={key} data={user} />)}
            </div>
        </MainLayout>
    </>
}
export default Home;