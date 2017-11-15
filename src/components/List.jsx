import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ListItem from './ListItem';
import SortBar from './SortBar';
import SearchInput from './SearchInput';
import '../styles/List.css';

/*
List will take the product data and create instances of ProductItem components
List will have search to filter through the product data
List will have SortBar
List will set number of items visible
*/

export default class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayItems: 10,
      currentPage: 1,
      search: false, // search cb will change this to be a filtered list of itemData
      itemsDataList: mockDataList,
      sortedList: false
    }
  }

  // Search
  updateListWithSearchResults = searchResults => {
    this.setState({
      search: searchResults,
      currentPage: 1,
      sortedList: false
    });
  }

  // Filter
  applySort = sortedList => {
    // SortBar will get either the original product list or search results
    this.setState({
      sortedList: sortedList
    });
  }

  // Displaying Item Rows
  createListItems = () => {
    const { displayItems, currentPage, search, itemsDataList, sortedList } = this.state;
    let result = [];
    // sortedList > search > itemsDataList
    // check for sortedList here
    // const list = search ? search : itemsDataList;
    const list = sortedList ? sortedList : (search ? search : itemsDataList);

    // TODO: Test for edge case if at the end of the list
    const startIndex = displayItems * (currentPage - 1);
    const truncatedList = list.slice(startIndex);
    const limit = displayItems < truncatedList.length ? displayItems : truncatedList.length; // in the case that we have less or more items than the limit
    for (let i = 0; i < limit; i++) {
      result.push(<ListItem itemData={truncatedList[i]} />);
    }

    return result;
  }

  // Pagination
  displayNItems = event => {
    this.setState({
      displayItems: parseInt(event.target.value, 10),
      currentPage: 1
    });
  }

  displayPage = event => {
    this.setState({
      currentPage: parseInt(event.target.value, 10)
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
      <select onChange={this.displayPage} defaultValue={currentPage}>
        {options}
      </select>
    );
  }

  // TODO: fix styling on input field on focus
  // TODO: Expand search box on focus
  render() {
    const { displayItems, itemsDataList, search } = this.state;
    const list = search ? search : itemsDataList;
    const pages = list.length / displayItems;
    const numberOfPages = list % displayItems !== 0 ? Math.floor(pages) + 1 : pages;

    // Search will filter or override this array
    // listItems = search ? createListItems(filtered itemArray) : createListItems(itemArray)

    return (
      <Container>
        <Row style={styles.searchRow}>
          <Col md={3}>
            <SearchInput search={search} list={itemsDataList} searchCallback={this.updateListWithSearchResults} />
          </Col>
        </Row>
        <Row style={styles.sortBar}>
          <SortBar list={list} sortCallback={this.applySort} />
        </Row>
        { this.createListItems() }
        <Row style={styles.paginationRow}>
          <Col md={7}>
            <Col md={3}>
              Items per Page:
          </Col>
            <Col>
              <select onChange={this.displayNItems} defaultValue="10">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </Col>
          </Col>
          <Col md={5} style={styles.textAlignRightColumn}>
            {/* <button> <i class="fa fa-angle-left" aria-hidden="true"></i></button> */}
            {this.buildPageSelector(numberOfPages)}
            {/* <button><i class="fa fa-angle-right" aria-hidden="true"></i></button> */}
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
  textAlignRightColumn: {
    textAlign: 'right'
  },
  paginationRow: {
    paddingTop: 10
  }
}

// n > 15
const mockDataList = [
  {
    "id": 1,
    "name": "Snapback Hat",
    "type": "Physical",
    "price": 20.99,
    "inventory": 0,
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
    "type": "APhysical",
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
    "type": "BPhysical",
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
    "type": "CPhysical",
    "price": 80.8,
    "inventory": 4,
    "thumbnail": "http://frontend-trial-project.weebly.com/uploads/1/0/5/4/105462933/11708126.png"
  },
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
    "id": 2,
    "name": "Maxi Dress - Floral",
    "type": "Physical",
    "price": 40,
    "inventory": 24,
    "thumbnail": "http://frontend-trial-project.weebly.com/uploads/1/0/5/4/105462933/27890e0eddd8e800fc2c8fc1c434744d.png"
  },
  {
    "id": 2,
    "name": "Maxi Dress - Floral",
    "type": "ZPhysical",
    "price": 40,
    "inventory": 24,
    "thumbnail": "http://frontend-trial-project.weebly.com/uploads/1/0/5/4/105462933/27890e0eddd8e800fc2c8fc1c434744d.png"
  }
];
