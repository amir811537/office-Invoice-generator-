import { useMemo, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import InvoiceForm from "../invoice/InvoiceForm";
import InvoiceItems from "../invoice/InvoiceItems";
import InvoicePDF from "../invoice/InvoicePDF";
import InvoicePreview from "../invoice/InvoicePreview";

/* ================= DATE HELPER ================= */
const todayISO = () => new Date().toISOString().split("T")[0];
const InvoiceGenerator = () => {
  /* ================= FORM STATE ================= */
  
  
  
  const [form, setForm] = useState({
    name: "",
    address: "",
    apartment: "",
    phone: "",
    email: "",
    customDate: todayISO(),
    paymentMethod: "Cash",
    deliveryCharge: 0,
    items: [{ name: "", quantity: 1, price: 0 }],
  });

  /* ================= CALCULATIONS ================= */
  const { subtotal, total } = useMemo(() => {
    const sub = form.items.reduce(
      (acc, it) =>
        acc +
        (Number(it.quantity) || 0) *
          (Number(it.price) || 0),
      0
    );

    return {
      subtotal: sub,
      total: sub + (Number(form.deliveryCharge) || 0),
    };
  }, [form.items, form.deliveryCharge]);

  /* ================= HANDLERS ================= */
  const setField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const setItemField = (index, key, value) => {
    setForm((prev) => {
      const items = [...prev.items];
      items[index] = {
        ...items[index],
        [key]: key === "name" ? value : Number(value),
      };
      return { ...prev, items };
    });
  };

  const addItem = () =>
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { name: "", quantity: 1, price: 0 },
      ],
    }));

  const removeItem = (index) =>
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter(
        (_, i) => i !== index
      ),
    }));

  /* ================= UI ================= */
  return (
    <div className="max-w-7xl mx-auto">

<p className="text-center">

  <a
  href="/"
  className="
    inline-flex items-center gap-2
    px-5 py-2.5
    rounded-md
    bg-blue-600 text-white
    font-medium text-sm
    shadow-md
    hover:bg-blue-700 
    active:scale-95
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-400
  "
>
  🔄 Reload
</a>
</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* ================= LEFT SIDE ================= */}
        <div className="space-y-4">
          <InvoiceForm
            form={form}
            setField={setField}
          />

          <InvoiceItems
            items={form.items}
            setItemField={setItemField}
            addItem={addItem}
            removeItem={removeItem}
          />

          <PDFDownloadLink
            document={<InvoicePDF form={form} />}
            fileName={`invoice_${form.customDate}.pdf`}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            {({ loading }) =>
              loading
                ? "Generating PDF..."
                : "Download PDF"
            }
          </PDFDownloadLink>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <InvoicePreview
          form={form}
          subtotal={subtotal}
          total={total}
        />
      </div>
    </div>
  );
};

export default InvoiceGenerator;
