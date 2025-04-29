const puppeteer = require("puppeteer");
const fs = require("fs");
const handlebars = require("handlebars");
const path = require("path");
const { formatDate } = require("./formatDate");
const { locationIconBase64 } = require("../public/icons/locationIconBase64");
const { mailIconBase64 } = require("../public/icons/mailIconBase64");
const { phoneIconBase64 } = require("../public/icons/phoneIconBase64");

handlebars.registerHelper("add", (value, increment) => value + increment);

async function getBalanceSheetPdf({
  from,
  to,
  items,
  totalCredit,
  totalDebit,
  openingBalance,
}) {
  try {
    const templatePath = path.join(
      __dirname,
      "..",
      "public",
      "pdfTemplates",
      "balance-sheet-template.hbs"
    ); // Adjust path based on utils folder
    const templateHtml = fs.readFileSync(templatePath, "utf8");

    // Compile the template with handlebars
    const template = handlebars.compile(templateHtml);

    //   Handlebars restricts access to non-"own properties" of objects as part of a security to resolve this we are flatterning array
    totalCredit = openingBalance;
    totalDebit = 0;
    const flattenedTransactions = items.map((transaction) => {
      let credit = "",
        debit = "";
      if (transaction.status === "CREDIT") {
        totalCredit += transaction.amount;
        credit = new Intl.NumberFormat("en-IN").format(transaction.amount);
        debit = "-";
      } else if (transaction.status === "DEBIT") {
        totalDebit += transaction.amount;
        credit = "-";
        debit = new Intl.NumberFormat("en-IN").format(transaction.amount);
      }
      return {
        date: formatDate(new Date(transaction.date)),
        title: transaction.title,
        accountName: transaction.accountName,
        credit,
        debit,
        status: transaction.status,
      };
    });

    const html = template({
      fromDate: formatDate(new Date(from)),
      toDate: formatDate(new Date(to)),
      transactions: [...flattenedTransactions],
      totalCredit: new Intl.NumberFormat("en-IN").format(totalCredit),
      totalDebit: new Intl.NumberFormat("en-IN").format(totalDebit),
      currentBalance: new Intl.NumberFormat("en-IN").format(
        totalCredit - totalDebit
      ),
      locationIconBase64,
      mailIconBase64,
      phoneIconBase64,
      openingBalance: new Intl.NumberFormat("en-IN").format(openingBalance),
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

module.exports = { getBalanceSheetPdf };
