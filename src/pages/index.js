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
  //controla o estado o componente FormAddLanc
  const { isOpen, onOpen, onClose } = useDisclosure();

  //controla o estado dos dados recebidos do servidor
  const [dados, setDados] = useState([]);

  //controla o estado dos dados filtrados no componente FiltrarDespesas
  const [dadosFiltrados, setDadosFiltrados] = useState([]);

  //controla o estado dos dados a serem salvos no servidor
  const [data, setData] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [descric, setDescric] = useState("");
  const [valor, setValor] = useState("");
  const [id, setId] = useState(null);

  //controla o estado do componente BasicStatistics
  const [totalItens, setTotalItens] = useState(null);
  const [valorTotal, setValorTotal] = useState(null);

  //Verifica se o formAddlanc está em modo de edição
  const [editMode, setEditMode] = useState(false);

  //controla o estado do componente FiltrarDespesas
  const [showFiltrar, setShowFiltrar] = useState(false);
  const [inputFiltrar, setInputFiltrar] = useState("");
  const [filtrarPor, setFiltrarPor] = useState("F");

  //MONITORA OS DADOS DO SERVIDOR PARA ATUALIZAR OS DADOS FILTRADOS
  useEffect(() => {
    setDadosFiltrados(dados);
  }, [dados]);

  //MONITORA OS DADOSFILTRADOS PARA CALCULAR OS TOTAIS
  useEffect(() => {
    setTotalItens(dadosFiltrados.length);
    if (dadosFiltrados.length !== 0) {
      let sum = dadosFiltrados.reduce(function (prevVal, elem) {
        return prevVal + parseFloat(elem.valor);
      }, 0);
      setValorTotal(sum.toLocaleString("pt-br", { minimumFractionDigits: 2 }));
    } else setValorTotal(0);
  }, [dadosFiltrados]);

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

  //realiza o filtro dos dados, monitorando o state inputFiltrar
  useEffect(() => {
    if (inputFiltrar !== "") {
      if (filtrarPor === "F") {
        let filtro = dados.filter((item) =>
          item.fornecedor.includes(inputFiltrar.toUpperCase())
        );

        setDadosFiltrados(filtro);
      } else {
        let filtro = dados.filter((item) =>
          item.descric.includes(inputFiltrar.toLowerCase())
        );

        setDadosFiltrados(filtro);
      }
    } else setDadosFiltrados(dados);
  }, [inputFiltrar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (descric !== "" && fornecedor !== "" && data !== "" && valor !== "") {
      const lancamento = {
        data,
        //convertendo o nome no fornecedor p/ maiúsculo
        fornecedor: fornecedor.toUpperCase(),
        //convertendo a descrição para minúculo
        descric: descric.toLowerCase(),
        valor,
      };

      //SE NÃO ESTIVER EM MODO DE EDIÇÃO, GERA UM NOVO ID
      if (editMode === false) {
        const idLancamento = await push(child(ref(database), db_name)).key;
        const updates = {};
        updates[`/${db_name}/despesas/` + idLancamento] = lancamento;
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
          .catch((err) =>
            alert("Falha na inclusão.Ocorreu o seguinte erro: " + err)
          );
      }
      //SE ESTIVER EM MODO DE EDIÇÃO UTILIZA O ID QUE ESTÁ NO STATE "ID"
      else {
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
            alert("Atualização realizada con sucesso!!");
            //SE ESTIVER EM MODO DE EDIÇÃO FECHA A TELA
            if (editMode) onClose();
            //FECHA O MODO DE EDIÇÃO
            setEditMode(false);
          })
          .catch((err) =>
            alert("Falha na atualização.Ocorreu o seguinte erro: " + err)
          );
      }
    }
  };

  const handleEdit = (item) => {
    setId(item.key);
    setData(item.data);
    setDescric(item.descric);
    setFornecedor(item.fornecedor);
    setValor(item.valor);
    setEditMode(true);
    //SE O FORM JÁ ESTIVER ABERTO
    if (isOpen) {
      onClose();
      setTimeout(() => {
        onOpen();
      }, 500);
    } else onOpen();
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
          <Tabela
            dados={dadosFiltrados}
            delete={handleDelDespesas}
            edit={handleEdit}
          />
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
            setFiltrarPor={setFiltrarPor}
            filtrarPor={filtrarPor}
            setInputFiltrar={setInputFiltrar}
            close={setShowFiltrar}
          />
        }
        childrenBtn={
          <NavAdd
            show={onOpen}
            openFiltrar={setShowFiltrar}
            isOpenFiltrar={showFiltrar}
            updateForm={updateForm}
          />
        }
      />
      <Link href="/login"> Login</Link>
    </div>
  );
}
