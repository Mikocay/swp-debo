import { AuthResponseType } from "@/pages/Authentication/types/core";
import { get, post } from "@/utils/apiCaller";
import { API_ENDPOINTS } from "..";
import { errorToastHandler } from "@/utils/toast/actions";

const authApi = {
  login: async (
    data:
      | {
          email: string;
          password: string;
          phoneNumber?: string;
        }
      | {
          phoneNumber: string;
          password: string;
          email?: string;
        }
  ) => {
    return await post<AuthResponseType>(
      API_ENDPOINTS.AUTH.LOGIN_CREDENTIALS,
      data
    )
      .then((res) => res.data)
      .catch((err) => {
        errorToastHandler(err.response);
        return err;
      });
  },
  register: async (data: {
    email: string;
    phoneNumber: string;
    password: string;
  }) => {
    return await post<AuthResponseType>(API_ENDPOINTS.AUTH.REGISTER, data)
      .then((res) => res.data)
      .catch((err) => {
        errorToastHandler(err.response);
        return err;
      });
  },
  refreshToken: async (
    endpoint: string,
    data: { accessToken: string; refreshToken: string }
  ) => {
    return await post<AuthResponseType>(endpoint, data)
      .then((res) => res.data)
      .catch((err) => {
        return err;
      });
  },
  logout: async (accessToken: string) => {
    return await post(API_ENDPOINTS.AUTH.LOGOUT, undefined, {
      token: accessToken,
    })
      .then((res) => res.data)
      .catch((err) => {
        errorToastHandler(err.response);
        return err;
      });
  },
  googleGetInfo: async (token: string) => {
    return await get(API_ENDPOINTS.AUTH.GET_USER_GOOGLE, undefined, {
      Authorization: `Bearer ${token}`,
    });
  },
};

export default authApi;
