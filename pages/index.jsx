import { useRouter } from 'next/router'
import { motion } from "framer-motion"
import { GradientLogo } from '../components/MainLogos'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push('/home')
    }, 3000);
  }, [])

  return <>
    <motion.div
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 2 }}
      className="absolute inset-0 center">
      <GradientLogo width={300} />
    </motion.div>
  </>
}
