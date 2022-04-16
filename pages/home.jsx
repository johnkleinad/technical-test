import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FadeInModal } from "../components/Animate";
import EditModal from "../components/EditModal";
import UserInfoCard from "../components/UserInfoCard";
import MainLayout from "../layout/Main";

const Home = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])
    const [edit, setEdit] = useState(false)
    useEffect(() => {
        fetch('/api/users')
            .then((response) => response.json())
            .then((r) => setUsers(r))
            .catch((e) => console.log(e))
    }, [])
    const getUser = (user) => {
        setUser(user)
        setEdit(true)
    }
    return <>
        <MainLayout title={'Usuarios'} modalOpen={edit}>
            <div className="my-2 py-5 divide-y divide-neutral-300">
                {users.map((user, key) => <UserInfoCard
                    key={key}
                    data={user}
                    setEdit={setEdit}
                    getUser={getUser}
                />)}
                {users.map((user, key) => <UserInfoCard
                    key={key}
                    data={user}
                    setEdit={setEdit}
                    getUser={getUser}
                />)}
                {users.map((user, key) => <UserInfoCard
                    key={key}
                    data={user}
                    setEdit={setEdit}
                    getUser={getUser}
                />)}
            </div>
        </MainLayout>

        <AnimatePresence>
            {edit &&
                <FadeInModal
                    show={edit}
                    className={'fixed inset-0 top-10 bg-gray-scale-10 rounded-t-lg p-4'}
                    speed={0.2}
                >
                    <EditModal setEdit={setEdit} edit={edit} user={user} />
                </FadeInModal>}
        </AnimatePresence>
    </>
}
export default Home;