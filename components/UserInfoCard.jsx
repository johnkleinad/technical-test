import { createRef, useState } from 'react'
import { motion } from 'framer-motion';
import { FadeIn } from './Animate';

const UserInfoCard = ({ data }) => {
    const { firstName, secondName, familyName, lastName, email, cel, birthday, assignedAnalyst, id } = data
    const [isOpenCard, setIsOpenCard] = useState();
    const [showStatus, setShowStatus] = useState();
    const userId = createRef();
    const copyToClipboard = (msg) => {
        userId.current.select();
        userId.current.setSelectionRange(0, 99999);
        window.document.execCommand("copy");
        alert("Código copiado al portapapeles");
    };

    return <>
        <div className='shadow-lg rounded-lg w-full flex p-3 border border-gray-300 h-[300px] text-sm mb-5'>
            <div className="flex flex-col justify-between w-full">
                <div className="flex flex-col">
                    <span className="text-primary-50 font-semibold capitalize">{`${firstName} ${secondName} ${familyName} ${lastName}`}</span>
                    <button onClick={() => copyToClipboard(id)} className="text-gray-300 ">
                        icon ID: <input ref={userId} disabled className=' truncate' value={id} />
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
                    <select onClick={() => setShowStatus(!showStatus)} className="bg-primary-100 text-white rounded px-3 py-2">
                        <SelectOptions showStatus={showStatus} />
                    </select>
                    <button
                        onClick={() => setIsOpenCard(!isOpenCard)}
                        className="bg-primary-100 text-white rounded  px-3 py-2">
                        Mostrar tarjeta
                    </button>
                </div>
            </div>
        </div>
    </>
}
const SelectOptions = ({showStatus}) => {
    <FadeIn show={showStatus}>
        <div onClick={() => setShowStatus(false)} className="fixed inset-0 bg-black/30" />
        <div className='absolute w-full shadow bottom-0 inset-x-0 px-1 flex justify-end flex-col text-gray-scale-50'>
            <div className="flex flex-col bg-neutral-900/80 backdrop-blur-sm rounded-xl divide-y divide-neutral-500 overflow-hidden">
                <div className="center text-xs text-neutral-400 py-5 font-semibold">
                    <span>Agrega un status al usuario.</span>
                </div>
                {['Pendiente', 'En Proceso', 'Completado'].map((statusOption) =>
                    <option className='h-12 w-full center' value={statusOption}>
                        <button className='hover:bg-neutral-900'>{statusOption}</button>
                    </option>)}
            </div>
            <button
                onClick={() => setShowStatus(false)}
                className='w-full bg-neutral-900/80 h-12 rounded-xl my-1 text-red-600 backdrop-blur-sm'>
                Cancelar
            </button>
        </div>
    </FadeIn>
}
export default UserInfoCard;