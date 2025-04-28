const loginController = require("./loginController");
const { generateReport } = require("./reportController");

// Export all routes
module.exports = {
  loginController,
  generateReport,
};
