import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FadeInModal } from "../components/Animate";
import CreateModal from "../components/CreateModal";
import EditModal from "../components/EditModal";
import UserInfoCard from "../components/UserInfoCard";
import MainLayout from "../layout/Main";
import useSWR from "swr";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [edit, setEdit] = useState(false);
    const [create, setCreate] = useState(false);

    const getData = url => fetch(url).then(r => r.json())
    const { data, error } = useSWR('/api/users', getData);
    const getUser = (user) => {
        setUser(user)
        setEdit(true)
    };
    return <>
        <MainLayout set={setCreate} title={'Usuarios'} modalOpen={edit || create}>
            <div className="my-2 pb-16 divide-y divide-neutral-300 dark:divide-neutral-600 mx-4">
                {data?.map((user, key) => <UserInfoCard
                    key={key}
                    data={user}
                    setEdit={setEdit}
                    getUser={getUser}
                />)}
            </div>
        </MainLayout>
        <FadeInModal
            show={edit}
            className={'fixed inset-0 top-4 bg-gray-scale-10 dark:bg-neutral-900 rounded-t-lg p-4'}
            speed={0.3}
        >
            <EditModal setEdit={setEdit} edit={edit} user={user} />
        </FadeInModal>
        <FadeInModal
            show={create}
            className={'fixed inset-0 top-4 bg-gray-scale-10 dark:bg-neutral-900 rounded-t-lg p-4'}
            speed={0.3}
        >
            <CreateModal setCreate={setCreate} />
        </FadeInModal>

    </>
}
export default Home;