import React from "react";
import {
  Flex,
  Box,
  Stack,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  LightMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import RecordWrapper from "@/components/Record/RecordWrapper";
import FormError from "@/components/FormError";
import { useForm, useFormState } from "react-hook-form";
import fetch from "unfetch";
import AlertDialog from "@/components/AlertDialog";

const fetcher = (url) => fetch(url).then((r) => r.json());

interface SuccessResponse {
  nns: string;
  accessToken?: string;
}

interface ErrorResponse {
  code: string;
  message: string;
}

export default function RecordSetting() {
  const router = useRouter();
  const { nns } = router.query;

  const initError: ErrorResponse = { code: "", message: "" };
  const [error, setError] = React.useState(initError);
  const initSuccess: SuccessResponse = { nns: "", accessToken: "" };
  const [success, setSuccess] = React.useState(initSuccess);
  const successAlert = useDisclosure();
  const errorAlert = useDisclosure();

  const { register, handleSubmit, control } = useForm();
  const { errors } = useFormState({ control });
  const submit = handleSubmit((data) => {
    console.log("submit", data);
    fetch("/api/v1/records/" + nns, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.accessToken}`,
      },
      body: JSON.stringify({ nid: data.nid }),
    })
      .then((r) => r.json())
      .then((response) => {
        console.log(response);
        if (response?.code) {
          setError(response);
          errorAlert.onOpen();
        } else {
          setSuccess(response);
          successAlert.onOpen();
        }
      });
  });

  const [record, setRecord] = React.useState(null);

  React.useEffect(() => {
    if (nns) {
      fetcher(`/api/v1/records/${nns}`).then((res) => setRecord(res));
    }
  }, [nns]);

  if (!record) return <div>loading...</div>;

  return (
    <Layout>
      <RecordWrapper data={{ name: nns }} actived="Setting">
        <AlertDialog
          isOpen={errorAlert.isOpen}
          onClose={errorAlert.onClose}
          title={error.code}
          body={error.message}
        />
        <AlertDialog
          isOpen={successAlert.isOpen}
          onClose={successAlert.onClose}
          title={"Success"}
          body={
            "The record setting update success, and you should remember the new access token: " +
            success.accessToken
          }
        />
        <form onSubmit={submit}>
          <Stack spacing={3} p={4}>
            <FormControl id="nid">
              <FormLabel>NID</FormLabel>
              <Input
                defaultValue={record.nid}
                {...register("nid", { required: "NID required" })}
                placeholder="Input your NID"
              />
              <FormError error={errors.nid} />
            </FormControl>

            <FormControl id="accessToken">
              <FormLabel>AccessToken</FormLabel>
              <Input
                defaultValue={""}
                {...register("accessToken", {
                  required: "Access token required",
                })}
                placeholder="Input your access token"
              />
              <FormError error={errors.accessToken} />
            </FormControl>

            <LightMode>
              <Button mt={4} colorScheme="blue" type="submit">
                Submit
              </Button>
            </LightMode>
          </Stack>
        </form>
      </RecordWrapper>
    </Layout>
  );
}
