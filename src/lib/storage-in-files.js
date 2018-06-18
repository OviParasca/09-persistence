'use strict';

const fs = require('fs');

const storage = module.exports = {};

const dataDirectory = `${__dirname}/../../data`;

storage.fetchAll = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(dataDirectory, (err, files) => {
      if (err) { 
        reject(err); 
      } 

      let promises = [];
      files.forEach(file => {
        let id = file.replace(/\.json/, '');
        promises.push(storage.fetchOne(id));
      });

      Promise.all(promises) 
      .then(contents => resolve(contents))
      .catch(err => reject(err));
      });
    });
};

storage.fetchOne = (id) => {
  return new Promise((resolve,reject) => {
    let file = `${dataDirectory}/${id}.json`;
    fs.readFile(file, (err,data) => {
      if (err) { 
        reject(sendJSONNotFound(err));
      }
      if (data) {
        let record = JSON.parse(data.toString());
        resolve(record);
      } else {
        reject('Nothing found');
      }
    });
  });
};

storage.updateOne = (record) => {
  if (!record) return Promise.reject(createError(400, 'No Record found'));

  return new Promise( (resolve,reject) => {
    let fileDirectory = `${dataDirectory}/${record.id}.json`;
    fs.writeFile(fileDirectory, JSON.stringify(record), (err) => {
      if (err) {
         reject(err); 
      } else {
         resolve(record); 
        }
    });
  });
};

storage.deleteOne = (id) => {
  if (!id) return Promise.reject(createError(400, 'No Id found'));

  return new Promise((resolve,reject) => {
    let fileDirectory = `${dataDirectory}/${id}.json`;
    fs.unlink(fileDirectory, (err) => {            
      if (err) {                                                 
          reject(err);                                    
      }                                                          
     console.log('File has been Deleted');        
    })
    .catch( err => console.log(err))
    resolve();   
  });
};

storage.save = (record) => {
  return new Promise((resolve,reject) => {
    let file = `${dataDirectory}/${record.id}.json`;
    let text = JSON.stringify(record);
    fs.writeFile(file, text, (err) => {
      if(err) { reject(err); }
      else { resolve(record); }
    });
  });
};


let sendJSONNotFound = (res) => {
  res.statusCode = 400;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.end();
};