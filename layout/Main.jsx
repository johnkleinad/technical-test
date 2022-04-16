import SearchBar from "../components/SearchBar";
import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "../components/Animate";
import { IoMoon, IoSunny } from "react-icons/io5";

const MainLayout = ({ children, title, modalOpen }) => {
    const [isOnFocus, setIsOnFocus] = useState(false);
    return <>
        <motion.section
            animate={{scale: modalOpen ? 0.91 : 1 }}
            className={`${modalOpen && 'rounded-t-lg overflow-hidden'} fixed inset-0 bg-gray-scale-10`}>
            <motion.div
                animate={{ opacity: isOnFocus ? 0 : 1, y: isOnFocus ? -100 : 0, height: isOnFocus ? 0 : 70 }}
                transition={{ duration: 0.3, type: 'easeInOut' }}
                className="sticky px-4 py-2 top-0 center-y justify-between">
                <span className="text-5xl font-bold">{title}</span>
                <button>
                    <FadeIn show={true}>
                        <IoSunny size={25} />
                    </FadeIn>
                </button>
            </motion.div>
            <div className="overflow-y-auto h-full">
                <SearchBar isOnFocus={isOnFocus} setIsOnFocus={setIsOnFocus} />
                <FadeIn show={!isOnFocus}>
                    {children}
                </FadeIn>
            </div>
        </motion.section>
    </>
}
export default MainLayout;