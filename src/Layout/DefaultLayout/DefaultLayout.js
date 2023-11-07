import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col sm={2}>
            <Sidebar />
          </Col>
          <Col sm={10}>{children}</Col>
        </Row>
      </Container>
    </>
  );
}

export default DefaultLayout;
