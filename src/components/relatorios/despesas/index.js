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
});

// Create Document Component
const RelatDespesas = ({ dados, vlrTotal, numLanc }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.table}>
        <View style={[styles.row, styles.bold, styles.header]}>
          <Text style={styles.row1}>Data</Text>
          <Text style={styles.row2}>Nome</Text>
          <Text style={styles.row3}>Descrição</Text>
          <Text style={styles.row4}>Documento</Text>
          <Text style={styles.row5}>Valor</Text>
        </View>
        {/* <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text> */}
        {dados.map((row, i) => (
          <View key={i} style={[styles.row, styles.fonte1]} wrap={false}>
            <Text style={styles.row1}>
              <Text style={[styles.bold, styles.fonte2]}>{row.data}</Text>
            </Text>
            <Text style={[styles.row2, styles.fonte2]}>{row.fornecedor}</Text>
            <Text style={styles.row3}>{row.descric}</Text>
            <Text style={styles.row4}>
              <Text style={styles.bold}>{row.fileURL? <Text>MOSTRAR</Text>: <Text>INDISPONIVEL</Text>}</Text>
            </Text>
            <Text style={styles.row5}>{row.valor}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);



// RelatDespesas.propTypes = {
//   info: PropTypes.array.isRequired,
//   vlrTotal: PropTypes.number.isRequired,
//   numLanc: PropTypes.number.isRequired,
// };

export default RelatDespesas;
