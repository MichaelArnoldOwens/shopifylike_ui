import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

const SORT_TYPES = {
  NONE: 'NONE',
  ASCENDING: 'ASC',
  DESCENDING: 'DESC'
}

const ITEM_PROPS = {
  NAME: 'name',
  TYPE: 'type',
  PRICE: 'price',
  INVENTORY: 'inventory'
}

// TODO: deselect selectAll if no items are selected

export default class SortBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: SORT_TYPES.NONE,
      type: SORT_TYPES.NONE,
      price: SORT_TYPES.NONE,
      inventory: SORT_TYPES.NONE,
      selectAll: false
    }
  }

  sort = property => {
    const sortGeneric = (property, a, b) => {
      let valA = a[property];
      let valB = b[property];
      if (typeof a === 'string') {
        valA = valA.toUpperCase()
        valB = valB.toUpperCase()
      }
      if (valA < valB) {
        return -1
      }
      if (valA > valB) {
        return 1;
      }
      return 0;
    }

    return () => {
      const propertyStateValue = this.state[property];
      const { list, sortCallback } = this.props;
      let newState = {
        name: SORT_TYPES.NONE,
        type: SORT_TYPES.NONE,
        price: SORT_TYPES.NONE,
        inventory: SORT_TYPES.NONE
      }

      switch (propertyStateValue) {
        case SORT_TYPES.NONE:
          sortCallback(list.slice().sort((a, b) => sortGeneric(property, a, b)));
          newState[property] = SORT_TYPES.ASCENDING;
          this.setState(newState)
          break;
        case SORT_TYPES.ASCENDING:
          sortCallback(list.slice().sort((a, b) => sortGeneric(property, a, b)).reverse());
          newState[property] = SORT_TYPES.DESCENDING;
          this.setState(newState)
          break;
        default:
          sortCallback(list);
          this.setState(newState)
          break;
      }
    }
  }

  sortByName = this.sort(ITEM_PROPS.NAME);
  sortByType = this.sort(ITEM_PROPS.TYPE);
  sortByPrice = this.sort(ITEM_PROPS.PRICE);
  sortByInventory = this.sort(ITEM_PROPS.INVENTORY);

  handleSelectAll = () => {
    const { selectAllCallback } = this.props;
    const { selectAll } = this.state;
    
    selectAllCallback(!selectAll);
    this.setState({ selectAll: !selectAll });
  }

  render() {
    const { textAlignRightColumn } = styles;
    const { selectAll } = this.state;

    return (
      <Container>
        <Row>
          <Col md={1} style={styles.sortBarCheckbox} >
            <input type="checkbox" onChange={this.handleSelectAll} checked={selectAll} />
          </Col>
          <Col md={6} onClick={this.sortByName}> Name <i className="fa fa-angle-down" aria-hidden="true"></i> </Col>
          <Col md={2} onClick={this.sortByType}> Type <i className="fa fa-angle-down" aria-hidden="true"></i> </Col>
          <Col md={1} onClick={this.sortByPrice} style={textAlignRightColumn}> Price <i className="fa fa-angle-down" aria-hidden="true"></i> </Col>
          <Col md={2} onClick={this.sortByInventory} style={textAlignRightColumn}> Inventory <i className="fa fa-angle-down" aria-hidden="true"></i></Col>
        </Row>
      </Container>
    );
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
