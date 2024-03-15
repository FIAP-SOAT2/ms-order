import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import axios from 'axios';

import setupApp from '../../main/config/app';

let response: any;
let app, server;
Given('the server is running', () => {
  app = setupApp();
  server = app.listen(4003, () => {
    console.log(`Server is running on port 4003`);
  });
});

When('I make a GET request to {string}', async (endpoint: string) => {
  const url = `http://localhost:4003${endpoint}`;
  response = await axios.get(url);
});

Then('the response status should be {int}', (expectedStatus: number) => {
  assert.equal(response.status, expectedStatus);
});

Then('the response should contain the text {string}', (expectedText: string) => {
  assert.equal(response.data, expectedText);
});

Then('the server stop', () => {
  server.close();
});
