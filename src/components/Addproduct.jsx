import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";

/* ================================
   AXIOS INSTANCE (RENDER API)
================================ */
const API = axios.create({
  baseURL: "https://deploy-1-3xpw.onrender.com",
});

function AddProduct() {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState("");
  const [updateID, setUpdateID] = useState(null);

  const [formData, setFormData] = useState({
    image: "",
    price: "",
    title: "",
  });

  /* ================================
     FETCH PRODUCTS
  ================================ */
  const fetchData = () => {
    API.get("/product")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log("Fetch Error:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================================
     ADD PRODUCT
  ================================ */
  const handleSubmit = (e) => {
    e.preventDefault();

    API.post("/product", formData)
      .then(() => {
        alert("Product added successfully!");
        setFormData({ image: "", price: "", title: "" });
        fetchData();
      })
      .catch((err) => console.log("Add Error:", err));
  };

  /* ================================
     EDIT PRODUCT
  ================================ */
  const handleEdit = (id, oldPrice) => {
    setUpdateID(id);
    setPrice(oldPrice);
  };

  const handleUpdate = () => {
    API.patch(`/product/${updateID}`, { price })
      .then(() => {
        fetchData();
        setUpdateID(null);
        setPrice("");
      })
      .catch((err) => console.log("Update Error:", err));
  };

  /* ================================
     DELETE PRODUCT
  ================================ */
  const handleDelete = (id) => {
    API.delete(`/product/${id}`)
      .then(() => fetchData())
      .catch((err) => console.log("Delete Error:", err));
  };

  /* ================================
     FORM INPUT CHANGE
  ================================ */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* ================= ADD PRODUCT ================= */}
      <Container className="my-5">
        <Card className="p-4 mx-auto" style={{ maxWidth: "500px" }}>
          <Card.Title className="text-center mb-4">
            Add New Product
          </Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                placeholder="Enter image URL"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Card>
      </Container>

      {/* ================= UPDATE PRICE ================= */}
      <Container className="my-5">
        <div className="mb-5 p-4 border rounded">
          <h2>Edit Product Price</h2>

          <Form.Group className="d-flex">
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter new price"
              disabled={!updateID}
              className="me-2"
            />
            <Button onClick={handleUpdate} disabled={!updateID}>
              Update
            </Button>
          </Form.Group>

          {!updateID && (
            <p className="mt-2 text-muted">
              Click Edit on a product to update price
            </p>
          )}
        </div>

        {/* ================= PRODUCT LIST ================= */}
        <h1 className="mb-4">Products</h1>

        <Row xs={1} md={2} lg={3} className="g-4">
          {products.map((item) => (
            <Col key={item.id}>
              <Card className="h-100 shadow-sm">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "200px", overflow: "hidden" }}
                >
                  <Card.Img
                    src={item.image}
                    style={{
                      width: "auto",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>

                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-truncate">
                    {item.title}
                  </Card.Title>

                  <Card.Text className="fw-bold text-muted">
                    ₹{item.price}
                  </Card.Text>

                  <div className="mt-auto d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      onClick={() => handleEdit(item.id, item.price)}
                      className="w-50"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(item.id)}
                      className="w-50"
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default AddProduct;
