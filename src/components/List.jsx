import React, { Component } from 'react';
import { Container, Row, Col, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import ListItem from './ListItem';
import '../styles/List.css';

/*
List will take the product data and create instances of ProductItem components
List will have search to filter through the product data
List will have SortBar
List will set number of items visible
*/

export default class List extends Component {

  createListItems = itemDataList => itemDataList.map(itemData => (<ListItem itemData={itemData} />));

  // TODO: fix styling on input field on focus
  // TODO: Expand search box on focus
  render() {

    return (
      <Container>
        <Row style={styles.searchRow}>
          <Col md={3}>
            <div style={styles.searchContainer} >
              <Col md={1} > <i className="fa fa-search" aria-hidden="true"></i></Col>
              <Col ><input type="text" placeholder="Search..." style={styles.searchField} /></Col>
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
        { this.createListItems(mockDataList) }
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

const mockDataList = [
  {
    "id": 1,
    "name": "Snapback Hat",
    "type": "Physical",
    "price": 20.99,
    "inventory": 12,
    "thumbnail": "http://frontend-trial-project.weebly.com/uploads/1/0/5/4/105462933/diamond-supply-co-brilliant-snapback-hat-224298.png"
  },
  {
    "id": 2,
    "name": "Maxi Dress - Floral",
    "type": "Physical",
    "price": 40,
    "inventory": 24,
    "thumbnail": "http://frontend-trial-project.weebly.com/uploads/1/0/5/4/105462933/27890e0eddd8e800fc2c8fc1c434744d.png"
  },
  {
    "id": 3,
    "name": "Maxi Dress - Vibrant",
    "type": "Physical",
    "price": 40,
    "inventory": 17,
    "thumbnail": "http://frontend-trial-project.weebly.com/uploads/1/0/5/4/105462933/27890e0eddd8e800fc2c8fc1c434744d.png"
  },
  {
    "id": 4,
    "name": "High Waist Jeans",
    "type": "Physical",
    "price": 45.99,
    "inventory": 9,
    "thumbnail": "http://frontend-trial-project.weebly.com/uploads/1/0/5/4/105462933/super-high-waisted-jeans-google-search-iozlcm0zk5j.png"
  },
  {
    "id": 5,
    "name": "Grey Silk Blouse",
    "type": "Physical",
    "price": 35,
    "inventory": 33,
    "thumbnail": "http://frontend-trial-project.weebly.com/uploads/1/0/5/4/105462933/6646dc1ab684f84f67a60dab5ebcb7d7.png"
  },
  {
    "id": 6,
    "name": "White Silk Blouse",
    "type": "Physical",
    "price": 35,
    "inventory": 48,
    "thumbnail": "http://frontend-trial-project.weebly.com/uploads/1/0/5/4/105462933/url.png"
  },
  {
    "id": 7,
    "name": "Ribbed V-Neck Sweater",
    "type": "Physical",
    "price": 52.5,
    "inventory": 8,
    "thumbnail": "http://frontend-trial-project.weebly.com/uploads/1/0/5/4/105462933/11718685.png"
  },
  {
    "id": 8,
    "name": "Ribbed Crew Neck Sweater",
    "type": "Physical",
    "price": 52.5,
    "inventory": 9,
    "thumbnail": "http://frontend-trial-project.weebly.com/uploads/1/0/5/4/105462933/goods-185120-sub3.png"
  },
  {
    "id": 9,
    "name": "Boat Neck Tee",
    "type": "Physical",
    "price": 25.8,
    "inventory": 53,
    "thumbnail": "http://frontend-trial-project.weebly.com/uploads/1/0/5/4/105462933/imageservice.png"
  },
  {
    "id": 10,
    "name": "Striped Crew Neck Tee",
    "type": "Physical",
    "price": 27.15,
    "inventory": 41,
    "thumbnail": "http://frontend-trial-project.weebly.com/uploads/1/0/5/4/105462933/img-thing.png"
  },
  {
    "id": 11,
    "name": "Floral Striped Button Down Shirt",
    "type": "Physical",
    "price": 50.99,
    "inventory": 16,
    "thumbnail": "http://frontend-trial-project.weebly.com/uploads/1/0/5/4/105462933/img-thing.png"
  },
  {
    "id": 12,
    "name": "Denim Jacket",
    "type": "Physical",
    "price": 80.8,
    "inventory": 4,
    "thumbnail": "http://frontend-trial-project.weebly.com/uploads/1/0/5/4/105462933/11708126.png"
  }
];