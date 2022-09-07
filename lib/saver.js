const parser = require('./parser');

function saver(input_file, output_file, test_suite = "My suite") {
  const { builder, error } = parser(input_file, test_suite);
  if (error) {
    return { error };
  }
  //Save the converted data to the output file
  try {
    builder.writeTo(output_file);
    return { savedToFile: output_file };
  } catch (e) {
    return { error: e.message };
  }
}

module.exports = saver;