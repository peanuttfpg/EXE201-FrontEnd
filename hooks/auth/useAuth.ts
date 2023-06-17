import authApi from "../../api/auth";

const useAuthorize = () => {
  const authorize = async (idToken: string) => {
    const res = await authApi.authorize(idToken);
    return res;
  };

  return {
    authorize,
  };
};
export default useAuthorize;
