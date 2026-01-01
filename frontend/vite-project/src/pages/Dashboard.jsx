import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [expense, setExpense] = useState([]);

  const fetchExpense = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}/filter?sort=desc`);
      if (res.data.result) {
        setExpense(res.data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExpense();
  }, []);

  // หาผลรวมทั้งหมด
  const totalAmount = expense.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  // หาค่าเฉลี่ยต่อรายการ
  const averageAmount = expense.length > 0 ? totalAmount / expense.length : 0;

  // จัดกลุ่มผลรวมตามหมวดหมู่
  const categorySummary = expense.reduce((acc, item) => {
    const catName = item.name;
    if (!acc[catName]) {
      acc[catName] = 0;
    }
    acc[catName] += Number(item.amount);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800"> สรุปค่าใช้จ่าย</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            กลับหน้าหลัก
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center ">
            <p className="text-gray-500">ยอดรวมทั้งหมด</p>
            <h2 className="text-2xl font-bold text-red-500">
              {totalAmount.toLocaleString()} บาท
            </h2>
          </div>

          {/* จำนวนรายการ */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <p className="text-gray-500">บันทึกไปแล้ว</p>
            <h2 className="text-2xl font-bold text-blue-600">
              {expense.length} รายการ
            </h2>
          </div>

          {/* ค่าเฉลี่ย */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <p className="text-gray-500">เฉลี่ยต่อรายการ</p>
            <h2 className="text-2xl font-bold text-orange-500">
              {averageAmount.toFixed(0)} บาท
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/*สรุปตามหมวดหมู่ */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold mb-4 border-b pb-2">
              แยกตามหมวดหมู่
            </h3>
            <ul className="space-y-3">
              {/* แปลง Object เป็น Array เพื่อ Map แสดงผล */}
              {Object.keys(categorySummary).map((catName, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{catName}</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {categorySummary[catName].toLocaleString()} บาท
                  </span>
                </li>
              ))}
              {Object.keys(categorySummary).length === 0 && (
                <p className="text-gray-400 text-center">ยังไม่มีข้อมูลนะครับ</p>
              )}
            </ul>
          </div>

          {/*รายการล่าสุด 5 อัน*/}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold mb-4 border-b pb-2">
              5 รายการล่าสุด
            </h3>
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-sm">
                  <th className="pb-2">วันที่</th>
                  <th className="pb-2">รายการ</th>
                  <th className="pb-2">รายละเอียด</th>
                  <th className="pb-2 text-right">บาท</th>
                </tr>
              </thead>
              <tbody>
                {expense.slice(0, 5).map((item) => (
                  <tr key={item.id} className="border-b border-0">
                    <td className="py-2 text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString("th-TH")}
                    </td>
                    <td className="py-2 text-gray-800">{item.name}</td>
                    <td className="py-2 text-gray-800 text-center">{item.description}</td>
                    <td className="py-2 text-right font-semibold text-red-500">
                      {Number(item.amount).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {expense.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-400">
                      ยังไม่มีข้อมูลนะครับ
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
