import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  ModalBody,
  ModalFooter,
  Select,
  Spinner,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

import axios_create from "../utils/axios_instance";
const init = {
  image: "",
  description: [],
  odometer: "",
  original_paint: "",
  oem_spec: "",
  previous_buyer: "",
  registration_place: "",
  reported_accident: "",
  scratches: "",
  title: "",
};

function AddCar() {
  const [item, setitem] = useState(init);
  const inputRef = useRef();
  const [oemdata, set_oemdata] = useState([]);
  const [oemid, set_oemid] = useState();
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const [search, setseach] = useState("");
  const [load, setload] = useState(false);

  function change(e) {
    let name = e.target.name;
    let value = e.target.value;
    setitem({ ...item, [name]: value });
  }

  function deleteItem(i) {
    let obj = { ...item };
    let arr = obj.description.filter((el, ind) => {
      return ind != i;
    });
    obj.description = arr;
    setitem(obj);
  }
  function addvalue(e) {
    let value = inputRef.current.value;
    let obj = { ...item };
    obj.description.push(value);
    setitem(obj);
    inputRef.current.value = "";
  }
  async function fetch_oem() {
    let data = await axios_create.get("/oem");
    data = data.data;
    set_oemdata(data);
  }

  function selected_oem(ind, id) {
    set_oemid(id);
    setitem({ ...item, oem_spec: id });
  }
  useEffect(() => {
    fetch_oem();
  }, []);

  async function submitPost() {
    try {
      setloading(true);
      await axios_create.post(`/inventory`, { ...item });
      setloading(false);
      toast({
        title: "Item Posted",
        description: "Item is stored in Database",
        status: "success",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
      setitem({ ...init });
    } catch (error) {
      setloading(false);
      toast({
        title: "Error in Posting",
        description: error.message,
        status: "error",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
    }
  }
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
  };
  async function handleUpload(e) {
    const data = new FormData();
    let image = e.target.files[0];
    data.append("file", image);
    data.append("upload_preset", "fiverr");

    setload(true);
    let temp = await axios.post(
      `https://api.cloudinary.com/v1_1/djuaj2nbx/image/upload`,
      data
    );
    setload(false);
    temp = temp.data.secure_url;
    setitem((prev) => ({ ...prev, image: temp }));
  }
  return (
    <Box py="20px" bg={"white"} color={"black"}>
      <Box
        w="95%"
        p="20px"
        borderRadius={"10px"}
        border={`1px solid ${"#eaeaea"}`}
        // border='1px solid red'
        m="auto"
        py="2rem"
      >
        <Box>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <FormControl w="100%" id="image">
              <FormLabel>Image</FormLabel>
              <InputGroup>
                <Flex
                  w="100%"
                  flexDir={{ base: "column", md: "row" }}
                  alignItems={{ base: "left", md: "center" }}
                  justifyContent={"space-between"}
                >
                  <Flex w="100%">
                    <InputLeftAddon color={"black"} children="Link" />
                    <Input value={item.image} onChange={change} name="image" />
                  </Flex>
                  <Text
                    mt={{ base: "1rem", md: "0px" }}
                    mx={{ base: "0px", md: "10px" }}
                  >
                    Or
                  </Text>
                  <Flex
                    alignItems={{ base: "start", sm: "center" }}
                    flexDir={{ base: "column", sm: "row" }}
                    w="100%"
                    my="20px"
                  >
                    <input
                      onChange={handleUpload}
                      type="file"
                      name="image"
                      // onChange={change}
                    />
                    <Flex mt={{ base: "15px", sm: "0px" }}>
                      <Text
                        visibility={load ? "unset" : "hidden"}
                        display={"inline"}
                      >
                        Uploading
                      </Text>
                      <Spinner
                        ml="8px"
                        visibility={load ? "unset" : "hidden"}
                        color={"gray.800"}
                      />
                    </Flex>
                  </Flex>
                </Flex>
              </InputGroup>
            </FormControl>
          </Flex>
          <Flex
            flexDir={{ base: "column", sm: "row" }}
            justifyContent={"space-between"}
          >
            <FormControl mt="10px" w={{ base: "100%", sm: "45%" }} id="title">
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                onChange={change}
                value={item.title}
                name="title"
              />
            </FormControl>

            <FormControl
              mt="10px"
              w={{ base: "100%", sm: "45%" }}
              id="original_paint"
            >
              <FormLabel>Original Paint</FormLabel>
              <Select
                onChange={change}
                value={item.original_paint}
                placeholder="Choose Color"
                name="original_paint"
              >
                <option value="silver">Silver</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="white">White</option>
                <option value="yellow">Yellow</option>
                <option value="black">Black</option>
              </Select>
            </FormControl>
          </Flex>
          <Box border={`1px solid ${"#eaeaea"}`} mt="20px" />
          <Flex
            flexDir={{ base: "column", lg: "row" }}
            justifyContent={"space-between"}
          >
            <Box
              pr="20px"
              borderRight={`2px solid ${"#eaeaea"}`}
              textAlign={"left"}
              w={{ base: "100%", lg: "60%" }}
            >
              <Flex
                flexDir={{ base: "column", lg: "row" }}
                justifyContent={"space-between"}
              >
                <Box display={{ base: "none", lg: "block" }}>
                  <Button
                    textAlign={"left"}
                    fontWeight={"semibold"}
                    cursor={"no-drop"}
                    mt="20px"
                    mb="10px"
                    fontSize={"17px"}
                    variant={"outline"}
                    color={"black"}
                  >
                    Click On A Table Row To Choose
                  </Button>
                </Box>
                <FormControl
                  mt="20px"
                  mb={{ base: "10px", lg: "0px" }}
                  w={{ base: "100%", lg: "60%" }}
                  id="oem_spec"
                >
                  <Flex
                    flexDir={{ base: "column", lg: "row" }}
                    justifyContent={{ base: "center", lg: "end" }}
                    alignItems={{ base: "left", lg: "center" }}
                  >
                    <FormLabel>Filter Oem Spec</FormLabel>
                    <Input
                      w={{ base: "100%", lg: "40%" }}
                      placeholder="Search OEM"
                      onChange={(e) => {
                        setseach(e.target.value);
                      }}
                    ></Input>
                  </Flex>
                </FormControl>
                <Box display={{ base: "block", lg: "none" }}>
                  <Button
                    textAlign={"left"}
                    fontWeight={"semibold"}
                    cursor={"no-drop"}
                    mt="20px"
                    mb="10px"
                    fontSize={{ base: "15px", sm: "17px" }}
                    variant={"outline"}
                    size="sm"
                    color={"black"}
                    w={{ base: "100%", sm: "auto" }}
                  >
                    Click On A Table Row To Choose
                  </Button>
                </Box>
              </Flex>
              <TableContainer mt="15px">
                <Table size="sm" fontSize={"23px"}>
                  <Thead>
                    <Tr color={"white"} border={`1px solid ${"#eaeaea"}`}>
                      <Th>Model</Th>
                      <Th isNumeric>Year</Th>
                      <Th isNumeric>Price</Th>
                      <Th isNumeric>Max Speed</Th>
                      <Th isNumeric>Mileage</Th>
                      <Th isNumeric>Power</Th>
                      <Th>Color</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {!oemdata.length
                      ? null
                      : oemdata
                          .filter((el) =>
                            el.model
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          )
                          .map((data, ind) => {
                            return (
                              <Tr
                                cursor={"pointer"}
                                onClick={() => {
                                  selected_oem(ind, data._id);
                                }}
                                w="95%"
                                border={
                                  oemid == data._id
                                    ? "2px solid green"
                                    : `2px solid ${"#eaeaea"}`
                                }
                                textAlign={"left"}
                                borderRadius={"10px"}
                                fontSize={"15px"}
                                p="8px"
                              >
                                <Td>{data.model}</Td>
                                <Td isNumeric>{data.year}</Td>
                                <Td isNumeric>{data.price} Rs</Td>
                                <Td isNumeric>{data.max_speed} Km/h</Td>
                                <Td isNumeric>{data.mileage} Km/l</Td>
                                <Td isNumeric>{data.power} BHP</Td>
                                <Td>
                                  {
                                    <Flex
                                      alignItems={"center"}
                                      justifyContent={"space-between"}
                                    >
                                      {data.color.map((col) => {
                                        return (
                                          <Box
                                            display={"inline-flex"}
                                            borderRadius={"50%"}
                                            m="5px"
                                            w="15px"
                                            h="15px"
                                            bg={col}
                                            border="2px solid lightgray"
                                          ></Box>
                                        );
                                      })}
                                    </Flex>
                                  }
                                </Td>
                              </Tr>
                            );
                          })}
                  </Tbody>
                </Table>
              </TableContainer>
              <Flex
                display={{ base: "flex", md: "none" }}
                alignItems={"center"}
                mt="10px"
                justifyContent={"center"}
              >
                <Text fontSize={"17px"} fontWeight={"semibold"} mr="10px">
                  Swipe Right
                </Text>
                <svg
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  width={"40px"}
                  height={"40px"}
                  fill={"black"}
                >
                  <path
                    d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z"
                    fill-rule="nonzero"
                  />
                </svg>
              </Flex>
            </Box>
            {/* <Box border={`1px solid ${mode?outline:'#eaeaea'}`}/> */}
            <Flex w={{ base: "100%", lg: "38%" }} alignItems={"start"}>
              <Box w="100%" m="auto" mt="20px">
                <FormControl w="100%" id="description">
                  <Flex
                    flexDir={{ base: "column", sm: "row" }}
                    alignItems={{ base: "start", sm: "center" }}
                  >
                    <FormLabel fontSize={"17px"}>Description</FormLabel>
                    <InputGroup>
                      <Input ref={inputRef} name="description" />
                      <Button onClick={addvalue}>
                        <InputRightAddon w="100%" children="Add" />
                      </Button>
                    </InputGroup>
                  </Flex>
                </FormControl>
                <Box
                  p={item.description.length ? "5px" : "0px"}
                  borderRadius={"10px"}
                  mt="10px"
                >
                  {!item.description.length
                    ? null
                    : item.description?.map((el, ind) => {
                        return (
                          <Flex
                            mt="4px"
                            borderRadius={"10px"}
                            justifyContent={"space-between"}
                            p="7px"
                            bg="blue.600"
                            color="white"
                          >
                            {el}
                            <span
                              onClick={() => {
                                deleteItem(ind);
                              }}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                marginLeft: "5px",
                                cursor: "pointer",
                              }}
                            >
                              <svg
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                                stroke-linejoin="round"
                                width="30px"
                                height="30px"
                                stroke-miterlimit="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="white"
                              >
                                <path
                                  fill="white"
                                  d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                                />
                              </svg>
                            </span>
                          </Flex>
                        );
                      })}
                </Box>
              </Box>
            </Flex>
          </Flex>
          <Box mt="20px" borderTop={`1px solid ${"#eaeaea"}`} />
          <Flex
            flexDir={{ base: "column", sm: "row" }}
            justifyContent={"space-between"}
          >
            <FormControl
              mt="20px"
              w={{ base: "100%", sm: "45%" }}
              id="previous_buyer"
            >
              <FormLabel>Previous Buyer</FormLabel>
              <Input
                onChange={change}
                value={item.previous_buyer}
                type="number"
                name="previous_buyer"
              />
            </FormControl>
            <FormControl
              mt="20px"
              w={{ base: "100%", sm: "45%" }}
              id="registration_place"
            >
              <FormLabel>Registration Place</FormLabel>
              <Input
                onChange={change}
                value={item.registration_place}
                type="text"
                name="registration_place"
              />
            </FormControl>
          </Flex>
          <Flex
            flexDir={{ base: "column", sm: "row" }}
            justifyContent={"space-between"}
          >
            <FormControl
              mt="10px"
              w={{ base: "100%", sm: "45%" }}
              id="odometer"
            >
              <FormLabel>Odometer</FormLabel>
              <Input
                type="number"
                onChange={change}
                value={item.odometer}
                name="odometer"
              />
            </FormControl>
            <FormControl
              mt="10px"
              w={{ base: "100%", sm: "45%" }}
              id="reported_accident"
            >
              <FormLabel>Reported Accident</FormLabel>
              <Input
                onChange={change}
                value={item.reported_accident}
                type="number"
                name="reported_accident"
              />
            </FormControl>
          </Flex>
          <Flex
            flexDir={{ base: "column", sm: "row" }}
            justifyContent={"space-between"}
          >
            <FormControl
              mt="10px"
              w={{ base: "100%", sm: "45%" }}
              id="scratches"
            >
              <FormLabel>Scratches</FormLabel>
              <Input
                onChange={change}
                value={item.scratches}
                type="number"
                name="scratches"
              />
            </FormControl>
            <Box textAlign={"right"}>
              <Button
                textAlign={"right"}
                width="200px"
                display={"inline-flex"}
                justifyContent={"space-between"}
                mt="40px"
                onClick={submitPost}
                variant="solid"
                bg={"red.600"}
                _hover={{
                  bg: "red.500",
                }}
                color={"white"}
              >
                Submit{" "}
                <Spinner visibility={loading ? "unset" : "hidden"} ml="10px" />
              </Button>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default AddCar;
