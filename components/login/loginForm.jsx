import React from "react";
import {useState} from "react";
import {
  Box,
  Heading,
  Image,
  Link,
  Text,
  Button,
  Wrap,
  WrapItem,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input
} from "@chakra-ui/react";
import useLogin from "../../hooks/login/useLogin";

export default function LoginForm(){
    const [input, setInput] = useState('')

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = useLogin();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const formData = {
        email: email,
        password: password,
        };

        loginUser.mutate(formData);
    };

    const isError = input === ''

    return (
        <FormControl isInvalid={isError} onSubmit={handleFormSubmit}>
            <FormLabel>Email address</FormLabel>
            <Input 
                type='email' 
                value={input} 
                onChange={(e) => setEmail(e.target.value)}
                width="25rem" />
            {!isError ? (
                <>
                </>
            ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
            )}

            <FormLabel>Password</FormLabel>
            <Input 
                type='password' 
                value={input} 
                onChange={(e) => setPassword(e.target.value)}
                width="25rem" />
            {!isError ? (
                <>
                </>
            ) : (
                <FormErrorMessage>Password is required.</FormErrorMessage>
            )}

            <Button type="submit">Login</Button>
        </FormControl>
    )
}