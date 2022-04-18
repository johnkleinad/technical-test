import React from 'react'
import UseFromInputs from '../hooks/UseFromInputs'
import CustomInputs from './CustomInput'
import { NewUser } from '../model/user'
import { useState } from 'react'
import { useSWRConfig } from 'swr'
import UseLoading from '../hooks/UseLoading'

const CreateModal = ({ setCreate }) => {
  const { mutate } = useSWRConfig();
  const [message, setMessage] = useState();
  const { setLoading, component } = UseLoading(false)
  const userData = [
    'email',
    'telefono',
    'nombre',
    'segundo nombre',
    'apellido paterno',
    'apellido materno',
    'birthday',
    'analista asignado',
  ]
  const userInputs = userData.map((uInput) => {
    return {
      name: uInput,
      input: UseFromInputs('')
    }
  })
  const submitAdd = async () => {
    setLoading(true)
    if (userInputs.some((userInput) => userInput.input.value == '')){
      setLoading(false)
      setMessage('Debes llenar todos los campos');
      return
    }
    const body = new NewUser(userInputs.map((userInput) => userInput))
    const response = await fetch('/api/users', {
      body: JSON.stringify(body),
      method: 'POST'
    })
    if (!response.ok) return ('error del servidor')
    const data = await response.json()
    console.log(data)
    mutate('/api/users')
    setTimeout(() => {
      setCreate(false);
    }, 500);
  }
  return <>
    <div className="flex relative justify-between h-12 dark:text-white">
      <button onClick={() => setCreate(false)}>Cancelar</button>
      <div className="absolute inset-x-0 center font-semibold -top-2 text-lg">
        <span>Nuevo usuario</span>
      </div>
      <button onClick={submitAdd}>Listo</button>
    </div>
    <div className='h-full overflow-y-auto pb-16'>
      {userInputs.map((input, key) => {
        return <div key={key} className="capitalize">
          <CustomInputs
            name={input.name}
            value={input.input}
          />
        </div>
      })}
      <div className="center text-green-500 my-2">
        <span>{message}</span>
      </div>
      <button
        onClick={submitAdd}
        className={`bg-primary-100 text-white rounded px-3 py-2 mt-2 w-full`}>
        Agregar Usuario
      </button>
      {component}
    </div>
  </>
}
export default CreateModal