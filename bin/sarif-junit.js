#!/usr/bin/env node

require('colors');
const argv = require('minimist')(process.argv.slice(2));

const converter = require('../lib/converter');
const saver = require('../lib/saver');

const { error, savedToFile } = converter(argv);

if (error) {
  console.log(error.red);
} else {
  console.log(`Saved to file ${savedToFile}`.green);
}
module.exports = saver;