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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
export default function EditWarehouses({ title }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [state, setState] = useState(true);

  const navigate = useNavigate();
  const setData = () => {
    setName(JSON.parse(localStorage.getItem("editWarehouse")).name);
    setType(JSON.parse(localStorage.getItem("editWarehouse")).type);
    setState(JSON.parse(localStorage.getItem("editWarehouse")).state);
  };
  const changeBrand = (event) => {
    setState(event.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("editWarehouse")) {
      setData();
    }
  }, []);
  const handleClick = async (e) => {
    e.preventDefault();

    const warehouse = {
      name: name ? name : undefined,
      type: type ? type : undefined,
      state: state !== undefined ? state : true,
    };

    try {
      const id = JSON.parse(localStorage.getItem("editWarehouse"))._id;
      await axios.put(`/warehouses/${id}`, warehouse);
      navigate("/warehouses");
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
                    Th??ng tin v???t li???u
                  </Typography>

                  <TextField
                    id="outlined-username"
                    label="T??n v???t li???u"
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <TextField
                    id="outlined-phone"
                    label="Lo???i"
                    variant="outlined"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />

                  <FormControl sx={{ m: 1, width: "50ch" }}>
                    <InputLabel id="demo-simple-select-label">
                      T??nh tr???ng
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={state}
                      label="T??nh tr???ng"
                      onChange={changeBrand}
                    >
                      <MenuItem value={true}>??ang ho???t ?????ng</MenuItem>
                      <MenuItem value={false}>T???m ng??ng</MenuItem>
                    </Select>
                  </FormControl>
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
