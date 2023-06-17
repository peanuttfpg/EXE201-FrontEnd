import { request } from "./util";
   
export const postSignUp = (token) =>
  request().post("/auth/signup", { token }).then((res) => res.data);

export const postLogIn = (token) =>
  request().post("/auth/login", { token }).then((res) => res.data);