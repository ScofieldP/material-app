import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Edit.scss";

export default function EditSupplier({ title }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const setData = () => {
    setAddress(JSON.parse(localStorage.getItem("editSupplier")).address);
    setPhone(JSON.parse(localStorage.getItem("editSupplier")).phone);
    setName(JSON.parse(localStorage.getItem("editSupplier")).name);
    setEmail(JSON.parse(localStorage.getItem("editSupplier")).email);
  };
  useEffect(() => {
    if (localStorage.getItem("editSupplier")) {
      setData();
    }
  }, []);
  const handleClick = async (e) => {
    e.preventDefault();

    const supplier = {
      name: name ? name : undefined,
      email: email ? email : undefined,
      address: address ? address : undefined,
      phone: phone ? phone : undefined,
    };

    try {
      const id = JSON.parse(localStorage.getItem("editSupplier"))._id;
      await axios.put(`/suppliers/${id}`, supplier);
      navigate("/suppliers");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="edit">
      <Sidebar />
      <div className="editContainer">
        <Navbar />
        <div className="top">
          <h1 style={{ color: "black" }}>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "50ch" },
              }}
              autoComplete="off"
              onSubmit={handleClick}
              noValidate
            >
              <div>
                <div>
                  <Typography variant="p" component="h2">
                    Th??ng tin nh?? cung c???p
                  </Typography>

                  <TextField
                    id="outlined-username"
                    label="T??n v???t li???u"
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <TextField
                    required
                    id="outlined-phone"
                    label="S??? ??i???n tho???i"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />
                  <TextField
                    required
                    id="outlined-address"
                    label="?????a ch???"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />

                  <TextField
                    required
                    id="outlined-email"
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
              </div>
              <Button variant="contained" color="success" type="submit">
                ?????ng ??
              </Button>
              <Button variant="contained" onClick={setData}>
                ?????t l???i
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
