import { IoSearch, IoCloseCircleSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UseFromInputs from "../hooks/UseFromInputs";
import { FadeIn } from "./Animate";
import UserInfoCard from "./UserInfoCard";

const SearchBar = ({ isOnFocus, setIsOnFocus, getUser }) => {
    const [showDeleteAll, setSowDeleteAll] = useState(false);
    const [isShowFilters, seIsShowFilters] = useState(true)
    const [results, setResults] = useState([]);
    const search = UseFromInputs();
    useEffect(() => {
        if (search.value) {
            setSowDeleteAll(true)
            seIsShowFilters(false)
            handleSearch(search.value)
            return
        }
        seIsShowFilters(true)
        setSowDeleteAll(false)
    }, [search.value])

    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
    function saveInput() {
        console.log('Saving data');
    }
    const processChange = debounce(() => saveInput());

    const handleSearch = async (value) => {
        const response = await fetch('/api/filter', {
            method: 'POST',
            body: JSON.stringify({ value }),
            headers: {
                'content-type': 'application/json'
            }
        })
        if (!response.ok) return console.log('error');
        const data = await response.json()
        setResults(data);
    }
    const handleCancel = () => {
        setResults([])
        setIsOnFocus(false)
        search.setValue('')
    }
    const variants = {
        hidden: { opacity: 0, x: 30, y: 0, width: 0 },
        enter: { opacity: 1, x: 0, y: 0, width: 'auto' },
        exit: { opacity: 0, x: 30, y: 0, width: 0 }
    }
    const statusOptions = {
        'PENDIENTE': 'border-neutral-400',
        'EN PROCESO': 'border-yellow-500',
        'COMPLETADO': 'border-green-600'
    }
    return <>
        <div className={`${isOnFocus && 'sticky top-0'} flex backdrop-blur-sm pb-3`}>
            <div
                className="p-1 px-2 center-y bg-neutral-200 dark:bg-neutral-800 duration-300 rounded-lg mx-4 w-full">
                <IoSearch color="#a0a0a0" />
                <input
                    onFocus={() => setIsOnFocus(true)}
                    placeholder="Buscar"
                    className="bg-transparent mx-1 w-full focus:outline-none dark:text-white"
                    type="text"
                    {...search}
                />
                {showDeleteAll &&
                    <IoCloseCircleSharp
                        color="#a0a0a0"
                        onClick={() => search.setValue('')}
                    />}
            </div>
            <AnimatePresence>
                {isOnFocus &&
                    <motion.button
                        initial='hidden'
                        animate='enter'
                        exit='exit'
                        variants={variants}
                        transition={{ duration: 0.3, type: 'easeInOut' }}
                        onClick={handleCancel}
                        className="mr-4 text-red-600 focus:outline-none"
                    >
                        Cancelar
                    </motion.button>}
            </AnimatePresence>
        </div>
        <FadeIn
            show={isOnFocus}
            className="w-full flex my-4 px-2"
            duration={0.1}
        >
            <div className='flex w-full'>
                {Object.entries(statusOptions).map((statusOption, key) => {
                    return <button key={key} onClick={() => search.setValue(statusOption[0])} className={`${statusOption[1]} text-sm w-full mx-1 rounded border p-1 text-center dark:text-white`}>{statusOption[0]}</button>
                })}
            </div>
        </FadeIn>

        <FadeIn show={isOnFocus} duration={0.5} className={'auto-grid mx-3'}>
            {results.map((result, key) => {
                return <div key={key}  className="border dark:border-neutral-700 px-2 rounded-md ">
                    <UserInfoCard data={result} getUser={getUser} />
                </div>
            })}
        </FadeIn>
    </>
}
export default SearchBar;