import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import '../styles/ListItem.css';

/**
 * Selected = edit mode
 * only state is for temporary edit
 */
export default class ListItem extends Component {
  constructor(props) {
    super(props);
    const { itemData } = this.props;
    const { name, type, price, inventory } = itemData;
    const selected = false;
    this.state = {
      name,
      type,
      price,
      inventory
    };
  }

  handleCheckbox = event => {
    const { selected, checkboxCallback, itemData } = this.props;
    checkboxCallback(!selected, itemData.id);
  }

  handleEdit = event => {
    // TODO:
    // send post request to update the entry
    // trigger callback to update the parent list
    const { name, value } = event.target;
    if(value === '') {
      event.preventDefault()
    } else {
      let newState = {};
      newState[name] = value;
      this.setState(newState);
    }
  }

  render() {
    const { selected, itemData } = this.props;
    const { thumbnail } = itemData;
    const { name, type, price, inventory } = this.state;
    const { selectedRowEntry, rowEntry, itemThumbnail, itemNameColumn, textAlignRightColumn, zeroInventory, editModePrice, editModeInventory } = styles;
    const rowStyle = selected ? selectedRowEntry : rowEntry;
    let inventoryStyles = {};
    inventoryStyles = inventory > 0 ? textAlignRightColumn : Object.assign(inventoryStyles, textAlignRightColumn, zeroInventory);

    console.log('selected: ', selected);
    
    // TODO: add trailing zero to price when needed
    // Edit mode
    if (selected) {
      return (
        <Row key={itemData.id} style={rowStyle}>
          <Col md={1} style={textAlignRightColumn}> <input type="checkbox" onChange={this.handleCheckbox} checked={selected} /> </Col>
          <Col md={1}> <img src={thumbnail} style={itemThumbnail} /> </Col>
          <Col md={5} style={itemNameColumn}> <input type="text" value={name} onChange={this.handleEdit} name="name" /> </Col>
          <Col md={2}>
            <select name="type" onChange={this.handleEdit} defaultValue={type}>
              <option value={type}>{type}</option>
              <option value='meta physical'>metaphysical</option>
              <option value='super physical'>super physical</option>
            </select>
          </Col>
          <Col md={1} style={textAlignRightColumn}> <input style={editModePrice} type="number" value={price} onChange={this.handleEdit} name="price" /> </Col>
          <Col md={2} style={inventoryStyles}> <input style={editModeInventory} type="number" value={inventory} onChange={this.handleEdit} name="inventory" /> </Col>
        </Row>
      );
    }
    // Read mode
    return (
      <Row style={rowStyle}>
        <Col md={1} style={textAlignRightColumn}> <input type="checkbox" onChange={this.handleCheckbox} checked={selected} /> </Col>
        <Col md={1}> <img src={thumbnail} style={itemThumbnail} /> </Col>
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
  },
  editModePrice: {
    width: 60
  },
  editModeInventory: {
    width: 50
  }
}
