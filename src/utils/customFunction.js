export function numberWithCommas(number) {
  if (isNaN(number)) return number; // handle non-numeric input
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}