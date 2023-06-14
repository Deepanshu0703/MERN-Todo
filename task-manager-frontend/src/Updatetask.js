import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const Update = ({ taskId, handleCloseModal }) => {
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleUpdate = () => {
    // Implement your update logic here
    axios.patch(`http://localhost:5000/api/tasks/${taskId}`, {
      title: heading,
      description,
      status
    })
      .then((response) => {
        console.log('Task updated successfully', response.data);
      })
      .catch((error) => {
        console.error('Error updating task', error);
      });



    handleCloseModal(); // Close the modal after update
  };

  return (
    <div>
      <h3>Update Task</h3>
      <Form>
        <Form.Group controlId="formHeading">
          <Form.Label>Heading</Form.Label>
          <Form.Control
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Button variant="primary" onClick={handleUpdate}>
        Update
      </Button>
    </div>
  );
};

export default Update;
