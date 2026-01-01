const dbconn = require("../configs/db");
const createExpense = (req, res) => {
  const data = req.body;
  try {
    if (!data.amount || data.amount <= 0) {
      return res.status(400).json({ message: "โปรดกรอกจำนวนเงินให้ถูกต้อง" });
    }

    dbconn.query("insert into expenses set ?", data, (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" });
      }
      return res.status(201).json({ message: "บันทึกสำเร็จ" });
    });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

const filter = (req, res) => {
  const data = req.query;
  try {
    let sql = `SELECT e.*, c.name FROM expenses e JOIN categories c ON e.category_id = c.id WHERE 1=1`;

    if (data.sort === "desc") {
      sql += ` ORDER BY e.id DESC`;
    } else if (data.sort === "asc") {
      sql += ` ORDER BY e.id ASC`;
    } else if (data.sort === "amount_desc") {
      sql += ` ORDER BY e.amount DESC`;
    } else if (data.sort === "amount_asc") {
      sql += ` ORDER BY e.amount ASC`;
    }else {
      sql += ` ORDER BY e.id ASC`
    }

    dbconn.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" });
      }
      return res
        .status(200)
        .json({ message: "กรองข้อมูลเรียบร้อย", result: result });
    });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    dbconn.query(
      `UPDATE expenses SET ? WHERE id = ?`,
      [data, id],
      (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" });
        }
        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ message: "ไม่พบข้อมูลที่ต้องการอัปเดต" });
        }
        return res.status(200).json({ message: "อัปเดตเสร็จสิ้น" });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  try {
    dbconn.query(`DELETE FROM expenses WHERE id = ?`, [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "เกิดข้อผิดพลาดในการลบข้อมูล" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "ไม่พบข้อมูลที่ต้องการลบ" });
      }
      return res.status(200).json({ message: "ลบสำเร็จ" });
    });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

const getcategory = (req, res) => {
  try {
    dbconn.query(`SELECT * FROM categories`, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" });
      }
      return res.status(200).json({ message: "success", result: result });
    });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

const getAll = (req, res) => {
  try {
    dbconn.query(
      `SELECT e.id, e.amount, e.date, c.id as category_id, c.name FROM expenses e LEFT JOIN categories c ON e.category_id = c.id `,
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "เกิดข้อผิดพลาด" });
        }
        return res.status(200).json({ message: "success", result: result });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

const getByid = (req, res) => {
  const { id } = req.params;
  try {
    dbconn.query(
      `SELECT e.id, e.amount, e.date, c.id as category_id, c.name, e.description FROM expenses e LEFT JOIN categories c ON e.category_id = c.id WHERE e.id = ?`,
      id,
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "เกิดข้อผิดพลาด" });
        }
        if (result.length === 0){
          return res.status(404).json({message:"ไม่พบข้อมูล"})
        }
        return res.status(200).json({ message: "success", result: result });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  createExpense,
  filter,
  updateExpense,
  deleteExpense,
  getcategory,
  getAll,
  getByid,
};
