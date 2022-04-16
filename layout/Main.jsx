import SearchBar from "../components/SearchBar";
import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "../components/Animate";

const MainLayout = ({ children, title }) => {
    const [isOnFocus, setIsOnFocus] = useState(false);
    return <>
        <motion.section
            animate={{opacity:[0, 1]}}
            className="fixed inset-0 bg-gray-scale-10">
            <motion.div
                animate={{ opacity: isOnFocus ? 0 : 1, y: isOnFocus ? -100 : 0, height: isOnFocus ? 0 : 70 }}
                transition={{ duration: 0.3, type: 'easeInOut' }}
                className="sticky px-4 py-2 top-0">
                <span className="text-5xl font-bold">{title}</span>
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