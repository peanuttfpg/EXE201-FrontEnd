import { useMutation, useQuery } from "react-query";
import { postSignUp } from "../../api/login";

const useSignUp = () =>{
    const signUpUser = useMutation((formData) =>
        postSignUp(formData).then((res) => res.data)
    );

    return signUpUser;
}

export default useSignUp;
