import { createRef, useState, useEffect } from 'react'
import { FadeInModal } from './Animate';
import ModalOptions from './ModalOptions';
import { IoCopy, IoCreateOutline } from "react-icons/io5";
import UseUpdateUser from '../hooks/UseUpdateUser';
import { User } from '../model/user'

const UserInfoCard = ({ data, getUser }) => {
    const { firstName, secondName, familyName, lastName, email, cel, birthday, assignedAnalyst, id, status } = data
    const [isOpenCard, setIsOpenCard] = useState();
    const [showStatus, setShowStatus] = useState(false);
    const [userStatus, setUserStatus] = useState(status);
    const { submitUpdate } = UseUpdateUser();
    useEffect(() => {
        setUserStatus(status);
    }, [data])
    useEffect(() => {
        submitUpdate({
            firstName, secondName, familyName, lastName, email, cel, birthday, assignedAnalyst, id,
             status: userStatus
        })
    }, [userStatus])
    const userId = createRef();
    const copyToClipboard = (msg) => {
        userId.current.select();
        userId.current.setSelectionRange(0, 99999);
        window.document.execCommand("copy");
        alert("ID copiado al portapapeles");
    };
    const statusOptions = {
        'PENDIENTE': 'bg-neutral-400',
        'EN PROCESO': 'bg-yellow-500',
        'COMPLETADO': 'bg-green-600'
    }
    return <>
        <div className=' w-full flex p-2 px-0 h-[250px] text-sm mb-5'>
            <div className="flex flex-col justify-between w-full">
                <div className="flex flex-col">
                    <span className="text-primary-50 dark:text-white font-semibold capitalize select-none">{`${firstName} ${secondName} ${familyName} ${lastName}`}</span>
                    <button onClick={() => copyToClipboard(id)} className="text-neutral-400 center-y">
                        <IoCopy /> <span className="mx-2">ID: <input ref={userId} className='truncate select-none focus:outline-none bg-transparent' value={id} /></span>
                    </button>
                </div>
                <div className="flex flex-col">
                    <span className="text-neutral-400">MAIL</span>
                    <span className='dark:text-white'>{email}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-neutral-400">TELEFONO</span>
                    <span className='dark:text-white'>{cel}</span>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <span className="text-neutral-400">F. DE NACIMIENTO</span>
                        <span className='dark:text-white'>{birthday}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-neutral-400">ANALISTA</span>
                        <span className='dark:text-white'>{assignedAnalyst}</span>
                    </div>
                </div>
                <div className="flex justify-between whitespace-nowrap w-full">
                    <button
                        onClick={() => setShowStatus(!showStatus)}
                        className={`${statusOptions[userStatus]} duration-500 text-white rounded px-3 py-2 w-32`}>
                        {userStatus}
                    </button>
                    <button
                        onClick={() => setIsOpenCard(!isOpenCard)}
                        className="bg-primary-100 text-white rounded  px-3 py-2">
                        Mostrar tarjeta
                    </button>
                </div>
            </div>
            <button onClick={() => getUser(data)} className='w-10 center-x text-black dark:text-white'>
                <IoCreateOutline size={20} />
            </button>
        </div>
        <FadeInModal
            show={showStatus}
            set={setShowStatus}
            className={'fixed bottom-6 inset-x-0'}
        >
            <ModalOptions
                message={'Elige un estatus para el usuario.'}
                arrayOpiopns={Object.entries(statusOptions)}
                selection={setUserStatus}
                close={setShowStatus}
            />
        </FadeInModal>
    </>
}
export default UserInfoCard;