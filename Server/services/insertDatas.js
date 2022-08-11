const sqlite3 = require("sqlite3");
const open = require("sqlite").open;

const insertDatas = async (tableName, newData) => {
  try {
    const db = await open({
      filename: "./TestAssessment.sqlite",
      driver: sqlite3.Database,
    });

    const fields = newData[0].reduce((total, item, index) => {
      total += `[${item}]`;
      if (index !== newData[0].length - 1) total += ", ";
      else total += ") ";
      return total;
    }, "(");

    const values = newData.reduce((total, item, index) => {
      if (index === 0) return total;
      total += item.reduce((subTotal, subItem, subIndex) => {
        subItem = subItem.split(`'`).join(`''`);
        subTotal += `'${subItem}'`;
        if (subIndex !== item.length - 1) subTotal += ", ";
        else subTotal += " )";
        return subTotal;
      }, " ( ");
      if (index === newData.length - 1) total += ";";
      else total += ",";
      return total;
    }, "values");
    const query = `INSERT INTO [${tableName}] ${fields}${values}`;
    await db.exec(query);

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = insertDatas;
