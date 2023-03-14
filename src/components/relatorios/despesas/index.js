import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  
} from "@react-pdf/renderer/lib/react-pdf.browser.cjs";
import PropTypes from "prop-types";
import Link from "next/link";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    // backgroundColor: "#E4E4E4",
  },
  // section: {
  //   margin: 10,
  //   padding: 10,
  //   flexGrow: 1,
  // },
  table: {
    width: "100%",
    padding: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid black",
    // borderColor:'blue',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    borderTop: "1px solid black",
    // borderColor:'blue',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
  },
  header: {
    borderTop: "none",
    fontSize: 12,
    backgroundColor: "gray",

    color: "white",
    fontWeight: 900,
  },
  bold: {
    fontWeight: "bold",
  },
  // So Declarative and unDRY 👌
  row1: {
    width: "10%",
  },
  row2: {
    width: "30%",
  },
  row3: {
    width: "30%",
  },
  row4: {
    width: "15%",
  },
  row5: {
    width: "15%",
  },
  fonte1: {
    fontSize: 10,
  },
  fonte2: {
    fontSize: 9,
  },
  titulo: {
    fontSize: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 15,
  },
});

// Create Document Component
const RelatDespesas = ({ dados, vlrTotal, numLanc }) =>{ 
  const formatData = (data) => {
    let data_format = new Date(data);
    data_format.setDate(data_format.getDate() + 1);
    // console.log(props.data);
    // console.log(data_format);
    return data_format.toLocaleDateString();
  };

  const formatValor=(valor)=>{
     {
      return parseFloat(valor).toLocaleString("pt-br", {
         minimumFractionDigits: 2,
       });
     }
  }
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.table}>
          <View style={[styles.titulo, styles.bold]}>
            <Text>RELATÓRIO ANALÍTICO</Text>
          </View>
          <View style={[styles.row, styles.bold, styles.header]}>
            <Text style={styles.row1}>DATA</Text>
            <Text style={styles.row2}>NOME</Text>
            <Text style={styles.row3}>DESCRIÇÃO</Text>
            <Text style={styles.row4}>DOC</Text>
            <Text style={styles.row5}>VALOR</Text>
          </View>
          {/* <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text> */}
          {dados.map((row, i) => (
            <View key={i} style={[styles.row, styles.fonte1]} wrap={false}>
              <Text style={styles.row1}>
                <Text style={[styles.bold, styles.fonte2]}>
                  {formatData(row.data)}
                </Text>
              </Text>
              <Text style={[styles.row2, styles.fonte2]}>{row.fornecedor}</Text>
              <Text style={styles.row3}>{row.descric}</Text>
              <Text style={[styles.row4,styles.fonte2]}>
                <Text style={styles.bold}>
                  {row.fileURL ? (
                    <Text>MOSTRAR</Text>
                  ) : (
                    <Text>INDISPONIVEL</Text>
                  )}
                </Text>
              </Text>
              <Text style={styles.row5}>{formatValor(row.valor)}</Text>
            </View>
          ))}
          <View style={[styles.footer, styles.bold, styles.header]}>
            <Text>NUM LANCAMENTOS: {numLanc}</Text>
            <Text>VALOR TOTAL: {vlrTotal}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );};



// RelatDespesas.propTypes = {
//   info: PropTypes.array.isRequired,
//   vlrTotal: PropTypes.number.isRequired,
//   numLanc: PropTypes.number.isRequired,
// };

export default RelatDespesas;
