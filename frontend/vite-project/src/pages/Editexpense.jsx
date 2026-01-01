import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Editexpense = () => {
  const id = useParams();
  const navigate = useNavigate();
  const [category, setCate] = useState([]);
  const [data, setData] = useState({
    amount: "",
    category_id: "",
    description: "",
  });

  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_ENDPOINT}/${id.id}`,
        data
      );
      if (res.status == 200) {
        console.log("อัปเดตสำเร็จ");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}/${id.id}`);
      if (res.data.result.length === 0){
        navigate("/")
        return;
      }
      setData({
        amount: res.data.result[0].amount,
        category_id: res.data.result[0].category_id,
        description: res.data.result[0].description,
      });
    } catch (err) {
      console.log(err);
      navigate("/");
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
  useEffect(() => {
    fetchCate();
    fetchData();
  }, []);
  return (
    <>
      <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
          <h1 className="text-xl font-bold mb-6 text-center text-gray-800">
            เปลี่ยนแปลงค่าใช้จ่าย
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
                value={data.amount}
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
                value={data.category_id}
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
                value={data.description}
                onChange={handlechange}
                placeholder="ระบุรายละเอียด (ถ้ามี)"
                className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div className="flex justify-between gap-2 mt-2">
              <button
                onClick={handleUpdate}
                className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
              >
                บันทึกรายการ
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
