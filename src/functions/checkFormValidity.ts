export const checkFormValidity = (formElements: any) => {
  const keys: string[] = Object.keys(formElements);
  const vals: string[] = Object.keys(formElements).map(
    (key) => formElements[key]
  );

  const count = keys.length;
  let counter = 0;

  vals.forEach((val, index) => {
    if (keys[index] === "email") {
      if (val.match(/[A-Za-z0-9]+@[A-Za-z0-9]+/i) && val !== null && val !== "") {
        counter++;
      }
    } else if (keys[index] === "logo") {
      if (
        val.match(/[A-Za-z]+:\/\/[A-Za-z0-9]+\.[A-Za-z]+/i) &&
        val !== null &&
        val !== ""
      ) {
        counter++;
      }
    } else if (val !== null && val !== "") {
      counter++;
    }
  });
  if (count === counter) {
    return true;
  } else {
    return false;
  }
};
