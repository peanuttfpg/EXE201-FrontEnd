import axios from "axios";
import { getAuth } from 'firebase/auth';
import firebaseConfig from "../firebaseConfig";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuthToken } from "./firebase";

firebase.initializeApp(firebaseConfig);
// ----------------------------------------------------------------------
var apiHeaders = {
  'Authorization': 'Bearer '
};
const auth = getAuth();
const user = auth.currentUser;

const parseParams = (params) => {
  const keys = Object.keys(params);
  let options = "";

  keys.forEach((key) => {
    const isParamTypeObject = typeof params[key] === "object";
    const isParamTypeArray =
      isParamTypeObject &&
      Array.isArray(params[key]) &&
      params[key].length >= 0;

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && isParamTypeArray) {
      params[key].forEach((element) => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  paramsSerializer: parseParams,
  headers: apiHeaders
});

const gzpRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TESTGZP_URL,
  paramsSerializer: parseParams,
  headers: apiHeaders
});



if (user) {
  user.getIdToken()
    .then((result) => {
            //
            //
            console.log(result);
            getAuthToken(result).then((res) => {
              apiHeaders.Authorization += res.accessToken;
              console.log("New Headers :",apiHeaders.Authorization);
              request.defaults.headers.Authorization = apiHeaders.Authorization;
              console.log("REQUEST HEADERS :",request.defaults.headers);
              gzpRequest.defaults.headers.Authorization = apiHeaders.Authorization;
              }
            );
            
            
      }
    )
    
  
};

request.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      error.response && error.response.data
      // || "Có lỗi xảy ra"
    )
);

export { request, gzpRequest };
