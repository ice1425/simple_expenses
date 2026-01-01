import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const [category, setCate] = useState([]);
  const [expense, setExpense] = useState([]);
  const [sortType, setSortType] = useState("desc");
  const [data, setData] = useState({
    amount: "",
    category_id: "",
    description: "",
  });

  const handleSort = (e) => {
    setSortType(e.target.value);
  };

  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddExpense = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_ENDPOINT}`, data);
      if (res.status == 201) {
        console.log("เพิ่มสำเร็จ");
        fetchExpense();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDel = async (id) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_ENDPOINT}/${id}`);
      if (res.status === 200) {
        console.log("ลบสำเร็จ");
        setExpense(expense.filter((item) => item.id != id));
        fetchExpense();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCate = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}/category`);
      setCate(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchExpense = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}/filter`, {
        params: {
          sort: sortType,
        },
      });
      setExpense(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExpense();
  }, [sortType]);

  useEffect(() => {
    fetchCate();
    fetchExpense();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-xl font-bold mb-6 text-center text-gray-800">
          บันทึกค่าใช้จ่าย
        </h1>

        <div className="flex flex-col gap-4">
          {/* ส่วนกรอกจำนวนเงิน */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              จำนวนเงิน
            </label>
            <input
              type="number"
              name="amount"
              onChange={handlechange}
              placeholder="0"
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          {/* ส่วนเลือกหมวดหมู่ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              หมวดหมู่
            </label>
            <select
              name="category_id"
              onChange={handlechange}
              className="w-full border-2 border-gray-200 rounded-lg p-3 bg-white focus:outline-none focus:border-blue-500 transition-all"
            >
              <option value="">-- เลือกหมวดหมู่ --</option>
              {category.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* ส่วนกรอกรายละเอียด */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              รายละเอียด
            </label>
            <input
              type="text"
              name="description"
              onChange={handlechange}
              placeholder="ระบุรายละเอียด (ถ้ามี)"
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex justify-between gap-2 mt-2">
            <button
              onClick={handleAddExpense}
              className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
            >
              บันทึกรายการ
            </button>
          </div>
        </div>

        {/* ตารางแสดงค่าใช้จ่าย */}
        <div className="w-full  bg-white p-6 rounded-xl shadow-lg ">
          <div className=" flex justify-between items-center">
            <h2 className="w-full text-xl font-bold mb-4">รายการล่าสุด</h2>
            <button 
            onClick={() => navigate("/dashboard")}
            className="w-full cursor-pointer bg-green-800 text-white font-bold py-3 rounded-lg  hover:bg-gray-400 transition-colors shadow-md">
              Dashboard
            </button>
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">เรียงลำดับ</label>
            <select
              name="sort"
              onChange={handleSort}
              className="border rounded p-2 text-sm"
            >
              <option value="desc">รายการล่าสุด</option>
              <option value="asc">รายการแรก</option>
              <option value="amount_desc">เงิน มาก ไป น้อย</option>
              <option value="amount_asc">เงิน น้อย ไป มาก</option>
            </select>
          </div>
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="border-b-2">
                <th className="py-2">วันที่</th>
                <th className="py-2">หมวดหมู่</th>
                <th className="py-2 ">จำนวนเงิน</th>
                <th className="py-2">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {expense &&
                expense.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3 text-sm">
                      {new Date(item.date).toLocaleDateString("th-TH")}
                    </td>
                    <td className="py-3 font-medium">{item.name}</td>
                    <td className="py-3  text-red-500 font-bold">
                      {Number(item.amount).toLocaleString()}
                    </td>
                    <td className="py-3 flex flex-col gap-2">
                      <Link to={`/edit/${item.id}`}>
                        <button className="text-blue-500 mr-2 w-full bg-s cursor-pointer hover:bg-blue-500 hover:text-blue-50 rounded-4xl transition-colors">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDel(item.id)}
                        className="text-red-500 cursor-pointer hover:bg-red-500 hover:text-red-100 rounded-4xl transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
