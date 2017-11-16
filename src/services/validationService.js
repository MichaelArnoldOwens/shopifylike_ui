export function isValidPriceInput(value, isFirstCharDollarSymbol) {
  if (isFirstCharDollarSymbol || !isNaN(parseFloat(value.charAt(0), 10))) {
    const currencyAmount = isFirstCharDollarSymbol ? value.slice(0) : value;
    /**
     * Currency
     * No commas allowed
     * "$" optional
     * Can't start with "."
     * Either 0 or 2 decimal digits
     * Pass: ($1000), (1.00), ($0.11), ($1.0)
     * Fail: (1.), ($1.000), ($.11)
     */
    const regex = /^\$?\d+(\.\d{1,2})?$/;
    if (regex.test(currencyAmount))
      return true;
  }
  return false;
}
