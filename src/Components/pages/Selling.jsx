import { useEffect, useState } from "react";
import api from "../../Routes/api";

const Selling = () => {
  const today = new Date().toISOString().split("T")[0];

  const [customers, setCustomers] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [date, setDate] = useState(today);

  const [sales, setSales] = useState([
    {
      customerId: "",
      customerName: "",
      boilerPcs: "",
      boilerKg: "",
      price: "",
      discount: "", // OPTIONAL
    },
  ]);

  /* ================= FETCH CUSTOMERS ================= */
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setFetching(true);
        const res = await api.get("/customers");
        const list = Array.isArray(res.data)
          ? res.data
          : res.data.customers || [];
        setCustomers(list);
      } catch (err) {
        console.error(err);
        alert("কাস্টমার লিস্ট লোড করা যায়নি");
      } finally {
        setFetching(false);
      }
    };
    fetchCustomers();
  }, []);

  /* ================= HANDLERS ================= */
  const handleFieldChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...sales];
    updated[index][name] = value;
    setSales(updated);
  };

  const handleCustomerChange = (index, customerId) => {
    const customer = customers.find((c) => c._id === customerId);
    const updated = [...sales];
    updated[index].customerId = customerId;
    updated[index].customerName = customer?.name || "";
    setSales(updated);
  };

  const addRow = () => {
    setSales([
      ...sales,
      {
        customerId: "",
        customerName: "",
        boilerPcs: "",
        boilerKg: "",
        price: "",
        discount: "",
      },
    ]);
  };

  const removeRow = (index) => {
    if (sales.length === 1) return;
    setSales(sales.filter((_, i) => i !== index));
  };

  /* ================= VALIDATION ================= */
  const validateSales = () => {
    for (let i = 0; i < sales.length; i++) {
      const s = sales[i];
      const row = i + 1;

      if (!s.customerId) return `Row ${row}: Customer is required`;
      if (s.boilerPcs === "") return `Row ${row}: Boiler Pcs is required`;
      if (s.boilerKg === "") return `Row ${row}: Boiler KG is required`;
      if (s.price === "") return `Row ${row}: Price is required`;
      // ❌ Discount NOT required anymore
    }
    return null;
  };

  /* ================= CALCULATIONS (DECIMAL SAFE) ================= */
  const calculatedSales = sales.map((s) => {
    const kg = parseFloat(s.boilerKg || 0);
    const price = parseFloat(s.price || 0);
    const discount = parseFloat(s.discount || 0); // DEFAULT 0

    const amount = kg * price;
    const finalAmount = amount - discount;

    return {
      ...s,
      boilerPcs: parseInt(s.boilerPcs, 10),
      boilerKg: kg,
      price,
      discount,
      amount: Number(amount.toFixed(2)),
      finalAmount: Number(finalAmount.toFixed(2)),
    };
  });

  const totalDiscount = Number(
    calculatedSales
      .reduce((sum, s) => sum + s.discount, 0)
      .toFixed(2)
  );

  const discountCount = calculatedSales.filter(
    (s) => s.discount > 0
  ).length;

  // Prevent duplicate customer selection
  const selectedCustomerIds = sales
    .map((s) => s.customerId)
    .filter(Boolean);

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    const error = validateSales();
    if (error) {
      alert(error);
      return;
    }

    try {
      await api.post("/dailyReport", {
        date,
        sales: calculatedSales,
        totalDiscount,
        discountCount,
      });

      alert("ডেইলি রিপোর্ট সফলভাবে সেভ হয়েছে");

      setSales([
        {
          customerId: "",
          customerName: "",
          boilerPcs: "",
          boilerKg: "",
          price: "",
          discount: "",
        },
      ]);
    } catch (err) {
      console.error(err);
      alert("ডেটা সেভ করা যায়নি");
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        <h2 className="text-2xl font-semibold">Daily Selling</h2>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input input-bordered w-full md:w-auto"
          required
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="table min-w-[1100px] w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>Customer</th>
              <th>Pcs</th>
              <th>KG</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Discount</th>
              <th>Final</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {calculatedSales.map((row, index) => (
              <tr key={index}>
                {/* CUSTOMER */}
                <td>
                  <select
                    required
                    value={row.customerId}
                    onChange={(e) =>
                      handleCustomerChange(index, e.target.value)
                    }
                    className="select select-bordered w-full min-w-[200px]"
                  >
                    <option value="">
                      {fetching ? "Loading..." : "Select Customer"}
                    </option>

                    {customers.map((c) => {
                      const disabled =
                        selectedCustomerIds.includes(c._id) &&
                        c._id !== row.customerId;
                      return (
                        <option key={c._id} value={c._id} disabled={disabled}>
                          {c.name}
                          {disabled ? " (Selected)" : ""}
                        </option>
                      );
                    })}
                  </select>
                </td>

                {/* PCS */}
                <td>
                  <input
                    type="number"
                    step="1"
                    name="boilerPcs"
                    required
                    value={row.boilerPcs}
                    onChange={(e) => handleFieldChange(index, e)}
                    className="input input-bordered w-full"
                  />
                </td>

                {/* KG */}
                <td>
                  <input
                    type="number"
                    step="0.01"
                    name="boilerKg"
                    required
                    value={row.boilerKg}
                    onChange={(e) => handleFieldChange(index, e)}
                    className="input input-bordered w-full"
                  />
                </td>

                {/* PRICE */}
                <td>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    required
                    value={row.price}
                    onChange={(e) => handleFieldChange(index, e)}
                    className="input input-bordered w-full"
                  />
                </td>

                {/* AMOUNT */}
                <td>{row.amount.toFixed(2)}</td>

                {/* DISCOUNT (OPTIONAL) */}
                <td>
                  <input
                    type="number"
                    step="0.01"
                    name="discount"
                    placeholder="0"
                    value={row.discount}
                    onChange={(e) => handleFieldChange(index, e)}
                    className="input input-bordered w-full"
                  />
                </td>

                {/* FINAL */}
                <td className="font-semibold text-green-600">
                  {row.finalAmount.toFixed(2)}
                </td>

                {/* ACTION */}
                <td>
                  <button
                    onClick={() => removeRow(index)}
                    className="btn btn-error btn-sm"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-5">
        <div className="text-sm">
          <p><b>Total Discount:</b> {totalDiscount.toFixed(2)}</p>
          <p><b>Discount Count:</b> {discountCount}</p>
        </div>

        <div className="flex gap-2">
          <button onClick={addRow} className="btn btn-outline">
            + Add Row
          </button>
          <button onClick={handleSubmit} className="btn btn-primary">
            Save Daily Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Selling;
