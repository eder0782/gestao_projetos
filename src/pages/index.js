import Tabela from "@/components/Tabela";
import Link from "next/link";
import BasicStatistics from "@/components/Estatisticas";
import SidebarWithHeader from "@/components/Sidebar";
import FormAddLanc from "@/components/Forms/FormAddLanc";
import NavAdd from "@/components/NavComponents/NavAdd";
import { useDisclosure } from "@chakra-ui/react";
import { db } from "../services/firebase";
// import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import firebase from "../services/firebase";

export default function Home() {
  const { isOpen, onToggle } = useDisclosure();
  const [data, setData] = useState(null);
  const [fornecedor, setFornecedor] = useState(null);
  const [descric, setDescric] = useState(null);
  const [valor, setValor] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (descric !== "" && fornecedor !== "" && data !== "" && valor !== "") {
      let despesas = await firebase.database().ref("despesas");
      let chave = despesas.push().key;

      despesas.child(chave).set({
        data,
        fornecedor,
        descric,
        valor,
      });

      alert("Cadastrado com sucesso!");
      setCargo("");
      setNome("");
    }
  };
  return (
    <div>
      {/* <WithSubnavigation />
      <BasicStatistics />
      <Tabela /> */}

      <SidebarWithHeader
        children={<BasicStatistics />}
        children2={<Tabela />}
        childrenBtn={<NavAdd show={onToggle} />}
        childrenAdd={
          <FormAddLanc
            data={data}
            setData={setData}
            fornecedor={fornecedor}
            setFornecedor={setFornecedor}
            descric={descric}
            setDescric={setDescric}
            valor={valor}
            setValor={setValor}
            isOpen={isOpen}
            show={onToggle}
            submit={handleSubmit}
          />
        }
      />
      <Link href="/login"> Login</Link>
    </div>
  );
}
