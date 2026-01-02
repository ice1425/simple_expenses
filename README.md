Skill Test for Fullstack Developer Trainee
Project: Simple Expense Tracker Application
Developed by: วิชญ์พล อาการักษ์


[ รายละเอียดโปรเจกต์ ]
เว็บแอปพลิเคชันสำหรับบันทึกรายรับ-รายจ่าย สามารถเพิ่ม ลบ แก้ไขรายการได้
พร้อม Dashboard แสดงกราฟสรุปผลและระบบกรองข้อมูล (Filter) ตามช่วงเวลา

[ Tech Stack ]
- Frontend: React.js, Tailwind CSS, Axios
- Backend: Node.js, Express.js
- Database: MySQL

[ ขั้นตอนการติดตั้ง (Installation Guide) ]

1. การตั้งค่าฐานข้อมูล (Database Setup)
   - เปิดโปรแกรมจัดการฐานข้อมูล MySQL Workbench
   - สร้าง Database ใหม่ชื่อ: "simple_expenses"
   - ทำการ Import ไฟล์ "simple_expenses.sql" ที่แนบมาในโฟลเดอร์นี้

2. การรันฝั่ง Backend (Server)
   - เปิด Terminal แล้วเข้าไปที่โฟลเดอร์ backend
     Command: cd backend
   - ติดตั้ง Library ที่จำเป็น
     Command: npm install
   - ตรวจสอบไฟล์ .env หรือไฟล์ connect database (เช่น db.js)
     ให้แน่ใจว่า username/password ของ MySQL ตรงกับเครื่องของคุณ
   - รัน Server
     Command: node index.js หรือ npm start
   - Server จะทำงาน

3. การรันฝั่ง Frontend (Client)
   - เปิด Terminal ใหม่ (อีกหน้าต่าง) แล้วเข้าไปที่โฟลเดอร์ frontend
     Command: cd frontend\vite-project
   - ติดตั้ง Library ที่จำเป็น
     Command: npm install
   - รันโปรเจกต์
     Command: npm run dev
   - เปิด Browser ไปที่ URL ที่แสดง http://localhost:5173

ขอบคุณครับ
วิชญ์พล อาการักษ์
