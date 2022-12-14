import React, { useState, useRef, useEffect } from "react";
import "./new.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const New = ({ title }) => {
  const username = useRef();
  const country = useRef();
  const phone = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const [role, setRole] = useState(0);
  const [x, setX] = useState([]);
  localStorage.setItem("editRole", JSON.stringify(x));

  const [y, setY] = useState([]);
  const [managerId, setManagerId] = useState("");
  const changeRole = (event) => {
    setRole(event.target.value);
  };
  const changeManagerId = (event) => {
    setManagerId(event.target.value);
  };

  useEffect(() => {
    const Warehouse = async () => {
      const dataWarehouse = await axios.get("/warehouses/");
      setX(dataWarehouse.data);
    };
    const Factory = async () => {
      const dataFactory = await axios.get("/factories/");
      setY(dataFactory.data);
    };
    Warehouse();
    Factory();
    console.log(role);
  }, [role]);
  const WarehouseList = () => {
    return x.map((i) => <MenuItem value={i._id}>{i.name}</MenuItem>);
  };

  const FatoryList = () => {
    console.log(y);
    return y.map((i) => <MenuItem value={i._id}>{i.name}</MenuItem>);
  };
  const navigate = useNavigate();
  const [values, setValues] = useState({ password: "", showPassword: false });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("M???t kh???u kh??ng kh???p");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        country: country.current.value,
        phone: phone.current.value,
        role: role ? role : [],
      };
      try {
        await axios.post(`/auth/register`, user);
        navigate("/users");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1 style={{ color: "black", fontSize: "20px" }}>{title}</h1>
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
            >
              <div>
                <div>
                  <Typography variant="p" component="h2">
                    Th??ng tin c?? nh??n
                  </Typography>

                  <TextField
                    required
                    id="outlined-username"
                    label="T??n nh??n vi??n"
                    inputRef={username}
                  />
                  <TextField
                    required
                    id="outlined-phone"
                    label="S??? ??i???n tho???i"
                    inputRef={phone}
                  />
                  <TextField
                    required
                    id="outlined-country"
                    label="?????a ch???"
                    inputRef={country}
                  />

                  <TextField
                    required
                    id="outlined-email"
                    label="Email"
                    inputRef={email}
                  />
                </div>
                <FormControl sx={{ m: 1, width: "50ch" }}>
                  <InputLabel id="demo-simple-select-label">
                    Ph??n quy???n
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Ph??n quy???n"
                    onChange={changeRole}
                  >
                    <MenuItem value={1}>Nh??n vi??n</MenuItem>
                    <MenuItem value={2}>Qu???n l?? t???t c??? c??c kho</MenuItem>
                    <MenuItem value={3}>Ch??? ?????nh kho</MenuItem>
                    <MenuItem value={4}>Qu???n l?? t???t c??? ph??n x?????ng</MenuItem>
                    <MenuItem value={5}>Ch??? ?????nh ph??n x?????ng </MenuItem>
                  </Select>
                </FormControl>
                {(role == 3 || role == 5) && (
                  <FormControl sx={{ m: 1, width: "50ch" }}>
                    <InputLabel id="demo-simple-select-label">
                      Ph??n quy???n
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={managerId}
                      label="Ph??n quy???n"
                      onChange={changeManagerId}
                    >
                      {role === 3 && WarehouseList()}
                      {role === 5 && FatoryList()}
                    </Select>
                  </FormControl>
                )}
                <Typography variant="p" component="h2" sx={{ mt: 2 }}>
                  B???o m???t
                </Typography>
                <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" required>
                    M???t kh???u
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    inputRef={password}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-confirm-password" required>
                    X??c nh???n m???t kh???u
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-confirm-password"
                    type={values.showPasswords ? "text" : "password"}
                    value={values.passwords}
                    onChange={handleChange("passwords")}
                    inputRef={confirmPassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPasswords ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                </FormControl>
              </div>
              <Button variant="contained" color="success" type="submit">
                ?????ng ??
              </Button>

              <Button variant="contained">?????t l???i</Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
