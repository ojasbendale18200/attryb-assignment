import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import axios_create from "../utils/axios_instance";

const init = {
  username: "",
  email: "",
  password: "",
};
const Signup = () => {
  const [data, setdata] = useState(init);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  function change(e) {
    let name = e.target.name;
    let value = e.target.value;
    setdata({ ...data, [name]: value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setloading(true);
    try {
      await axios_create.post("/auth/sign-up", { ...data });
      setdata({ ...init });
      toast({
        title: "SignUp Successful",
        description: "You can login now",
        status: "success",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
      setloading(false);
      navigate("/auth/login");
    } catch (error) {
      toast({
        title: "SignUp Failed",
        description:
          "Provide Correct Credentials or User is already registered",
        status: "error",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
      setloading(false);
    }
  }

  return (
 
    <Box
      w={{ base: "90%", md: "70%", lg: "50%", xl: "30%" }}
      m="3rem auto"
      bg="white"
      color="black"
      p="2rem"
      borderRadius="10px"
      boxShadow="0 5px 15px rgba(0, 0, 0, 0.35)"
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{
        transform: "scale(1.02)",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.35)",
      }}
    >
      <Heading fontSize="2rem" textAlign="center" mb="1rem">
        Please Enter Your Credentials to Sign Up✌️
      </Heading>
      <Flex
        alignItems="center"
        justifyContent="center"
        mt="15px"
        fontSize="1.3rem"
        visibility={loading ? "unset" : "hidden"}
      >
        <span style={{ marginRight: "5px" }}>Logging...</span>
        <Spinner color="black" />
      </Flex>
      <form onSubmit={handleSubmit}>
        <FormControl w="100%" flexDir="column">
          <Text fontSize="18px" textAlign="left" mt="10px">
            Enter Username <span style={{ color: "red" }}>**</span>
          </Text>
          <Input
            onChange={change}
            isRequired
            my="10px"
            name="username"
            type="text"
            value={data.username}
            _hover={{ borderColor: "blue" }}
          />
          <Text fontSize="18px" textAlign="left" mt="10px">
            Enter Your Email <span style={{ color: "red" }}>**</span>
          </Text>
          <Input
            onChange={change}
            isRequired
            my="10px"
            name="email"
            type="email"
            value={data.email}
            _hover={{ borderColor: "blue" }}
          />
          <Text fontSize="18px" textAlign="left" mt="10px">
            Enter Your Password <span style={{ color: "red" }}>**</span>
          </Text>
          <InputGroup
            onChange={change}
            value={data.password}
            isRequired
            name="password"
            my="10px"
            type="password"
          >
            <Input name="password" type={showPassword ? "text" : "password"} />
          </InputGroup>
          <Button type="submit" w="100%" my="10px" colorScheme="blue">
            SignUp
          </Button>
          <Flex w="100%" justifyContent="center" alignItems="center">
            <Text mr="10px" display="inline">
              Already a User?
            </Text>
            <Box color="black" display="inline">
              <Link
                to="/auth/login"
                style={{
                  fontSize: "14px",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
              >
                Login
              </Link>
            </Box>
          </Flex>
        </FormControl>
      </form>
    </Box>
  );
};

export default Signup;
