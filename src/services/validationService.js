export function isValidPriceInput(value, isFirstCharDollarSymbol) {
  if (isFirstCharDollarSymbol || !isNaN(parseFloat(value.charAt(0), 10))) {
    const currencyAmount = isFirstCharDollarSymbol ? value.slice(0) : value;
    const regex = /^\$?[0-9]+\.?[0-9]?[0-9]?$/; // check if valid currency input
    if (regex.test(currencyAmount))
      return true;
  }
  return false;
}
