let serverUrl = "https://jobsearchmern.onrender.com";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  serverUrl = "http://localhost:8888";
} else {
  serverUrl = "https://jobsearchmern.onrender.com";
}

export const axiosUrls = {
  cloudinaryApi: "https://api.cloudinary.com/v1_1/dyqgdjrr1/raw/upload",

  createOfferUrl: `${serverUrl}/create`,
  sendApplicationUrl: `${serverUrl}/sendApplication`,
  getOffersUrl: `${serverUrl}/sendToFront`,
  loginUrl: `${serverUrl}/login`,
  registerUrl: `${serverUrl}/register`,
  removeOfferUrl: (id: string) => {
    return `${serverUrl}/removeOffer/${id}`;
  },
  getApplicationsUrl: `${serverUrl}/getApplications`,
};
