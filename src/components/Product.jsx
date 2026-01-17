import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const limit = 6;

  const fetchData = () => {
    setLoading(true);
    axios
      .get("https://deploy-1-3xpw.onrender.com/product")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(products.length / limit);
  const start = (page - 1) * limit;
  const currentData = products.slice(start, start + limit);

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4 fw-bold">✨ Our Products ✨</h1>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {currentData.map((el) => (
            <Col key={el.id}>
              <Card className="h-100 shadow-sm border-0 rounded-4">
                <div
                  className="d-flex justify-content-center align-items-center bg-light"
                  style={{ height: "220px", overflow: "hidden" }}
                >
                  <Card.Img
                    src={el.image || "https://via.placeholder.com/300"}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300";
                    }}
                    style={{
                      width: "auto",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>

                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-truncate fw-semibold">
                    {el.title}
                  </Card.Title>

                  <Card.Text className="mb-2 text-primary fw-bold">
                    ₹{el.price}
                  </Card.Text>

                  <Card.Text className="flex-grow-1 text-muted">
                    {el.description
                      ? el.description.substring(0, 80) + "..."
                      : "No description available"}
                  </Card.Text>

                  <div className="mt-auto d-flex gap-2">
                    <Button variant="outline-success" size="sm" className="w-100">
                      View Details
                    </Button>
                    <Button variant="outline-danger" size="sm" className="w-100">
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* ================= PAGINATION ================= */}
      <div className="d-flex justify-content-between mt-4">
        <Button
          variant="secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ⬅ Prev
        </Button>

        <span className="align-self-center">
          Page {page} of {totalPages}
        </span>

        <Button
          variant="secondary"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next ➡
        </Button>
      </div>
    </Container>
  );
}

export default Product;
