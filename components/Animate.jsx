import { motion, AnimatePresence } from "framer-motion";

export const FadeIn = ({ children, show, className, duration = 0.3 }) => {
    const variants = {
        hidden: { opacity: 0, x: 0 },
        enter: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 0 }
    }
    return <>
        <AnimatePresence>
            {show &&
                <motion.div
                    key={'modal'}
                    initial='hidden'
                    animate='enter'
                    exit='exit'
                    variants={variants}
                    transition={{ duration: duration, ease: 'easeInOut' }}
                    className={className}
                >
                    {children}
                </motion.div>}
        </AnimatePresence>
    </>
}
export const FadeInModal = ({ children, show, set, className, speed = 0.4 }) => {
    const variants = {
        hidden: { x: 0, y: 1000 },
        enter: { x: 0, y: 0 },
        exit: { x: 0, y: 1000 }
    }
    return <>
        <AnimatePresence>
            {show && <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => set(false)}
                    className="fixed inset-0 bg-black/30"
                />
                <motion.div
                    key={'modal'}
                    initial='hidden'
                    animate='enter'
                    exit='exit'
                    variants={variants}
                    transition={{ duration: speed, ease: 'easeInOut' }}
                    className={className}
                >
                    {children}
                </motion.div>
            </>

            }
        </AnimatePresence>
    </>
}