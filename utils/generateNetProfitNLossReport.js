const { Trips } = require("../models");
const { getISTDateTime, getISTDateYYYYMMDD } = require("../utils/formatDate");
const { getProfitNLossPdf } = require("../utils/getProfitNLossPdf");

module.exports = async function generateNetProfitNLossReport(reportData) {
  try {
    const query = {
      ...((reportData.vehicleNumber && {
        "primaryDetails.vehicleNumber": reportData.vehicleNumber,
      }) ||
        ""),
      "primaryDetails.date": {
        $gte: getISTDateYYYYMMDD(reportData.from), // Start of the date range
        $lte: getISTDateYYYYMMDD(reportData.to), // End of the date range
      },
    };

    const documents = await Trips.find(query); // Perform the find operation
    const pdfBuffer = await getProfitNLossPdf({
      items: documents,
      ...reportData,
    });

    return pdfBuffer; // Return the retrieved documents
  } catch (error) {
    console.error(
      `${getISTDateTime()} POST : Generate Profit N Loss Sheet, File : generateNetProfitNLossReport.js, Error : ${
        error.message
      }, Payload : `,
      reportData
    );
    console.error("Error during find operation:", error); // Log the error for debugging
    throw new Error(error.message); // Throw a custom error
  }
};
