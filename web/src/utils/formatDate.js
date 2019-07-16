export default function formatDate(date, reverse = false) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  let formated = [year, month, day];
  if (reverse) formated.reverse();
  return formated.join('-');
}
