import React, { Component } from 'react';
import { Button, Container, Row, Col} from 'reactstrap';

export default class TopBar extends Component {
  render() {
    return (
      <Container style={styles.container}>
            <Row>
              <Col md={7} > Products </Col>
              <Col md={4} className="flexContainer"> 
                <Col md={4}> <Button style={styles.smallButton} >Export</Button> </Col>
                <Col md={4}> <Button style={styles.smallButton} >Import</Button> </Col>
                <Col md={4}> <Button color="primary" style={styles.addProductButton}>Add Product</Button> </Col>
              </Col>
            </Row>
        </Container>
    );
  }
}

const styles = {
  container: {
    fontSize: 25,
    marginBottom: 30,
    marginTop: 10  
  },
  smallButton: {
    width: 100,
    height: 50,
    fontSize: 17,
    backgroundColor: 'white',
    color: 'black'
  },
  addProductButton: {
    width: 200,
    height: 50,
    fontSize: 17
  }
};
