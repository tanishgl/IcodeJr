const express = require("express");
const {
  transferMoney,
  getTransactions,
} = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/transfer", authMiddleware, transferMoney);
router.get("/history", authMiddleware, getTransactions);

module.exports = router;
