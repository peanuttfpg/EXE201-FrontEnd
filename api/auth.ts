import { TAuth } from "../types/auth";
import { PostResponse } from "../types/request"
import { TUser } from "../types/user";
import { request } from "./util";

const authorize = (accessToken: string) => {
  const auth = {
    token: accessToken,
  };
  return request.post(`/auth/FirebaseAuth`, auth);
};
const refresh = (refreshToken: string) => {
  const auth = {
    token: refreshToken,
  };
  return request.post<PostResponse<string>>(`/auth/FirebaseAuth`, auth);
};

const getUserInfo = (accessToken: string) => {
  const config = {
    headers: {
      authorization: "Bearer " + accessToken,
    },
  };
  return request.get<TUser>("/api/users/user/me", config).then((res) => res.data);
};

const updateUserInfo = (accessToken: string, userInfo: TUser) => {
  const config = {
    headers: {
      authorization: "Bearer " + accessToken,
    },
  };
  return request.put<PostResponse<TAuth>>(`/api/users/user/me`, userInfo, config);
};

const authApi = {
  authorize,
  refresh,
  getUserInfo,
  updateUserInfo,
};

export default authApi;