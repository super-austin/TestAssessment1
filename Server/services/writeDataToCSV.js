const fs = require("fs");
const path = require("path");
const stringify = require("csv-stringify").stringify;

const writeDataToCSV = (filePath, data) => {
  if (!data || !data.length) {
    return { status: false, error: "Data is empty" };
  }

  stringify(data, { header: true }, (err, str) => {
    const file = path.resolve(__dirname, filePath);

    fs.writeFile(file, str, (err) => {
      if (err) {
        console.log(err);
        return { status: false, error: "An error occurred" };
      }
      return { status: true };
    });
  });
};

module.exports = writeDataToCSV;
