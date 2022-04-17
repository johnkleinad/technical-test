import React from 'react'
import UseFromInputs from '../hooks/UseFromInputs'
import CustomInputs from './CustomInput'
import { NewUser } from '../model/user'
import { useState } from 'react'
import Router from 'next/router'

const CreateModal = ({ setCreate }) => {
  const [message, setMessage] = useState();
  console.log(Router);
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
  const submitAdd = () => {
    if (userInputs.some((userInput) => userInput.input.value == '')) return console.log('Necestia todos los parametros');
    const body = new NewUser(userInputs.map((userInput) => userInput))
    console.log(JSON.stringify(body));
    fetch('/api/users', {
      body: JSON.stringify(body),
      method: 'POST'
    })
      .then((response) => response.json())
      .then((r) => setMessage(r.message))
      .catch((e) => { return console.log(e) })
    setTimeout(() => {
      setCreate(false);
      Router.reload('/home')
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
    <div>
      {userInputs.map((input, key) => {
        return <div className="capitalize">
          <CustomInputs
            name={input.name}
            value={input.input}
            key={key}
          />
        </div>
      })}
      <button
        onClick={submitAdd}
        className={`bg-primary-100 text-white rounded px-3 py-2 mt-2 w-full`}>
        Agregar Usuario
      </button>
      <div className="center text-green-500 my-2">
        <span>{message}</span>
      </div>
    </div>
  </>
}
export default CreateModal