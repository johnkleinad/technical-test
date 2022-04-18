import { useState, useEffect } from "react";
import UseFromInputs from "../hooks/UseFromInputs";
import { FadeInModal } from "./Animate"
import CustomInput from "./CustomInput"
import { User } from '../model/user'
import ModalOptions from "./ModalOptions";
import Router from "next/router";
import UseUpdateUser from "../hooks/UseUpdateUser";
import UseLoading from "../hooks/UseLoading";

const EditModal = ({ setEdit, user }) => {
    const [showStatus, setShowStatus] = useState(false);
    const [userStatus, setUserStatus] = useState(user.status);
    const [message, setMessage] = useState();
    const load = UseLoading(false)
    const [isConfirm, setIsConfirm] = useState(false);
    const update = UseUpdateUser()
    const statusOptions = {
        'PENDIENTE': 'bg-neutral-400',
        'EN PROCESO': 'bg-yellow-500',
        'COMPLETADO': 'bg-green-600'
    }
    const userInputs = Object.entries(user).map((uInput) => {
        return {
            name: uInput[0],
            input: UseFromInputs(uInput[1])
        }
    })
    const submitEdit = () => {
        load.setLoading(true)
        if (userInputs.some((userInput) => userInput.input.value == '')) {
            load.setLoading(false)
            setMessage('Necestia todos los parametros')
            return
        };
        const body = new User({ value: userInputs.map((userInput) => userInput), status: userStatus });
        update.submitUpdate(body)
        if (update.res) {
            console.log(update.res);
            setTimeout(() => {
                setEdit(false)
            }, 1000);
        }
    }
    const deleteUser = (id) => {
        fetch('/api/users', {
            method: 'DELETE',
            body: JSON.stringify({ id: id })
        })
            .then((response) => response.json())
            .then((r) => console.log(r))
        setMessage('Usuario Eliminado con éxito')
        setTimeout(() => {
            setEdit(false)
        }, 800);
    }
    return <>
        <div className="flex relative justify-between h-12 dark:text-white">
            <button onClick={() => setEdit(false)}>Cancelar</button>
            <div className="absolute inset-x-0 center font-semibold -top-2 text-lg">
                <span>Editar</span>
            </div>
            <button onClick={submitEdit}>Listo</button>
        </div>
        <div className="h-full overflow-y-auto pb-12">
            {userInputs.map((uInput, index) => {
                return index > 0 && index < 8 &&
                    <div className="">
                        <CustomInput
                            value={uInput.input}
                            name={uInput.name}
                        />
                    </div>
            })}
            <div className="center text-green-500">
                <span>{message}</span>
            </div>
            <button
                onClick={() => setShowStatus(!showStatus)}
                className={`${statusOptions[userStatus]} text-white rounded px-3 py-2 mt-2 w-full`}>
                {userStatus}
            </button>
            <button
                onClick={() => setIsConfirm(true)}
                className={`bg-red-500 text-white rounded px-3 py-2 mt-2 w-full`}>
                Eliminar Usuario
            </button>

        </div>
        <FadeInModal
            show={showStatus}
            set={setShowStatus}
            className={'absolute bottom-0 inset-x-0'}
        >
            <ModalOptions
                message={'Agrega un status al usuario.'}
                arrayOpiopns={Object.entries(statusOptions)}
                selection={setUserStatus}
                close={setShowStatus}
            />
        </FadeInModal>
        <FadeInModal
            show={isConfirm}
            set={setIsConfirm}
            className={'fixed inset-0 center'}
        >
            <ModalConfirm
                close={setIsConfirm}
                confirm={deleteUser}
                id={user.id}
                message={message}
            />
        </FadeInModal>
        {load.component}
    </>
}
const ModalConfirm = ({ confirm, close, id, message }) => {
    return <>
        <div className="bg-white/50 dark:bg-neutral-900/70 backdrop-blur-sm shadow-sm dark:text-white border dark:border-neutral-800 rounded-xl w-[280px]">
            {
                message ? <div className="p-5 h-full center text-center">
                    {message}
                </div>
                    : <div className="divide-y divide-neutral-200 dark:divide-neutral-600 flex flex-col">
                        <div className="p-5 text-center text-neutral-500 font-bold">
                            <span>¿Estas seguro de eliminar este usuario?</span>
                        </div>
                        <div className="flex divide-x divide-neutral-200 dark:divide-neutral-600">
                            <button onClick={() => confirm(id)} className="w-full py-3 text-lg">Aceptar</button>
                            <button onClick={() => close(false)} className="w-full py-3 text-lg text-red-500">Cancelar</button>
                        </div>
                    </div>
            }
        </div>
    </>
}
export default EditModal;