import WithSubnavigation from '@/components/NavBar'
import Tabela from '@/components/Tabela'
import Link from 'next/link'
import BasicStatistics from '@/components/Estatisticas'




export default function Home() {  


  return (
    <div >
		<WithSubnavigation/>
    <BasicStatistics/>
<Tabela/>
    <Link href='/login'> Login</Link>
      
    </div>
  )
}
