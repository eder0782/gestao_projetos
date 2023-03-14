import { useState, useEffect } from "react";

import { PDFViewer } from "@react-pdf/renderer/lib/react-pdf.browser.cjs";
// import RelatDespesas from "@/components/relatorios/despesas";
// import RelatDespesas from "@/components/relatorios/despesas";
// import RelatDespesas from "@/components/relatorios/despesas";
import RelatDespesas from "@/components/relatorios/despesas";
import { useRouter } from "next/router";

export default function Relatorio() {
  const router = useRouter();
  const [dados, setDados] = useState(router.query.dados);
  const [vlrTotal, setVlrTotal] = useState(router.query.vlrTotal);
  // const [numLanc, setNumLanc] = useState(router.query.numLanc);

  const [client, setClient] = useState(false);
  setTimeout(()=>{ 
    console.log('informações:')
    console.log(vlrTotal);
    console.log(dados);

    console.log(typeof(totais));
  },3000)

  
 

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "blue",
        width: "100%",
        height: "100vh",
        display: "flex",
      }}
    >
      <PDFViewer
        style={{
          width: "100%",
        }}
      >
        <RelatDespesas dados={DATA} vlrTotal={1000} numLanc={10} />
      </PDFViewer>
    </div>
  );
}

const DATA = [
  {
    descric: "descrição 1",
    data: "30/12/2022",
    fornecedor: "MIKITOS INDUSTRIA E COMERCIO DE GEN DO AMAZONAS LTDA",
    valor: "700",
    fileURL: "mostrar",
  },
  {
    descric: "descrição 4",
    data: "01/05/2002",
    fornecedor: "FULANO DE TAL",
    valor: "800",
    fileURL: "mostrar",
  },
  {
    descric: "descrição 3",
    data: "20/01/2019",
    fornecedor: "AGRICOLA HORIZONTE",
    valor: "1000",
    fileURL: "indisponivel",
  },
  {
    descric: "descrição 2",
    data: "20/03/2021",
    fornecedor: "BANCO BRADESCO S/A",
    valor: "700",
    fileURL: "mostrar",
  },
];