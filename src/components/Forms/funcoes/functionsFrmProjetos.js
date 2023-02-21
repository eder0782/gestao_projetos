import { database, storage_name, db_name, storage } from "@/services/firebase";

import { ref, update, push, child, get, remove } from "firebase/database";
import {
    ref as refStorage,
    getDownloadURL,
    uploadBytesResumable,
  } from "firebase/storage";

export const updateForm = async (setDados) => {
  await get(child(ref(database), `/${db_name}/projetos`))
    .then((snapshot) => {
      setDados([]);
      if (snapshot.exists()) {
        snapshot.forEach((item) => {
          var data = {
            key: item.key,
            prjeto: item.val().projeto,
            inicio: item.val().inicio,
            // fornecedor: item.val().fornecedor,
            vlrProjeto: item.val().vlrProjeto,
            // fileURL: item.val().fileURL,
          };

          setDados((oldArray) => [...oldArray, data].reverse());
        });
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

export const handleDelProjetos = async (id, toast) => {
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
        description: `Ocorreu o seguinte erro!: ${err}`,
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    });

  // deleteDoc(doc(database, "despesas", id))
};
export function ordenarPordata(dadosOrdenados) {
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

const handleSubmit = async (setOpenModalProgress,inicio) => {
  // e.preventDefault();
  // console.log();

  if (descric !== "" && fornecedor !== "" && data !== "" && valor !== "") {
    //ATIVANDO O MODAL PROGRESS
    setOpenModalProgress(true);
    

    //CRIEI ESSA FUNÇÃO, POIS TENHO QUE ESPERAR A IMAGEM SER SALVA, PARA PODER PEGAR O LINK
    async function salvarDados(downloadURL) {
      const lancamento = {
        data,
        //convertendo o nome no fornecedor p/ maiúsculo
        fornecedor: fornecedor.toUpperCase(),
        //convertendo a descrição para minúculo
        descric: descric.toLowerCase(),
        valor,
        //se a variável downloadUrl estiver preenchida recebe o valor dela
        // caso contrário, recebe o valor do state
        fileURL: downloadURL ? downloadURL : fileURL,
      };
      //SE NÃO ESTIVER EM MODO DE EDIÇÃO, GERA UM NOVO ID
      if (editMode === false) {
        const idLancamento = push(child(ref(database), db_name)).key;
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
            setFileURL("");

            toast({
              title: "Salvo com sucesso.",
              description: "Lançamento Realizado com Sucesso!!",
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
        updates[`/${db_name}/despesas/` + id] = lancamento;
        await update(ref(database), updates)
          .then(() => {
            updateForm();
            setData("");
            setFornecedor("");
            setDescric("");
            setValor("");
            setId(null);
            setFileURL("");

            toast({
              title: "Sucesso.",
              description: "Atualização realizada con sucesso!!",
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
  }
};

const handleEdit = (item) => {
  setId(item.key);
  setData(item.data);
  setDescric(item.descric);
  setFornecedor(item.fornecedor);
  setValor(item.valor);
  setFileURL(item.fileURL);
  setEditMode(true);
  //SE O FORM JÁ ESTIVER ABERTO
  if (isOpen) {
    onClose();
    setTimeout(() => {
      onOpen();
    }, 500);
  } else onOpen();
};
