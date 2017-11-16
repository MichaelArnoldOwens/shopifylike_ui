import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ListItem from './ListItem';
import SortBar from './SortBar';
import SearchInput from './SearchInput';
import '../styles/List.css';
import { getItems, updateProduct } from '../services/apiService';


// TODO: Change itemsDataList to dictionary - currently have to loop through the entire list every time i want to find an item
// TODO: fix styling on input field on focus
// TODO: Expand search box on focus


export default class List extends Component {
  state = {
    displayItems: 10,
    currentPage: 1,
    search: false,
    sortedList: false,
    itemsDataList: [],
    disabledItems: []
  }

  componentWillMount() {
    getItems().then(response => {
      this.setState({
        itemsDataList: response
      });
    });
  }

  // Search
  applyListWithSearchResults = searchResults => {
    this.setState({
      search: searchResults,
      currentPage: 1,
      sortedList: false
    });
  }

  // Sorting
  applySort = sortedList => {
    this.setState({
      sortedList
    });
  }

  // Displaying Item Rows
  createListItems = () => {
    const { displayItems, currentPage, search, itemsDataList, sortedList } = this.state;
    let result = [];

    // sortedList > search > itemsDataList
    const list = sortedList ? sortedList : (search ? search : itemsDataList);
    const startIndex = displayItems * (currentPage - 1);
    const truncatedList = list.slice(startIndex);
    const limit = displayItems < truncatedList.length ? displayItems : truncatedList.length; // in the case that we have less or more items than the limit

    for (let i = 0; i < limit; i++) {
      result.push(
        <ListItem key={truncatedList[i].id}
                  itemData={truncatedList[i]} 
                  checkboxCallback={this.applyListItemCheckbox} 
                  selected={truncatedList[i].selected} 
                  updateItemData={this.applyUpdateItemData} 
                  updateDisabledItems={this.applyDisabledItems} />
      );
    }

    return result;
  }

  // Editing
  applyDisabledItems = (id, operation = 'add') => {
    const { disabledItems } = this.state;
    const itemIndex = disabledItems.indexOf(id);
    let newDisabledItems;

    if( operation === 'add' && itemIndex === -1) {
      newDisabledItems = [].concat(disabledItems);
      newDisabledItems.push(id);
      this.setState({
        disabledItems: newDisabledItems
      });
    } else if(operation === 'remove' && itemIndex > -1) {
      newDisabledItems = [].concat(disabledItems);
      newDisabledItems.splice(itemIndex, 1);
      this.setState({
        disabledItems: newDisabledItems
      });
    }
  }

  applySelectAllCallback = selectAll => {
    const { itemsDataList, disabledItems } = this.state;
    const newItemsDataList = itemsDataList.map(item => {
      if(disabledItems.indexOf(item.id) > -1) {
        return item;
      }
      item.selected = selectAll;
      return item;
    });

    this.setState({
      itemsDataList: newItemsDataList
    });
  }

  applyUpdateItemData = (newItemData, id) => {
    const { itemsDataList } = this.state;
    const { currentName, currentInventory, currentPrice, currentType } = newItemData;
    let updateItem = {};
    const newItemsDataList = itemsDataList.map(item => {
      if (item.id === id) {
        item.name = currentName;
        item.inventory = currentInventory;
        item.price = currentPrice;
        item.type = currentType;
        updateItem.name = currentName;
        updateItem.inventory = currentInventory;
        updateItem.price = currentPrice;
        // Not passing the 'type' because the API will not update it
      }
      return item;
    });

    updateProduct(id, updateItem).then(response => {
      this.setState((previousState, currentProps) => { // there is a race condition here - solution is to loop through items again and find the item with the matching id and replace it
        return { ...previousState, itemsDataList: newItemsDataList };
      });
    });
  }

  applyListItemCheckbox = (selected, id) => {
    const { itemsDataList } = this.state;
    const newItemsDataList = itemsDataList.map(item => {
      if (item.id === id) {
        item.selected = selected;
      }
      return item;
    });

    this.setState({
      itemsDataList: newItemsDataList
    });
  }

  // Pagination
  displayNItems = event => {
    this.setState({
      displayItems: parseInt(event.target.value, 10),
      currentPage: 1,
      disabledItems: []
    });
  }

  displayPage = event => {
    this.setState({
      currentPage: parseInt(event.target.value, 10),
      disabledItems: []
    });
  }

  buildPageSelector = (numberOfPages) => {
    const { currentPage } = this.state;
    let options = [];

    for (let i = 1; i <= numberOfPages; i++) {
      if (i === currentPage) {
        options.push(<option key={`${i}_page`} value={i} selected>{i}</option>);
      } else {
        options.push(<option key={`${i}_page`} value={i}>{i}</option>)
      }
    }

    return (
      <select style={styles.paginationSelector} onChange={this.displayPage} defaultValue={currentPage}>
        {options}
      </select>
    );
  }

  render() {
    const { searchRow, sortBar, paginationRow, paginationSelector, textAlignRight } = styles;
    const { displayItems, itemsDataList, search } = this.state;
    const list = search ? search : itemsDataList;
    const pages = list.length / displayItems;
    const numberOfPages = list % displayItems !== 0 ? Math.floor(pages) + 1 : pages;

    return (
      <Container>
        <Row style={searchRow}>
          <Col md={3}>
            <SearchInput search={search} list={itemsDataList} searchCallback={this.applyListWithSearchResults} />
          </Col>
        </Row>
        <Row style={sortBar}>
          <SortBar list={list} sortCallback={this.applySort} selectAllCallback={this.applySelectAllCallback} />
        </Row>
        {this.createListItems()}
        <Row style={paginationRow}>
          <Col md={7}>
            <Col md={3}>
              Items per Page:
          </Col>
            <Col>
              <select style={paginationSelector} onChange={this.displayNItems} defaultValue="10">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </Col>
          </Col>
          <Col md={5} style={textAlignRight}>
            {this.buildPageSelector(numberOfPages)}
          </Col>
        </Row>
      </Container>
    );
  }
}

const styles = {
  sortBar: {
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#E8E8E8',
    paddingBottom: 10
  },
  searchRow: {
    backgroundColor: 'white',
    marginBottom: 20
  },
  textAlignRight: {
    textAlign: 'right'
  },
  paginationRow: {
    paddingTop: 10
  },
  paginationSelector: {
    boxSizing: 'border-box',
    color: '#666c70',
    backgroundColor: '#fff',
    border: '1px solid #c9cdcf',
    borderRadius: 2,
    height: 30,
    paddingLeft: 10,
    paddingRight: 28
  }
}
