const db = require("./db");

const tbName = "Users";
const fieldID = "Username";
const fieldID2 = "UserID";

module.exports = {
  findByName: async (name) => {
    try {
      let rs = await db.ones(tbName, fieldID, name);
      return rs;
    } catch (error) {
      return error.message;
    }
  },

  findByID: async (id) => {
    try {
      let rs = await db.one(tbName, fieldID2, id);
      return rs;
    } catch (error) {
      return error.message;
    }
  },

  addNew: async(uNew) => {
    try {
      let rs = await db.insert(tbName, uNew);
      return rs
    } catch (error) { 
      return error.message;
    }
  }
};
