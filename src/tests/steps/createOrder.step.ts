import { Given, When, Then, After } from '@cucumber/cucumber';
import assert from 'assert';
import axios from 'axios';
import setupApp from '../../main/config/app';
import { OrderMockData } from '../mock/order';

let response;
let createdOrderId;
const orderData = OrderMockData;

let app, server;

Given('the order data is ready', async function () {
  app = await setupApp();
  server = app.listen(4003);
});

When('I make a POST request to {string} with the order data', async function (endpoint) {
  response = await axios.post(`http://localhost:4003/api/order`, orderData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200 || response.status === 201) {
    createdOrderId = response.data.orderNumber;
  }
});

Then('the response should be successful', function () {
  assert.equal(response.status, 201);
});

Then('the response response payment is true', function () {
  assert.equal(response.data.paymentStatus, true);
});

Then('delete create order', async function () {
  response = await axios.delete(`http://localhost:4003/api/order/${createdOrderId}`);
  assert.equal(response.status, 204);
});

After(async function () {
  server.close();
});
