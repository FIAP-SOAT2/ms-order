import { Given, When, Then, After } from '@cucumber/cucumber';
import assert from 'assert';
import axios from 'axios';
import setupApp from '../../main/config/app';

let response;
let app, server;

Given('the order list is available', async function () {
  app = await setupApp();
  server = app.listen(4003);
});

When('I make a filtered request to {string} with {string}', async function (endpoint, filter) {
  response = await axios.get(`http://localhost:4003/api/order/filters?status=READY`);
});

Then('the result should return success', function () {
  assert.equal(response.status, 200);
});

Then('the response body should contain only orders with status {string}', function (status) {
  assert(response.data.every((order) => order.status === status));
});

After(async function () {
  if (server) {
    server.close();
  }
});
