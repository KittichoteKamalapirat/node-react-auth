import "./App.css";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Image,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputField } from "./components/InputField";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <Box width="100%">
        <Flex
          bgColor="#282c34"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <Box width={["100%", "40%"]} bgColor="white" p={10}>
            <Center position="relative" top={-20}>
              <Box
                borderRadius="50%"
                border="solid"
                borderWidth="1px"
                borderColor="gray.300"
                bgColor="white"
              >
                <Image add later />
              </Box>
            </Center>

            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values, { setErrors, setStatus }) => {
                console.log({ values });

                try {
                  const res = await axios.post(
                    "http://localhost:5000/auth/signin",
                    values
                  );
                  // setErrors(res.data.name);
                  setStatus("Successfully signed in. Welcome Rose Gates");
                  // setErrors({ password: "success" });
                } catch (error) {
                  setErrors({ password: "Incorrect signin credential" });
                  setStatus(null);
                  console.log(error);
                }

                // return await res.json();
              }}
            >
              {({ isSubmitting, status }) => (
                <Box top={-10}>
                  {" "}
                  <Form>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<EmailIcon />}
                        position="absolute"
                        top={8}
                      />
                      <InputField
                        name="email"
                        placeholder="email"
                        label="Email"
                      />
                    </InputGroup>

                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<LockIcon />}
                        position="absolute"
                        top={8}
                      />
                      <InputField
                        name="password"
                        placeholder="password"
                        // type="password"
                        label="password"
                      />
                    </InputGroup>

                    <Text textAlign="left" color="green">
                      {status &&
                        status
                          .split(".")
                          .map((sentence: string) => <Text>{sentence}</Text>)}
                    </Text>

                    <Button
                      bgColor="#3f51b5"
                      color="white"
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Sign in
                    </Button>

                    <Button
                      bgColor="#f50057"
                      color="white"
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Sign in with API
                    </Button>
                  </Form>
                </Box>
              )}
            </Formik>

            <Flex alignItems="center" my={6}>
              <Divider />
              <Text mx={2}>OR</Text>
              <Divider />
            </Flex>

            <Flex
              flexDirection={["column", "row"]}
              justifyContent="space-between"
            >
              <Button flex={1} mx={1} bgColor="#4267B2" color="white">
                FACEBOOK
              </Button>
              <Button flex={1} mx={1} bgColor="#1DA1F2" color="white">
                TWITTER
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </div>
  );
}

export default App;
