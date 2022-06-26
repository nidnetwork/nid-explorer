import {
  Heading,
  Avatar,
  Box,
  Text,
  Stack,
  Link,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import RegisterButton from "./RegisterButton";

interface Collection {
  title: string;
  description: string;
  total: string;
  tags: string[];
  logo: string;
}

export default function NFTCollection({
  collection,
}: {
  collection: Collection;
}) {
  return (
    <Box
      p={6}
      boxShadow={"2xl"}
      rounded={"lg"}
      textAlign={"center"}
      borderWidth="1px"
      borderRadius="lg"
    >
      <Avatar size={"xl"} src={collection.logo} mb={4} />
      <Heading fontSize={"2xl"} fontFamily={"body"}>
        {collection.title}
      </Heading>
      <Text fontWeight={600} color={"gray.500"} mb={4}>
        {collection.total}
      </Text>
      <Text
        textAlign={"center"}
        color={useColorModeValue("gray.700", "gray.400")}
        px={3}
        noOfLines={3}
      >
        {collection.description}
      </Text>

      <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
        {collection.tags.map((tag, index) => (
          <Badge
            key={index}
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #{tag}
          </Badge>
        ))}
      </Stack>

      <Stack mt={8} direction={"row"} spacing={4}>
        <RegisterButton collection={collection} />
      </Stack>
    </Box>
  );
}
