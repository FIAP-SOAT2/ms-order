import { Given, When, Then, After } from '@cucumber/cucumber';
import assert from 'assert';
import axios from 'axios';
import setupApp from '../../main/config/app';
import { OrderMockData } from '../mock/order';

let response;
let createdOrderId;
let app, server;

Given('the order data is ready update', async function () {
  app = await setupApp();
  server = app.listen(3000);
});

When('I make a POST request to {string} with the order data for update', async function (endpoint) {
  response = await axios.post(`http://localhost:3000/api/order`, OrderMockData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200 || response.status === 201) {
    createdOrderId = response.data.orderNumber;
  }
});

Then('the response should be successful for update', function () {
  assert.equal(response.status, 201);
});

Then('the response payment is true', function () {
  assert.equal(response.data.paymentStatus, true);
});

When('I update the order status to {string}', async function (status) {
  response = await axios.patch(
    `http://localhost:3000/api/order/${createdOrderId}`,
    {
      status: status,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
});

Then('the update response should be successful', function () {
  assert.equal(response.status, 200);
});

Then('the order status should be {string}', function (status) {
  assert.equal(response.data.status, status);
});

Then('delete created order', async function () {
  response = await axios.delete(`http://localhost:3000/api/order/${createdOrderId}`);
  assert.equal(response.status, 204);
});

After(async function () {
  if (server) {
    server.close();
  }
});
