import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Authenticate from "../components/authentication";
import AuthCheck from "../components/authentication/AuthCheck";

function AuthenticationPage() {
  return (
    <Box fontFamily="Lato">
      <AuthCheck>
        <Authenticate />
      </AuthCheck>
    </Box>
  );
}

export default AuthenticationPage;
