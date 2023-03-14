const db = require("./db");

const tbName = "Store";
const tbName2 = "Products";
const fieldID = "CusID";
const fieldID2 = "Products";
const fieldSum = "Quantity";

module.exports = {
  getSumQuantity: async (cusID) => {
    try {
      let rs = await db.count(tbName, fieldID, cusID, fieldSum);
      return rs;
    } catch (error) {
      return error.message;
    }
  },

  insertStore: async (product) => {
    try {
      let rs = await db.insert(tbName, product);

      return rs;
    } catch (error) {
      return error.message;
    }
  },

  getProductByID: async (userid) => {
    try {
      let rs = await db.ones(tbName, fieldID, userid);
      return rs;
    } catch (error) {
      return error.message;
    }
  },

  getInfoOrder: async (proId, cusId) => {
    try {
      let queryString = `select DISTINCT st."ProductID", pd."ProductName", pd."UnitPrice", st."Quantity" from "Store" st left join "Products" pd on st."ProductID" = pd ."ProductID" where st."ProductID" = ${proId} and st."CusID" = ${cusId}`;
      let rs = await db.other(queryString);
      return rs;
    } catch (error) {
      return error.message;
    }
  },

  deteleOrder: async (proId, cusId) => {
    try {
      let queryString = `DELETE FROM "Store" WHERE "ProductID" = ${proId} AND "CusID" = ${cusId} RETURNING *`;
      let rs = await db.other(queryString);
      return rs;
    } catch (error) {
      return error.message;
    }
  },

  checkExist: async (proId, cusId) => {
    try {
      let queryString = `select * from "Store" where "CusID" = ${proId} and "ProductID" = ${cusId}`;
      let rs = await db.other(queryString);
      return rs;
    } catch (error) {
      return error.message;
    }
  },

  updateQuantity: async (proId, cusId, quantity) => {
    try {
      let queryString = `update "Store" set "Quantity" = ${quantity} where "CusID" = ${cusId} and "ProductID" = ${proId} returning *`;
      let rs = await db.other(queryString);
      return rs;
    } catch (error) {
      return error.message;
    }
  }
};
