import React, { Component } from 'react';
import { Button, Container, Row, Col} from 'reactstrap';

export default class TopBar extends Component {
  render() {
    return (
      <Container style={styles}>
            <Row>
              <Col md={8} > Products </Col>
              <Col md={4} className="flexContainer"> 
                <Button>Export</Button> 
                <Button>Import</Button>
                <Button color="primary">Add Product</Button>
              </Col>
            </Row>
        </Container>
    );
  }
}

const styles = {
  fontSize: 20
};
