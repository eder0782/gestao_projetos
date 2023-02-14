import Tabela from "@/components/Tabela";
import Link from "next/link";
import BasicStatistics from "@/components/Estatisticas";
import SidebarWithHeader from "@/components/Sidebar";
import FormAddLanc from "@/components/Forms/FormAddLanc";
import NavAdd from "@/components/NavComponents/NavAdd";
import { useDisclosure } from "@chakra-ui/react";
import { database, db_name } from "@/services/firebase";
import { ref, update, push, child, get, remove } from "firebase/database";
import FiltrarDespesas from "@/components/FiltrarDespesas";
// import { collection, addDoc } from "firebase/firestore";
import { useState, useRef, useEffect } from "react";

import { async } from "@firebase/util";
// import firebase from "../services/firebase";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [descric, setDescric] = useState("");
  const [valor, setValor] = useState("");
  const [dados, setDados] = useState([]);
  const [totalItens, setTotalItens] = useState(null);
  const [valorTotal, setValorTotal] = useState(null);
  const [id, setId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showFiltrar, setShowFiltrar] = useState(true);
  const [inputFiltrar, setInputFiltrar] = useState("");

  const consulta = useRef(null);
  // console.log(db_name);

  //MONITORA OS DADOS PARA CALCULAR OS TOTAIS
  useEffect(() => {
    setTotalItens(dados.length);
    if (dados.length !== 0) {
      let sum = dados.reduce(function (prevVal, elem) {
        return prevVal + parseFloat(elem.valor);
      }, 0);
      setValorTotal(sum.toLocaleString("pt-br", { minimumFractionDigits: 2 }));
    } else setValorTotal(0);
  }, [dados]);

  const updateForm = async () => {
    await get(child(ref(database), `/${db_name}/despesas`))
      .then((snapshot) => {
        setDados([]);
        if (snapshot.exists()) {
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
          //setTotalItens(0);
        }
        //setando o total de lançamentos
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelDespesas = async (id) => {
    const dbRef = ref(database, `/${db_name}/despesas/` + id);

    await remove(dbRef)
      .then(() => {
        alert("Deletado com sucesso");
        updateForm();
      })
      .catch((err) => {
        alert("Ocorreu o seguinte erro: " + err);
      });

    // deleteDoc(doc(database, "despesas", id))
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

      //SE NÃO ESTIVER EM MODO DE EDIÇÃO, GERA UM NOVO ID
      if (editMode === false) {
        const idLancamento = await push(child(ref(database), db_name)).key;
        setId(idLancamento);
      }

      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      updates[`/${db_name}/despesas/` + id] = lancamento;

      await update(ref(database), updates)
        .then(() => {
          updateForm();
          setData("");
          setFornecedor("");
          setDescric("");
          setValor("");
          setId(null);
          alert("Lançamento Realizado com Sucesso!!");
          //SE ESTIVER EM MODO DE EDIÇÃO FECHA A TELA
          if (editMode) onClose();
          //FECHA O MODO DE EDIÇÃO
          setEditMode(false);
        })
        .catch((err) => alert("Ocorreu o seguinte erro: " + err));
    }
  };

  const handleEdit = (item) => {
    setId(item.key);
    setData(item.data);
    setDescric(item.descric);
    setFornecedor(item.fornecedor);
    setValor(item.valor);
    setEditMode(true);
    onOpen();
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
        children1={
          <BasicStatistics valorTotal={valorTotal} totalItens={totalItens} />
        }
        children2={
          <Tabela dados={dados} delete={handleDelDespesas} edit={handleEdit} />
        }
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
            show={onOpen}
            submit={handleSubmit}
            close={onClose}
          />
        }
        childrenFiltraLanc={
          <FiltrarDespesas
            isOpen={showFiltrar}
            inputFiltrar={inputFiltrar}
            setInputFiltrar={setInputFiltrar}
            close={setShowFiltrar}
            ref={consulta}
          />
        }
        childrenBtn={
          <NavAdd show={onOpen} openFiltrar={setShowFiltrar} ref={consulta} />
        }
      />
      <Link href="/login"> Login</Link>
    </div>
  );
}
