'use strict';
var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('Company', {
  attributes: ['name', 'state', 'employees']
});