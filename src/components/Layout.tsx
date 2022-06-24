import { Box } from "@chakra-ui/react";
import Header from "./Header";

export default function Wrapper({ fixed = false, children }) {
  return (
    <Box bgGradient="linear(to-r, gray.900, blue.900, gray.900)" minH="100vh">
      <Header fixed={fixed} />
      {children}
    </Box>
  );
}
