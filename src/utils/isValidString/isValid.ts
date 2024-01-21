const isValid = (text: string): boolean => {
  if (text === undefined || text === null || text === "") {
    return false;
  }
  //check if only whitespace
  if (text.trim().length === 0) {
    return false;
  }

  const regex = /^[\p{L}0-9 ]*$/u; // alphanumeric (including non-ASCII), space, no special characters
  return regex.test(text);
};

export default isValid;
