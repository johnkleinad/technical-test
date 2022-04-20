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
    const [edit, setEdit] = useState(false);
    const [create, setCreate] = useState(false);

    const getData = url => fetch(url).then(r => r.json())
    const { data } = useSWR('/api/users', getData, { refreshInterval: 1000 });
    const getUser = (user) => {
        setUsers(user)
        setEdit(true)
    };
    return <>
        <MainLayout getUser={getUser} set={setCreate} title={'Usuarios'} modalOpen={edit || create}>
            <div className="my-2 pb-16 divide-y divide-neutral-300 dark:divide-neutral-600 md:divide-y-0 mx-4 auto-grid">
                {data?.length > 0 ? data?.map((users, key) =>
                    <div key={key} className="md:border md:dark:border-neutral-700 md:px-2 md:rounded-md ">
                        <UserInfoCard
                            data={users}
                            setEdit={setEdit}
                            getUser={getUser}
                        />
                    </div>)
                    : <div className="center dark:text-white font-bold h-full opacity-60 my-10">
                        <span>No hay usuarios agregados</span>
                    </div>}
            </div>
        </MainLayout>
        <FadeInModal
            show={edit}
            className={'fixed inset-0 top-4 bg-gray-scale-10 dark:bg-neutral-900 rounded-t-lg p-4'}
            speed={0.3}
        >
            <EditModal setEdit={setEdit} edit={edit} user={users} />
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