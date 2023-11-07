import Container from "react-bootstrap/Container";
import Header from "../../components/Header";

function HeaderOnly({ children }) {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
}

export default HeaderOnly;
