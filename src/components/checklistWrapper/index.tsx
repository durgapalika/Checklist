import Footer from "../footer";
import Header from "../header";
import Items from "../items";
import { Container } from "./components";

const ChecklistWrapper = () => {
  return (
    <Container>
      <Header />
      <Items />
      <Footer />
    </Container>
  );
};

export default ChecklistWrapper;
