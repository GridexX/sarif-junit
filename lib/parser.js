var builder = require('junit-report-builder');

function parser(sarifContent, testSuite) {
  /*
   Return an object with the following properties:
    builder: the converted data in xml format
    error: any error that occurred
  */
  let sarifObject = null;
  try {
    sarifObject = JSON.parse(sarifContent);
  }
  catch (e) {
    return { error: e.message };
  }

  let suite = builder.testSuite().name(testSuite ?? 'My suite');

  sarifObject.runs.forEach(run => {
    run.results.forEach(result => {

      if (result.ruleId === undefined) {
        return { error: "ruleId in Sarif is undefined for object : " + JSON.stringify(result) };
      } else if (result?.message?.text === undefined) {
        return { error: "message.text in Sarif is undefined for object : " + JSON.stringify(result) };
      } else if (result?.level === undefined) {
        return { error: "level in Sarif is undefined for object : " + JSON.stringify(result) };
      }


      if (result.level === 'error' || result.level === 'warning') {
        suite.testCase().className(result.ruleId).name(result.message.text).failure();
      } else {
        suite.testCase().className(result.ruleId).name(result.message.text);
      }

    });
  });

  return { builder };

}

module.exports = parser;