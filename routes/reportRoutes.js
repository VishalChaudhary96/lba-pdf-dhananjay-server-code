const express = require("express");
const router = express.Router();
const { generateReport } = require("../controller");
const { authorization } = require("../middleware");
const { getISTDateTime } = require("../utils/formatDate");

router.post("/download/balance-sheet", (req, res) => {
  console.log(
    `${getISTDateTime()} POST : Generate Balance Sheet, File : reportRoutes.js, Payload : `,
    req.body
  );
  return generateReport(req, res, "balance-sheet");
});

router.post("/download/net-profit-n-loss", (req, res) => {
  console.log(
    `${getISTDateTime()} POST : Generate Net Profit & Loss, File : reportRoutes.js, Payload : `,
    req.body
  );
  return generateReport(req, res, "net-profit-n-loss");
});

router.post("/download/invoice", authorization, (req, res) =>
  generateReport(req, res, "income")
);

module.exports = router;
