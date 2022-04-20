import moment from "moment";

const CardInfo = ({ data, fullName, set }) => {
    const { cardProvider, cardNumber, cardExpDate, cardPin, cardCvv } = data
    return <div className="center flex-col">
        <div className="bg-gray-scale-50 dark:bg-black/80 dark:text-white grid grid-cols-2 rounded-lg w-[360px] p-4 border border-neutral-300 dark:border-neutral-800 duration-300 backdrop-blur-sm">
            <span className='whitespace-nowrap'>{fullName}</span>
            <span className='justify-end flex'>{cardProvider}</span>
            <span className='col-span-2 center my-12 font-mono text-xl'>{cardNumber}</span>
            <div className="grid grid-cols-3 col-span-2">
                <div className='flex flex-col center'>
                    <span className="text-neutral-500">EXP</span>
                    {moment(cardExpDate).format('MMM / YY')}
                </div>
                <div className='flex flex-col center'>
                    <span className="text-neutral-500">PIN</span>
                    {cardPin}
                </div>
                <div className='flex flex-col center'>
                    <span className="text-neutral-500">CVV</span>
                    {cardCvv}
                </div>
            </div>
        </div>
        <button
            onClick={() => set(false)}
            className="border border-red-500 rounded-lg w-[340px] py-3 my-2 text-red-500">
            CERRAR
        </button>
    </div>
}
export default CardInfo;