import { useState, useEffect,useContext } from "react";

import { PDFViewer } from "@react-pdf/renderer/lib/react-pdf.browser.cjs";
// import RelatDespesas from "@/components/relatorios/despesas";
// import RelatDespesas from "@/components/relatorios/despesas";
// import RelatDespesas from "@/components/relatorios/despesas";
import RelatDespesas from "@/components/relatorios/despesas";
import { useRouter } from "next/router";
import ContextRelDesp from "@/services/contextRelDesp";


export default function Relatorio() {
  const router = useRouter();
  // const [dados, setDados] = useState(router.query.dados);

  //PEGANDO OS DADO DO CONTEXTO
  const [dadosRel, setDadosRel] = useContext(ContextRelDesp);

  const [vlrTotal, setVlrTotal] = useState(router.query.vlrTotal);
 

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
        <RelatDespesas dados={dadosRel} vlrTotal={vlrTotal} numLanc={dadosRel.length} />
      </PDFViewer>
    </div>
  );
}

