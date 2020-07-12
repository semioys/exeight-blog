// Stolen from https://stackoverflow.com/a/31615643
const formatDate = date => {
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  let yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;;
}

module.exports = function dateFilter(value) {
  const dateObject = new Date(value);

  const formattedDate = formatDate(dateObject);

  return `${formattedDate}`;
};