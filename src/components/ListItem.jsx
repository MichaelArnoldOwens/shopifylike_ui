import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import '../styles/ListItem.css';

/**
 * Selected = edit mode
 */
export default class ListItem extends Component {
  constructor(props) {
    super(props);
    const { itemData, selectAll } = this.props;
    const { id, name, type, price, inventory } = itemData;
    const selected = false;
    this.state = {
      id,
      selected,
      name,
      type,
      price,
      inventory
    };
  }

  handleCheckbox = event => {
    const { selected } = this.state;
    this.setState({
      selected: !selected
    });
  }

  handleEdit = event => {
    // TODO:
    // send post request to update the entry
    // trigger callback to update the parent list
    const { name, value } = event.target;
    let newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  render() {
    const { itemData, checkboxCallback, selectAll } = this.props;
    const { thumbnail } = itemData;
    const { selected, id, name, type, price, inventory } = this.state;
    const { selectedRowEntry, rowEntry, itemThumbnail, itemNameColumn, textAlignRightColumn, zeroInventory, editModePrice, editModeInventory } = styles;
    const rowStyle = selected ? styles.selectedRowEntry : styles.rowEntry;

    console.log('selected: ', selected)


    let inventoryStyles = {};
    inventoryStyles = inventory > 0 ? textAlignRightColumn : Object.assign(inventoryStyles, textAlignRightColumn, zeroInventory);

    // TODO: add trailing zero to price when needed
    if (!selected && !selectAll) {
      return (
        <Row key={id} style={rowStyle}>
          <Col md={1} style={textAlignRightColumn}> <input type="checkbox" onChange={this.handleCheckbox} /> </Col>
          <Col md={1}> <img src={thumbnail} style={itemThumbnail} /> </Col>
          <Col md={5} style={itemNameColumn}> {name} </Col>
          <Col md={2}> {type} </Col>
          <Col md={1} style={textAlignRightColumn}> ${price} </Col>
          <Col md={2} style={inventoryStyles}> {inventory} </Col>
        </Row>
      );
    }
    return (
      <Row key={id} style={rowStyle}>
        <Col md={1} style={textAlignRightColumn}> <input type="checkbox" onChange={this.handleCheckbox} checked/> </Col>
        <Col md={1}> <img src={thumbnail} style={itemThumbnail} /> </Col>
        <Col md={5} style={itemNameColumn}> <input type="text" value={name} onChange={this.handleEdit} name="name" /> </Col>
        <Col md={2}>
          <select name="type" onChange={this.handleEdit} defaultValue={type}>
            <option value={type}>{type}</option>
            <option value='metaphysical'>metaphysical</option>
            <option value='super physical'>super physical</option>
          </select>
        </Col>
        <Col md={1} style={textAlignRightColumn}> $<input style={editModePrice} type="number" value={price} onChange={this.handleEdit} name="price" /> </Col>
        <Col md={2} style={inventoryStyles}> <input style={editModeInventory} type="number" value={inventory} onChange={this.handleEdit} name="inventory" /> </Col>
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
