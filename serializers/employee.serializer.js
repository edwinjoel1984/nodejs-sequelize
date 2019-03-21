'use strict';
var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('Employee', {
  attributes: ['name', 'last_name','full_name','createdAt', 'company'],
  keyForAttribute: 'camelCase'
});