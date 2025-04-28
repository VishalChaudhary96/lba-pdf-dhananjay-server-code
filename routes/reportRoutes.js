const express = require("express");
const router = express.Router();
const { generateReport } = require("../controller");
const { authorization } = require("../middleware");

// router.post("/download/balance-sheet", authorization, (req, res) =>
//   generateReport(req, res, "balance-sheet")
// );

router.post("/download/balance-sheet", (req, res) =>
  generateReport(req, res, "balance-sheet")
);
// router.get("/", (req, res) => generateReport(req, res, "balance-sheet"));

router.post("/download/trips", authorization, (req, res) =>
  generateReport(req, res, "trips")
);
router.post("/download/net-profit-n-loss", authorization, (req, res) =>
  generateReport(req, res, "net-profit-n-loss")
);
router.post("/download/income", authorization, (req, res) =>
  generateReport(req, res, "income")
);
router.post("/download/expense", authorization, (req, res) =>
  generateReport(req, res, "expense")
);

module.exports = router;
