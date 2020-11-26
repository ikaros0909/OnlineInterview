// 숫자만 남긴다.
export const onlyNumberExp = (input) => {
  if (!input) return null;
  const _input = String(input) || '';
  const onlyNumberRegExp = /\d+/g;
  const R = input.match(onlyNumberRegExp).join('');
  return R;
};

// 숫자, . 남긴다.
export const onlyNumberAndDotExp = (input) => {
  if (!input) return null;
  input = String(input) || '';
  const decimalRegExp = /\d+|\./g;
  const R = input.match(decimalRegExp) ? input.match(decimalRegExp).join('') : '';
  return R;
};

// 유리수만 남긴다.
export const onlyRationalExp = (input) => {
  if (!input) return null;
  input = String(input) || '';
  const rationalExp = /[-]?[0-9]+[,.]?[0-9]*([\/][0-9]+[,.]?[0-9]*)*/g;
  const R = input.match(rationalExp) ? input.match(rationalExp).join('') : '';
  return R;
};

// 정수, 유리수 체크
// EXAMPLE validateNumber('10'); // true
export const validateNumber = (input) => {
  return !isNaN(parseFloat(input)) && isFinite(input) && Number(input) == input;
};

// 정수 체크
// export const isInteger = (input) => {
//   input = String(input) || '';
//   const regexp = /^\d+$/;
//   const R = regexp.test(input);
//   return R;
// };

// 유리수 체크
// export const isDecimal = (input) => {
//   input = String(input) || '';
//   const regexp = /^\d+\.\d{0,9}$/;
//   const R = regexp.test(input);
//   return R;
// };
