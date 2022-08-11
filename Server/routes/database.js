const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const services = require("../services");
const parseDataFromCSV = require("../utils").parseDataFromCSV;

router.get("/test", (req, res) => {
  res.send("Route:Database is Running!");
});

router.get("/init_from_csv", async (req, res) => {
  let companies = [],
    stockHistory = [],
    transaction = [];

  // Clear the DataTables
  const isCleared = services.clearTables();
  if (isCleared === false) {
    return res
      .status(400)
      .json({ error: "An error occured during clearing the database." });
  }

  //  Read Data from CSV file
  //  Company
  const companyData = fs.readFileSync(
    path.resolve(__dirname, "../mock_data/companies.csv")
  );
  const historyData = fs.readFileSync(
    path.resolve(__dirname, "../mock_data/stock_history.csv")
  );
  const transData = fs.readFileSync(
    path.resolve(__dirname, "../mock_data/transactions.csv")
  );

  result = await parseDataFromCSV(companyData);
  try {
    companies = await parseDataFromCSV(companyData);
    await services.insertDatas("companies", companies);

    stockHistory = await parseDataFromCSV(historyData);
    await services.insertDatas("stockHistory", stockHistory);

    transaction = await parseDataFromCSV(transData);
    await services.insertDatas("transactions", transaction);

    return res.status(200).json({ status: "Database uploaded successfully." });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ status: "An error occured reading the CSV files." });
  }
});

router.get("/export_to_csv", async (req, res) => {
  const companies = await services.getDatas("companies", "*", "");
  const stockHistory = await services.getDatas("stockHistory", "*", "");
  const transactions = await services.getDatas("transactions", "*", "");

  if (companies === false || stockHistory === false || transactions === false) {
    return res
      .status(400)
      .json({ status: "An error occured reading the data from database." });
  }

  const resCompanies = services.writeDataToCSV(
    "../mock_data/companies.csv",
    companies
  );
  const resStockHistory = services.writeDataToCSV(
    "../mock_data/stock_history.csv",
    stockHistory
  );
  const resTransaction = services.writeDataToCSV(
    "../mock_data/transactions.csv",
    transactions
  );
});

module.exports = router;
