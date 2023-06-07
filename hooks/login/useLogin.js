import { useMutation, useQuery } from "react-query";
import { postLogIn} from "../../api/login";

const useLogin = () =>{
    const loginUser = useMutation((formData) =>
        postLogIn(formData).then((res) => res.data)
    );

    return loginUser;
}

export default useLogin;
