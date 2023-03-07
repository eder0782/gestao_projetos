import { useState, useEffect } from "react";

import { PDFViewer } from "@react-pdf/renderer/lib/react-pdf.browser.cjs";
import RelatDespesas from "@/components/relatorios/despesas";

export default function Relatorio() {
  // const route = useRouter();

  const [client, setClient] = useState(false);

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
          // backgroundColor: "blue",
          width: "100%",
          // height: "100vh",
          // display: "flex",
        }}
      >
        <RelatDespesas />
      </PDFViewer>
    </div>
  );
}
