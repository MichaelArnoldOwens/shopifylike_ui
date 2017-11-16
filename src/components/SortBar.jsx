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
      inventory: 0,
      selectAll: false
    }
  }

  sortByName = () => {
    const nameAlphabeticalSort = (a, b) => {
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
    // case insensitive sort
    const { name } = this.state;
    const { list, sortCallback } = this.props;
    switch (name) {
      case 0:
        sortCallback(list.slice().sort(nameAlphabeticalSort));
        this.setState({
          name: 1,
          type: 0,
          price: 0,
          inventory: 0
        })
        break;
      case 1:
        sortCallback(list.slice().sort(nameAlphabeticalSort).reverse());
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

  sortByType = () => {
    // case insensitive sort
    const typeAlphabeticalSort = (a, b) => {
      const nameA = a.type.toUpperCase();
      const nameB = b.type.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    }
    const { type } = this.state;
    const { list, sortCallback } = this.props;
    switch (type) {
      case 0:
        sortCallback(list.slice().sort(typeAlphabeticalSort));
        this.setState({
          name: 0,
          type: 1,
          price: 0,
          inventory: 0
        })
        break;
      case 1:
        sortCallback(list.slice().sort(typeAlphabeticalSort).reverse());
        this.setState({
          name: 0,
          type: 2,
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

  sortByPrice = () => {
    // case insensitive sort
    const priceSort = (a, b) => {
      const nameA = a.price;
      const nameB = b.price;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    }
    const { price } = this.state;
    const { list, sortCallback } = this.props;

    switch (price) {
      case 0:
        sortCallback(list.slice().sort(priceSort));
        this.setState({
          name: 0,
          type: 0,
          price: 1,
          inventory: 0
        })
        break;
      case 1:
        sortCallback(list.slice().sort(priceSort).reverse());
        this.setState({
          name: 0,
          type: 0,
          price: 2,
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

  sortByInventory = () => {
    // case insensitive sort
    const inventorySort = (a, b) => {
      const nameA = a.inventory;
      const nameB = b.inventory;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    }
    const { inventory } = this.state;
    const { list, sortCallback } = this.props;

    switch (inventory) {
      case 0:
        sortCallback(list.slice().sort(inventorySort));
        this.setState({
          name: 0,
          type: 0,
          price: 0,
          inventory: 1
        })
        break;
      case 1:
        sortCallback(list.slice().sort(inventorySort).reverse());
        this.setState({
          name: 0,
          type: 0,
          price: 0,
          inventory: 2
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

  handleSelectAll = () => {
    const { selectAllCallback } = this.props;
    const { selectAll } = this.state;
    selectAllCallback(!selectAll);
    this.setState({selectAll: !selectAll});
  }

  render() {
    const { textAlignRightColumn } = styles;
    const { name, type, price, inventory } = this.state;

    return (
      <Container>
        <Row>
          <Col md={1} style={styles.sortBarCheckbox} onChange={this.handleSelectAll}>
            <input type="checkbox" />
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
