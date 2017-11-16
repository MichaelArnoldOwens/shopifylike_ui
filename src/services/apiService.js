import 'whatwg-fetch';
import { baseApiUrl } from '../config';

export function getItems() {
  return fetch(`${baseApiUrl}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (response) {
      return response.json()
    }).then(function (json) {
      return json;
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    });
}

export function createProduct(newProductObj) {
  /**
  {
    "name": "New Product",
    "type": "Physical",
    "price": 10,
    "inventory": 25,
    "thumbnail": "http://example.com/thumbnail.png"
  }
   */

  return fetch(`$baseApiUrl/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    return response.json()
  }).then(function (json) {
    return json;
  }).catch(function (ex) {
    console.log('parsing failed', ex)
  });
}

export function updateProduct(id, body) {
  // The API will not update the 'type'
  return fetch(`${baseApiUrl}/product/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(function (response) {
      return response.json()
    }).then(function (json) {
      return json;
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    })
}
