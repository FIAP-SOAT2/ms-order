import { Given, When, Then, After } from '@cucumber/cucumber';
import assert from 'assert';
import axios from 'axios';
import setupApp from '../../main/config/app';

let response;
let app, server;

Given('initial all list order', async function () {
  app = await setupApp();
  server = app.listen(5002);
});

When('I make a request to {string}', async function (endpoint) {
  response = await axios.get(`http://localhost:5002/api/order`);
});

Then('the result should return body success', function () {
  assert.equal(response.status, 200);
});

Then('the response body should return all orders available', function () {
  assert(Array.isArray(response.data.data));
});

After(async function () {
  if (server) {
    server.close();
  }
});
