<h1 align="center" style="color:#1b4c17">
  <img src="./assets/sarif-junit.png" width="200">
  <br>
  <br>
  Sarif-<span style="color:#dd514c">JUnit</span> 
</h1>

This project aims to convert a SARIF output file from a linter to a JUnit XML output file.
It could be used inside GitLab to show which tests are failing in the CI/CD pipeline.


## Installation

```bash
# npm
npm install -g sarif-junit@latest

# yarn
yarn global add sarif-junit@latest
```

*You can update latest tag by a specific version tag*

## Usage

You can use this tool in two ways:

### 1. Using the CLI

```bash 
sarif-junit --input <input-file> --output <output-file>
[--test-suite <test-suite>] 
```

*👉 You can also use the short version of the arguments `-i` and `-o`*.

### 2. Importing the module in your code


Here is an example of how to read a SARIF file and convert it to a CodeClimate file:


```javascript
const saver = require('sarif-junit/lib/saver');
const fs = require('fs');

//Read the input file
let input_sarif_file = null
try {
  input_sarif_file = fs.readFileSync("result.sarif", 'utf8');
} catch (e) {
  console.log(e.message);
}
saver(input_sarif_file, "result.xml", "testSuite");

```

## Contributing

Are you missing something or want to contribute? Feel free to open an [issue](https://github.com/GridexX/sarif-junit/issues) or create a [pull request](https://github.com/GridexX/sarif-junit/pulls)

## License
MIT 

## Author
GridexX, a french DevOps working for [R2DevOps](https://r2devops.io)