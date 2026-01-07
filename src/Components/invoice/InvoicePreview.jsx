/* eslint-disable react/prop-types */
const currency = (n) =>
  new Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(n) ? n : 0);

const InvoicePreview = ({ form, subtotal, total }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2">
        <div>
          <h3 className="text-xl font-bold text-red-600">
            Fresh Cut Chicken Service
          </h3>
          <p className="text-xs text-gray-600">
            Invoice Preview
          </p>
        </div>

        <div className="text-right text-xs text-gray-600">
          <p>
            Date:{" "}
            {new Date(form.customDate).toLocaleDateString("bn-BD")}
          </p>
          <p>Payment: {form.paymentMethod}</p>
        </div>
      </div>

      {/* Bill To */}
      <div className="text-sm">
        <h4 className="font-semibold mb-1">Bill To:</h4>
        <p>{form.name || "—"}</p>
        <p>{form.address || "—"}</p>
        {form.apartment && <p>{form.apartment}</p>}
        <p>Phone: {form.phone || "—"}</p>
        {form.email && <p>{form.email}</p>}
      </div>

      {/* Items Table */}
      <table className="w-full text-left border text-xs">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-1">Product</th>
            <th className="p-1 text-right">কেজি</th>
            <th className="p-1 text-right">দাম</th>
            <th className="p-1 text-right">মোট</th>
          </tr>
        </thead>
        <tbody>
          {form.items.map((it, i) => {
            const qty = Number(it.quantity) || 0;
            const price = Number(it.price) || 0;
            return (
              <tr key={i} className="border-b">
                <td className="p-1">{it.name || "—"}</td>
                <td className="p-1 text-right">{qty}</td>
                <td className="p-1 text-right">
                  {currency(price)}
                </td>
                <td className="p-1 text-right">
                  {currency(qty * price)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Totals */}
      <div className="text-right text-sm space-y-1">
        <p>
          Subtotal:{" "}
          <span className="font-medium">
            {currency(subtotal)}
          </span>
        </p>
        <p>
          Delivery Charge:{" "}
          <span className="font-medium">
            {currency(Number(form.deliveryCharge) || 0)}
          </span>
        </p>
        <p className="font-semibold text-base">
          Total: {currency(total)}
        </p>
      </div>
    </div>
  );
};

export default InvoicePreview;