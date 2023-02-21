import Tabela from "@/components/Tabela";
import Link from "next/link";
import BasicStatistics from "@/components/Estatisticas";
import SidebarWithHeader from "@/components/Sidebar";
import FormAddLanc from "@/components/Forms/FormAddLanc";
import NavAdd from "@/components/NavComponents/NavAdd";
import ModalProgress from "@/components/ModalProgress";
import { useDisclosure } from "@chakra-ui/react";
import { database, storage_name, db_name, storage } from "@/services/firebase";
import { ref, update, push, child, get, remove } from "firebase/database";
// import FiltrarDespesas from "@/components/Consultas/FIltrarDespesas"
import FiltrarProjetos from "@/components/Consultas/FiltrarProjetos";

import CardProjetos from "@/components/Cards/CardProjetos";
// import { collection, addDoc } from "firebase/firestore";
import { useScreenSize } from "@/hooks/useScreenSize";
import ListView from "@/components/ListView";
import { useToast } from "@chakra-ui/react";
import {
  ref as refStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { useState, useRef, useEffect } from "react";
import FormProjetos from "@/components/Forms/FormProjetos";

export default function Projetos() {
  //controla o estado do Modal Progress
  const [isOpenModalProgress, setOpenModalProgress] = useState(false);
  //controla o estado o componente FormAddLanc
  const { isOpen, onOpen, onClose } = useDisclosure();

  //controla o estado dos dados recebidos do servidor
  const [dados, setDados] = useState([]);

  //controla o estado dos dados a serem salvos no servidor
  const [vlrProjeto, setVlrProjeto] = useState("");
  const [inicio, setInicio] = useState("");
  const [projeto, setProjeto] = useState("");
  const [despesas, setDespesas] = useState("");
  const [id, setId] = useState(null);

  //controla o estado do componente BasicStatistics
  const [totalItens, setTotalItens] = useState(null);
  const [valorTotal, setValorTotal] = useState(null);

  //controla o estado do componente FiltrarDespesas
  const [showFiltrar, setShowFiltrar] = useState(false);
  const [inputFiltrar, setInputFiltrar] = useState("");

  //controla o estado dos dados filtrados a sere utilisados no CardProjetos
  const [dadosFiltrados, setDadosFiltrados] = useState([]);

  //Verifica se o FormProjetos está em modo de edição
  const [editMode, setEditMode] = useState(false);

  //
  const toast = useToast();

  //controla o estado do skeleton da tabela do CardProjetos
  const [skeletonLoad, setSkeletonLoad] = useState(false);
  //MONITORA OS DADOS DO SERVIDOR PARA ATUALIZAR OS DADOS FILTRADOS
  useEffect(() => {
    setDadosFiltrados(ordenarPordata(dados));
    setTimeout(() => {
      setSkeletonLoad(true);
    }, 4000);
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

  //realiza o filtro dos dados, monitorando o state inputFiltrar
  useEffect(() => {
    if (inputFiltrar !== "") {
      if (filtrarPor === "F") {
        let filtro = dados.filter((item) =>
          item.fornecedor.includes(inputFiltrar.toUpperCase())
        );

        setDadosFiltrados(ordenarPordata(filtro));
      } else {
        let filtro = dados.filter((item) =>
          item.descric.includes(inputFiltrar.toLowerCase())
        );

        setDadosFiltrados(ordenarPordata(filtro));
      }
    } else setDadosFiltrados(ordenarPordata(dados));
  }, [inputFiltrar]);

  useEffect(() => {
    updateForm();
  }, []);

  const updateForm = async () => {
    await get(child(ref(database), `/${db_name}/projetos`))
      .then((snapshot) => {
        setDados([]);
        if (snapshot.exists()) {
          //   console.log(snapshot.val());
          snapshot.forEach((item) => {
            var data = {
              key: item.key,
              projeto: item.val().projeto,
              inicio: item.val().inicio,
              vlrProjeto: item.val().vlrProjeto,
              despesas: item.val().despesas,
              //   valor: item.val().valor,
              //   fileURL: item.val().fileURL,
            };

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

  const handleDelProjetos = async (id) => {
    const dbRef = ref(database, `/${db_name}/projetos/` + id);

    await remove(dbRef)
      .then(() => {
        toast({
          title: "Sucesso na exclusão.",
          description: "O projeto foi excluído com sucesso!",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });

        updateForm();
      })
      .catch((err) => {
        toast({
          title: "Erro na exclusão.",
          description: `Ocorreo o seguinte erro!: ${err}`,
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
      });

    // deleteDoc(doc(database, "despesas", id))
  };
  function ordenarPordata(dadosOrdenados) {
    dadosOrdenados.sort(function (a, b) {
      if (a.data > b.data) {
        return -1;
      } else {
        return true;
      }
    });
    // console.log(dadosOrdenados);
    return dadosOrdenados;
  }

  const handleSubmit = async () => {
    // e.preventDefault();
    // console.log();

    if (projeto !== "" && inicio !== "" && vlrProjeto !== "") {
      //ATIVANDO O MODAL PROGRESS
      setOpenModalProgress(true);

      

      const lancamento = {
        inicio,
        //convertendo o nome no fornecedor p/ maiúsculo
        projeto: projeto.toUpperCase(),
        despesas,
        //convertendo a descrição para minúculo
        //   descric: descric.toLowerCase(),
        vlrProjeto,
      };
      //SE NÃO ESTIVER EM MODO DE EDIÇÃO, GERA UM NOVO ID
      if (editMode === false) {
        const idLancamento = push(child(ref(database), db_name)).key;
        const updates = {};
        updates[`/${db_name}/projetos/` + idLancamento] = lancamento;
        await update(ref(database), updates)
          .then(() => {
            updateForm();
            setInicio("");
            setProjeto("");
            setVlrProjeto("");
            setDespesas("");
            //   setValor("");
            setId(null);
            //   setFileURL("");

            toast({
              title: "Salvo com sucesso.",
              description: "Projeto criado com Sucesso!!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
            //SE ESTIVER EM MODO DE EDIÇÃO FECHA A TELA
            if (editMode) onClose();
            //FECHA O MODO DE EDIÇÃO
            setEditMode(false);
            //FECHA O MODAL PROGRESS
            setOpenModalProgress(false);
          })
          .catch((err) => {
            toast({
              title: "Salvo com sucesso.",
              description: "Falha na inclusão.Ocorreu o seguinte erro: " + err,
              status: "error",
              duration: 5000,
              position: "top",
              isClosable: true,
            });

            //FECHA O MODAL PROGRESS
            setOpenModalProgress(false);
          });
      }
      //SE ESTIVER EM MODO DE EDIÇÃO UTILIZA O ID QUE ESTÁ NO STATE "ID"
      else {
        const updates = {};
        updates[`/${db_name}/projetos/` + id] = lancamento;
        await update(ref(database), updates)
          .then(() => {
            updateForm();
            setInicio("");
            setProjeto("");
            setVlrProjeto("");
            setDespesas("");
            //   setValor("");
            setId(null);
            //   setFileURL("");

            toast({
              title: "Sucesso.",
              description: "Atualização do Projeto realizada com sucesso!!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
            //SE ESTIVER EM MODO DE EDIÇÃO FECHA A TELA
            if (editMode) onClose();
            //FECHA O MODO DE EDIÇÃO
            setEditMode(false);
            //FECHA O MODAL PROGRESS
            setOpenModalProgress(false);
          })
          .catch((err) => {
            toast({
              title: "Erro.",
              description:
                "Falha na atualização.Ocorreu o seguinte erro: " + err,
              status: "error",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
            //FECHA O MODAL PROGRESS
            setOpenModalProgress(false);
          });
      }
    }
  };

  const handleEdit = (item) => {
    setId(item.key);
    setProjeto(item.projeto);
    setInicio(item.inicio);
    setDespesas(item.despesas)
    // setFornecedor(item.fornecedor);
    setVlrProjeto(item.vlrProjeto);
    // setFileURL(item.fileURL);
    setEditMode(true);
    //SE O FORM JÁ ESTIVER ABERTO
    if (isOpen) {
      onClose();
      setTimeout(() => {
        onOpen();
      }, 500);
    } else onOpen();
  };

  return (
    <div>
      {/* <WithSubnavigation />
      <BasicStatistics />
      <Tabela /> */}
      <ModalProgress isOpen={isOpenModalProgress} />
      <SidebarWithHeader
        // numLancamentos={totalItens}
        // vlrTotal={valorTotal}
        // children1={
        //   <BasicStatistics
        //     valorTotal={valorTotal}
        //     totalItens={totalItens}
        //     skeletonLoad={skeletonLoad}
        //   />
        // }
        children2={
          <CardProjetos
            dados={dadosFiltrados}
            delete={handleDelProjetos}
            edit={handleEdit}
            skeletonLoad={skeletonLoad}
          />
        }
        childrenAdd={
          <FormProjetos
            inicio={inicio}
            setInicio={setInicio}
            projeto={projeto}
            setProjeto={setProjeto}
            vlrProjeto={vlrProjeto}
            setVlrProjeto={setVlrProjeto}
            isOpen={isOpen}
            show={onOpen}
            submit={handleSubmit}
            close={onClose}
            setEditMode={setEditMode}
          />
        }
        childrenFiltraLanc={
          <FiltrarProjetos
            isOpen={showFiltrar}
            inputFiltrar={inputFiltrar}
            // setFiltrarPor={setFiltrarPor}
            // filtrarPor={filtrarPor}
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
    </div>
  );
}
