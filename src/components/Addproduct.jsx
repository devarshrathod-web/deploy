
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';

function AddProduct() {
     const [value, setValue] = useState([]);
    const [price, setPrice] = useState(0);
    const [updateID, setUpdateID] = useState(null);

    function fetchdata() {
        axios.get('http://localhost:3000/product')
            .then((res) => setValue(res.data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        fetchdata();
    }, []);

    function handleEdit(id, price) {
        setUpdateID(id);
        setPrice(price);
        console.log(id, price);
    }

    function handleUpdate() {
        axios.patch(`http://localhost:3000/product/${updateID}`, { price })
            .then((res) => {
                fetchdata();
                setPrice(0);
                setUpdateID(null);
                console.log(res);
            })
            .catch((err) => console.log(err));
    }

    function handleDelete(id) {
        axios.delete(`http://localhost:3000/product/${id}`)
            .then((res) => {
                fetchdata();
                console.log(res);
            })
            .catch((err) => console.log(err));
    }
    const [count,setCount]=useState({
         image :"",
         price :"",
         title :""
    })
    
    function Handlesubmit(e){
      e.preventDefault()

      axios.post('http://localhost:3000/product', count)
      .then((res)=>{
        alert("Product added successfully!")
        console.log(res)
        setCount({
          image: "",
          price: "",
          title: ""
        });
      })
      .catch((err)=>console.log(err))
    }

    function OnChange(e){
      setCount({...count,[e.target.name]:e.target.value}) 
    }
  
  
  return (
    <>
    <Container className="my-5">
      <Card className="p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <Card.Title className="text-center mb-4">Add New Product</Card.Title>
        <Form onSubmit={Handlesubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control 
              type="text" 
              name="image" 
              placeholder='Enter image URL' 
              onChange={OnChange} 
              value={count.image}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type="number" 
              name="price"  
              placeholder='Price' 
              onChange={OnChange} 
              value={count.price}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              type="text" 
              name="title" 
              placeholder='Description' 
              onChange={OnChange} 
              value={count.title}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
     <Container className="my-5">
            <div className="mb-5 p-4 border rounded">
                <h2 className="mb-3">Edit Product Price</h2>
                <Form.Group className="d-flex align-items-center">
                    <Form.Control
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter new price"
                        className="me-2"
                        disabled={!updateID}
                    />
                    <Button onClick={handleUpdate} disabled={!updateID}>Update</Button>
                </Form.Group>
                {!updateID && <p className="mt-2 text-muted">Select a product card to edit its price.</p>}
            </div>

            <h1 className="mb-4">Products</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {value.map((el) => (
                    <Col key={el.id}>
                        <Card className="h-100 shadow-sm">
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px', overflow: 'hidden' }}>
                                <Card.Img variant="top" src={el.image} style={{ width: 'auto', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="text-truncate">{el.title}</Card.Title>
                                <Card.Text className="mb-2 text-muted fw-bold">${el.price}</Card.Text>
                                <Card.Text className="flex-grow-1">
                                  {el.description?.substring(0, 70)}...
                                </Card.Text>
                                <div className="mt-auto d-flex justify-content-between">
                                    <Button variant="outline-primary" onClick={() => handleEdit(el.id, el.price)} className="w-50 me-2">Edit</Button>
                                    <Button variant="outline-danger" onClick={() => handleDelete(el.id)} className="w-50">Delete</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        </>
  )
}

export default AddProduct