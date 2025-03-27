import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function DrinkForm({ onAddDrink, onAddCustomDrink }) {
  const [name, setName] = useState("");
  const [volume, setVolume] = useState("");
  const [alcoholContent, setAlcoholContent] = useState("");

  const handleSubmit = (e, asCustom) => {
    e.preventDefault();
    const drink = {
      name,
      volume: Number(volume),
      alcoholContent: Number(alcoholContent),
    };
    if (asCustom) onAddCustomDrink(drink);
    else onAddDrink(drink);
    setName("");
    setVolume("");
    setAlcoholContent("");
  };

  return (
    <Form className="mb-3">
      <Row>
        <Col>
          <Form.Control
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Volume (ml)"
            type="number"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="% Alcohol"
            type="number"
            value={alcoholContent}
            onChange={(e) => setAlcoholContent(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <Button onClick={(e) => handleSubmit(e, false)}>Add Drink</Button>
        </Col>
        <Col>
          <Button onClick={(e) => handleSubmit(e, true)} variant="secondary">
            Save as Custom
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
