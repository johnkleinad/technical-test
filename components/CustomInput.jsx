const CustomInput = ({ value, name, type = 'text' }) => {
    return <>
        <label className="text-neutral-600">{name}</label>
        <input
            className="w-full h-10 mb-2 px-2 focus:outline-none"
            {...value}
            type={type}
        />
    </>
}
export default CustomInput