/* eslint-disable no-restricted-globals */
const isNumber = (n: any): boolean => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

export default isNumber;
