function calculateOpeningBalanceOfFromDate(
  reverseTotalCredit,
  reverseTotalDebit,
  totalCreditedAmount,
  totalDebitedAmount
) {
  return (
    totalCreditedAmount -
    reverseTotalCredit -
    (totalDebitedAmount - reverseTotalDebit)
  );
}

module.exports = { calculateOpeningBalanceOfFromDate };
