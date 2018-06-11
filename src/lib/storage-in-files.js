'use strict';

const fs = require('fs');

const storage = module.exports = {};

const dataDirectory = `${__dirname}/../../data`;

storage.fetchAll = () => {
};

storage.fetchOne = (id) => {
  return new Promise( (resolve,reject) => {
    let file = `${dataDirectory}/${id}.json`;
    fs.readFile(file, (err,data) => {
      if(err) { reject(err); }
      if ( data ) {
        let record = JSON.parse(data.toString());
        resolve(record);
      }
      else {
        reject('Nothing found');
      }
    });
  });
};

storage.updateOne = (record) => {

};

storage.deleteOne = (id) => {

};

storage.save = (record) => {
  return new Promise( (resolve,reject) => {
    let file = `${dataDirectory}/${record.id}.json`;
    let text = JSON.stringify(record);
    fs.writeFile(file, text, (err) => {
      if(err) { reject(err); }
      else { resolve(record); }
    });
  });
};