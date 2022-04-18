const CustomInput = ({ value, name }) => {
    const typeInput = {
        'telefono': 'tel',
        'cel': 'tel',
        'email': 'email',
        'birthday': 'date'
    }
    return <div className="flex flex-col">
        <label className="text-neutral-600 dark:text-neutral-200">{name}</label>
        <input className="w-full rounded h-10 mb-2 px-2 focus:outline-none dark:bg-neutral-800 dark:text-white"
            {...value}
            type={!typeInput[name] ? 'text' : typeInput[name]}
        />
    </div>
}
export default CustomInput