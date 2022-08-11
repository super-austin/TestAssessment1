const sqlite3 = require("sqlite3");
const open = require("sqlite").open;

const clearTables = async () => {
  try {
    const db = await open({
      filename: "./TestAssessment.sqlite",
      driver: sqlite3.Database,
    });

    await db.exec("delete from [companies]");
    await db.exec("delete from [stockHistory]");
    await db.exec("delete from [transactions]");

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = clearTables;
