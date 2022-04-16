import { createRef, useState } from 'react'
import { FadeInModal } from './Animate';
import ModalOptions from './ModalOptions';
import { IoCopy, IoCreateOutline } from "react-icons/io5";

const UserInfoCard = ({ data }) => {
    const { firstName, secondName, familyName, lastName, email, cel, birthday, assignedAnalyst, id } = data
    const [isOpenCard, setIsOpenCard] = useState();
    const [showStatus, setShowStatus] = useState();
    const [userStatus, setUserStatus] = useState(data.status);
    const userId = createRef();
    const copyToClipboard = (msg) => {
        userId.current.select();
        userId.current.setSelectionRange(0, 99999);
        window.document.execCommand("copy");
        alert("ID copiado al portapapeles");
    };
    const statusOptions = [
        { name: 'PENDIENTE', color: 'bg-neutral-400' },
        { name: 'EN PROCESO', color: 'bg-yellow-500' },
        { name: 'COMPLETADO', color: 'bg-green-600' }
    ]
    const colorStatus = statusOptions.find((color) => color.name == userStatus)
    return <>
        <div className=' w-full flex p-2 px-4 h-[250px] text-sm mb-5'>
            <div className="flex flex-col justify-between w-full">
                <div className="flex flex-col">
                    <span className="text-primary-50 font-semibold capitalize">{`${firstName} ${secondName} ${familyName} ${lastName}`}</span>
                    <button onClick={() => copyToClipboard(id)} className="text-neutral-400 center-y">
                        <IoCopy/> <span className="mx-2">ID: <input ref={userId} disabled className='truncate text-black' value={id} /></span>
                    </button>
                </div>
                <div className="flex flex-col">
                    <span className="text-neutral-400">MAIL</span>
                    <span>{email}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-neutral-400">TELEFONO</span>
                    <span>{cel}</span>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <span className="text-neutral-400">F. DE NACIMIENTO</span>
                        <span>{birthday}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-neutral-400">ANALISTA</span>
                        <span>{assignedAnalyst}</span>
                    </div>
                </div>
                <div className="flex justify-between whitespace-nowrap w-full">
                    <button
                        onClick={() => setShowStatus(!showStatus)}
                        className={`${colorStatus.color} text-white rounded px-3 py-2`}>
                        {userStatus}
                    </button>
                    <button
                        onClick={() => setIsOpenCard(!isOpenCard)}
                        className="bg-primary-100 text-white rounded  px-3 py-2">
                        Mostrar tarjeta
                    </button>
                </div>
            </div>
            <div className='w-10'>
                <IoCreateOutline size={20}/>
            </div>
        </div>
        <FadeInModal show={showStatus} set={setShowStatus}>
            <ModalOptions
                message={'Agrega un status al usuario.'}
                arrayOpiopns={statusOptions}
                selection={setUserStatus}
                close={setShowStatus}
            />
        </FadeInModal>
    </>
}
export default UserInfoCard;