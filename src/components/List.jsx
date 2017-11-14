import React, { Component } from 'react';
import { Container, Row, Col, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import ListItem from './ListItem';
import '../styles/List.css';

/*
List will take the product data and create instances of ProductItem components
List will have search to filter through the product data
List will have SortBar
*/

export default class List extends Component {

  // TODO: fix styling on input field on focus
  // TODO: Expand search box on focus
  render() {
    return (
      <Container>
        <Row style={styles.searchRow}>
          <Col md={3}>
            <div style={styles.searchContainer} >
              <Col md={1} > <i className="fa fa-search" aria-hidden="true"></i></Col>
              <Col ><input type="text" placeholder="Search..." style={styles.searchField}/></Col>
            </div>
          </Col>
        </Row>
        <Row style={styles.filterBar}>
          <Col md={1} style={styles.filterBarCheckbox} >
            <input type="checkbox" />
          </Col>
          <Col md={6}> Name </Col>
          <Col md={2}> Type </Col>
          <Col md={1} style={styles.textAlignRightColumn}> Price </Col>
          <Col md={2} style={styles.textAlignRightColumn}> Inventory </Col>
        </Row>
        <ListItem itemData={mockData} />
        <ListItem itemData={mockData} />
        <ListItem itemData={mockData} />
        <ListItem itemData={mockData} />
        <ListItem itemData={mockData} />
        <ListItem itemData={mockData} />
        <ListItem itemData={mockData} />
        <ListItem itemData={mockData} />
        <ListItem itemData={mockData} />
        <ListItem itemData={mockData} />
      </Container>
    );
  }
}

const styles = {
  searchRow: {
    backgroundColor: 'white',
    marginBottom: 20
  },
  searchContainer: {
    border: '1px solid #DCDCDC',
    borderRadius: 3,
    // paddingLeft: 15
  },
  searchField: {
    border: 0,
    marginLeft: 10
  },
  textAlignRightColumn: {
    textAlign: 'right'
  },
  filterBar: {
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#E8E8E8',
    paddingBottom: 10
  },
  filterBarCheckbox: {
    textAlign: 'right'
  }
}

const mockData = {
  "id": 1,
  "name": "Snapback Hat",
  "type": "Physical",
  "price": 20.99,
  "inventory": 12,
  "thumbnail": "http://frontend-trial-project.weebly.com/uploads/1/0/5/4/105462933/diamond-supply-co-brilliant-snapback-hat-224298.png"
};
