import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  InputLeftElement,
  InputLeftAddon,
  UnorderedList,
  InputRightAddon,
  Spinner,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";

import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import axios_create from "../utils/axios_instance";
import DrawerFilter from "../components/DrawerFilter";
import Filter from "../components/Filter";

function Deals() {
  axios_create.defaults.headers.common["Authorization"] =
    sessionStorage.getItem("token");
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [userid, setuserid] = useState("");
  const toast = useToast();
  const [limit, setlimit] = useState(6);
  const [length, setlength] = useState();
  let [searchParams, setSearchParams] = useSearchParams();

  let obj = {};
  if (searchParams.get("page")) obj.page = searchParams.get("page");
  if (searchParams.get("limit")) obj.limit = searchParams.get("limit");
  if (searchParams.get("min_price"))
    obj.min_price = searchParams.get("min_price");
  if (searchParams.get("max_price"))
    obj.max_price = searchParams.get("max_price");
  if (searchParams.get("min_mileage"))
    obj.min_mileage = searchParams.get("min_mileage");
  if (searchParams.get("max_mileage"))
    obj.max_mileage = searchParams.get("max_mileage");
  if (searchParams.get("color")) obj.color = searchParams.get("color");
  if (searchParams.get("model")) obj.model = searchParams.get("model");
  const [filter, setfilter] = useState(obj);

  let temp = searchParams.get("page") ? +searchParams.get("page") : 1;
  const [page, setpage] = useState(temp);

  async function fetchData(data = null) {
    setloading(true);
    try {
      let item = await axios_create.get("/inventory", {
        params: data ? { ...data, limit } : { ...filter, limit },
      });
      item = item.data;
      setuserid(item.userid);
      setlength(item.length);
      setdata(item.data);
      setloading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
      setloading(false);
    }
  }
  useEffect(() => {
    setSearchParams({ ...filter });
    fetchData();
  }, [page, filter]);

  async function delete_item(id) {
    try {
      await axios_create.delete(`/inventory/${id}`);
      fetchData();
      toast({
        title: "Item Deleted",
        description: "Item is deleted from the Database",
        status: "success",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed",
        description: error.message,
        status: "error",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
    }
  }

  function update_date() {
    fetchData();
  }
  return (
    <Flex flexDir={{ base: "column", md: "row" }} w="100%" m=" auto">
      <Flex
        justifyContent={"left"}
        ml="0px"
        mt="30px"
        display={{ base: "block", md: "none" }}
      >
        <DrawerFilter item={{ filter, setfilter, fetchData, page, limit }} />
      </Flex>
      <Box display={{ base: "none", md: "block" }}>
        <Filter
          item={{ filter, setfilter, fetchData, page, limit, value: true }}
        />
      </Box>
      <Box m="auto" mt="20px" w={{ base: "96%", md: "78%" }} p="20px">
        {!loading ? null : <Spinner color={"gray.800"} size="xl" />}
        <Box w="100%">
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(1, 1fr)",
              md: "repeat(1, 1fr)",
              lg: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            {!data.length
              ? null
              : data.map((el) => {
                  return (
                    <GridItem
                      boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                      borderRadius={"10px"}
                      key={el._id}
                      // boxShadow={mode?'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px':'none'}
                      w="100%"
                      bg={"white"}
                      color={"black"}
                    >
                      <Box
                        display={{ base: "block", sm: "flex", md: "block" }}
                        alignItems={"center"}
                      >
                        <Image
                          w={{ base: "100%", sm: "40%", md: "100%" }}
                          h="200px"
                          bg="white"
                          borderRadius={"10px 10px 0px 0px"}
                          objectFit={"contain"}
                          borderBottom={{
                            base: `2px solid ${"#414141"}`,
                            sm: "none",
                            md: `2px solid ${"#414141"}`,
                          }}
                          src={el.image}
                        />
                        <Box
                          textAlign={"left"}
                          w="100%"
                          borderRadius={"0px 10px 10px 0px"}
                          fontSize={"18px"}
                          p="20px"
                          borderLeft={{
                            base: "none",
                            sm: `2px solid ${"#414141"}`,
                            md: "none",
                          }}
                          justifyContent={"space-between"}
                          alignContent={"space-between"}
                        >
                          <Flex
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            fontWeight={"bolder"}
                          >
                            <Text>Title : </Text>
                            <Text>{el.title ? el.title : "Not Mentioned"}</Text>
                          </Flex>
                          <Flex
                            fontSize={"1em"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            <Text>Model: </Text>
                            <Text>
                              {el.oem_spec.model
                                ? el.oem_spec.model
                                : "Not Mentioned"}
                            </Text>
                          </Flex>
                          <Flex
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            fontSize={".8em"}
                            mt="15px"
                          >
                            <Text>Year</Text>
                            <Text>
                              {el.oem_spec.year
                                ? el.oem_spec.year
                                : "Not Mentioned"}
                            </Text>
                          </Flex>

                          <Divider orientation="horizontal" />
                          <Flex
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            fontSize={".8em"}
                          >
                            <Text>Price</Text>
                            <Text>
                              {el.oem_spec.price
                                ? el.oem_spec.price + " Rs"
                                : "Not Mentioned"}
                            </Text>
                          </Flex>

                          <Divider orientation="horizontal" />
                          <Flex
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            fontSize={".8em"}
                          >
                            <Text>Max Speed</Text>
                            <Text>
                              {el.oem_spec.max_speed
                                ? el.oem_spec.max_speed + "Km/h"
                                : "Not Mentioned"}
                            </Text>
                          </Flex>

                          <Divider orientation="horizontal" />
                          <Flex
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            fontSize={".8em"}
                          >
                            <Text>Mileage</Text>
                            <Text>
                              {el.oem_spec.mileage
                                ? el.oem_spec.mileage + "Km/l"
                                : "Not Mentioned"}
                            </Text>
                          </Flex>

                          <Divider orientation="horizontal" />
                          <Flex
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            fontSize={".8em"}
                          >
                            <Text>Power</Text>
                            <Text>
                              {el.oem_spec.power
                                ? el.oem_spec.power + "BHP"
                                : "Not Mentioned"}
                            </Text>
                          </Flex>

                          <Flex
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            fontSize={"1em"}
                            mt="10px"
                          >
                            <Text>Colors</Text>
                            <Flex
                              alignItems={"center"}
                              justifyContent={"space-between"}
                            >
                              {el.oem_spec.color.map((col) => {
                                return (
                                  <Box
                                    display={"inline-flex"}
                                    borderRadius={"50%"}
                                    m="10px"
                                    w="20px"
                                    h="20px"
                                    bg={col}
                                    border="2px solid lightgray"
                                  ></Box>
                                );
                              })}
                            </Flex>
                          </Flex>
                          <Flex
                            mt="10px"
                            fontSize={"1em"}
                            justifyContent={"space-between"}
                          >
                            <Link to={`/${el._id}`}>
                              <Button size={"sm"}>More Details</Button>
                            </Link>
                            {/* {userid == el.dealer._id && (
                              <BasicUsage data={el} update_date={update_date} />
                            )}
                            {userid == el.dealer._id && (
                              <DeleteAlert
                                delete_item={delete_item}
                                id={el._id}
                              />
                            )} */}
                          </Flex>
                        </Box>
                      </Box>
                    </GridItem>
                  );
                })}
          </Grid>
        </Box>

        <Box>
          <Flex
            alignItems={"center"}
            w={"98%"}
            justifyContent={"center"}
            m={"auto"}
          >
            {
              <Button
                isDisabled={page !== 1 ? false : true}
                className="prevBtn"
                data-testid="prevBtn"
                onClick={() =>
                  setpage((prev) => {
                    setSearchParams({ page: page - 1, limit });
                    setfilter((prev) => ({ ...prev, page: page - 1 }));
                    return prev - 1;
                  })
                }
              >
                Prev
              </Button>
            }

            {/* render the buttons here, directly. Ensure, each button has the "data-testid='btn'" prop. Add the className, activeBtn, if the current button is the activePage*/}

            <Button m="9px">{page}</Button>

            {
              <Button
                isDisabled={page != Math.ceil(length / limit) ? false : true}
                className="nextBtn"
                data-testid="nextBtn"
                onClick={() =>
                  setpage((prev) => {
                    setSearchParams({ page: page + 1, limit });

                    setfilter((prev) => ({ ...prev, page: page + 1 }));
                    return prev + 1;
                  })
                }
              >
                Next
              </Button>
            }
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default Deals;
