import React, { Component, useEffect, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { useRouter } from "next/router";
import { signInWithGoogle, auth } from "../../firebase/authentication";
import { FcGoogle } from "react-icons/fc";
import Firebase from "../../firebase/firebase";
import firebase from "firebase/compat/app";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuthorize from "../../hooks/auth/useAuth";
import useUserContext from "../../hooks/useUserContext";
import useAuthContext from "../../hooks/useAuthContext";
interface AuthenForm {
  phone: string;
  otp: string;
}
const phoneRegExp = /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/;
const authenSchema1 = yup.object().shape({
  phone: yup
    .string()
    .required("Hãy điền vào Số Điện Thoại")
    .matches(phoneRegExp, "Hãy đúng dạng Số Điện Thoại"),
});
const authenSchema2 = yup.object().shape({
  otp: yup.string().required("Hãy điền vào OTP"),
});

function Authenticate() {
  const router = useRouter();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const { SetUser, SetAccessToken, SetRefreshToken, accessToken } =
    useUserContext();
  const { authorize } = useAuthorize();
  const { user: FbUser, loading } = useAuthContext();
  const [confirm, setConfirm] = useState<firebase.auth.ConfirmationResult>();
  const authenForm = useForm<AuthenForm>({
    resolver:
      step == 1 ? yupResolver(authenSchema1) : yupResolver(authenSchema2),
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = authenForm;

//   useEffect(() => {
//     // init captcha object
//     if (typeof window !== "undefined" && !FbUser) {
//       window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
//         "captchaContainer",
//         {
//           size: "invisible",
//           callback: (res) => {
//             console.log("recapcha res", res);
//           },
//         }
//       );
//     }
//   }, []);

  useEffect(() => {
    if (FbUser) {
      router.replace("/");
    }
  }, [FbUser]);

//   const LoginWithPhone = async (form: AuthenForm) => {
//     // get captcha object

//     if (typeof window !== "undefined") {
//       const appVerifier = window?.recaptchaVerifier;
//       try {
//         const phoneNumber = form.phone.replace("0", "+84");
//         const confirm = await firebase
//           .auth()
//           .signInWithPhoneNumber(phoneNumber, appVerifier);
//         setConfirm(confirm);
//         setStep(2);
//       } catch (error) {
//         toast({
//           title: "Có lỗi xảy ra",
//           status: "error",
//           position: "top-right",
//           isClosable: true,
//           duration: 1000,
//         });
//         console.log("error", error);
//       }
//     } else {
//       const phoneNumber = form.phone.replace("0", "+84");
//       console.log("phoneNumber", phoneNumber);
//       setStep(2);
//     }
//   };

  const VerifyCode = async () => {
    await confirm
      ?.confirm(otp)
      .then(async function (result) {
        // User signed in successfully.
        const user = result.user;
        if (user) {
          const res = await authorize(await user.getIdToken()!);
          if (res.status === 200) {
            const accessToken = res.data.data.accessToken;
            const refreshToken = res.data.data.refreshToken;
            SetAccessToken(accessToken);
            SetRefreshToken(refreshToken);
            console.log("accessToken from be", res.data.data.accessToken);
            toast({
              title: "Đăng nhập thành công!",
              status: "success",
              position: "top-right",
              isClosable: true,
              duration: 1000,
            });
            router.push("/");
            console.log("authorize", res);
          } else {
            toast({
              title: "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!",
              status: "error",
              position: "top-right",
              isClosable: true,
              duration: 1000,
            });
          }
          console.log(result);
        }
        // ...
      })
      .catch(function (error) {
        console.log(error);
        // User couldn't sign in (bad verification code?)
        // ...

        toast({
          title: "Có lỗi xảy ra",
          status: "error",
          position: "top-right",
          isClosable: true,
          duration: 1000,
        });
      });
  };

  const LoginWithGoogle = () => {
    signInWithGoogle()
      .then(async (result) => {
        console.log(result);
        const user = result.user;
        if (user) {
          try {
            const res = await authorize(await user.getIdToken()!);
            if (res.status === 200) {
              const accessToken = res.data.accessToken;
              const refreshToken = res.data.accessToken;
              SetAccessToken(accessToken);
              SetRefreshToken(refreshToken);
              SetUser(user);
              toast({
                title: "Đăng nhập thành công!",
                status: "success",
                position: "top-right",
                isClosable: true,
                duration: 1000,
              });
              console.log("authorize", res);
              router.push("/");
            } else {
              toast({
                title: "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!",
                status: "error",
                position: "top-right",
                isClosable: true,
                duration: 1000,
              });
            }
          } catch (error) {
            toast({
              title: "Có lỗi xảy ra!",
              status: "error",
              position: "top-right",
              isClosable: true,
              duration: 1000,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Đăng nhập thất bại",
          status: "error",
          position: "top-right",
          isClosable: true,
          duration: 1000,
        });
      });
  };

  return (
    <>
      {FbUser ? (
        <></>
      ) : (
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
          <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Chào mừng bạn đến GenZ Pets</Heading>
              <Flex flexDirection={"row"}>
              </Flex>
            </Stack>
            <Flex sx={{ fontSize: "1em", justifyContent: "center" }}>
            </Flex>
            <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                bg: "blue.500",
                }}
                onClick={LoginWithGoogle}
            >
                <Flex gap={2} sx={{ alignItems: "center" }}>
                <FcGoogle />
                <Text color="black">Đăng nhập với Google</Text>
                </Flex>
            </Button>
          </Stack>
        </Flex>
      )}
    </>
  );
}

export default Authenticate;
