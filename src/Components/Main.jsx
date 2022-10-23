import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  SimpleGrid,
  Input,
  Text,
  Select,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter
} from "@chakra-ui/core";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Main() {
  // const dispatch = useDispatch();
  // const data = useSelector((state) => state.data);
  // console.log(data);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    if (email == "admin@gmail.com" && password == "masai") {
      alert("Login Succeed");
      onClose();
      navigate("/admin");
    } else {
      alert("Please Valid Details, email : admin@gmail.com, password: masai");
    }
  };

  return (
    <>
      <Box>
        {/* Admin Login UI  */}
        <Box>
          <Button onClick={onOpen}>Admin Section</Button>

          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Please Login As Admin</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Text>Enter Email</Text>
                <Input
                  width="70%"
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                  name={email}
                />
                <Text>Enter Password</Text>
                <Input
                  width="70%"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={login}>
                  Login
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <br />
        {/* User SignUpUI */}
      </Box>
      <Box>
        <Link to="/user">
          <Button>User Section</Button>
        </Link>
      </Box>
    </>
  );
}
