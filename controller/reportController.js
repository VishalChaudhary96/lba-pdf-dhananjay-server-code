const {
  generateBalanceSheetReport,
  generateExpenseReport,
  generateNetProfitNLossReport,
} = require("../utils");
const { getISTDateTime } = require("../utils/formatDate");

const generateReport = async (req, res, reportType) => {
  let fileName;
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
        fileName = "BankStatement.pdf";
        break;
      case "net-profit-n-loss":
        pdfBuffer = await generateNetProfitNLossReport(reportDate);
        fileName = "ProfitNLossStatement.pdf";
        break;
      case "income":
        await generateExpenseReport(reportDate);
        break;
    }

    // Send PDF as response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    console.log(
      `${getISTDateTime()} POST : Sending Response Back of Generate Balance Sheet, File : reportController.js, payload : `,
      req.body
    );
    return res.status(200).send(pdfBuffer);

    // res.status(201).json({ message: "Report generated successfully" });
  } catch (error) {
    console.error(
      `${getISTDateTime()} POST : Generate Balance Sheet, File : reportController.js, Error : ${
        error.message
      }, payload : `,
      req.body
    );
    res.status(500).json({ message: "Error generating report", error });
  }
};

module.exports = {
  generateReport,
};
