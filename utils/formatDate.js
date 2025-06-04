function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
}

function getISTDateTime() {
  const now = new Date();

  // Convert to IST (Asia/Kolkata time zone)
  const options = {
    timeZone: "Asia/Kolkata",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  // Get formatted parts
  const formatter = new Intl.DateTimeFormat("en-GB", options);
  const parts = formatter.formatToParts(now);

  // Extract values
  const getPart = (type) => parts.find((p) => p.type === type)?.value;
  const day = getPart("day");
  const month = getPart("month");
  const year = getPart("year");
  const hour = getPart("hour");
  const minute = getPart("minute");
  const second = getPart("second");

  return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
}

function getISTDateYYYYMMDD(date) {
  date = new Date(date);
  // Convert to IST (Asia/Kolkata time zone)
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  // Get formatted parts
  const formatter = new Intl.DateTimeFormat("en-GB", options);
  const parts = formatter.formatToParts(date);

  // Extract values
  const getPart = (type) => parts.find((p) => p.type === type)?.value;
  const day = getPart("day");
  const month = getPart("month");
  const year = getPart("year");
  return `${year}-${month}-${day}`;
}

module.exports = { formatDate, getISTDateTime, getISTDateYYYYMMDD };
