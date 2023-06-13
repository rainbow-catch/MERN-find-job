export const checkFormValidity = (formElements: any) => {
  const keys: string[] = Object.keys(formElements);
  const vals: string[] = Object.keys(formElements).map(
    (key) => formElements[key]
  );

  const count = keys.length;
  let counter = 0;

  function isImage(url: string) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  vals.forEach((val, index) => {
    if (keys[index] === "email") {
      if (val.match(/[A-Za-z0-9]+@[A-Za-z0-9]+/i) && val !== "") {
        counter++;
      }
    } else if (keys[index] === "logo") {
      if (val.match(/[A-Za-z]+:\/\/[A-Za-z0-9]+\.[A-Za-z]+/i) && val !== "") {
        if (isImage(val)) {
          counter++;
        }
      }
    } else if (
      keys[index] === "days_ago" ||
      keys[index] === "seniority" ||
      keys[index] === "about_us"
    ) {
      counter++;
    } else if (val !== null && val !== "") {
      counter++;
    }
  });
  return count === counter;
};
