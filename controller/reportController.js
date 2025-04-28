const {
  generateBalanceSheetReport,
  generateExpenseReport,
  generateIncomeReport,
  generateNetProfitNLossReport,
  generateTripsReport,
} = require("../utils");

const generateReport = async (req, res, reportType) => {
  console.log(`download ${reportType} report`);
  let pdfBuffer;
  try {
    const reportDate = req.body;
    // const reportDate = {
    //   from: "2024-12-05",
    //   to: "2024-12-09",
    // };
    switch (reportType) {
      case "balance-sheet":
        // pdfBuffer = await generateBalanceSheetReport(reportDate, req.user);
        pdfBuffer = await generateBalanceSheetReport(reportDate, {
          id: "65bfa2046599c7824d8543a7",
        });
        if (pdfBuffer.status === "Error") {
          throw new Error(pdfBuffer);
        }

        break;
      case "trips":
        await generateNetProfitNLossReport(reportDate);
        break;
      case "net-profit-n-loss":
        await generateIncomeReport(reportDate);
        break;
      case "income":
        await generateExpenseReport(reportDate);
        break;
      case "expense":
        await generateTripsReport(reportDate);
        break;
    }

    // Send PDF as response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="BankStatement.pdf"'
    );
    res.send(pdfBuffer);

    // res.status(201).json({ message: "Report generated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error generating report", error });
  }
};

module.exports = {
  generateReport,
};
