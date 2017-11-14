import React, { Component } from 'react';
import { Button, Container, Row, Col, InputGroup, InputGroupAddon, Input } from 'reactstrap';

/**
 * {
    "id": 1,
    "name": "Snapback Hat",
    "type": "Physical",
    "price": 20.99,
    "inventory": 12,
    "thumbnail": "http://frontend-trial-project.weebly.com/uploads/1/0/5/4/105462933/diamond-supply-co-brilliant-snapback-hat-224298.png"
  }
 */


export default class ListItem extends Component {
  render() {
    const { itemData, checkboxCallback } = this.props;
    const { id, name, type, price, inventory, thumbnail } = itemData;
    return (
      <Row style={styles.rowEntry}>
        <Col md={1}> <input type="checkbox" /> </Col>
        <Col md={1}> <img src={thumbnail} style={styles.itemThumbnail}/> </Col>
        <Col md={5} style={styles.itemNameColumn}> {name} </Col>
        <Col md={2}> {type} </Col>
        <Col md={1} style={styles.textAlignRightColumn}> ${price} </Col>
        <Col md={2} style={styles.textAlignRightColumn}> {inventory} </Col>
      </Row>
    );
  }
}

const styles = {
  rowEntry: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#E8E8E8',
    paddingBottom: 10,
    paddingTop: 10
  },
  itemNameColumn: {
    paddingLeft: 0
  },
  itemThumbnail: {
    border: '1px solid #DCDCDC'
  },
  textAlignRightColumn: {
    textAlign: 'right'
  }
}
