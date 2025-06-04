const puppeteer = require("puppeteer");
const fs = require("fs");
const handlebars = require("handlebars");
const path = require("path");
const { formatDate } = require("./formatDate");

handlebars.registerHelper("add", (value, increment) => value + increment);

async function getProfitNLossPdf({ from, to, items }) {
  try {
    const templatePath = path.join(
      __dirname,
      "..",
      "public",
      "pdfTemplates",
      "profit-n-loss-template.hbs"
    ); // Adjust path based on utils folder
    const templateHtml = fs.readFileSync(templatePath, "utf8");

    // Compile the template with handlebars
    const template = handlebars.compile(templateHtml);

    //   Handlebars restricts access to non-"own properties" of objects as part of a security to resolve this we are flatterning array
    let totalSaleValue = 0,
      totalGst = 0,
      totalValue = 0,
      totalExpense = 0,
      totalProfitPerTrip = 0;

    const flattenedTransactions = items.map((transaction) => {
      let { vehicleNumber, from, to, date } = transaction.primaryDetails;
      let totalTripExpense = 0;
      if (transaction.expenseDetails) {
        totalTripExpense = transaction?.expenseDetails.totalAmount;
      }
      let {
        subTotalAmount: saleValue,
        gstAmount: gst,
        totalAmount,
      } = transaction.financeDetails;
      totalSaleValue += parseInt(saleValue);
      totalGst += parseInt(gst);
      totalValue += parseInt(totalAmount);
      totalExpense += parseInt(totalTripExpense);
      const profitPerTrip = parseInt(totalAmount) - parseInt(totalTripExpense);
      totalProfitPerTrip += profitPerTrip;

      return {
        date: formatDate(new Date(date)),
        vehicleNumber,
        from,
        to,
        saleValue: new Intl.NumberFormat("en-IN").format(saleValue),
        gst: new Intl.NumberFormat("en-IN").format(gst),
        total: new Intl.NumberFormat("en-IN").format(totalAmount),
        tripExpense: new Intl.NumberFormat("en-IN").format(totalTripExpense),
        profitPerTrip: new Intl.NumberFormat("en-IN").format(profitPerTrip),
      };
    });

    const html = template({
      fromDate: formatDate(new Date(from)),
      toDate: formatDate(new Date(to)),
      transactions: [...flattenedTransactions],
      totalSaleValue: new Intl.NumberFormat("en-IN").format(totalSaleValue),
      totalGST: new Intl.NumberFormat("en-IN").format(totalGst),
      totalSaleAndGST: new Intl.NumberFormat("en-IN").format(totalValue),
      totalTripExpense: new Intl.NumberFormat("en-IN").format(totalExpense),
      totalProfitPerTrip: new Intl.NumberFormat("en-IN").format(
        totalProfitPerTrip
      ),
    });

    // Generate PDF using Puppeteer
    const browser = await puppeteer.launch({
      headless: true, // Run in headless mode
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Required flags for non-root environments
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "domcontentloaded" });
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();
    return pdfBuffer;
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = { getProfitNLossPdf };
