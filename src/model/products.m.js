const db = require("./db");
const tbName = "Products";
const fieldID1 = "CategoryID";

const tbName2 = "Orders";
const fieldID2 = "CusID";
const fieldCount = "OrderID";

const fieldID3 = "ProductID";

module.exports = {
  getAll: async () => {
    try {
      let rs = await db.all(tbName);
      return rs;
    } catch (error) {
      return error.message;
    }
  },

  getByCate: async (cateId) => {
    try {
      let rs = await db.ones(tbName, fieldID1, cateId);
      return rs;
    } catch (error) {
      return error.message;
    }
  },

  insertOrder: async (productOrder) => {
    try {
      let rs = await db.insert(tbName2, productOrder);

      return rs;
    } catch (error) {
      return error.message;
    }
  },
  
  getByID: async (proId) => {
    try {
      let rs = await db.one(tbName, fieldID3, proId);

      return rs;
    } catch (error) {
      return error.message;
    }
  }
};
