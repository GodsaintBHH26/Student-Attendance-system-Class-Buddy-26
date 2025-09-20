import React, { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

function AccountCreation() {
  const [uname, setUname] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [uPassword, setUPassword] = useState("");
  const [classAssigned, setClassAssigned] = useState("");
  const [role, setRole] = useState("");
  const auth = useAuth();

  const handleCreation = async (e) => {
    e.preventDefault();

    try {
      await auth.createUser(uname, uniqueId, uPassword, classAssigned, role);
      toast.success("User Created");
    } catch (error) {
      toast.error(`Failed to create user account ${error.message}`);
    }
  };

  return (
    <>
      <div className="bg-white/60 w-full h-154 flex justify-center items-center">
        <div className="bg-white w-128 h-128 rounded-lg shadow-lg text-black p-5">
          <h1 className="font-semibold !text-4xl">Create new account</h1>
          <Box component="form" onSubmit={handleCreation} className="p-1">
            <FormControl className="flex flex-col gap-3 w-full justify-between !m-1">
              <TextField
                type="text"
                className=" !border-black border-2 rounded "
                fullWidth
                label="User Name"
                variant="outlined"
                value={uname}
                onChange={(e) => setUname(e.target.value)}
                required
              />

              <TextField
                type="text"
                className="p-1 !border-black border-2 rounded"
                fullWidth
                label="Unique ID"
                variant="outlined"
                onChange={(e) => setUniqueId(e.target.value)}
                value={uniqueId}
                required
              />

              <TextField
                type="password"
                className="p-1 !border-black border-2 rounded"
                fullWidth
                label="Password"
                variant="outlined"
                value={uPassword}
                onChange={(e) => setUPassword(e.target.value)}
                required
              />

              <label htmlFor="" className="text-2xl text-gray-600 ">
                Role
              </label>
              <Select
                name=""
                id=""
                className="border-2 border-black/40 rounded-lg h-9 w-36 p-1"
                value={role}
                required
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="">Select Role</MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>

              <TextField
                type="text"
                className="p-1 !border-black border-2 rounded"
                fullWidth
                label="Assigned Class"
                value={classAssigned}
                required
                onChange={(e) => setClassAssigned(e.target.value)}
                variant="outlined"
              />

              <Button className="!text-xl !py-1" type="submit">
                Submit
              </Button>
            </FormControl>
          </Box>
        </div>
      </div>
    </>
  );
}

export default AccountCreation;
