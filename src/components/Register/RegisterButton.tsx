import React from "react";
import {
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  FormControl,
  Input,
  Button,
  Code,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "@/components/Link";

interface Collection {
  title: string;
  description: string;
  total: string;
  tags: string[];
  logo: string;
}

interface SuccessResponse {
  nns: string;
  accessToken?: string;
}

export default function RegisterButton({
  collection,
}: {
  collection: Collection;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tokenID, setTokenID] = React.useState();
  const initSuccess: SuccessResponse = { nns: "", accessToken: "" };
  const [success, setSuccess] = React.useState(initSuccess);
  const onChange = (e) => {
    setTokenID(e.target.value);
  };

  const register = (data) => {
    console.log("register", data);
    fetch("/api/v1/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((response) => {
        console.log(response);
        if (!response?.code) {
          setSuccess(response);
        }
      });
  };

  const submit = (e) => {
    e.preventDefault();

    // current only for opensea bayc collection
    const baseURL = "https://api.opensea.io/api/v1";
    const contract = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
    const options = { method: "GET" };
    fetch(
      `${baseURL}/asset/${contract}/${tokenID}/?include_orders=false`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        register({
          nid: `did:nft:eip155:1_erc721:${contract}_${tokenID}`,
          metadata: {
            name: response.name || response.collection?.name + " #" + tokenID,
            issuedAt: "2022-06-26T06:11:56.593Z",
            issuer: response.collection?.name,
            serialNo: "",
            thumbnailURL: response.image_preview_url,
            assetURL: response.image_original_url,
          },
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Button
        onClick={onOpen}
        flex={1}
        fontSize={"sm"}
        rounded={"full"}
        bg={"blue.400"}
        color={"white"}
        _hover={{
          bg: "blue.500",
        }}
        _focus={{
          bg: "blue.500",
        }}
      >
        Register
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register NNS</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {success.nns ? (
              <Alert status="success">
                <AlertIcon />
                <Box>
                  <div>
                    NNS:{" "}
                    <Code>
                      <Link href={`/records/${success.nns}`}>
                        {success.nns}
                      </Link>
                    </Code>{" "}
                    Register success! And you should remember this access token:
                  </div>
                  <div>
                    <Code>{success.accessToken}</Code>
                  </div>
                </Box>
              </Alert>
            ) : (
              <Box>
                <Alert status="info">
                  <AlertIcon />
                  Please input {collection.title} Token ID
                </Alert>
                <FormControl mt={3}>
                  <Input placeholder="Input Token ID" onChange={onChange} />
                </FormControl>
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            {success.nns ? (
              <Button
                onClick={() => setSuccess(initSuccess)}
                colorScheme="green"
              >
                Register New
              </Button>
            ) : (
              <Button colorScheme="blue" mr={3} onClick={submit}>
                Submit
              </Button>
            )}

            <Button onClick={onClose} ml={3}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
