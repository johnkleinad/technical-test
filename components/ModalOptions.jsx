
const ModalOptions = ({message, arrayOpiopns = [], close, selection }) => {
    return <>
        <div className='w-full shadow px-1 text-gray-scale-50 z-50'>
            <div className="flex flex-col bg-neutral-900/80 backdrop-blur-sm rounded-xl divide-y divide-neutral-500 overflow-hidden">
                <div className="center text-xs text-neutral-400 py-5 font-semibold">
                    <span>{message}</span>
                </div>
                {arrayOpiopns.map((statusOption, key) =>
                    <button key={key} onClick={() => { selection(statusOption.name), close(false) }}
                        className='h-12'>
                        {statusOption.name}
                    </button>
                )}
            </div>
            <button
                onClick={() => close(false)}
                className='w-full bg-neutral-900/80 h-12 rounded-xl my-1 text-red-600 backdrop-blur-sm'>
                Cancelar
            </button>
        </div>
    </>
}
export default ModalOptions;