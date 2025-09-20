import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box, FormControl } from "@mui/material";

function Login() {
  const auth = useAuth();
  const [uniqueId, setUniqueId] = useState("");
  const [uPassword, setUPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await auth.userLogin(uniqueId, uPassword);
      toast.success("✅ Login successful!");
      console.log("Login success ✅");
    } catch (error) {
      console.log("❌ Login failed", error.message);
      toast.error("There was an error ‼️");
    }
  };

  return (
    <>
      <div className="bg-white/70 w-screen h-154 flex justify-center items-center">
        <div className="bg-indigo-100 w-128 min-h-96 rounded-lg shadow-lg text-black flex flex-col gap-5">
          <div className="text-center p-5">
            <h1 className="text-3xl font-bold">Login</h1>
            <p>Use the credentials given by the institution.</p>
          </div>

          <Box component="form" onSubmit={handleLogin} className="">
            <FormControl className=" flex flex-col gap-5 !p-5 w-full">
              <TextField
                type="text"
                label="Unique ID"
                required
                value={uniqueId}
                onChange={(e) => setUniqueId(e.target.value)}
                className="border-2 rounded !focus:border-indigo-700 p-1 !font-semibold"
              />

              <TextField
                type="password"
                required
                label="Password"
                onChange={(e) => setUPassword(e.target.value)}
                value={uPassword}
                className="border-2 rounded !focus:border-indigo-700 p-1 !font-semibold"
              />

              <Button type="submit" className="!text-2xl !font-bold !p-2">
                Submit
              </Button>
            </FormControl>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Login;
