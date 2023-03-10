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

import ContextLogin from "@/services/contextLogin";
import { useContext } from "react";
import { useRouter } from "next/navigation";

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

  //Verifica se o FormProjetos est?? em modo de edi????o
  const [editMode, setEditMode] = useState(false);

  //
  const toast = useToast();

  //controla o estado do skeleton da tabela do CardProjetos
  const [skeletonLoad, setSkeletonLoad] = useState(false);

  //VERIFICA SE O USU??RIO EST?? LOGADO
  const [logado, setLogado] = useContext(ContextLogin);
  const router = useRouter();
  useEffect(() => {
    if (logado === 0) {
      router.replace("/login");
    }
  }, []);

  //MONITORA OS DADOS DO SERVIDOR PARA ATUALIZAR OS DADOS FILTRADOS
  useEffect(() => {
    setDadosFiltrados(ordenarPordata(dados));
    setTimeout(() => {
      setSkeletonLoad(true);
    }, 1000);
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
            //REALIZANDO A SOMA DOS LAN??AMENTOS DOS PROJETOS
            let Sum = 0;
            let desp = item.val().despesas;
            if (desp) {
              // console.log(desp);
              Object.keys(desp).forEach((ele) => {
                // console.log(desp[ele].valor)
                Sum += parseFloat(desp[ele].valor);
              });
            }
            //GERANDO O OBJETO QUE FICAR?? DENTRO DO SETDADOS
            var data = {
              key: item.key,
              projeto: item.val().projeto,
              inicio: item.val().inicio,
              vlrProjeto: item.val().vlrProjeto,
              despesas: item.val().despesas,
              vlrRealizado: Sum,
            };

            setDados((oldArray) => [...oldArray, data].reverse());
          });
          // console.log(dados);
        } else {
          console.log("No data available");
          //setTotalItens(0);
        }
        //setando o total de lan??amentos
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
          title: "Sucesso na exclus??o.",
          description: "O projeto foi exclu??do com sucesso!",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });

        updateForm();
      })
      .catch((err) => {
        toast({
          title: "Erro na exclus??o.",
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
        //convertendo o nome no fornecedor p/ mai??sculo
        projeto: projeto.toUpperCase(),
        despesas,
        //convertendo a descri????o para min??culo
        //   descric: descric.toLowerCase(),
        vlrProjeto,
      };
      //SE N??O ESTIVER EM MODO DE EDI????O, GERA UM NOVO ID
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
            //SE ESTIVER EM MODO DE EDI????O FECHA A TELA
            if (editMode) onClose();
            //FECHA O MODO DE EDI????O
            setEditMode(false);
            //FECHA O MODAL PROGRESS
            setOpenModalProgress(false);
          })
          .catch((err) => {
            toast({
              title: "Salvo com sucesso.",
              description: "Falha na inclus??o.Ocorreu o seguinte erro: " + err,
              status: "error",
              duration: 5000,
              position: "top",
              isClosable: true,
            });

            //FECHA O MODAL PROGRESS
            setOpenModalProgress(false);
          });
      }
      //SE ESTIVER EM MODO DE EDI????O UTILIZA O ID QUE EST?? NO STATE "ID"
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
              description: "Atualiza????o do Projeto realizada com sucesso!!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
            //SE ESTIVER EM MODO DE EDI????O FECHA A TELA
            if (editMode) onClose();
            //FECHA O MODO DE EDI????O
            setEditMode(false);
            //FECHA O MODAL PROGRESS
            setOpenModalProgress(false);
          })
          .catch((err) => {
            toast({
              title: "Erro.",
              description:
                "Falha na atualiza????o.Ocorreu o seguinte erro: " + err,
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
    setDespesas(item.despesas);
    // setFornecedor(item.fornecedor);
    setVlrProjeto(item.vlrProjeto);
    // setFileURL(item.fileURL);
    setEditMode(true);
    //SE O FORM J?? ESTIVER ABERTO
    if (isOpen) {
      onClose();
      setTimeout(() => {
        onOpen();
      }, 500);
    } else onOpen();
  };

  return (
    <div>
      {/* {console.log(logado)} */}
      {logado !== 0 ? (
        <div>
          <ModalProgress isOpen={isOpenModalProgress} />
          <SidebarWithHeader
            tituloPagina={`LISTA DE PROJETOS`}
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
      ) : (
        <div></div>
      )}
    </div>
  );
}
