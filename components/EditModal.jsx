import { useState, useEffect } from "react";
import UseFromInputs from "../hooks/UseFromInputs";
import { FadeInModal } from "./Animate"
import CustomInput from "./CustomInput"
import { User } from '../model/user'
import ModalOptions from "./ModalOptions";

const EditModal = ({ setEdit, user }) => {
    const [showStatus, setShowStatus] = useState(false);
    const [userStatus, setUserStatus] = useState(user.status);
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
    const submitEdit = () => {
        if (userInputs.some((userInput) => userInput.input.value == '')) return console.log('Necestia todos los parametros');
        console.log(new User(userInputs.map((userInput) => userInput)));
    }
    const colorStatus = statusOptions.find((status) => status.name == userStatus)
    console.log(colorStatus);
    return <>
        <div className="flex relative justify-between h-12">
            <button onClick={() => setEdit(false)}>Cancelar</button>
            <div className="absolute inset-x-0 center font-semibold -top-2 text-lg">
                <span>Editar</span>
            </div>
            <button onClick={submitEdit}>Listo</button>
        </div>
        <div className="h-full">
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