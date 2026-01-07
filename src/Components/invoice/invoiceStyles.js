import { StyleSheet, Font } from "@react-pdf/renderer";

/* ================= FONT REGISTER ================= */
Font.register({
  family: "NotoSerifBengali",
  fonts: [
    {
      src: "/fonts/NotoSerifBengali-VariableFont_wdth,wght.ttf",
      fontStyle: "normal",
      fontWeight: "normal",
    },
  ],
});

/* ================= PDF STYLES ================= */
export const styles = StyleSheet.create({
  /* PAGE */
  page: {
    fontFamily: "NotoSerifBengali",
    padding: 30,
    fontSize: 12,
    backgroundColor: "#ffffff",
    color: "#000000",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  companyInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },

  invoiceInfo: {
    textAlign: "right",
    fontSize: 10,
  },

  invoiceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },

  /* SECTION */
  section: {
    borderBottomWidth: 2,
    borderBottomColor: "#cccccc",
    paddingBottom: 10,
    marginBottom: 20,
  },

  /* BILL TO */
  billToTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },

  billCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#dddddd",
  },

  billRow: {
    flexDirection: "row",
    marginBottom: 4,
  },

  billLabel: {
    width: 90,
    fontWeight: "bold",
    color: "#333333",
  },

  billValue: {
    flex: 1,
    color: "#555555",
  },

/* ================= TABLE ================= */

table: {
  width: "100%",
  marginBottom: 18,
  borderWidth: 1,
  borderColor: "#dddddd",
},

tableHeader: {
  flexDirection: "row",
  backgroundColor: "#f3f3f3",
  borderBottomWidth: 1,
  borderBottomColor: "#cccccc",
},

tableRow: {
  flexDirection: "row",
  borderBottomWidth: 1,
  borderBottomColor: "#eeeeee",
},

/* ===== COMMON CELL ===== */
cellBase: {
  paddingVertical: 6,
  paddingHorizontal: 6,
  fontSize: 11,
  justifyContent: "center",
},

/* ===== HEADER TEXT ===== */
headerText: {
  fontWeight: 600,        
  fontSize: 11,
},

/* ===== COLUMN WIDTHS (FIXED) ===== */
productCell: {
  width: "40%",
  textAlign: "left",
},

qtyCell: {
  width: "10%",
  textAlign: "center",
},

priceCell: {
  width: "20%",
  textAlign: "right",
},

totalCell: {
  width: "30%",
  textAlign: "right",
},



  /* SUMMARY */
  summaryRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 4,
  },

  summaryText: {
    marginLeft: 10,
    fontSize: 11,
    color: "#444444",
  },

  totalText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
  },

  /* NOTES */
  notes: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: "#cccccc",
    fontSize: 10,
    color: "#555555",
  },

  /* FOOTER */
  footer: {
    marginTop: 30,
    alignItems: "center",
  },

  qr: {
    width: 100,
    height: 100,
    marginBottom: 6,
  },

  footerText: {
    fontSize: 9,
    color: "#444444",
    textAlign: "center",
  },
});
