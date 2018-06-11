'use strict';

const storage = module.exports = {};

const database = {};

storage.fetchAll = () => {
  return Promise.resolve(database);
};

storage.fetchOne = (id) => {
  return new Promise( (resolve,reject) => {
    if(database[id]) { resolve(database[id]); }
    else { reject(`${id} not found`); }
  });
};

storage.deleteOne = (id) => {

};

storage.updateOne = (record) => {

};

storage.save = (record) => {
  return new Promise( (resolve,reject) => {
    database[record.id] = record;
    resolve(database[record.id]);
  });
};