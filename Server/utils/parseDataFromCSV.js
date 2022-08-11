const parse = require("csv-parse").parse;

const parseDataFromCSV = (path) => {
  return new Promise((res, rej) => {
    parse(path, (err, records) => {
      if (err) {
        rej(err);
      } else res(records);
    });
  });
};

module.exports = parseDataFromCSV;
