import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

/**
 * Selected = edit mode
 */
export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected ? true : false
    }

  }
  render() {
    const { itemData, checkboxCallback } = this.props;
    const { id, name, type, price, inventory, thumbnail } = itemData;
    const { selected } = this.state;
    const { selectedRowEntry, rowEntry, itemCheckbox, itemThumbnail, itemNameColumn, textAlignRightColumn, zeroInventory } = styles;
    const rowStyle = selected ? styles.selectedRowEntry : styles.rowEntry;

    let inventoryStyles = {};
    inventoryStyles = inventory > 0 ? textAlignRightColumn : Object.assign(inventoryStyles, textAlignRightColumn, zeroInventory);

    // TODO: add trailing zero to price when needed
    return (
      <Row key={id} style={rowStyle}>
        <Col md={1} style={itemCheckbox}> <input type="checkbox" /> </Col>
        <Col md={1}> <img src={thumbnail} style={itemThumbnail}/> </Col>
        <Col md={5} style={itemNameColumn}> {name} </Col>
        <Col md={2}> {type} </Col>
        <Col md={1} style={textAlignRightColumn}> ${price} </Col>
        <Col md={2} style={inventoryStyles}> {inventory} </Col>
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
  selectedRowEntry: {
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#E8E8E8',
    paddingBottom: 10,
    paddingTop: 10
  },
  itemCheckbox: {
    textAlign: 'right'
  },
  itemNameColumn: {
    paddingLeft: 0,
    paddingTop: 5
  },
  itemThumbnail: {
    border: '1px solid #DCDCDC'
  },
  textAlignRightColumn: {
    textAlign: 'right'
  },
  zeroInventory: {
    color: 'red'
  }
}
