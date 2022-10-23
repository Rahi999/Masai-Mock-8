import {
  Box,
  Text,
  SimpleGrid,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  useDisclosure,
  ModalFooter
} from "@chakra-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getFailure, getLoading, getSuccess } from "../Redux/AppReducer/action";
import styles from "./hotel.module.css";

export default function Hotel() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getData = () => {
    dispatch(getLoading());
    axios
      .get("https://fakestoreproducts.herokuapp.com/users")
      .then((res) => dispatch(getSuccess(res.data)))
      .catch((err) => dispatch(getFailure()));
  };
  useEffect(() => {
    getData();
  }, []);
  const { isLoading, isError, rooms } = useSelector((state) => {
    return {
      isLoading: state.isLoading,
      isError: state.isError,
      rooms: state.rooms
    };
  });

  const booked = () => {
    alert("Room Booked");
    onClose();
  };
  console.log(rooms, isLoading, isError);
  let data = JSON.parse(localStorage.getItem("login"));

  return isLoading ? (
    <img
      style={{ borderRadius: "50%" }}
      src="https://www.speedsolving.com/data/avatars/o/55/55674.jpg?1624913715"
    />
  ) : isError ? (
    <img src="https://c.tenor.com/fzCt8ROqlngAAAAM/error-error404.gif" />
  ) : (
    <>
      {" "}
      <h1>Hotel</h1>
      <SimpleGrid
        style={{ gap: "10px" }}
        columns={{ sm: 1, md: 3, lg: 4, xl: 4, base: 1 }}
      >
        {rooms &&
          rooms.map((el) => (
            <Box className={styles.box} key={el.id} style={{ padding: "10px" }}>
              <Image style={{ borderRadius: "8px" }} src={el.image_url} />
              <Text className={styles.text}>Adults : {el.no_of_persons}</Text>
              <Text className={styles.text}>Capacity : {el.capacity}</Text>
              <Text className={styles.text}>Bed Type : {el.bed_type}</Text>
              <Text className={styles.text}>Price : ₹ {el.cost}</Text>
              <Box>
                <Button onClick={onOpen}>Book Now</Button>

                <Modal
                  closeOnOverlayClick={false}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Book Now</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <Text
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          fontStyle: "italic",
                          color: "grey"
                        }}
                      >
                        Email : {data[data.length - 1].email}
                      </Text>{" "}
                      <hr />
                      <Text
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          fontStyle: "italic",
                          color: "grey"
                        }}
                      >
                        RoomType : {el.type_of_room}
                      </Text>{" "}
                      <hr />
                      <Text
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          fontStyle: "italic",
                          color: "grey"
                        }}
                        className={styles.text}
                      >
                        {" "}
                        Adults : {el.no_of_persons}
                      </Text>{" "}
                      <hr />
                      <Text
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          fontStyle: "italic",
                          color: "grey"
                        }}
                        className={styles.text}
                      >
                        No Of Person : {el.capacity}
                      </Text>{" "}
                      <hr />
                      <Text
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          fontStyle: "italic",
                          color: "grey"
                        }}
                        className={styles.text}
                      >
                        Bed Type : {el.bed_type}
                      </Text>{" "}
                      <hr />
                      <Text
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          fontStyle: "italic",
                          color: "grey"
                        }}
                        className={styles.text}
                      >
                        Price : ₹ {el.cost}
                      </Text>{" "}
                      <hr />
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={booked}>
                        Book
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Box>
            </Box>
          ))}{" "}
      </SimpleGrid>
    </>
  );
}
