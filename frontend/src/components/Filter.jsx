import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
} from "@chakra-ui/react";

const Filter = ({ item }) => {
  
  const { filter, setfilter, fetchData, page, limit, value } = item;

  function outter(timer) {
    let id;
    return function (e) {
      if (id) {
        clearTimeout(id);
      }
      id = setTimeout(() => {
        updateSeach(e);
      }, timer);
    };
  }

  function updateSeach(e) {
    let name = e.target.name;
    let value = e.target.value;
    setfilter((prev) => ({ ...prev, [name]: value }));
  }

  let debounce_search = outter(500);

  return (
    <Box
      borderRight={value ? `1px solid ${"#eaeaea"}` : "none"}
      position={"sticky"}
      top="10vh"
      h={"100vh"}
      w="300px"
      p="20px"
      pt="3rem"
      bg={"white"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <InputGroup>
        <Input
          color={"dark"}
          onChange={debounce_search}
          name="model"
          type="search"
          placeholder="Find a Car"
        />
        <InputRightElement h={"full"}>
          <Button bg="white" variant={"ghost"}>
            <SearchIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
      <Box
        mt="30px"
        justifyContent={"space-between"}
        alignItems={"center"}
        color={"#003a5e"}
      >
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text
            textAlign={"left"}
            fontWeight={"bolder"}
            fontSize={"21px"}
            w="150px"
          >
            Min Price :
          </Text>
          <Input
            value={filter?.min_price || null}
            w="100px"
            placeholder="Enter"
            outline={"#003a5e"}
            onChange={(e) => {
              setfilter((prev) => {
                return { ...prev, min_price: +e.target.value, limit, page };
              });
            }}
          ></Input>
        </Flex>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text
            textAlign={"left"}
            fontWeight={"bolder"}
            fontSize={"21px"}
            w="150px"
          >
            Max Price :
          </Text>
          <Input
            value={filter?.max_price || null}
            onChange={(e) => {
              setfilter((prev) => {
                return { ...prev, max_price: +e.target.value };
              });
            }}
            w="100px"
            placeholder="Enter"
          ></Input>
        </Flex>
      </Box>

      <Box
        mt="30px"
        justifyContent={"space-between"}
        alignItems={"center"}
        color={"#003a5e"}
      >
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text
            textAlign={"left"}
            fontWeight={"bolder"}
            fontSize={"21px"}
            w="150px"
          >
            Min Mileage :
          </Text>
          <Input
            value={filter?.min_mileage || null}
            onChange={(e) => {
              setfilter((prev) => {
                return {
                  ...prev,
                  min_mileage: +e.target.value,
                };
              });
            }}
            w="100px"
            placeholder="Enter"
            outline={"#003a5e"}
          ></Input>
        </Flex>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text
            textAlign={"left"}
            fontWeight={"bolder"}
            fontSize={"21px"}
            w="150px"
          >
            Max Mileage :
          </Text>
          <Input
            value={filter?.max_mileage || null}
            onChange={(e) => {
              setfilter((prev) => {
                return {
                  ...prev,
                  max_mileage: +e.target.value,
                };
              });
            }}
            w="100px"
            placeholder="Enter"
          ></Input>
        </Flex>
      </Box>

      <Select
        mt="30px"
        value={filter?.color}
        fontWeight={"bold"}
        color={"#003a5e"}
        w="100%"
        placeholder="Choose Color"
        onChange={(e) => {
          setfilter((prev) => {
            return { ...prev, color: e.target.value };
          });
        }}
      >
        <option value="Silver">Silver</option>
        <option value="Black">Black</option>
        <option value="Gray">Gray</option>
        <option value="Yellow">Yellow</option>
        <option value="Red">Red</option>
        <option value="Blue">Blue</option>
        <option value="White">White</option>
      </Select>
      <Button
        color={"#eeee"}
        mt="20px"
        bg="#003a5e"
        colorScheme={"white"}
        w="100%"
        onClick={(e) => {
          setfilter({});
          fetchData({});
        }}
      >
        Remove All Filters
      </Button>
    </Box>
  );
};

export default Filter;
