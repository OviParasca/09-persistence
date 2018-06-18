'use strict';

const storage = module.exports = {};

const database = {};

storage.fetchAll = () => {
  console.log('hello from storage in memory fetch all');
  return Promise.resolve(database);
};

storage.fetchOne = (id) => {
  return new Promise( (resolve,reject) => {
    if (database[id]) { 
      resolve(database[id]); 
    } else { 
      reject(`${id} not found`); 
    }
  });
};

storage.deleteOne = (id) => {
  return new Promise( (resolve,reject) => {
    if (database[id]) { 
      delete database[id]; 
      resolve('Deleted object')
    } else { 
      reject(`${id} not found`); 
    }
  });
};

storage.updateOne = (record) => {
  return new Promise( (resolve, reject) => {
    if (database[record.id] === record.id) { 
      database[record] = record;
      resolve(`Object updated`); 
    } else { 
      reject(`${id} not found`); 
    }
  });
};

storage.save = (record) => {
  return new Promise( (resolve,reject) => {
    database[record.id] = record;
    resolve(database[record.id]);
  });
};