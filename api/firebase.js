import { request } from "./util";
   
export const getAuthToken = (token) =>
  request.post("/auth/FirebaseAuth", { token }).then((res) => res.data);