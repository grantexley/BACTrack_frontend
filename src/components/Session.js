import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { calculateBAC } from "../utils/bacCalculator";
import DrinkForm from "./DrinkForm";
import { Container, Card, Button, ListGroup } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";

export default function Session() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [customDrinks, setCustomDrinks] = useState([]);

  const refresh = useCallback(async () => {
    try {
      const res = await API.get(`/sessions/${id}`);
      setSession(res.data);
    } catch (err) {
      console.error("Error fetching session:", err);
    }
  }, [id]);

  const fetchCustomDrinks = useCallback(async () => {
    try {
      const res = await API.get("/customDrinks");
      setCustomDrinks(res.data);
    } catch (err) {
      console.error("Error fetching custom drinks:", err);
    }
  }, []);

  useEffect(() => {
    refresh();
    fetchCustomDrinks();
  }, [refresh, fetchCustomDrinks]);

  const handleAddDrink = async (drink) => {
    try {
      await API.put(`/sessions/${id}/drinks`, drink);
      await refresh();
    } catch (err) {
      console.error("Error adding drink:", err);
    }
  };

  const handleAddCustomDrink = async (drink) => {
    try {
      const res = await API.post("/customDrinks", drink);
      await handleAddDrink({ customDrink: res.data.id });
      fetchCustomDrinks();
    } catch (err) {
      console.error("Error adding custom drink:", err);
    }
  };

  const handleQuickAdd = async (drinkId) => {
    try {
      await handleAddDrink({ customDrink: drinkId });
    } catch (err) {
      console.error("Error in quick add:", err);
    }
  };

  const handleRemoveDrink = async (drinkId) => {
    try {
      await API.delete(`/sessions/${id}/drinks/${drinkId}`);
      refresh();
    } catch (err) {
      console.error("Error removing drink:", err);
    }
  };

  const navigate = useNavigate();

  const bac = session?.drinks ? calculateBAC(session.drinks) : 0;

  return (
    <Container className="mt-4">
      <Button
        variant="link"
        onClick={() => navigate("/home")}
        className="p-0 mb-2"
      >
        <ArrowLeft size={24} /> Back to Home
      </Button>
      <h2>Session</h2>
      <Card className="mb-3 p-3">
        <h4>Current BAC: {bac}</h4>
      </Card>

      <DrinkForm
        onAddDrink={handleAddDrink}
        onAddCustomDrink={handleAddCustomDrink}
      />

      <h5>Quick Add Custom Drinks</h5>
      <div className="mb-3 d-flex flex-wrap gap-2">
        {customDrinks.map((d) => (
          <Button key={d._id} onClick={() => handleQuickAdd(d._id)}>
            {d.name} ({d.volume}oz @ {d.alcoholContent}%)
          </Button>
        ))}
      </div>

      <h5>Drinks in Session</h5>
      <ListGroup>
        {session?.drinks?.map((d) => (
          <ListGroup.Item
            key={d._id || d.timestamp}
            className="d-flex justify-content-between"
          >
            {d.name} — {d.volume}oz @ {d.alcoholContent}% (
            {new Date(d.timestamp).toLocaleTimeString()})
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => handleRemoveDrink(d._id)}
            >
              X
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
