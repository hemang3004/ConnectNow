import React from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";

import { useHistory } from "react-router-dom";
import { useEffect } from "react";
const Login=React.lazy(()=>import("../Components/Authentication/Login"))
const Signup=React.lazy(()=>import("../Components/Authentication/Signup"))
// how chakra ui is differ from normal html-css is that we can directly write styles inside of these tags

function HomePage() {
  const history = useHistory();

  useEffect(() => {
    //   fetching userinfo from local storage that is logged in or signed up
    const user = JSON.parse(localStorage.getItem("userInfo"));

    //   if user logged in then redirect to chatpage
    if (user) {
      history.push("/main");
    }
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" textAlign="center">
          ConnectNow
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage;
