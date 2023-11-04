import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Box
      borderBottom={"2px solid #eaeaea"}
      h="10vh"
      position={"sticky"}
      top="0px"
      zIndex={"10"}
      bg={"white"}
    >
      <Flex p="15px" w="95%" m="auto" justifyContent={"space-between"}>
        <Flex
          cursor={"pointer"}
          onClick={() => {
            navigate("/");
          }}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill={"#003a5e"}
          >
            <path d="M23.5 7c.276 0 .5.224.5.5v.511c0 .793-.926.989-1.616.989l-1.086-2h2.202zm-1.441 3.506c.639 1.186.946 2.252.946 3.666 0 1.37-.397 2.533-1.005 3.981v1.847c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1h-13v1c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1.847c-.608-1.448-1.005-2.611-1.005-3.981 0-1.414.307-2.48.946-3.666.829-1.537 1.851-3.453 2.93-5.252.828-1.382 1.262-1.707 2.278-1.889 1.532-.275 2.918-.365 4.851-.365s3.319.09 4.851.365c1.016.182 1.45.507 2.278 1.889 1.079 1.799 2.101 3.715 2.93 5.252zm-16.059 2.994c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm10 1c0-.276-.224-.5-.5-.5h-7c-.276 0-.5.224-.5.5s.224.5.5.5h7c.276 0 .5-.224.5-.5zm2.941-5.527s-.74-1.826-1.631-3.142c-.202-.298-.515-.502-.869-.566-1.511-.272-2.835-.359-4.441-.359s-2.93.087-4.441.359c-.354.063-.667.267-.869.566-.891 1.315-1.631 3.142-1.631 3.142 1.64.313 4.309.497 6.941.497s5.301-.184 6.941-.497zm2.059 4.527c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm-18.298-6.5h-2.202c-.276 0-.5.224-.5.5v.511c0 .793.926.989 1.616.989l1.086-2z" />
          </svg>
          <Text
            ml="15px"
            fontWeight={"bolder"}
            fontSize={"23px"}
            color={"#003a5e"}
            display={"inline"}
          >
            BuyCar
          </Text>
        </Flex>
        <Box display={{ base: "none", md: "block" }}>
          <LoginOption />
        </Box>
        <Box display={{ base: "block", md: "none" }}>
          <DrawerLogin />
        </Box>
      </Flex>
    </Box>
  );
};

function DrawerLogin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} color="white" bg="#003a5e" onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={"white"}>
          <DrawerCloseButton color={"white"} />
          <Box w="100%" m="auto" mt="50px">
            <Flex
              flexDirection={"column"}
              w="95%"
              m={"auto"}
              alignItems={"center"}
              justifyContent={"flex-end"}
            >
              <Link w="250px" to="/">
                <Button
                  w="250px"
                  mt="20px"
                  mx="10px"
                  bg={"red.500"}
                  _hover={{
                    bg: "red.300",
                  }}
                  color={"white"}
                >
                  Home
                </Button>
              </Link>
              <Link to="/addcar">
                <Button
                  w="250px"
                  bg="gray"
                  color={"white"}
                  colorScheme="white"
                  mt="20px"
                  mx="10px"
                >
                  Add Car
                </Button>
              </Link>
              {!sessionStorage.getItem("username") ? null : (
                <Flex
                  mx="10px"
                  justifyContent={"center"}
                  color="white"
                  alignItems={"center"}
                  textAlign={"center"}
                  h="38px"
                  bg="gray"
                  borderRadius={"6px"}
                  p="9px"
                  cursor={"no-drop"}
                  w="250px"
                  mt="20px"
                >
                  {sessionStorage.getItem("username").toUpperCase()}
                </Flex>
              )}

              <Flex
                mx="10px"
                justifyContent={"center"}
                borderRadius={"50%"}
                w="37px"
                h="37px"
                alignItems={"center"}
                cursor={"pointer"}
                mt="20px"
              >
                <AlertDialogExample value={true} />
              </Flex>
            </Flex>
          </Box>

          <DrawerFooter>
            <Button variant="outline" color={"white"} mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function LoginOption() {
  return (
    <Flex alignItems={"center"} justifyContent={"flex-end"}>
      <Link to="/">
        <Button
          mx="10px"
          bg={"blue.700"}
          _hover={{
            bg: "blue.500",
          }}
          color={"white"}
        >
          Home
        </Button>
      </Link>
      <Link to="/addcar">
        <Button mx="10px">Add Car</Button>
      </Link>
      {!sessionStorage.getItem("username") ? null : (
        <Flex
          mx="10px"
          justifyContent={"start"}
          color="white"
          alignItems={"center"}
          h="38px"
          bg="gray"
          borderRadius={"6px"}
          p="9px"
          cursor={"no-drop"}
        >
          {sessionStorage.getItem("username").toUpperCase()}
        </Flex>
      )}
      <Flex
        mx="10px"
        justifyContent={"center"}
        borderRadius={"50%"}
        w="37px"
        h="37px"
        alignItems={"center"}
        cursor={"pointer"}
        heading="logout"
      >
        <AlertDialogExample />
      </Flex>
    </Flex>
  );
}

export default Navbar;

function AlertDialogExample({ value }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const navigate = useNavigate();

  const toast = useToast();
  return (
    <>
      <Flex alignItems={"center"} colorScheme="red" onClick={onOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={"white"}
        >
          <path d="M16 10v-5l8 7-8 7v-5h-8v-4h8zm-16-8v20h14v-2h-12v-16h12v-2h-14z" />
        </svg>

        <Text display={value ? "block" : "none"} color={"white"} ml={"10px"}>
          Logout
        </Text>
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent color={"white"} bg={"white"}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Log Out
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure you want to logout?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  toast({
                    title: `${
                      sessionStorage.getItem("username")
                        ? "Logged Out"
                        : "Error"
                    }`,
                    status: `${
                      sessionStorage.getItem("username") ? "info" : "error"
                    }`,
                    duration: 9000,
                    isClosable: true,
                    position: "bottom-left",
                    description: `${
                      sessionStorage.getItem("username")
                        ? "You have successfully logged out."
                        : "You are not signed in"
                    }`,
                  });
                  sessionStorage.clear();
                  navigate("/auth/login");
                  onClose();
                }}
                ml={3}
              >
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
