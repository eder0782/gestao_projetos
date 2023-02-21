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
import FiltrarDespesas from "@/components/FiltrarDespesas";

import CardProjetos from "@/components/Cards/CardProetos";
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
            delete={handleDelDespesas}
            edit={handleEdit}
            skeletonLoad={skeletonLoad}
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
            setFileURL={setFileURL}
            setEditMode={setEditMode}
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
    </div>
  );
}
