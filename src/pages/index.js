import Tabela from "@/components/Tabela";
import Link from "next/link";
import BasicStatistics from "@/components/Estatisticas";
import SidebarWithHeader from "@/components/Sidebar";
import FormAddLanc from "@/components/Forms/FormAddLanc";
import NavAdd from "@/components/NavComponents/NavAdd";
import { useDisclosure } from "@chakra-ui/react";
import database from "@/services/firebase";
import { ref, update, push, child, get } from "firebase/database";
// import { collection, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";
// import firebase from "../services/firebase";

export default function Home() {
  const { isOpen, onToggle } = useDisclosure();
  const [data, setData] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [descric, setDescric] = useState("");
  const [valor, setValor] = useState("");
  const [dados, setDados] = useState([]);

  const updateForm = async () => {
    get(child(ref(database), "despesas"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDados([]);

          snapshot.forEach((item) => {
            var data = {
              key: item.key,
              descric: item.val().descric,
              data: item.val().data,
              fornecedor: item.val().fornecedor,
              valor: item.val().valor,
            };
            // console.log(data);
            setDados((oldArray) => [...oldArray, data].reverse());
          });
          // console.log(dados);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const DeleteDespesa = async (id) => {
    await deleteDoc(doc(database, "despesas", id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (descric !== "" && fornecedor !== "" && data !== "" && valor !== "") {
      const lancamento = {
        data,
        fornecedor,
        descric,
        valor,
      };

      // Get a key for a new Post.
      const idLancamento = await push(child(ref(database), "despesas")).key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      updates["/despesas/" + idLancamento] = lancamento;

      await update(ref(database), updates)
        .then(() => {
          updateForm();
          setData("");
          setFornecedor("");
          setDescric("");
          setValor("");
          alert("Lançamento Realizado com Sucesso!!");
        })
        .catch((err) => alert("Ocorreu o seguinte erro: " + err));
    }
  };

  useEffect(() => {
    updateForm();
  }, []);
  return (
    <div>
      {/* <WithSubnavigation />
      <BasicStatistics />
      <Tabela /> */}

      <SidebarWithHeader
        children={<BasicStatistics />}
        children2={<Tabela dados={dados} delete={DeleteDespesa} />}
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
