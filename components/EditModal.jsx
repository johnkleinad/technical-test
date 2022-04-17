import { useState, useEffect } from "react";
import UseFromInputs from "../hooks/UseFromInputs";
import { FadeInModal } from "./Animate"
import CustomInput from "./CustomInput"
import { User } from '../model/user'
import ModalOptions from "./ModalOptions";
import Router from "next/router";

const EditModal = ({ setEdit, user }) => {
    const [showStatus, setShowStatus] = useState(false);
    const [userStatus, setUserStatus] = useState(user.status);
    const [message, setMessage] = useState();
    const statusOptions = [
        { name: 'PENDIENTE', color: 'bg-neutral-400' },
        { name: 'EN PROCESO', color: 'bg-yellow-500' },
        { name: 'COMPLETADO', color: 'bg-green-600' }
    ]
    const userInputs = Object.entries(user).map((uInput) => {
        return {
            name: uInput[0],
            input: UseFromInputs(uInput[1])
        }
    })
    const submitEdit = async () => {
        if (userInputs.some((userInput) => userInput.input.value == '')) return console.log('Necestia todos los parametros');
        const body = new User({value:userInputs.map((userInput) => userInput), status:userStatus});
        console.log(body);
        const response = await fetch('/api/users', {
            method: 'PUT',
            body: JSON.stringify(body)
        })
        if (!response.ok) return ('error del servidor')
        const data = await response.json()
        console.log(data);
        if (data.message == 'ok') {
            setEdit(false)
            // setTimeout(() => {
            //     Router.reload('/home')
            // }, 800);
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
            Router.reload('/home')
        }, 800);
    }
    const colorStatus = statusOptions.find((status) => status.name == userStatus)
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
            <button
                onClick={() => setShowStatus(!showStatus)}
                className={`${colorStatus.color} text-white rounded px-3 py-2 mt-2 w-full`}>
                {userStatus}
            </button>
            <button
                onClick={() => deleteUser(user.id)}
                className={`bg-red-500 text-white rounded px-3 py-2 mt-2 w-full`}>
                Eliminar Usuario
            </button>
            <div className="center text-green-500">
                <span>{message}</span>
            </div>
        </div>
        <FadeInModal
            show={showStatus}
            set={setShowStatus}
            className={'absolute bottom-0 inset-x-0'}
        >
            <ModalOptions
                message={'Agrega un status al usuario.'}
                arrayOpiopns={statusOptions}
                selection={setUserStatus}
                close={setShowStatus}
            />
        </FadeInModal>
    </>
}
export default EditModal;