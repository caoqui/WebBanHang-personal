const initOptions = {};
const pgp = require("pg-promise")(initOptions);

const cn = require("../config/cnStr");
const db = pgp(cn);
const schema = "public";

module.exports = {
  all: async (tbName) => {
    const table = new pgp.helpers.TableName({ table: tbName, schema: schema });
    const query = pgp.as.format("SELECT * FROM $1", table);
    const rs = await db.any(query);
    return rs;
  },

  one: async (tbName, fieldName, fieldValue) => {
    const table = new pgp.helpers.TableName({ table: tbName, schema: schema });
    const query = pgp.as.format("SELECT * FROM $1 WHERE $2:alias=$3", [
      table,
      fieldName,
      fieldValue,
    ]);
    const rs = await db.one(query);
    return rs;
  },

  ones: async (tbName, fieldName, fieldValue) => {
    const table = new pgp.helpers.TableName({ table: tbName, schema: schema });
    const query = pgp.as.format("SELECT * FROM $1 WHERE $2:alias=$3", [
      table,
      fieldName,
      fieldValue,
    ]);
    const rs = await db.any(query);
    return rs;
  },

  count: async (tbName, fieldName, fieldValue, fieldSum) => {
    const table = new pgp.helpers.TableName({ table: tbName, schema: schema });
    const query = pgp.as.format("SELECT Sum($4:alias) FROM $1 WHERE $2:alias=$3 group by $2:alias", [
      table,
      fieldName,
      fieldValue,
      fieldSum,
    ]);
    const rs = await db.one(query);

    return rs;
  },

  insert: async (tbName, entity) => {
    const table = new pgp.helpers.TableName({ table: tbName, schema: schema });
    const query = pgp.helpers.insert(entity, null, table) + "RETURNING *";
    // console.log("Querry:", query);
    const rs = await db.one(query);
    // console.log("rs db: ", rs);
    return rs;
  },

  //query other
  other: async (queryString) => {
    const rs = await db.any(queryString);
    return rs;
  },

  delete: async (tbName, fieldName, fieldValue) => {
    const table = new pgp.helpers.TableName({ table: tbName, schema: schema });
    const query = pgp.as.format("delete FROM $1 WHERE $2:alias=$3 RETURNING *", [
      table,
      fieldName,
      fieldValue,
    ]);
    const rs = await db.one(query);
    return rs;
  },
};
