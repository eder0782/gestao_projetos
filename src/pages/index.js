import Tabela from "@/components/Tabela";
import Link from "next/link";
import BasicStatistics from "@/components/Estatisticas";
import SidebarWithHeader from "@/components/Sidebar";
import FormAddLanc from "@/components/Forms/FormAddLanc";
import NavAdd from "@/components/NavComponents/NavAdd";
import { useDisclosure } from "@chakra-ui/react";

export default function Home() {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <div>
      {/* <WithSubnavigation />
      <BasicStatistics />
      <Tabela /> */}

      <SidebarWithHeader
        children={<BasicStatistics />}
        children2={<Tabela />}
        childrenBtn={<NavAdd show={onToggle} />}
        childrenAdd={<FormAddLanc isOpen={isOpen} show={onToggle} />}
      />
      <Link href="/login"> Login</Link>
    </div>
  );
}
