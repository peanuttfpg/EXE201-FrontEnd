import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Loading from "./Loading";
import Authenticate from "./index";
import useAuthContext from "../../hooks/useAuthContext";
import useUserContext from "../../hooks/useUserContext";
import useRefresh from "../../hooks/auth/useRefresh";
import { useToast } from "@chakra-ui/react";
import useUser from "../../hooks/auth/useUser";
import useAuthorize from "../../hooks/auth/useAuth";
import { string } from "yup";

const AuthCheck = ({ children }: any) => {
  const router = useRouter();
  const toast = useToast();
  const { authorize } = useAuthorize();
  const [idtoken, setIdToken] = useState(null);
  const { user: FbUser, loading } = useAuthContext();
  let {
    user: currentUser,
    SetUser,
    SetAccessToken,
    accessToken,
    refreshToken,
    SetRefreshToken,
  } = useUserContext();
  const { refresh } = useRefresh();
  const { getUserInfo } = useUser();

  
  useEffect(() => {
    const authorizeUser = async () => { 
      const res = await authorize(await FbUser.getIdToken()!);
      if (res.status === 200) {
        const access = res.data?.accessToken;
        const refresh = res.data?.refreshToken;
        SetAccessToken(access);
        accessToken = access;
        console.log(`Access token: ${accessToken}`);
        SetRefreshToken(refresh);
        };
    };

    if (!currentUser && FbUser && !accessToken) {
      authorizeUser();
    };
    
    return () => {};
  },[currentUser, accessToken, FbUser]);
  
  const getUserInfoByAccessToken = async () => {
    const userInfo = await getUserInfo(accessToken!);
    SetUser(userInfo);
    currentUser = userInfo;
    console.log("CURRENT USER: ",currentUser);
    console.log("userInfo from be: ", userInfo);
  };

  useEffect(() => {
    if (accessToken) {
      getUserInfoByAccessToken();
    }
  }, [accessToken]);

  if (FbUser) {
    return children;
  } else if (!FbUser && !loading) {
    return <Authenticate />;
  } else {
    return <Loading />;
  }
}

export default AuthCheck;
