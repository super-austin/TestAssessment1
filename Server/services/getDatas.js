const sqlite3 = require("sqlite3");
const open = require("sqlite").open;
const getDataFromDatabase = require("../utils").getDataFromDatabase;

const getDatas = async (tableName, fields, condition) => {
  const db = await open({
    filename: "./TestAssessment.sqlite",
    driver: sqlite3.Database,
  });

  const query =
    `SELECT ${fields} from ${tableName}` +
    (condition === "" ? "" : `where ${condition}`);

  const data = new Array();
  await db.each(query, (err, row) => {
    if (err) return false;
    data.push(row);
  });
  return data;
};

module.exports = getDatas;
