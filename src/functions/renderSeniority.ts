//matching stars to seniority
export const renderSeniority = (seniority: string) => {
  if (
    seniority === "junior" ||
    seniority === "Junior" ||
    seniority === "beginner" ||
    seniority === "Beginner"
  ) {
    return "★☆☆";
  } else if (
    seniority === "mid" ||
    seniority === "midweight" ||
    seniority === "Mid" ||
    seniority === "Midweight"
  ) {
    return "★★☆";
  } else if (
    seniority === "senior" ||
    seniority === "Senior" ||
    seniority === "Advanced" ||
    seniority === "advanced"
  ) {
    return "★★★";
  } else {
    return "";
  }
};
