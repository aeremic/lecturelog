function IsNumber(str: any) {
  if (str.trim() === "") {
    return false;
  }

  return !isNaN(str);
}

export default IsNumber;
