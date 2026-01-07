/* eslint-disable react/prop-types */
import { productList } from "./productList";

const InvoiceItems = ({ items, setItemField, addItem, removeItem }) => {
  return (
   <div className="bg-white p-5 rounded-lg shadow-md">
  <h2 className="text-lg font-semibold mb-4 border-b pb-2">
    🧾 পণ্যের তালিকা
  </h2>

  {/* Header */}
  <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-600 mb-2">
    <div className="col-span-5">পণ্যের নাম</div>
    <div className="col-span-2 text-center">কেজি</div>
    <div className="col-span-3 text-center">দাম</div>
    <div className="col-span-2 text-center">Remove</div>
  </div>

  {items.map((it, i) => (
    <div
      key={i}
      className="grid grid-cols-12 gap-2 items-center mb-2"
    >
      {/* Product name */}
      <input
        list="products"
        placeholder="পণ্য নির্বাচন করুন"
        className="col-span-5 border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
        value={it.name}
        onChange={(e) => setItemField(i, "name", e.target.value)}
      />

      {/* Quantity */}
      <input
        type="number"
        placeholder="কেজি"
        className="col-span-2 border rounded px-2 py-2 text-center focus:outline-none focus:ring-1 focus:ring-blue-400"
        value={it.quantity}
        onChange={(e) => setItemField(i, "quantity", e.target.value)}
      />

      {/* Price */}
      <input
        type="number"
        placeholder="৳ দাম"
        className="col-span-3 border rounded px-2 py-2 text-center focus:outline-none focus:ring-1 focus:ring-blue-400"
        value={it.price}
        onChange={(e) => setItemField(i, "price", e.target.value)}
      />

      {/* Remove */}
      <button
        onClick={() => removeItem(i)}
        className="col-span-2 text-red-500 hover:text-red-700 text-lg"
        title="Remove item"
      >
        ✕
      </button>
    </div>
  ))}

  {/* Datalist */}
  <datalist id="products">
    {productList.map((p, i) => (
      <option key={i} value={p.name} />
    ))}
  </datalist>

  {/* Add item */}
  <button
    onClick={addItem}
    className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
  >
    ➕ নতুন আইটেম যোগ করুন
  </button>
</div>

  );
};

export default InvoiceItems;
