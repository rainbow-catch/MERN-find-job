export const axiosUrls = {
  cloudinaryApi: "https://api.cloudinary.com/v1_1/dyqgdjrr1/raw/upload",
  createOfferUrl: "http://localhost:8888/create",
  sendApplicationUrl: "http://localhost:8888/sendApplication",
  getOffersUrl: "http://localhost:8888/sendToFront",
  loginUrl: "http://localhost:8888/login",
  registerUrl: "http://localhost:8888/register",
  removeOfferUrl: (id: number) => {
    return `http://localhost:8888/removeOffer/${id}`;
  },
  getApplicationsUrl: "http://localhost:8888/getApplications",
};
