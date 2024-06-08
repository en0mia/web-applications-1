import { Container, Navbar, Button } from "react-bootstrap";

import PropTypes from "prop-types";

function NavigationBar(props) {
  return (
    <Navbar bg="light">
      <Container fluid>
        <Navbar.Brand>HeapOverrun {props.qtnnumber}</Navbar.Brand>
        <Button onClick={props.toggleLanguage}>{props.language}</Button>
      </Container>
    </Navbar>
  );
}

NavigationBar.propTypes = {
  qtnnumber: PropTypes.number.isRequired,
};

export default NavigationBar;
