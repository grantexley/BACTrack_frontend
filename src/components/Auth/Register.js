import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API, { setAuthToken } from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import { Button, Form, Container, Card } from "react-bootstrap";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", { username, password });
      const res = await API.post("/login", { username, password });
      console.log(res);
      setAuthToken(res.data.token);
      login(res.data.token, username);
      navigate("/home");
    } catch (err) {
      alert("Registration failed: " + err.response?.data || "Unknown error");
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4" style={{ width: "100%", maxWidth: 400 }}>
        <h3>Register</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
