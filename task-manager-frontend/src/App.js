// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Update from './Updatetask';
import CreateTask from './CreateTask';
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Navbar, Nav,Card, Button,Row,Col,Modal } from 'react-bootstrap';

  const TaskList = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:5000/api/tasks')
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.error('Error fetching tasks', error);
        });
    }, [tasks]);
  
    const handleDelete = (taskId) => {
      axios.delete(`http://localhost:5000/api/tasks/${taskId}`)
        .then((response) => {
          console.log('Task deleted successfully', response.data);
          setTasks(tasks.filter((task) => task._id !== taskId));
        })
        .catch((error) => {
          console.error('Error deleting task', error);
        });
    };
  
    return (
      <div>
        <h2>Task List</h2>
        <Row>
        {tasks.map((task) => (
      
        <Col md={4 } key={task._id}>
          <Card className="my-card">
            <Card.Body>
              <Card.Title>{task.title}</Card.Title>
              <Card.Text>
                {task.description}
              </Card.Text>
              <Card.Text>Status: {task.status}</Card.Text>
              <Button variant="primary" onClick={handleOpenModal}>
        Edit Task
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Update taskId={task._id} handleCloseModal={handleCloseModal} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
              <Button variant="danger" onClick={() => handleDelete(task._id)}>Delete</Button>
            </Card.Body>
          </Card>
        </Col>
            
          
        ))}
        </Row>
      </div>
    );
  };


const App = () => {
  return (
    <Router>
      <div>
      <Navbar bg="dark" variant="dark" className="justify-content-between" style={{paddingLeft: "10px", paddingRight: "10px"}}>
      <Link to="/" style={{color: "white" ,textDecoration:"none", fontSize: "20px"}}>
        Task Manager
      </Link>
      <Nav>
        <Link to="/create" style={{color: "white" ,textDecoration:"none", marginRight: "10px"}}>
          Create Task
        </Link>
        <Link to="/"  style={{color: "white" ,textDecoration:"none", marginRight: "10px"}}>
          Task List
        </Link>
      </Nav>
    </Navbar>

        <Routes>
          <Route exact path="/" element={<TaskList />}>
          </Route>
          <Route path="/create" element={<CreateTask />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
