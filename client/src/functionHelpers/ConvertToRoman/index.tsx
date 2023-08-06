function convertToRoman(num: number) {
  const numberArr = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const RomanArr = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];
  const result = [];

  const findElement = (e: number) => {
    return e <= num;
  };

  while (num > 0) {
    const nextHighest = numberArr.find(findElement) ?? 0;

    result.push(RomanArr[numberArr.indexOf(nextHighest)]);
    num -= nextHighest;
  }

  const newResult = result.join("");

  return newResult;
}

export default convertToRoman;
