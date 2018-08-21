const frappe = require('frappejs');
import {SQLite} from '@ionic-native/sqlite';
import Database from 'frappejs/backends/database';

const debug = false;

export class IonicSqlite extends Database {
  constructor() {
    super();
    // this.dbPath = dbPath;
  }

  connect(dbPath) {
    if (dbPath) {
      this.dbPath = dbPath;
    }
    this.dbPath = 'test.db';
    const sqlite = new SQLite();
    return sqlite.create({
      name: dbPath,
      location: 'default'
    })
    .then(db => {
      this.conn = db;
    })
  }

  async tableExists(table) {
    const name = await this.sql(`SELECT name FROM sqlite_master WHERE type='table' AND name='${table}'`);
    return (name && name.length) ? true : false;
  }

  async addForeignKeys(doctype, newForeignKeys) {
    await this.run('PRAGMA foreign_keys=OFF');
    await this.run('BEGIN TRANSACTION');

    const tempName = 'TEMP' + doctype

    // create temp table
    await this.createTable(doctype, tempName);

    const columns = (await this.getTableColumns(tempName)).join(', ');

    // copy from old to new table
    await this.run(`INSERT INTO ${tempName} (${columns}) SELECT ${columns} from ${doctype}`);

    // drop old table
    await this.run(`DROP TABLE ${doctype}`);

    // rename new table
    await this.run(`ALTER TABLE ${tempName} RENAME TO ${doctype}`);

    await this.run('COMMIT');
    await this.run('PRAGMA foreign_keys=ON');
  }

  removeColumns() {
    // pass
  }

  async runCreateTableQuery(doctype, columns, indexes) {
    const query = `CREATE TABLE IF NOT EXISTS ${doctype} (
            ${columns.join(", ")} ${indexes.length ? (", " + indexes.join(", ")) : ''})`;

    return await this.run(query);
  }

  updateColumnDefinition(field, columns, indexes) {
    let def = this.getColumnDefinition(field);

    columns.push(def);

    if (field.fieldtype === 'Link' && field.target) {
      indexes.push(`FOREIGN KEY (${field.fieldname}) REFERENCES ${field.target} ON UPDATE CASCADE ON DELETE RESTRICT`);
    }
  }

  getColumnDefinition(field) {
    let def = [
      field.fieldname,
      this.typeMap[field.fieldtype],
      field.fieldname === 'name' ? 'PRIMARY KEY NOT NULL' : '',
      field.required ? 'NOT NULL' : '',
      field.default ? `DEFAULT ${field.default}` : ''
    ].join(' ');

    return def;
  }

  async getTableColumns(doctype) {
    return (await this.sql(`PRAGMA table_info(${doctype})`)).map(d => d.name);
  }

  async getForeignKeys(doctype) {
    return (await this.sql(`PRAGMA foreign_key_list(${doctype})`)).map(d => d.from);
  }

  async runAddColumnQuery(doctype, field, values) {
    await this.run(`ALTER TABLE ${doctype} ADD COLUMN ${this.getColumnDefinition(field)}`, values);
  }

  getOne(doctype, name, fields = '*') {
    fields = this.prepareFields(fields);
    return new Promise((resolve, reject) => {
      this.conn.get(`select ${fields} from ${doctype}
                where name = ?`, name,
        (err, row) => {
          resolve(row || {});
        });
    });
  }

  async insertOne(doctype, doc) {
    let fields = this.getKeys(doctype);
    let placeholders = fields.map(d => '?').join(', ');

    if (!doc.name) {
      doc.name = frappe.getRandomString();
    }

    return await this.run(`insert into ${doctype}
            (${fields.map(field => field.fieldname).join(", ")})
            values (${placeholders})`, this.getFormattedValues(fields, doc));
  }

