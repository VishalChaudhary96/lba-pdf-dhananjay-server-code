const { BalanceSheets } = require("../models");
const { filterReport } = require("../utils/filterReport");
const { getISTDateTime } = require("../utils/formatDate");
const { getBalanceSheetPdf } = require("./getBalanceSheetPdf");
const {
  calculateOpeningBalanceOfFromDate,
} = require("./calculateOpeningBalanceOfFromDate");

module.exports = async function generateBalanceSheetReport(reportDates, user) {
  try {
    const documents = await BalanceSheets.findOne({ user: user.id }); // Perform the find operation
    const { filteredItems, reverseTotalCredit, reverseTotalDebit } =
      filterReport(documents.items, reportDates.from, reportDates.to); // filter the report as per given date range

    const openingBalance = calculateOpeningBalanceOfFromDate(
      reverseTotalCredit,
      reverseTotalDebit,
      documents.totalCreditedAmount,
      documents.totalDebitedAmount
    );

    const pdfBuffer = await getBalanceSheetPdf({
      items: filteredItems,
      ...reportDates,
      totalCredit: documents.totalCreditedAmount,
      totalDebit: documents.totalDebitedAmount,
      currentBalance: documents.balanceAmount,
      openingBalance,
    });

    return pdfBuffer; // Return the retrieved documents
  } catch (error) {
    console.error(
      `${getISTDateTime()} POST : Generate Balance Sheet, File : generateBalanceSheetReport.js, Error : ${
        error.message
      }, Payload : `,
      reportDates
    );
    console.error("Error during find operation:", error); // Log the error for debugging
    throw new Error(error.message); // Throw a custom error
  }
};
