/* eslint-disable react/prop-types */

const InvoiceForm = ({ form, setField }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">
        Customer & Order Info
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Customer Name */}
        <input
          className="border p-2 rounded"
          placeholder="Customer Name"
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
        />

        {/* Phone */}
        <input
          className="border p-2 rounded"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setField("phone", e.target.value)}
        />

        {/* Address */}
        <input
          className="border p-2 rounded sm:col-span-2"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setField("address", e.target.value)}
        />

        {/* Apartment */}
        <input
          className="border p-2 rounded"
          placeholder="Apartment (optional)"
          value={form.apartment}
          onChange={(e) => setField("apartment", e.target.value)}
        />

        {/* Email */}
        <input
          className="border p-2 rounded"
          placeholder="Email (optional)"
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
        />

        {/* Date */}
        <input
          type="date"
          className="border p-2 rounded"
          value={form.customDate}
          onChange={(e) => setField("customDate", e.target.value)}
        />

        {/* Payment Method */}
        <select
          className="border p-2 rounded"
          value={form.paymentMethod}
          onChange={(e) => setField("paymentMethod", e.target.value)}
        >
          <option value="Cash">Cash</option>
          <option value="Bank">Bank</option>
          <option value="COD">Due</option>
          <option value="Bkash">Bkash</option>
          <option value="Nagad">Nagad</option>
        </select>

        {/* Delivery Charge */}
        <div className="sm:col-span-2 flex items-center gap-3">
          <label className="text-sm text-gray-600">
            Delivery Charge
          </label>
          <input
            type="number"
            className="border p-2 rounded w-40"
            value={form.deliveryCharge}
            onChange={(e) =>
              setField("deliveryCharge", Number(e.target.value))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
