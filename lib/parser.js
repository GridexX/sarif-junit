const builder = require('junit-report-builder');

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

      //Error handling
      if (result.ruleId === undefined) {
        return { error: "ruleId in Sarif is undefined for object : " + JSON.stringify(result) };
      } else if (result?.message?.text === undefined) {
        return { error: "message.text in Sarif is undefined for object : " + JSON.stringify(result) };
      } else if (result?.level === undefined) {
        return { error: "level in Sarif is undefined for object : " + JSON.stringify(result) };
      } else if (result?.locations[0]?.physicalLocation?.artifactLocation?.uri === undefined) {
        return { error: "locations.physicalLocation.artifactLocation.uri in Sarif is undefined for object : " + JSON.stringify(result) };
      } else if (result?.locations[0]?.physicalLocation?.region?.startLine === undefined) {
        return { error: "locations.physicalLocation.region.startLine in Sarif is undefined for object : " + JSON.stringify(result) };
      } else if (result?.locations[0]?.physicalLocation?.region?.startColumn === undefined) {
        return { error: "locations.physicalLocation.region.startColumn in Sarif is undefined for object : " + JSON.stringify(result) };
      }

      const startColumn = result.locations[0].physicalLocation.region.startColumn;
      const startLine = result.locations[0].physicalLocation.region.startLine;

      const errorLocation = `${startColumn}-${startLine}: `;

      const file = result.locations[0].physicalLocation.artifactLocation.uri.replace("file:/", "");

      if (result.level === 'error' || result.level === 'warning') {
        suite.testCase().className(result.ruleId).name(errorLocation + result.message.text).file(file).failure();
      } else {
        suite.testCase().className(result.ruleId).name(result.message.text).file(file);
      }

    });
  });

  return { builder };

}

module.exports = parser;