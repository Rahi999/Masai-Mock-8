import React, { useEffect, useState } from "react";
import Styles from "./admin.module.css";
import {
  Box,
  Select,
  Text,
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from "@chakra-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getFailure, getLoading, getSuccess } from "../Redux/AppReducer/action";

export default function Admin() {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [room, setRoom] = useState("");
  const [bed, setBed] = useState("");
  const [person, setPerson] = useState("");
  const [capaciy, setCapacity] = useState("");
  const [cost, setCost] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedCategory, setupdatedCategory] = useState(category);
  const [updateImage, setupdateImage] = useState(image);
  const [updatedRoom, setupdatedRoom] = useState(room);
  const [updatedBed, setUpdateded] = useState(bed);
  const [updatedPerson, setUpdatedPerson] = useState(person);
  const [updatedCapacity, setUpdatedCapacity] = useState(capaciy);
  const [updatedCost, setUpdatedCost] = useState(cost);

  const dispatch = useDispatch();

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

  const postdata = (e) => {
    e.preventDefault();
    if (category && image && room && bed && person && capaciy && cost) {
      // console.log(payload);

      const payload = {
        category: category,
        image_url: image,
        type_of_room: room,
        bed_type: bed,
        no_of_persons: person,
        capacity: capaciy,
        cost: cost,
        booked: false
      };
      axios
        .post("https://fakestoreproducts.herokuapp.com/users", payload)
        .then((response) => {
          dispatch(getData);
        })
        .catch((err) => alert("Adding Failed"));
    } else {
      alert("Please Fill All The Details");
    }
  };

  const { isLoading, isError, rooms } = useSelector((state) => {
    return {
      isLoading: state.isLoading,
      isError: state.isError,
      rooms: state.rooms
    };
  });

  // console.log(rooms, isLoading, isError);

  const handleDelete = (id) => {
    axios
      .delete(`https://fakestoreproducts.herokuapp.com/users/${id}`)
      .then((res) => dispatch(getData))
      .catch(() => alert("Deleting failed"));
  };

  const handleEdit = (id) => {
    if (
      updatedCategory &&
      updateImage &&
      updatedRoom &&
      updatedBed &&
      updatedPerson &&
      updatedCapacity &&
      updatedCost
    ) {
      const payload = {
        category: updatedCategory,
        image_url: updateImage,
        type_of_room: updatedRoom,
        bed_type: updatedBed,
        no_of_persons: updatedPerson,
        capacity: updatedCapacity,
        cost: updatedCost,
        booked: false
      };
      axios
        .put(`https://fakestoreproducts.herokuapp.com/users/${id}`, payload)
        .then((res) => dispatch(getData))
        .catch((err) => alert("Failed to Update"));
      onClose();
    } else {
      alert("Please Enter All Details For Update");
    }
  };

  return isLoading ? (
    <img
      style={{ borderRadius: "50%" }}
      src="https://www.speedsolving.com/data/avatars/o/55/55674.jpg?1624913715"
    />
  ) : isError ? (
    <img src="https://c.tenor.com/fzCt8ROqlngAAAAM/error-error404.gif" />
  ) : (
    <>
      {/* Form For Posting The Data Into Json Server */}
      <Box className={Styles.form}>
        <form onSubmit={(e) => postdata(e)}>
          <label>Select Category</label> :{" "}
          <Select
            width="300px"
            placeholder="Select Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="family">Family</option>
            <option value="deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
          </Select>
          <label>Enter Image URL:</label>
          <Input
            width="300px"
            type="url"
            placeholder="Enter Room Image URL.."
            onChange={(e) => setImage(e.target.value)}
          />
          <label>Room Type :</label> <br /> <br />
          <Box onChange={(e) => setRoom(e.target.value)}>
            <input type="radio" value="AC" name="room" /> <label>AC</label>
            <input type="radio" value="None Ac" name="room" />{" "}
            <label>None AC</label> <br /> <br />
          </Box>
          <label>Select Bed Type :</label>
          <Select
            width="300px"
            placeholder="Select Bed Type"
            onChange={(e) => setBed(e.target.value)}
          >
            <option value="Single">Single</option>
            <option value="Double">Double</option>
          </Select>
          <label>Enter No. Of Adults :</label>
          <Input
            onChange={(e) => setPerson(e.target.value)}
            width="300px"
            type="number"
            placeholder="Enter Adults Number"
          />
          <label>Enter Capacity : </label>
          <Input
            type="number"
            placeholder="Enter Max Capacity"
            onChange={(e) => setCapacity(e.target.value)}
            width="300px"
          />
          <label>Enter Cost : </label>
          <Input
            type="number"
            placeholder="Enter Cost Of The Room"
            onChange={(e) => setCost(e.target.value)}
            width="300px"
          />{" "}
          <br />
          <Button onClick={(e) => postdata(e)}>Add Room</Button>
        </form>
      </Box>

      {/* Showing All The Data On UI In Form Of Table */}

      <Box>
        <table style={{ width: "100%" }}>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Type Of Room</th>
            <th>Bed Type</th>
            <th>No Of Person</th>
            <th>Capacity</th>
            <th>Cost</th>
            <th>Status (Booked/Not Booked)</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>

          {rooms &&
            rooms.map((el) => (
              <tr key={el.id}>
                <td>{el.id}</td>
                <td>{el.category}</td>
                <td>{el.type_of_room}</td>
                <td>{el.bed_type}</td>
                <td>{el.no_of_persons}</td>
                <td>{el.capacity}</td>
                <td>₹{el.cost}</td>
                <td>{el.booked ? "Booked" : "Not Booked"}</td>
                <td>
                  <Button title="Click TO Edit Details" onClick={onOpen}>
                    {" "}
                    <img
                      style={{
                        height: "30px",
                        width: "30px",
                        cursor: "pointer"
                      }}
                      src="https://image.shutterstock.com/image-vector/edit-icon-260nw-711835882.jpg"
                      alt=""
                    />
                  </Button>

                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Edit Details </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Select
                          value={updatedCategory}
                          width="50%"
                          placeholder="Select New Category"
                          onChange={(e) => setupdatedCategory(e.target.value)}
                        >
                          <option value="family">Family</option>
                          <option value="deluxe">Deluxe</option>
                          <option value="Suite">Suite</option>
                        </Select>
                        <Input
                          value={updateImage}
                          width="50%"
                          type="url"
                          placeholder="New Room Image URL.."
                          onChange={(e) => setupdateImage(e.target.value)}
                        />
                        <label> New Room Type :</label> <br /> <br />
                        <Box
                          value={updatedRoom}
                          onChange={(e) => setupdatedRoom(e.target.value)}
                        >
                          <input type="radio" value="AC" name="room" />{" "}
                          <label>AC</label>
                          <input
                            type="radio"
                            value="None Ac"
                            name="room"
                          />{" "}
                          <label>None AC</label> <br /> <br />
                        </Box>
                        <Select
                          value={updatedBed}
                          width="50%"
                          placeholder="Select New Bed Type"
                          onChange={(e) => setUpdateded(e.target.value)}
                        >
                          <option value="Single">Single</option>
                          <option value="Double">Double</option>
                        </Select>
                        <Input
                          value={updatedPerson}
                          onChange={(e) => setUpdatedPerson(e.target.value)}
                          width="50%"
                          type="number"
                          placeholder=" New No Of Adults"
                        />
                        <Input
                          value={updatedCapacity}
                          type="number"
                          placeholder="New Max Capacity"
                          onChange={(e) => setUpdatedCapacity(e.target.value)}
                          width="50%"
                        />
                        <Input
                          value={updatedCost}
                          type="number"
                          placeholder="New Cost Of The Room"
                          onChange={(e) => setUpdatedCost(e.target.value)}
                          width="50%"
                        />
                      </ModalBody>

                      <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                          Close
                        </Button>
                        <Button
                          onClick={() => handleEdit(el.id)}
                          variant="ghost"
                        >
                          Update
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </td>
                <td>
                  <img
                    onClick={() => handleDelete(el.id)}
                    style={{ height: "30px", width: "30px", cursor: "pointer" }}
                    src="https://cdn-icons-png.flaticon.com/512/1799/1799391.png"
                    alt=""
                  />
                </td>
              </tr>
            ))}
        </table>
      </Box>
    </>
  );
}