  async updateOne(doctype, doc) {
    let fields = this.getKeys(doctype);
    let assigns = fields.map(field => `${field.fieldname} = ?`);
    let values = this.getFormattedValues(fields, doc);

    // additional name for where clause
    values.push(doc.name);

    return await this.run(`update ${doctype}
                set ${assigns.join(", ")} where name=?`, values);
  }

  async runDeleteOtherChildren(field, added) {
    // delete other children
    // `delete from doctype where parent = ? and name not in (?, ?, ?)}`
    await this.run(`delete from ${field.childtype}
            where
                parent = ? and
                name not in (${added.slice(1).map(d => '?').join(', ')})`, added);
  }

  async deleteOne(doctype, name) {
    return await this.run(`delete from ${doctype} where name=?`, name);
  }

  async deleteChildren(parenttype, parent) {
    await this.run(`delete from ${parenttype} where parent=?`, parent);
  }

  async deleteSingleValues(name) {
    await frappe.db.run('delete from SingleValue where parent=?', name)
  }

  async setValues(doctype, name, fieldValuePair) {
    const meta = frappe.getMeta(doctype);
    const validFields = this.getKeys(doctype);
    const validFieldnames = validFields.map(df => df.fieldname);
    const fieldsToUpdate = Object.keys(fieldValuePair)
      .filter(fieldname => validFieldnames.includes(fieldname))

    // assignment part of query
    const assigns = fieldsToUpdate.map(fieldname => `${fieldname} = ?`);

    // values
    const values = fieldsToUpdate.map(fieldname => {
      const field = meta.getField(fieldname);
      const value = fieldValuePair[fieldname];
      return this.getFormattedValue(field, value);
    });

    // additional name for where clause
    values.push(name);

    return await this.run(`update ${doctype}
      set ${assigns.join(', ')} where name=?`, values);
  }

  getAll({ doctype, fields, filters, start, limit, orderBy = 'modified', groupBy, order = 'desc' } = {}) {
    if (!fields) {
      fields = frappe.getMeta(doctype).getKeywordFields();
    }
    if (typeof fields === 'string') {
      fields = [fields];
    }

    return new Promise((resolve, reject) => {
      let conditions = this.getFilterConditions(filters);
      let query = `select ${fields.join(", ")}
                from ${doctype}
                ${conditions.conditions ? "where" : ""} ${conditions.conditions}
                ${groupBy ? ("group by " + groupBy.join(', ')) : ""}
                ${orderBy ? ("order by " + orderBy) : ""} ${orderBy ? (order || "asc") : ""}
                ${limit ? ("limit " + limit) : ""} ${start ? ("offset " + start) : ""}`;

      this.conn.all(query, conditions.values,
        (err, rows) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
    });
  }

  run(query, params) {
    return new Promise((resolve, reject) => {
      this.conn.run(query, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  sql(query, params) {
    return new Promise((resolve) => {
      this.conn.all(query, params, (err, rows) => {
        resolve(rows);
      });
    });
  }

  async commit() {
    try {
      await this.run('commit');
    } catch (e) {
      if (e.errno !== 1) {
        throw e;
      }
    }
  }

  initTypeMap() {
    this.typeMap = {
      'Autocomplete': 'text'
      , 'Currency': 'real'
      , 'Int': 'integer'
      , 'Float': 'real'
      , 'Percent': 'real'
      , 'Check': 'integer'
      , 'Small Text': 'text'
      , 'Long Text': 'text'
      , 'Code': 'text'
      , 'Text Editor': 'text'
      , 'Date': 'text'
      , 'Datetime': 'text'
      , 'Time': 'text'
      , 'Text': 'text'
      , 'Data': 'text'
      , 'Link': 'text'
      , 'DynamicLink': 'text'
      , 'Password': 'text'
      , 'Select': 'text'
      , 'Read Only': 'text'
      , 'File': 'text'
      , 'Attach': 'text'
      , 'Attach Image': 'text'
      , 'Signature': 'text'
      , 'Color': 'text'
      , 'Barcode': 'text'
      , 'Geolocation': 'text'
    }
  }
}
