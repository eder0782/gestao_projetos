// import Head from 'next/head'
// import Image from 'next/image'
import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'
import WithSubnavigation from '@/components/NavBar'
import Tabela from '@/components/Tabela'
import Link from 'next/link'
// import styles from '../styles/Home.module.css'

import Head from 'next/head'
// import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { Fade,useDisclosure,Button, Image, Center} from '@chakra-ui/react'
import { motion } from 'framer-motion'
// import Nav from '../components/navBar.js'
// import Tabela from '../components/tabela.js'



export default function Home() {
  const [par,setPar]=useState([])
  const {isOpen,onToggle}=useDisclosure();
  


  return (
    <div >
		<WithSubnavigation/>
		<Tabela/>
      <Center flexDir={'column'} marginTop={'10vh'}>
      <Button onClick={()=>onToggle()}>Add</Button>
      <Fade in={isOpen}>
      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} >
      
      <Image boxSize='100px'
     src='http://www.meupositivo.com.br/doseujeito/wp-content/uploads/2021/03/historia-da-musica0.jpg' fallbackSrc='/vercel.svg' />
      </motion.div>
      </Fade>
      </Center>
    </div>
  )
}
