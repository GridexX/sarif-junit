const fs = require('fs');
const saver = require('./saver');

function converter(options) {
  //Thanks to minimalist cli args are passed in as an object
  /*
  options = {
    _ : [ <input_file_path>, <output_file_path>],
  }
  or
  options = {
    input-file: <input_file_path>,
    output-file: <output_file_path>
  }
  or 
  options = {
    i: <input_file_path>,
    o: <output_file_path>
  }
  
  Return an object with the following properties:
    data: the converted data
    error: any error that occurred
    savedToFile: the name of the file that was saved
  */

  let input_file_path = null;
  let output_file_path = null;
  let testSuite = 'My suite';
  if (options._.length > 1) {
    input_file_path = options._[0];
    output_file_path = options._[1];
    if (options._.length > 2) {
      testSuite = options._[2];
    }
  } else if (options['input-file'] && options['output-file']) {
    input_file_path = options['input-file'];
    output_file_path = options['output-file'];
  } else if (options.i && options.o) {
    input_file_path = options.i;
    output_file_path = options.o;
  }
  else {
    return {
      error: 'Please specify input and output file paths with -i and -o options'
    }
  }

  if (options['test-suite']) {
    testSuite = options['test-suite'];
  }

  //Read the input file
  let input_sarif_file = null
  try {
    input_sarif_file = fs.readFileSync(input_file_path, 'utf8');
  } catch (e) {
    return { data: null, error: e.message };
  }

  return saver(input_sarif_file, output_file_path, testSuite);


}

module.exports = converter;