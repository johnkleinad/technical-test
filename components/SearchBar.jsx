import { IoSearch, IoCloseCircleSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UseFromInputs from "../hooks/UseFromInputs";

const SearchBar = ({ isOnFocus, setIsOnFocus }) => {
    const [showDeleteAll, setSowDeleteAll] = useState(false);
    const search = UseFromInputs();
    useEffect(() => {
        if (search.value) return setSowDeleteAll(true)
        setSowDeleteAll(false)
    }, [search.value])
    const handleCancel = () => {
        setIsOnFocus(false)
        search.setValue('')
    }
    const variants = {
        hidden: { opacity: 0, x: 30, y: 0, width: 0 },
        enter: { opacity: 1, x: 0, y: 0, width: 'auto' },
        exit: { opacity: 0, x: 30, y: 0, width: 0 }
    }
    return <>
        <div className="flex">
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
    </>
}
export default SearchBar;