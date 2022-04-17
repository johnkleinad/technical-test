import { useState, useEffect } from "react";
import UseFromInputs from "../hooks/UseFromInputs";
import { FadeInModal } from "./Animate"
import CustomInput from "./CustomInput"
import { User } from '../model/user'
import ModalOptions from "./ModalOptions";
import Router from "next/router";
import UseUpdateUser from "../hooks/UseUpdateUser";

const EditModal = ({ setEdit, user }) => {
    const [showStatus, setShowStatus] = useState(false);
    const [userStatus, setUserStatus] = useState(user.status);
    const [message, setMessage] = useState();
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
    const submitEdit =() => {
        if (userInputs.some((userInput) => userInput.input.value == '')) return console.log('Necestia todos los parametros');
        const body = new User({value:userInputs.map((userInput) => userInput), status:userStatus});
        update.submitUpdate(body)
        console.log(update.res)
        setTimeout(() => {
            setEdit(false)
        }, 1000);
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
                className={`${statusOptions[userStatus]} text-white rounded px-3 py-2 mt-2 w-full`}>
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
                arrayOpiopns={Object.entries(statusOptions)}
                selection={setUserStatus}
                close={setShowStatus}
            />
        </FadeInModal>
    </>
}
export default EditModal;