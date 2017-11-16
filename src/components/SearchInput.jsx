import React, { Component } from 'react';
import { Col } from 'reactstrap';
import { isValidPriceInput } from '../services/validationService';

export default class SearchInput extends Component {

  handleSearch = event => {
    const { search, list, searchCallback } = this.props;
    const { value } = event.target;

    if (value === '' && search) {
      searchCallback(false);
    } else {
      let results = [];
      const isFirstCharDollarSymbol = value.charAt(0) === '$';
      if (isFirstCharDollarSymbol && value.length === 1) {
        return searchCallback(list);
      }

      const priceSearchFlag = isValidPriceInput(value, isFirstCharDollarSymbol);

      list.forEach(item => {
        if (priceSearchFlag) {
          const priceValue = isFirstCharDollarSymbol ? value.slice(1) : value;
          if (parseFloat(priceValue, 10) === item.price) {
            results.push(item);
          }
        } else {
          if (item.name.toLowerCase().includes(value.toLowerCase())) {
            results.push(item);
          }
        }
      });
      searchCallback(results);
    }
  }

  render() {
    const { searchContainer, searchField } = styles;

    return (
      <div style={searchContainer} >
        <Col md={1} > <i className="fa fa-search" aria-hidden="true"></i></Col>
        <Col ><input onChange={this.handleSearch} type="text" placeholder="Search..." style={searchField} /></Col>
      </div>
    )
  }
}

const styles = {
  searchContainer: {
    border: '1px solid #DCDCDC',
    borderRadius: 3
  },
  searchField: {
    border: 0,
    marginLeft: 10
  }
}
