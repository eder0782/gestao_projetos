// import WithSubnavigation from "@/components/NavBar";
import Tabela from "@/components/Tabela";
import Link from "next/link";
import BasicStatistics from "@/components/Estatisticas";
import SidebarWithHeader from "@/components/Sidebar";
// import { Text } from "@chakra-ui/react";
import ButtonAdd from "@/components/NavComponents/ButtonAdd";
export default function Home() {
  const t = <BasicStatistics />;
  return (
    <div>
      {/* <WithSubnavigation />
      <BasicStatistics />
      <Tabela /> */}

      <SidebarWithHeader
        children={t}
        children2={<Tabela />}
        childrenBtn={<ButtonAdd />}
      />
      <Link href="/login"> Login</Link>
    </div>
  );
}
