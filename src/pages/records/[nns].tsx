import {
  Flex,
  Box,
  Stack,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import RecordWrapper from "@/components/Record/RecordWrapper";
import imageFallback from "@/assets/image-fallback.svg";
import fetch from "unfetch";
import { useState, useEffect } from "react";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function RecordDetail() {
  const router = useRouter();
  const { nns } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (nns) {
      fetcher(`/api/v1/records/${nns}`).then((data) => setData(data));
    }
  }, [nns]);

  if (!data) return <div>loading...</div>;

  return (
    <Layout>
      <RecordWrapper data={{ name: nns }}>
        <Stack spacing={3} p={4} direction={{ base: "column", md: "row" }}>
          <Image
            rounded="md"
            boxSize="300px"
            objectFit="cover"
            src={data?.metadata?.thumbnailURL}
            fallbackSrc={imageFallback.src}
            alt={data?.metadata?.name}
          />

          <Stack spacing={3} p={4}>
            <RecordField label="NID">{data?.nid || "-"}</RecordField>
            <RecordField label="Name">{data?.metadata?.name}</RecordField>
            <RecordField label="Issuer">{data?.metadata?.issuer}</RecordField>
            <RecordField label="Serial No">
              {data?.metadata?.serialNo}
            </RecordField>
          </Stack>
        </Stack>
      </RecordWrapper>
    </Layout>
  );
}

function RecordField({ label, children }) {
  const color = useColorModeValue("gray.500", "gray.300");
  return (
    <Flex>
      <Box minW="100px">
        <Text fontWeight="bold">{label}</Text>
      </Box>
      <Box flex="1" px="2">
        <Box color={color}>{children}</Box>
      </Box>
    </Flex>
  );
}
