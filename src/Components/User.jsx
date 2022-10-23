import {
  Box,
  Button,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function User() {
  const [semail, setSemail] = useState("");
  const [spassword, setSpassword] = useState("");
  const [view, setView] = useState(false);
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    let arr = JSON.parse(localStorage.getItem("login")) || [];
    let data = { email: semail, password: spassword };
    arr.push(data);
    localStorage.setItem("login", JSON.stringify(arr));
    alert("Signed Up SuucessFully");
    alert("Please Login");
  };

  let data = JSON.parse(localStorage.getItem("login"));

  console.log(data);

  const handleLogin = (e) => {
    e.preventDefault();
    if (data) {
      alert("Login Succeed");
      navigate("/hotel");
    } else {
      alert("Please Enter Full Details");
    }

    //console.log(data);
  };
  return (
    <>
      <Box>
        <Tabs>
          <TabList>
            <Tab>SignUp</Tab>
            <Tab>Login</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <form
                style={{ marginTop: "20px" }}
                onSubmit={(e) => handleSignup(e)}
              >
                {" "}
                <Input
                  type="email"
                  onChange={(e) => setSemail(e.target.value)}
                  width="300px"
                  placeholder="Enter Email To SignUp"
                />{" "}
                <br />
                <Input
                  type="password"
                  onChange={(e) => setSpassword(e.target.value)}
                  width="300px"
                  placeholder="Enter Password To Signup"
                />{" "}
                <br />
                <Button onClick={(e) => handleSignup(e)}>SignUp</Button>
              </form>
            </TabPanel>
            <TabPanel>
              <form
                style={{ marginTop: "20px" }}
                onSubmit={(e) => handleLogin(e)}
              >
                <Input
                  width="300px"
                  type="email"
                  placeholder="Enter Login Email"
                  onChange={(e) => setLoginEmail(e.target.value)}
                />{" "}
                <br />
                <Input
                  width="300px"
                  type="password"
                  placeholder="Enter Login Password"
                  onChange={(e) => setLoginEmail(e.target.value)}
                />{" "}
                <br />
                <Button onClick={(e) => handleLogin(e)}>Login</Button>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
