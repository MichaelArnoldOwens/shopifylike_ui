import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class SortBar extends Component {
  constructor(props) {
    super(props);
    // 0 - no sort applied, 1 - ascending , 2 - descending
    this.state = {
      name: 0,
      type: 0,
      price: 0,
      inventory: 0
    }
  }

  alphabeticalSort = (a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }

  reverseAlphabeticalSort = (a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
    return 0;
  }

  sortByName = () => {
    // case insensitive sort
    const { name } = this.state;
    const { list, sortCallback } = this.props;
    switch (name) {
      case 0:
        sortCallback(list.slice().sort(this.alphabeticalSort));
        this.setState({
          name: 1,
          type: 0,
          price: 0,
          inventory: 0
        })
        break;
      case 1:
        sortCallback(list.slice().sort(this.reverseAlphabeticalSort));
        this.setState({
          name: 2,
          type: 0,
          price: 0,
          inventory: 0
        });
        break;
      case 2:
        sortCallback(list);
        this.setState({
          name: 0,
          type: 0,
          price: 0,
          inventory: 0
        });
        break;
    }
  }

  render() {
    const { textAlignRightColumn } = styles;
    return (
      <Container>
        <Row>
          <Col md={1} style={styles.sortBarCheckbox} >
            <input type="checkbox" />
          </Col>
          <Col md={6}> Name <button onClick={this.sortByName}><i class="fa fa-angle-down" aria-hidden="true"></i></button> </Col>
          <Col md={2} onClick={this.sortByName}> Type </Col>
          <Col md={1} style={textAlignRightColumn}> Price </Col>
          <Col md={2} style={textAlignRightColumn}> Inventory </Col>
        </Row>
      </Container>
    )
  }
}

const styles = {
  textAlignRightColumn: {
    textAlign: 'right'
  },
  sortBarCheckbox: {
    textAlign: 'right'
  }
}


// apply search then filters
