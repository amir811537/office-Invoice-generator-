import { useEffect, useState } from "react";
import api from "../../Routes/api";

/* ===== বাংলা সংখ্যা কনভার্ট ===== */
const toBanglaNumber = (num) => {
  const bnDigits = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
  return num
    .toString()
    .split("")
    .map(d => (d >= "0" && d <= "9" ? bnDigits[d] : d))
    .join("");
};

const Dailyreport = () => {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===== রিপোর্ট লোড ===== */
  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/dailyReport?date=${date}`);
        setReport(res.data);
      } catch (err) {
        alert("রিপোর্ট লোড করা যায়নি");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [date]);

  /* ===== মোট হিসাব ===== */
  const totals = report?.sales?.reduce(
    (acc, sale) => {
      acc.pcs += Number(sale.boilerPcs || 0);
      acc.kg += Math.round(sale.boilerKg || 0);
      acc.discount += Number(sale.discount || 0);
      acc.finalAmount += Number(sale.finalAmount || 0);
      return acc;
    },
    { pcs: 0, kg: 0, discount: 0, finalAmount: 0 }
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* ===== হেডার ===== */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-6">
        <h2 className="text-2xl font-semibold">
          দৈনিক বিক্রয় রিপোর্ট
        </h2>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input input-bordered"
        />
      </div>

      {/* ===== লোডিং ===== */}
      {loading && (
        <p className="text-center py-6">
          রিপোর্ট লোড হচ্ছে...
        </p>
      )}

      {/* ===== ডাটা নেই ===== */}
      {!loading && report?.sales?.length === 0 && (
        <p className="text-center py-6 text-gray-500">
          এই তারিখে কোনো বিক্রয় নেই
        </p>
      )}

      {/* ===== রিপোর্ট টেবিল ===== */}
      {!loading && report?.sales?.length > 0 && (
        <>
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="table w-full min-w-[1100px] border">
              <thead className="bg-gray-100 text-sm">
                <tr>
                  <th>#</th>
                  <th>ক্রেতা</th>
                  <th>পিস</th>
                  <th>কেজি</th>
                  <th>দর</th>
                  <th>মোট টাকা</th>
                  <th>ছাড়</th>
                  <th>নিট টাকা</th>
                </tr>
              </thead>

              <tbody>
                {report.sales.map((sale, index) => (
                  <tr key={sale._id}>
                    <td>{toBanglaNumber(index + 1)}</td>
                    <td>{sale.customerName || "—"}</td>
                    <td>{toBanglaNumber(sale.boilerPcs)}</td>
                    <td>{toBanglaNumber(Math.round(sale.boilerKg))}</td>
                    <td>৳{toBanglaNumber(Math.round(sale.price))}</td>
                    <td>৳{toBanglaNumber(Math.round(sale.amount))}</td>
                    <td className="text-red-600">
                      {toBanglaNumber(sale.discount || 0)}
                    </td>
                    <td className="font-semibold text-green-600">
                      ৳{toBanglaNumber(Math.round(sale.finalAmount))}
                    </td>
                  </tr>
                ))}
              </tbody>

              {/* ===== মোট সারি ===== */}
              <tfoot className="bg-gray-100 font-semibold">
                <tr>
                  <td colSpan={2} className="text-right text-xl font-bold">
                    মোট
                  </td>
                  <td className="text-green-700 text-xl font-bold">{toBanglaNumber(totals.pcs)} পিছ</td>
                  <td className="text-green-700 text-xl font-bold">{toBanglaNumber(totals.kg)} কেজি</td>
                  <td>—</td>
                  <td>—</td>
                  <td className="text-red-700 text-xl font-bold">
                    ৳{toBanglaNumber(totals.discount)}
                  </td>
                  <td className="text-green-700 text-xl font-bold">
                   ৳ {toBanglaNumber(totals.finalAmount)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Dailyreport;
