import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "../components/Animate";
import { IoMoon, IoSunny, IoAdd } from "react-icons/io5";
import UseDarkTheme from "../hooks/UseDarkTheme";

const MainLayout = ({ children, title, modalOpen, set, getUser }) => {
    const [isOnFocus, setIsOnFocus] = useState(false);
    const { theme, handleTheme } = UseDarkTheme();
    return <>
        <motion.section
            animate={{ scale: modalOpen ? 0.93 : 1 }}
            transition={{ duration: 0.1, type: 'easeInOut' }}
            className={`${modalOpen ? 'rounded-t-lg overflow-hidden inset-x-0' : 'inset-0'} fixed  bg-gray-scale-10 dark:bg-neutral-900 duration-300`}>
            <motion.div
                animate={{ opacity: isOnFocus ? 0 : 1, y: isOnFocus ? -100 : 0, height: isOnFocus ? 0 : 70 }}
                transition={{ duration: 0.3, type: 'easeInOut' }}
                className="sticky z-10 px-4 py-2 top-0 center-y justify-between">
                <span className="text-5xl font-bold dark:text-white">{title}</span>
                <div className="center-y">
                    <button onClick={() => set(true)} className="text-black dark:text-white mx-6">
                        <IoAdd size={30} />
                    </button>
                    <button onClick={handleTheme}>
                        {theme == 'dark'
                            ? <FadeIn show={true}>
                                <IoMoon size={20} color={'#fff'} />
                            </FadeIn>
                            : <FadeIn show={true}>
                                <IoSunny size={25} />
                            </FadeIn>}
                    </button>
                </div>
            </motion.div>
            <div className={`${isOnFocus ? 'mt-4' : 'mt-20'} duration-200 overflow-y-auto h-full fixed inset-0 `}>
                <SearchBar getUser={getUser } isOnFocus={isOnFocus} setIsOnFocus={setIsOnFocus} />
                <FadeIn show={!isOnFocus} className='mx-2'>
                    {children}
                </FadeIn>
            </div>
        </motion.section>
    </>
}
export default MainLayout;