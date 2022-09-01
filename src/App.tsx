import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

import TipCalculator from "./components/TipCalculator";
// import CountInputChanges from "./components/CountInputChanges";

function App() {
  return (
    <ChakraProvider>
      <Box height="100vh">
        <TipCalculator />
      </Box>
    </ChakraProvider>
  );
}

export default App;
