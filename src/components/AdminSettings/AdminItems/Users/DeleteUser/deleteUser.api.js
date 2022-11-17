import { urls } from "../../../../../constants/constants";
import { doFetch } from "../../../../../services/services";

export const deleteUserFetch = async (email) => {
  return doFetch(urls.deleteUser, {
    method: "delete",
    body: { email }
  });
};

export const getAllUsersFetch = async () => {
  return doFetch(urls.getAllUsers);
};
