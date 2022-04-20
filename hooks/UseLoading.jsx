import { useState } from "react"
import { FiLoader } from "react-icons/fi";
import { motion } from "framer-motion";
import { FadeIn } from "../components/Animate";
const UseLoading = () => {
    const [loading, setLoading] = useState(false)
    return {
        setLoading,
        component: <>
            <FadeIn
                show={loading}
                className={'fixed inset-0 backdrop-blur-sm center'}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className='center text-neutral-400 z-50'
                >
                    <FiLoader size={40} />
                </motion.div>
            </FadeIn>
        </>
    }
}
export default UseLoading;