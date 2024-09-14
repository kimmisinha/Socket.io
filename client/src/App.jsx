import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Container, Typography, TextField, Button } from "@mui/material";
const socket = io("http://localhost:3001");
const App = () => {
 
  // console.log("socket",socket)

  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
    socket.on("Welcome", (s) => console.log(s));
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" component="div" gutterBottom>
        Welcome to Socket.io
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="filled-basic"
          label="Message"
          variant="filled"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained">
          Send
        </Button>
      </form>
    </Container>
  );
};

export default App;
