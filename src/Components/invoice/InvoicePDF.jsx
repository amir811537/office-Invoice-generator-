/* eslint-disable react/prop-types */
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { styles } from "./invoiceStyles";

import logo from "../../assets/bg removed.png";
import QR from "../../assets/qr fresh cut.png";

/* ================= CURRENCY ================= */
const currency = (n) =>
  new Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(n) ? n : 0);

/* ================= PDF COMPONENT ================= */
const InvoicePDF = ({ form }) => {
  /* -------- Date format -------- */
  const formattedDate = new Date(form.customDate).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  /* -------- Invoice ID (demo) -------- */
  const invoiceId = Math.random().toString(36).substring(2, 10).toUpperCase();
  /* -------- Calculations -------- */
  const subtotal = form.items.reduce(
    (acc, it) => acc + (Number(it.quantity) || 0) * (Number(it.price) || 0),
    0
  );

  const total = subtotal + (Number(form.deliveryCharge) || 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ================= HEADER ================= */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Image src={logo} style={styles.logo} />
            <Text style={{ fontSize: 26, color: "red" }}>
              Fresh Cut Chicken Service
            </Text>
          </View>

          <View style={styles.invoiceInfo}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text>Date: {formattedDate}</Text>
            <Text>Invoice ID: {invoiceId}</Text>
            <Text>Payment: {form.paymentMethod}</Text>
          </View>
        </View>

        {/* ================= BILL TO ================= */}
        <View style={styles.section}>
          <Text style={styles.billToTitle}>Bill To</Text>

          <View style={styles.billCard}>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Name:</Text>
              <Text style={styles.billValue}>{form.name || "-"}</Text>
            </View>

            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Address:</Text>
              <Text style={styles.billValue}>{form.address || "-"}</Text>
            </View>

            {form.apartment && (
              <View style={styles.billRow}>
                <Text style={styles.billValue}>{form.apartment}</Text>
              </View>
            )}

            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Phone:</Text>
              <Text style={styles.billValue}>{form.phone || "-"}</Text>
            </View>

            {form.email && (
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Email:</Text>
                <Text style={styles.billValue}>{form.email}</Text>
              </View>
            )}
          </View>
        </View>

        {/* ================= ITEMS TABLE ================= */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text
              style={[styles.cellBase, styles.productCell, styles.headerText]}
            >
              Product
            </Text>
            <Text style={[styles.cellBase, styles.qtyCell, styles.headerText]}>
              কেজি
            </Text>
            <Text
              style={[styles.cellBase, styles.priceCell, styles.headerText]}
            >
              দাম
            </Text>
            <Text
              style={[styles.cellBase, styles.totalCell, styles.headerText]}
            >
            মোট { }
            </Text>
          </View>

          {/* ROWS */}
          {form.items.map((it, i) => {
            const qty = Number(it.quantity) || 0;
            const price = Number(it.price) || 0;
            const lineTotal = qty * price;

            return (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.productCell} wrap>
                  {it.name || "-"}
                </Text>

                <Text style={styles.qtyCell}> {currency(qty)}</Text>

                <Text style={styles.priceCell}>{currency(price)}</Text>

                <Text style={styles.totalCell}>{currency(lineTotal)}</Text>
              </View>
            );
          })}
        </View>

        {/* ================= SUMMARY ================= */}
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>মোট-</Text>
          <Text style={styles.summaryText}>{currency(subtotal)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>ডেলিভারি চার্জ -</Text>
          <Text style={styles.summaryText}>
            {currency(Number(form.deliveryCharge) || 0)}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>সর্বমোট- </Text>
          <Text style={styles.totalText}>{currency(total)}</Text>
        </View>

        {/* ================= NOTES ================= */}
        <View style={styles.notes}>
          <Text>Thanks for your order. We hope to serve you again soon.</Text>
        </View>

        {/* ================= FOOTER ================= */}
        <View style={styles.footer}>
          <Image src={QR} style={styles.qr} />
          <Text style={styles.footerText}>আমাদের ওয়েবসাইট ভিজিট করুন:</Text>
          <Text style={styles.footerText}>
            https://freshcutchickenservice.com
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
