import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  useColorModeValue,
  Tooltip,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import Bg from "@/assets/pattern-001.svg";

export default function CallToActionWithIllustration() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && CheckIsValidName(name)) {
      const path = `/records/${encodeURIComponent(name)}`;
      router.push(path);
    } else {
      setError(
        "Invalid name, the name characters must be a to z, digits 0 through 9, hyphen (-), dot (.), have a minimum of 3 and a maximum of 80 characters."
      );
    }
    return false;
  };

  return (
    <Flex
      bgImage={`url('${Bg.src}')`}
      bgPosition="center top"
      bgRepeat="repeat"
      minH="100vh"
      px={4}
      alignItems="center"
    >
      <Container maxW={"7xl"}>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={700}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            NID{" "}
            <Text as={"span"} color={"blue.400"}>
              Explorer
            </Text>
          </Heading>
          <Text color={"gray.400"} maxW={"3xl"} fontSize="xl">
            Your NFT ID over the OmniChain
          </Text>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={6}
              direction={"row"}
              minW={{ base: "auto", sm: "2xl" }}
            >
              <Tooltip
                hasArrow
                label={error}
                placement="top"
                bg="yellow.600"
                isOpen={error !== ""}
              >
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FiSearch color="gray.300" />}
                  />
                  <Input
                    rounded={"full"}
                    type="text"
                    placeholder="Input your NNS, x.nid.nns"
                    value={name}
                    border={2}
                    borderStyle={"solid"}
                    borderColor={useColorModeValue("gray.600", "gray.500")}
                    onChange={handleChange}
                    bgColor={"rgba(26, 32, 44, 0.8)"}
                  />
                </InputGroup>
              </Tooltip>
            </Stack>
          </form>
        </Stack>
      </Container>
    </Flex>
  );
}

function CheckIsValidName(name) {
  return /^[a-z0-9][a-z0-9-\.]{2,79}$/.test(name);
}
