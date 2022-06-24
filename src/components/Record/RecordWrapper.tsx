import NextLink from "next/link";
import {
  Button,
  Container,
  Badge,
  Box,
  Flex,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function RecordWrapper({ data, actived = "Detail", children }) {
  const slug = encodeURIComponent(data.name);
  const tabs = [
    { name: "Detail", to: `/records/${slug}` },
    { name: "Setting", to: `/records/${slug}/setting` },
  ];

  const tabSelected = {
    bg: useColorModeValue("blue.100", "blue.700"),
    color: useColorModeValue("blue.500", "blue.300"),
  };

  const tabColor = useColorModeValue("gray.500", "gray.300");

  return (
    <Container maxW={"6xl"} py={10}>
      <Box
        rounded={"md"}
        borderWidth={1}
        borderColor={useColorModeValue("gray.200", "gray.700")}
        height={"full"}
        style={{
          scrollMarginTop: "2rem",
        }}
      >
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={{ base: "column", md: "row" }}
          py={3}
          px={4}
          borderBottomWidth={1}
          borderBottomStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <HStack spacing={2}>
            <Text
              color={useColorModeValue("gray.800", "gray.300")}
              fontSize={"md"}
              fontWeight={800}
              mb={{ base: 4, md: 0 }}
            >
              {data.name}
            </Text>
          </HStack>

          <HStack spacing={4} color={useColorModeValue("gray.500", "gray.300")}>
            {tabs.map((tab) => (
              <NextLink key={tab.name} href={tab.to} passHref>
                <Button
                  as={"a"}
                  size="sm"
                  fontSize={"xs"}
                  borderRadius="full"
                  fontWeight={400}
                  color={tabColor}
                  sx={actived === tab.name ? tabSelected : {}}
                >
                  {tab.name}
                </Button>
              </NextLink>
            ))}
          </HStack>
        </Flex>
        <Box borderRadius="2xl">{children}</Box>
      </Box>
    </Container>
  );
}
