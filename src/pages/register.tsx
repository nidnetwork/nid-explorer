import {
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import CollectionRegister from "@/components/Register/CollectionRegister";
import CustomRegister from "@/components/Register/CustomRegister";

export default function RecordRegister() {
  const router = useRouter();
  const { nns } = router.query;

  return (
    <Layout>
      <Container maxW={"6xl"} py={10}>
        <Tabs>
          <TabList>
            <Tab>Collections</Tab>
            <Tab>Custom</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <CollectionRegister nns={nns} />
            </TabPanel>
            <TabPanel>
              <CustomRegister nns={nns} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Layout>
  );
}
