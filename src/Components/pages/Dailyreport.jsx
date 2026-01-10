import { useEffect, useState } from "react";
import api from "../../Routes/api";

const Dailyreport = () => {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH REPORT ================= */
  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/dailyReport?date=${date}`);
        setReport(res.data);
      } catch (err) {
        console.error(err);
        alert("রিপোর্ট লোড করা যায়নি");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [date]);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        <h2 className="text-2xl font-semibold">
          Daily Report
        </h2>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input input-bordered w-full md:w-auto"
        />
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center py-6">
          Loading report...
        </p>
      )}

      {/* NO DATA */}
      {!loading && report?.sales?.length === 0 && (
        <p className="text-center py-6 text-gray-500">
          এই তারিখে কোনো বিক্রয় নেই
        </p>
      )}

      {/* REPORT TABLE */}
      {!loading && report?.sales?.length > 0 && (
        <>
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="table min-w-[1100px] w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Pcs</th>
                  <th>KG</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Discount</th>
                  <th>Final Amount</th>
                </tr>
              </thead>

              <tbody>
                {report.sales.map((sale, index) => (
                  <tr key={sale._id}>
                    <td>{index + 1}</td>
                    <td>{sale.customerName || "—"}</td>
                    <td>{sale.boilerPcs}</td>
                    <td>{sale.boilerKg}</td>
                    <td>{sale.price}</td>
                    <td>{sale.amount}</td>
                    <td>{sale.discount || 0}</td>
                    <td className="font-semibold text-green-600">
                      {sale.finalAmount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SUMMARY */}
          <div className="mt-4 bg-white shadow rounded-lg p-4 flex flex-col md:flex-row md:justify-between gap-2">
            <p>
              <b>Total Discount:</b>{" "}
              {report.totalDiscount || 0}
            </p>
            <p>
              <b>Discount Count:</b>{" "}
              {report.discountCount || 0}
            </p>
            <p>
              <b>Total Sales:</b>{" "}
              {report.sales.length}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Dailyreport;
