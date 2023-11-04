import logo from "./logo.svg";
import "./App.css";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import AllRoutes from "./components/AllRoutes";

function App() {
  return (
    <Box bg={"white"} className="App">
      <Navbar />
      <AllRoutes />
    </Box>
  );
}

export default App;
