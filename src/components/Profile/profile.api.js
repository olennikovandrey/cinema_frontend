import { urls } from "../../constants/constants";
import { doFetch } from "../../services/services";

export const getMyDataFetch = async () => {
  return doFetch(urls.getMyData);
};

export const updateUserFetch = async (updatedUser) => {
  return doFetch(urls.updateUser, {
    method: "put",
    body: updatedUser
  });
};
