import React, { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, ListGroup } from "react-bootstrap";

export default function Home() {
  const [sessions, setSessions] = useState([]);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchSessions = async () => {
    const res = await API.get("/sessions");
    setSessions(res.data);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleDelete = async (id) => {
    await API.delete(`/sessions/${id}`);
    fetchSessions();
  };

  const handleCreate = async () => {
    const res = await API.post("/sessions");
    navigate(`/session/${res.data.sessiodId}`);
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Your Sessions</h2>
        <Button onClick={logout}>Logout</Button>
      </div>
      <Button className="mb-3" onClick={handleCreate}>
        + New Session
      </Button>
      <ListGroup>
        {sessions.map((s) => (
          <ListGroup.Item
            key={s._id}
            className="d-flex justify-content-between align-items-center"
          >
            <span
              onClick={() => navigate(`/session/${s._id}`)}
              style={{ cursor: "pointer" }}
            >
              {s.createdAt}
            </span>
            <Button
              size="sm"
              variant="danger"
              onClick={() => handleDelete(s._id)}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
