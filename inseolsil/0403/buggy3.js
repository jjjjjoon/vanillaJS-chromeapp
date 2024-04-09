/**
 * Prints the given number multiplied by two to the console.
 * @param {number} x - The number to double
 * @returns {String} - Text saying what the doubled number is.
 */
function double(x) {
    return ("Your number " + x + " doubled is " + x + x + "!");
  }
  
  /**
   * Prints the given number multiplied by four to the console.
   * @param {number} x - The number to quadruple.
   * @returns {String} - Text saying what the quadrupled number is.
   */
  function quadruple(x) {
    let y = double(x);
    x = y * 2;
    return ("Your number " + x + " quadrupled is " + x + "!")
  }
  
  double(3);
  quadruple(3);