// deoebdebcues
const fs = require('fs');
const path = require('path');

// module scaffolding
const lib = {};

// base directory
lib.basedir = path.join(__dirname, '../.data/');

// create file
lib.create = (dir, file, data, callback) => {
    // file open
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // conver to string
            const stringData = JSON.stringify(data);

            // write file
            fs.writeFile(fileDescriptor, stringData, (err1) => {
                if (!err1) {
                    // write file close
                    fs.close(fileDescriptor, (err2) => {
                        if (!err2) {
                            callback(false);
                        } else {
                            callback('file going not close');
                        }
                    });
                } else {
                    callback('file not wroted');
                }
            });
        } else {
            callback('file not created for before existing');
        }
    });
};

// read file
lib.read = (dir, file, callback) => {
    // file read
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf-8', (err, data) => {
        if (!err) {
            callback(data);
        }
    });
};

// update file
lib.update = (dir, file, data, callback) => {
    // file ope
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert string data
            const stringData = JSON.stringify(data);

            // clear existing data
            fs.ftruncate(fileDescriptor, (err1) => {
                if (!err1) {
                    // write file new
                    fs.writeFile(fileDescriptor, stringData, (err2) => {
                        if (!err2) {
                            fs.close(fileDescriptor, (err3) => {
                                if (!err3) {
                                    callback(false);
                                } else {
                                    callback('error');
                                }
                            });
                        } else {
                            callback('write file not');
                        }
                    });
                } else {
                    callback('file did clean yet');
                }
            });
        } else {
            callback("File dosen't update");
        }
    });
};

// delete file
lib.delete = (dir, file, callback) => {
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback('err to delete data');
        }
    });
};

// export file
module.exports = lib;
