import React from "react";
import {
  Alert,
  AlertIcon,
  Flex,
  Box,
  Stack,
  Text,
  Code,
  Button,
  Input,
  FormControl,
  FormLabel,
  LightMode,
  HStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import RecordWrapper from "@/components/Record/RecordWrapper";
import FormError from "@/components/FormError";
import { useForm, useFormState } from "react-hook-form";
import fetch from "unfetch";
import Link from "@/components/Link";
import AlertDialog from "@/components/AlertDialog";

interface SuccessResponse {
  nns: string;
  accessToken?: string;
}

interface ErrorResponse {
  code: string;
  message: string;
}

export default function CustomRegister({ nns: string }) {
  const initError: ErrorResponse = { code: "", message: "" };
  const [error, setError] = React.useState(initError);
  const initSuccess: SuccessResponse = { nns: "", accessToken: "" };
  const [success, setSuccess] = React.useState(initSuccess);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, control } = useForm();
  const { errors } = useFormState({ control });
  const submit = handleSubmit((data) => {
    console.log("submit", data);
    fetch("/api/v1/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((response) => {
        console.log(response);
        if (response?.code) {
          setError(response);
          onOpen();
        } else {
          setSuccess(response);
        }
      });
  });

  return (
    <Box
      mt={4}
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
            Register New
          </Text>
        </HStack>
      </Flex>

      <Box borderRadius="2xl">
        {success.nns ? (
          <SuccessAlert success={success} />
        ) : (
          <RegisterForm submit={submit} register={register} errors={errors} />
        )}

        <AlertDialog
          isOpen={isOpen}
          onClose={onClose}
          title={error.code}
          body={error.message}
        />
      </Box>
    </Box>
  );
}

function RegisterForm({ submit, register, errors }) {
  return (
    <form onSubmit={submit}>
      <Stack spacing={3} p={4}>
        <FormControl id="nid">
          <FormLabel>NID</FormLabel>
          <Input
            defaultValue={""}
            {...register("nid", { required: "NID required" })}
            placeholder="Input your NID"
          />
          <FormError error={errors.nid} />
        </FormControl>

        <FormControl id="metadata.name">
          <FormLabel>Name</FormLabel>
          <Input
            defaultValue={""}
            {...register("metadata.name", {
              required: "Name required",
            })}
            placeholder="Input your Name"
          />
          <FormError error={errors["metadata.name"]} />
        </FormControl>

        <FormControl id="metadata.issuedAt">
          <FormLabel>Issued Time</FormLabel>
          <Input
            defaultValue={new Date().toISOString()}
            {...register("metadata.issuedAt")}
            placeholder=""
          />
          <FormError error={errors["metadata.issuedAt"]} />
        </FormControl>

        <FormControl id="metadata.issuer">
          <FormLabel>Issuer</FormLabel>
          <Input
            defaultValue={""}
            {...register("metadata.issuer")}
            placeholder=""
          />
          <FormError error={errors["metadata.issuer"]} />
        </FormControl>

        <FormControl id="metadata.serialNo">
          <FormLabel>Serial No</FormLabel>
          <Input
            defaultValue={""}
            {...register("metadata.serialNo")}
            placeholder=""
          />
          <FormError error={errors["metadata.serialNo"]} />
        </FormControl>

        <FormControl id="metadata.thumbnailURL">
          <FormLabel>ThumbnailURL</FormLabel>
          <Input
            defaultValue={""}
            {...register("metadata.thumbnailURL")}
            placeholder=""
          />
          <FormError error={errors["metadata.thumbnailURL"]} />
        </FormControl>

        <FormControl id="metadata.assetURL">
          <FormLabel>Asset URL</FormLabel>
          <Input
            defaultValue={""}
            {...register("metadata.assetURL")}
            placeholder=""
          />
          <FormError error={errors["metadata.assetURL"]} />
        </FormControl>

        <LightMode>
          <Button mt={4} colorScheme="blue" type="submit">
            Submit
          </Button>
        </LightMode>
      </Stack>
    </form>
  );
}

function SuccessAlert({ success }) {
  return (
    <Stack spacing={3} p={4}>
      <Alert status="success">
        <AlertIcon />
        NNS: {success.nns} Register success! And you should remember this access
        token:
        <Code>{success.accessToken}</Code>
      </Alert>
      <Box>
        <Link href={`/records/${success.nns}`}>Go to NNS</Link>
        <ArrowForwardIcon ml={2} />
      </Box>
    </Stack>
  );
}
