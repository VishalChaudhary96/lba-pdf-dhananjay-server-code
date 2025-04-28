const filterReport = (items, from, to) => {
  const currentDate = new Date().getTime();
  let reverseTotalCredit = 0;
  let reverseTotalDebit = 0;

  const filteredItems = items.filter((item) => {
    const itemDate = new Date(item.date).getTime();
    if (itemDate <= currentDate && itemDate >= new Date(from).getTime()) {
      if (item.status === "CREDIT") {
        reverseTotalCredit += item.amount;
      } else if (item.status === "DEBIT") {
        reverseTotalDebit += item.amount;
      }
    }
    return (
      itemDate >= new Date(from).getTime() && itemDate <= new Date(to).getTime()
    );
  });

  return {
    filteredItems,
    reverseTotalCredit,
    reverseTotalDebit,
  };
};

module.exports = {
  filterReport,
};
