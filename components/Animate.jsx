import { motion, AnimatePresence } from "framer-motion";

const variants = {
    hidden: { opacity: 0, x: 0, y: 20 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 20 }
}
export const FadeIn = ({ children, show }) => {
    return <>
        <AnimatePresence>
            {show &&
                <motion.div
                    key={'modal'}
                    initial='hidden'
                    animate='enter'
                    exit='exit'
                    variants={variants}
                    transition={{ duration: 0.2, type: 'easeInOut' }}
                    className='fixed inset-0 '
                >
                    {children}
                </motion.div>}
        </AnimatePresence>
    </>
}